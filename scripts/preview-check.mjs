import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir(".local/screenshots", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: ".local/screenshots/desktop-hero.png" });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
await page.screenshot({
  path: ".local/screenshots/desktop-full.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({
  path: ".local/screenshots/mobile-full.png",
  fullPage: true,
});
console.log(
  JSON.stringify({
    errors,
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  }),
);
await browser.close();
