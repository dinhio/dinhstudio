import { expect, test } from "@playwright/test";

async function currentTitle(page: import("@playwright/test").Page) {
  const text = await page.locator("h2.mb-5").innerText();
  return text.replace(/\s+/g, " ").trim();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Next project" }).waitFor({ state: "visible" });
});

test("keyboard navigation works in both directions", async ({ page }) => {
  const initial = await currentTitle(page);

  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => currentTitle(page))
    .not.toBe(initial);

  await page.waitForTimeout(650);
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() => currentTitle(page))
    .toBe(initial);
});

test("swipe parity matches arrow button behavior", async ({ page }) => {
  const track = page.getByTestId("carousel-track");
  const next = page.getByRole("button", { name: "Next project" });
  const initial = await currentTitle(page);

  await next.click();
  await expect
    .poll(() => currentTitle(page))
    .not.toBe(initial);
  const afterButtonTitle = await currentTitle(page);

  await page.reload();
  await track.waitFor({ state: "visible" });

  await track.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "mouse", clientX: 700, clientY: 240 });
  await track.dispatchEvent("pointermove", { pointerId: 1, pointerType: "mouse", clientX: 520, clientY: 240 });
  await track.dispatchEvent("pointerup", { pointerId: 1, pointerType: "mouse", clientX: 520, clientY: 240 });

  await expect
    .poll(() => currentTitle(page))
    .toBe(afterButtonTitle);

  await page.waitForTimeout(650);
  await track.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "mouse", clientX: 520, clientY: 240 });
  await track.dispatchEvent("pointermove", { pointerId: 1, pointerType: "mouse", clientX: 730, clientY: 240 });
  await track.dispatchEvent("pointerup", { pointerId: 1, pointerType: "mouse", clientX: 730, clientY: 240 });

  await expect
    .poll(() => currentTitle(page))
    .toBe(initial);
});

test("previous navigation keeps right-side card on the right edge", async ({ page }) => {
  const prev = page.getByRole("button", { name: "Previous project" });
  await prev.click();

  const minX = await page.evaluate(async () => {
    const target = document.querySelector('[data-carousel-title="Lumina Studio"]');
    if (!target) throw new Error("Missing Lumina Studio carousel element");

    let minimum = Number.POSITIVE_INFINITY;
    let elapsed = 0;

    while (elapsed <= 700) {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(target).transform);
      minimum = Math.min(minimum, matrix.m41);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      elapsed += 16;
    }

    return minimum;
  });

  expect(minX).toBeGreaterThan(100);
});
