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

    const seen = new Set();
    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("/_next/image") && url.includes("carousel%2Fproject-")) {
        seen.add(url);
      }
    });

    const client = await context.newCDPSession(page);
    await applyThrottle(client);

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
