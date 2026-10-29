import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("loads local images without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "LANGKAH",
  );
  await expect(page.locator(".hero-shoe img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".hero-shoe img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.locator("#tentang").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".story-photo img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test("hero synchronizes color, text, and image including rapid choices", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Tampilkan Volt Runner" }).click();
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Volt Runner",
  );
  await expect(page.locator(".hero")).toHaveCSS("--product-accent", "#bddb26");
  await expect(page.locator(".hero-shoe img").last()).toHaveAttribute(
    "src",
    /volt-runner.webp/,
  );
  await page
    .getByRole("button", { name: "Produk berikutnya" })
    .click({ clickCount: 3, delay: 40 });
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Urban Stride",
  );
  await expect(
    page.getByRole("button", { name: "Tampilkan Urban Stride" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".hero")).toHaveCSS("--product-accent", "#ff6f00");
});

test("product choices theme the whole website and its background motif", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Tampilkan Volt Runner" }).click();
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "data-theme",
    "volt-runner",
  );
  await expect(page.locator(".hero-actions .button-primary")).toHaveCSS(
    "background-color",
    "rgb(189, 219, 38)",
  );
  await expect(page.locator(".brand").first()).toBeVisible();
  await expect(page.locator(".brand svg").first()).toHaveCSS(
    "color",
    "rgb(189, 219, 38)",
  );
  await expect(page.locator(".lifestyle")).toHaveCSS(
    "background-color",
    "rgb(189, 219, 38)",
  );
  await expect(page.locator(".theme-pattern.is-active")).toHaveCount(1);
  expect(
    await page
      .locator(".theme-pattern.is-active")
      .evaluate((el) => getComputedStyle(el, "::before").backgroundImage),
  ).toContain("linear-gradient");
  await page
    .locator(".product-grid")
    .getByRole("button", { name: "Lihat detail Aero Shift" })
    .click();
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "data-theme",
    "aero-shift",
  );
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Aero Shift",
  );
  await expect(page.locator(".product-dialog .button-primary")).toHaveCSS(
    "background-color",
    "rgb(108, 169, 255)",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "data-theme",
    "aero-shift",
  );
  await page.getByRole("button", { name: "Produk berikutnya" }).click();
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "data-theme",
    "urban-stride",
  );
});

test("failed next image preserves current product and supports retry", async ({
  page,
}) => {
  await page.route("**/images/volt-runner.webp", (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Tampilkan Volt Runner" }).click();
  await expect(page.getByRole("button", { name: "Coba lagi" })).toBeVisible();
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Urban Stride",
  );
  await page.unroute("**/images/volt-runner.webp");
  await page.getByRole("button", { name: "Coba lagi" }).click();
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Volt Runner",
  );
});

test("filters catalogue, opens details and restores keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sport", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  const card = page
    .locator(".product-grid")
    .getByRole("button", { name: "Lihat detail Volt Runner" });
  await card.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Volt Runner", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Tutup detail produk" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "Lihat Informasi Kontak" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Tutup detail produk" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
  await page.getByRole("button", { name: /^Semua/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(4);
});

test("all internal links target existing sections; unknown contact stays honest", async ({
  page,
}) => {
  await page.goto("/");
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter((href) => !document.getElementById(href.slice(1))),
    );
  expect(missing).toEqual([]);
  await expect(
    page.locator('a[href*="wa.me"],a[href*="maps.google"]'),
  ).toHaveCount(0);
  await expect(page.locator(".demo-notice")).toContainText("ilustrasi");
});

test("mobile menu, swipe, and responsive widths work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Buka menu" }).click();
  await page
    .getByRole("navigation", { name: "Navigasi utama" })
    .getByRole("link", { name: "Koleksi", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "Buka menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page).toHaveURL(/#koleksi$/);
  await page.locator(".hero-visual").dispatchEvent("touchstart", {
    touches: [{ identifier: 1, clientX: 300, clientY: 200 }],
  });
  await page.locator(".hero-visual").dispatchEvent("touchend", {
    changedTouches: [{ identifier: 1, clientX: 100, clientY: 210 }],
  });
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Volt Runner",
  );
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
  }
});

test("reduced motion disables decorative tilt and keeps controls usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.locator(".hero-visual").hover({ position: { x: 200, y: 100 } });
  await expect(page.locator(".shoe-tilt")).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Tampilkan Terra Form" }).click();
  await expect(page.locator(".hero-product-info h2")).toContainText(
    "Terra Form",
  );
});

test("baseline accessibility and product dialog pass automated checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".footer")).toBeVisible();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page
    .locator(".product-grid")
    .getByRole("button", { name: "Lihat detail Urban Stride" })
    .click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialog.violations).toEqual([]);
});
