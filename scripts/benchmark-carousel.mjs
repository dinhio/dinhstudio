import process from "node:process";
import { chromium } from "playwright";
import { BASE_URL, startProdServer, waitForServer, applyThrottle } from "./bench-utils.mjs";

const SLIDES = [
  { title: "Artisan Bloom", alt: "Artisan Bloom" },
  { title: "Neotech Labs", alt: "Neotech Labs" },
  { title: "Verdant Co", alt: "Verdant Co" },
  { title: "Lumina Studio", alt: "Lumina Studio" },
  { title: "Aurora Digital", alt: "Aurora Digital" },
];

const byNormalized = new Map(
  SLIDES.map((slide, index) => [slide.title.replace(/\s+/g, "").toLowerCase(), { ...slide, index }])
);

function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function p95(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95));
  return sorted[idx];
}

async function getActiveNormalizedTitle(page) {
  return page.evaluate(() => {
    const heading = document.querySelector("h2.mb-5");
    return (heading?.textContent ?? "").replace(/\s+/g, "").toLowerCase();
  });
}

async function isImageReady(page, alt) {
  return page.evaluate((imageAlt) => {
    const img = document.querySelector(`img[alt=\"${imageAlt}\"]`);
    return Boolean(img && img.complete && img.naturalWidth > 0);
  }, alt);
}

async function waitForSlideReady(page, expectedTitle, timeoutMs = 4000) {
  const expectedNormalized = expectedTitle.replace(/\s+/g, "").toLowerCase();
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const active = await getActiveNormalizedTitle(page);
    if (active === expectedNormalized) {
      const imageReady = await isImageReady(page, expectedTitle);
      if (imageReady) return Date.now() - start;
    }
    await page.waitForTimeout(16);
  }

  return timeoutMs;
}

async function runBench() {
  const server = startProdServer();

  let browser;
  try {
    await waitForServer(BASE_URL);

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    const client = await context.newCDPSession(page);
    await applyThrottle(client);

    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const nextButton = page.getByRole("button", { name: "Next project" });
    await nextButton.waitFor({ state: "visible" });

    const initialNormalized = await getActiveNormalizedTitle(page);
    const initialSlide = byNormalized.get(initialNormalized);
    if (!initialSlide) throw new Error(`Unknown initial slide: ${initialNormalized}`);

    const firstTarget = SLIDES[(initialSlide.index + 1) % SLIDES.length];

    const firstClickStart = Date.now();
    let attempts = 0;
    let firstNavMs = 5000;

    while (Date.now() - firstClickStart < 5000) {
      await nextButton.click();
      attempts += 1;
      const active = await getActiveNormalizedTitle(page);
      if (active === firstTarget.title.replace(/\s+/g, "").toLowerCase()) {
        await waitForSlideReady(page, firstTarget.title, 3000);
        firstNavMs = Date.now() - firstClickStart;
        break;
      }
      await page.waitForTimeout(200);
    }

    const warmDurations = [];
    let current = firstTarget;
    for (let i = 0; i < 5; i++) {
      const next = SLIDES[(SLIDES.findIndex((s) => s.title === current.title) + 1) % SLIDES.length];
      await nextButton.click();
      const ms = await waitForSlideReady(page, next.title, 4000);
      warmDurations.push(ms);
      current = next;
      await page.waitForTimeout(620);
    }

    const result = {
      firstInteraction: {
        attemptsUntilSuccess: attempts,
        timeToFirstNavigationReadyMs: firstNavMs,
      },
      warmNavigation: {
        runs: warmDurations.length,
        avgMs: Number(mean(warmDurations).toFixed(1)),
        p95Ms: Number(p95(warmDurations).toFixed(1)),
        rawMs: warmDurations,
      },
    };

    console.log(JSON.stringify(result, null, 2));
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

runBench().catch((err) => {
  console.error(err);
  process.exit(1);
});
