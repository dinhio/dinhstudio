import process from "node:process";
import { chromium } from "playwright";
import { BASE_URL, startProdServer, waitForServer, applyThrottle } from "./bench-utils.mjs";

async function runBench() {
  const server = startProdServer();

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
    await applyThrottle(client);

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
