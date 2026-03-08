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

    const seen = new Set();
    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("/_next/image") && url.includes("carousel%2Fproject-")) {
        seen.add(url);
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
    await page.waitForTimeout(2000);

    const imageState = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll("img[alt]")).map((img) => ({
        alt: img.getAttribute("alt") ?? "",
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        loading: img.getAttribute("loading") ?? "",
      }));

      return {
        total: nodes.length,
        ready: nodes.filter((n) => n.complete && n.naturalWidth > 0).length,
        eager: nodes.filter((n) => n.loading === "eager").length,
        lazy: nodes.filter((n) => n.loading === "lazy").length,
        nodes,
      };
    });

    console.log(JSON.stringify({
      imageRequestsFirst2s: seen.size,
      imageState,
    }, null, 2));
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

runBench().catch((err) => {
  console.error(err);
  process.exit(1);
});
