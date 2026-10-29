import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openDetail(page: Page, name = "Aero Shift") {
  await page.goto("/");
  await page
    .locator(".product-grid")
    .getByRole("button", { name: `Lihat detail ${name}` })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Lihat Detail", exact: true })
    .click();
  await expect(page.locator(".product-detail-page")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
}

test("detail controls update preview, product theme, and anatomy information", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openDetail(page);
  await expect(page.locator("#detail-title")).toBeFocused();
  await expect(page.locator(".product-detail-page")).toHaveAttribute(
    "data-tone",
    "light",
  );
  await expect
    .poll(() =>
      page
        .locator(".detail-shoe-image img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("slider", { name: "Perbesar gambar sepatu" })
    .fill("120");
  await page.getByRole("slider", { name: "Sudut gambar sepatu" }).fill("15");
  await expect(page.locator('output[for="detail-zoom"]')).toHaveText("120%");
  await expect(page.locator('output[for="detail-angle"]')).toHaveText("15°");
  expect(
    await page
      .locator(".detail-shoe-view")
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe("none");
  await page.getByRole("button", { name: "Reset tampilan" }).click();
  await expect(
    page.getByRole("slider", { name: "Perbesar gambar sepatu" }),
  ).toHaveValue("100");
  await expect(
    page.getByRole("slider", { name: "Sudut gambar sepatu" }),
  ).toHaveValue("-8");
  await page.getByRole("button", { name: "Pilih model Volt Runner" }).click();
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "data-theme",
    "volt-runner",
  );
  await expect(page.locator(".product-detail-page")).toHaveAttribute(
    "data-tone",
    "dark",
  );
  await expect(page.locator(".detail-product-identity h2")).toHaveText(
    "Volt Runner",
  );
  await page.locator(".anatomy-label").filter({ hasText: "Midsole" }).click();
  await expect(page.locator(".anatomy-description")).toContainText(
    "03 / Midsole",
  );
  await expect
    .poll(() =>
      page
        .locator(".anatomy-illustration img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Kembali ke koleksi" }).click();
  await expect(page.locator(".hero")).toBeVisible();
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Volt Runner",
  );
});

test("detail adapts to phone, tablet and laptop without clipped controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openDetail(page);
  for (const width of [360, 390, 640, 768, 820, 1024, 1366, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `horizontal overflow at ${width}`,
    ).toBe(true);
    expect(
      await page
        .locator(".product-detail-page button, .product-detail-page input")
        .evaluateAll((elements) =>
          elements
            .filter((el) => {
              const rect = el.getBoundingClientRect();
              return (
                rect.width > 0 &&
                (rect.left < -1 || rect.right > innerWidth + 1)
              );
            })
            .map((el) => el.getAttribute("aria-label") || el.textContent),
        ),
      `clipped controls at ${width}`,
    ).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Pilih model Terra Form" }).click();
  await expect(page.locator(".detail-product-identity h2")).toHaveText(
    "Terra Form",
  );
  await page
    .locator(".detail-purchase-bar")
    .getByRole("button", { name: "Hubungi Toko" })
    .click();
  await expect(page.locator(".product-detail-page")).toHaveCount(0);
  await expect(page.locator("#kontak")).toBeInViewport();
});

test("light and dark detail pages pass automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openDetail(page);
  for (const name of [
    "Aero Shift",
    "Urban Stride",
    "Terra Form",
    "Volt Runner",
  ]) {
    await page.getByRole("button", { name: `Pilih model ${name}` }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      name,
    ).toEqual([]);
  }
});
