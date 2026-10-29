import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const company = JSON.parse(readFileSync("src/data/company.json", "utf8"));
const products = JSON.parse(readFileSync("src/data/products.json", "utf8"));
const hex = /^#[\da-f]{6}$/i;

test("dataset products have unique identifiers and usable local images", () => {
  assert.ok(products.length >= 4);
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  for (const product of products) {
    assert.ok(product.name && product.description && product.imageAlt);
    assert.ok(existsSync(`public/${product.image}`), product.image);
    assert.ok(existsSync(`public/${product.thumbnail}`), product.thumbnail);
    assert.match(product.theme.accent, hex);
    assert.match(product.theme.soft, hex);
  }
});

test("hero has at least three distinct product themes", () => {
  const featured = products.filter((product) => product.featured);
  assert.ok(featured.length >= 3 && featured.length <= 5);
  assert.equal(
    new Set(featured.map((p) => p.theme.accent)).size,
    featured.length,
  );
});

test("demo data does not claim confirmed prices, stock, sizes, or contact information", () => {
  if (company.contentStatus === "demo") {
    assert.ok(company.demoNotice);
    for (const product of products.filter((p) => p.isConcept)) {
      assert.equal(product.price, null);
      assert.deepEqual(product.sizes, []);
      assert.equal(product.stockStatus, "unconfirmed");
    }
  }
  if (company.contact.whatsapp !== null)
    assert.match(company.contact.whatsapp, /^\d{8,15}$/);
  for (const key of ["instagramUrl", "mapsUrl"]) {
    if (company.contact[key] !== null)
      assert.equal(new URL(company.contact[key]).protocol, "https:");
  }
});

test("copy follows the requested brand tone", () => {
  assert.equal(
    /welcome|selamat datang/i.test(JSON.stringify({ company, products })),
    false,
  );
});
