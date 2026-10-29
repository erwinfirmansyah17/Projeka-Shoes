import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
for (const name of [
  "urban-stride",
  "volt-runner",
  "terra-form",
  "aero-shift",
  "editorial",
]) {
  const source = `assets/source/${name}.png`;
  const main = await sharp(source)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 95 })
    .toFile(`public/images/${name}.webp`);
  console.log(`${name}: ${(main.size / 1024).toFixed(1)} KB`);
  if (name !== "editorial")
    await sharp(source)
      .resize({ width: 480 })
      .webp({ quality: 80, alphaQuality: 90 })
      .toFile(`public/images/${name}-480.webp`);
}
