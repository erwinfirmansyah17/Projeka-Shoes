import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
console.log(
  await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    body: document.body.getBoundingClientRect().height,
    last: [...document.querySelectorAll("body *")]
      .map((e) => ({
        tag: e.tagName,
        cls: typeof e.className === "string" ? e.className : "svg",
        bottom: e.getBoundingClientRect().bottom,
      }))
      .sort((a, b) => b.bottom - a.bottom)
      .slice(0, 12),
  })),
);
await page.screenshot({ path: ".local/screenshots/mobile-hero.png" });
await page.screenshot({
  path: ".local/screenshots/mobile-full.png",
  fullPage: true,
});
await browser.close();
