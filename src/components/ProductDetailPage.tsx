import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers3,
  RotateCcw,
  ZoomIn,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  asset,
  company,
  products,
  productTone,
  type Product,
  whatsappUrl,
} from "../data";
import ProductImage from "./ProductImage";

export default function ProductDetailPage({
  product,
  onClose,
  onSelect,
  onContact,
}: {
  product: Product;
  onClose: () => void;
  onSelect: (product: Product) => void;
  onContact: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [zoom, setZoom] = useState(100);
  const [angle, setAngle] = useState(-8);
  const [selectedPart, setSelectedPart] = useState(0);
  const [anatomyFailed, setAnatomyFailed] = useState(false);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    titleRef.current?.focus({ preventScroll: true });
  }, []);
  useLayoutEffect(() => {
    setZoom(100);
    setAngle(-8);
    setSelectedPart(0);
    setAnatomyFailed(false);
  }, [product.id]);
  const materialSpecs = product.materialSpecs ?? [];
  const activePart = materialSpecs[selectedPart];
  const link = whatsappUrl(
    `Halo ${company.name}, saya tertarik dengan ${product.name} (${product.colorName}). Boleh informasi harga dan ukuran yang tersedia?`,
  );
  const price =
    product.price === null
      ? "Tanyakan harga"
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(product.price);
  const crops = [
    {
      title: "TEKSTUR UPPER",
      label: "01 / MATERIAL",
      index: 0,
      className: "crop-upper",
    },
    {
      title: "DETAIL TALI",
      label: "02 / FINISHING",
      index: 1,
      className: "crop-laces",
    },
    {
      title: "PROFIL SOL",
      label: "03 / STRUCTURE",
      index: 2,
      className: "crop-sole",
    },
  ];

  return (
    <div
      id="detail-produk"
      className="product-detail-page"
      data-tone={productTone(product)}
      style={
        {
          "--detail-accent": product.theme.accent,
          "--detail-glow": product.theme.glow,
        } as CSSProperties
      }
    >
      <div className="detail-container">
        <div className="detail-topbar">
          <button className="detail-back" onClick={onClose}>
            <ArrowLeft size={16} /> Kembali ke koleksi
          </button>
          <nav aria-label="Bagian detail produk">
            <a href="#detail-design">Desain</a>
            <a href="#detail-anatomi">Anatomi</a>
            <a href="#detail-material">Material</a>
          </nav>
          <span className="detail-edition">
            {company.shortName} / STUDI {product.edition}
          </span>
        </div>
        <section
          id="detail-design"
          className="detail-hero"
          aria-labelledby="detail-title"
        >
          <div className="detail-hero-copy">
            <span className="detail-kicker">YOUR STYLE. YOUR SIGNATURE.</span>
            <h1 id="detail-title" ref={titleRef} tabIndex={-1}>
              DESIGN
              <br />
              YOUR
              <br />
              <span>LEGACY.</span>
              <span className="sr-only"> — {product.name}</span>
            </h1>
            <p className="detail-intro">
              Karakter dimulai dari detail.
              <br />
              Temukan sudut pandangmu.
            </p>
            <div className="detail-product-identity" aria-live="polite">
              <span>
                {product.category.toUpperCase()} / COLLECTION {product.edition}
              </span>
              <h2>{product.name}</h2>
              <p>{price}</p>
            </div>
          </div>
          <div className="detail-product-stage">
            <div className="detail-hero-visual">
              <span className="detail-orbit" aria-hidden="true" />
              <span className="detail-ground-shadow" aria-hidden="true" />
              <motion.div
                className="detail-shoe-view"
                animate={{ rotate: angle, scale: zoom / 100 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
              >
                <motion.div
                  key={product.id}
                  className="detail-shoe-image"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductImage key={product.id} product={product} eager />
                </motion.div>
              </motion.div>
              <span className="detail-visual-caption">{product.colorName}</span>
            </div>
            <div className="detail-view-controls">
              <a href="#detail-anatomi">
                <Layers3 size={16} /> Lihat anatomi
              </a>
              <button
                onClick={() => {
                  setZoom(100);
                  setAngle(-8);
                }}
              >
                <RotateCcw size={15} /> Reset tampilan
              </button>
            </div>
          </div>
          <aside
            className="detail-spec-panel"
            aria-label="Pengaturan tampilan sepatu"
          >
            <details className="detail-material-control" open>
              <summary>
                MATERIAL <ChevronDown size={15} />
              </summary>
              <div className="detail-material-preview">
                <span>{materialSpecs[0]?.material ?? "Detail material"}</span>
                <i aria-hidden="true" />
              </div>
              <p>
                {product.isConcept
                  ? "Rancangan material konsep"
                  : "Material koleksi"}
              </p>
            </details>
            <fieldset className="detail-model-picker">
              <legend>PILIH MODEL</legend>
              <div className="detail-model-options">
                {products.map((item) => (
                  <button
                    key={item.id}
                    className={item.id === product.id ? "is-selected" : ""}
                    aria-label={`Pilih model ${item.name}`}
                    aria-pressed={item.id === product.id}
                    title={item.name}
                    onClick={() => onSelect(item)}
                    style={
                      { "--swatch-color": item.theme.accent } as CSSProperties
                    }
                  >
                    <span>{item.id === product.id && <Check size={16} />}</span>
                  </button>
                ))}
              </div>
              <p>{product.name}</p>
            </fieldset>
            <div className="detail-colorway">
              <span>COLORWAY</span>
              <div>
                {(product.colorway ?? []).map((swatch) => (
                  <span
                    key={swatch.name}
                    title={swatch.name}
                    aria-label={swatch.name}
                    role="img"
                    style={{ background: swatch.color }}
                  />
                ))}
              </div>
              <p>{product.colorName}</p>
            </div>
            <div className="detail-range-control">
              <label htmlFor="detail-zoom">
                PERBESAR <output htmlFor="detail-zoom">{zoom}%</output>
              </label>
              <input
                id="detail-zoom"
                type="range"
                min="80"
                max="120"
                step="5"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Perbesar gambar sepatu"
              />
            </div>
            <div className="detail-range-control">
              <label htmlFor="detail-angle">
                SUDUT GAMBAR <output htmlFor="detail-angle">{angle}°</output>
              </label>
              <input
                id="detail-angle"
                type="range"
                min="-20"
                max="20"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                aria-label="Sudut gambar sepatu"
              />
            </div>
            <span className="detail-live">
              <span /> PREVIEW LANGSUNG
            </span>
          </aside>
        </section>
        <div className="detail-storyline">
          <p>{product.description}</p>
          <a href="#detail-anatomi" aria-label="Jelajahi anatomi sepatu">
            <ArrowDown size={21} />
          </a>
        </div>
        <section
          id="detail-anatomi"
          className="detail-anatomy"
          aria-labelledby="anatomy-title"
        >
          <div className="detail-section-title">
            <div>
              <span>01 / BEHIND THE DESIGN</span>
              <h2 id="anatomy-title">
                SETIAP LAPISAN.
                <br />
                SATU KARAKTER.
              </h2>
            </div>
            <p>
              Kenali elemen yang membentuk
              <br />
              siluet {product.name}.
            </p>
          </div>
          <div className="anatomy-layout">
            <div className="anatomy-illustration">
              {product.anatomyImage && !anatomyFailed ? (
                <img
                  key={product.id}
                  src={asset(product.anatomyImage)}
                  alt={`Ilustrasi konsep lapisan upper, midsole, dan outsole ${product.name} yang dipisahkan`}
                  width="1024"
                  height="1024"
                  loading="lazy"
                  onError={() => setAnatomyFailed(true)}
                />
              ) : (
                <ProductImage key={product.id} product={product} />
              )}
            </div>
            <div
              className="anatomy-labels"
              role="group"
              aria-label="Pilih bagian sepatu"
            >
              {materialSpecs.map((spec, index) => (
                <button
                  className={`anatomy-label label-${index} ${selectedPart === index ? "is-active" : ""}`}
                  key={spec.part}
                  onClick={() => setSelectedPart(index)}
                  aria-pressed={selectedPart === index}
                >
                  <span className="anatomy-number">0{index + 1}</span>
                  <span>
                    <strong>{spec.part}</strong>
                    <small>{spec.material}</small>
                  </span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          {activePart && (
            <div className="anatomy-description" role="status">
              <span>
                0{selectedPart + 1} / {activePart.part}
              </span>
              <p>{activePart.note}</p>
              <span className="anatomy-caption">
                {product.isConcept
                  ? "ILUSTRASI LAPISAN KONSEP"
                  : "DETAIL KONSTRUKSI"}
              </span>
            </div>
          )}
        </section>
        <section className="detail-crafted" aria-labelledby="crafted-title">
          <div className="detail-section-title">
            <div>
              <span>02 / A CLOSER LOOK</span>
              <h2 id="crafted-title">DETAIL YANG BERBICARA.</h2>
            </div>
            <ZoomIn size={23} strokeWidth={1.4} />
          </div>
          <div className="detail-gallery">
            {crops.map((crop, index) => (
              <article className="detail-gallery-card" key={crop.title}>
                <div
                  className={`detail-gallery-image ${crop.className} ${product.detailImages?.[index] ? "has-detail-image" : ""}`}
                >
                  <img
                    src={asset(product.detailImages?.[index] ?? product.image)}
                    alt={`${crop.title.toLowerCase()} ${product.name}`}
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                  <span>{crop.label}</span>
                </div>
                <div className="detail-gallery-copy">
                  <h3>{crop.title}</h3>
                  <p>
                    {materialSpecs[crop.index]?.note ??
                      product.details[index] ??
                      product.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="detail-material"
          className="detail-specifications"
          aria-labelledby="specifications-title"
        >
          <div className="detail-spec-heading">
            <h2 id="specifications-title">
              MATERIAL
              <br />& KARAKTER.
            </h2>
            <p>
              {product.isConcept
                ? "Studi material konsep"
                : "Informasi material"}
            </p>
          </div>
          <dl>
            {materialSpecs.map((spec) => (
              <div className="material-spec-item" key={spec.part}>
                <dt>{spec.part}</dt>
                <dd>{spec.material}</dd>
              </div>
            ))}
            <div className="material-spec-item">
              <dt>Ukuran</dt>
              <dd>
                {product.sizes.length
                  ? product.sizes.join(" · ")
                  : "Konfirmasi ke toko"}
              </dd>
            </div>
          </dl>
        </section>
        <div className="detail-purchase-bar">
          <div>
            <span>YOUR NEXT EVERYDAY PAIR</span>
            <strong>
              {company.shortName} / {product.name}
            </strong>
          </div>
          <div className="detail-purchase-action">
            <span>{price}</span>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="detail-buy-button"
              >
                Tanyakan Produk <ArrowUpRight size={17} />
              </a>
            ) : (
              <button onClick={onContact} className="detail-buy-button">
                Hubungi Toko <ArrowUpRight size={17} />
              </button>
            )}
          </div>
        </div>
        {product.isConcept && (
          <p className="detail-disclaimer">
            Visual dan material merupakan rancangan konsep. Harga, spesifikasi,
            dan ketersediaan perlu dikonfirmasi dengan toko.
          </p>
        )}
      </div>
    </div>
  );
}
