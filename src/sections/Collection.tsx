import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { categories, company, products, type Product } from "../data";
import ProductImage from "../components/ProductImage";
import Reveal from "../components/Reveal";

export default function Collection({
  onProduct,
}: {
  onProduct: (product: Product) => void;
}) {
  const [category, setCategory] = useState("Semua");
  const reduced = useReducedMotion();
  const filtered = products.filter(
    (product) => category === "Semua" || product.category === category,
  );
  return (
    <section id="koleksi" className="collection section-space container">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="short-rule" /> THE CURATED EDIT
          </div>
          <h2>
            TEMUKAN <span className="outline-text">KARAKTERMU.</span>
          </h2>
        </div>
        <p>
          Satu koleksi, banyak cara berekspresi.
          <br />
          Pilih yang paling terasa seperti dirimu.
        </p>
      </Reveal>
      <div className="collection-toolbar">
        <div className="filters" role="group" aria-label="Filter kategori">
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "Semua" && (
                <span>{products.length.toString().padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </div>
        <span className="collection-count" role="status">
          {filtered.length.toString().padStart(2, "0")} PILIHAN /{" "}
          {company.contentStatus === "demo"
            ? "CONCEPT COLLECTION"
            : "SELECTED COLLECTION"}
        </span>
      </div>
      <div className="product-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.article
              layout={!reduced}
              key={product.id}
              className="product-card"
              style={{ "--card-accent": product.theme.accent } as CSSProperties}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <button
                className="product-card-button"
                onClick={() => onProduct(product)}
                aria-label={`Lihat detail ${product.name}`}
              >
                <div className="card-stage">
                  <div className="card-topline">
                    <span>{product.category.toUpperCase()}</span>
                    <span>{product.edition}</span>
                  </div>
                  <span className="card-orbit" aria-hidden="true" />
                  <ProductImage product={product} />
                  <span
                    className="card-color"
                    style={{ background: product.theme.accent }}
                    aria-hidden="true"
                  />
                  {product.isConcept && (
                    <span className="card-badge">CONCEPT</span>
                  )}
                </div>
                <div className="card-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.colorName}</p>
                  </div>
                  <span className="card-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <span className="card-detail-link">
                  Lihat detail <span>↗</span>
                </span>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <p className="collection-note">
        {company.contentStatus === "demo"
          ? "Koleksi konsep untuk eksplorasi gaya. Harga dan ketersediaan akan mengikuti katalog resmi toko."
          : "Hubungi toko untuk informasi harga, ukuran, dan ketersediaan terbaru."}
      </p>
    </section>
  );
}
