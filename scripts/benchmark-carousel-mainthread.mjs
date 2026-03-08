import { spawn } from "node:child_process";
import process from "node:process";
import { chromium } from "playwright";

const BASE_URL = "http://127.0.0.1:3000";

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for server: ${url}`);
}

async function runBench() {
  const server = spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: "production" },
  });

  let browser;
  try {
    await waitForServer(BASE_URL);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.__longTaskCount = 0;
      window.__longTaskTotal = 0;
      window.__longTaskMax = 0;
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__longTaskCount += 1;
            window.__longTaskTotal += entry.duration;
            window.__longTaskMax = Math.max(window.__longTaskMax, entry.duration);
          }
        });
        observer.observe({ type: "longtask", buffered: true });
      }
    });

    const client = await context.newCDPSession(page);
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 120,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      connectionType: "cellular3g",
    });
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await client.send("Network.setCacheDisabled", { cacheDisabled: true });

    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);

    const metrics = await page.evaluate(() => ({
      longTaskCount: window.__longTaskCount ?? 0,
      longTaskTotalMs: Number((window.__longTaskTotal ?? 0).toFixed(1)),
      longTaskMaxMs: Number((window.__longTaskMax ?? 0).toFixed(1)),
    }));

    console.log(JSON.stringify(metrics, null, 2));
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

runBench().catch((err) => {
  console.error(err);
  process.exit(1);
});
