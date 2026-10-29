import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { asset, company, products, type Product } from "../data";
import ProductImage from "../components/ProductImage";

const showcaseProducts = [...products].sort(
  (a, b) => Number(b.featured) - Number(a.featured),
);

export default function Hero({
  onProduct,
  product,
  onThemeChange,
}: {
  onProduct: (product: Product) => void;
  product: Product;
  onThemeChange: (product: Product) => void;
}) {
  const active = showcaseProducts.findIndex((item) => item.id === product.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const target = useRef(active);
  const committedProduct = useRef(product.id);
  const request = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(x, { stiffness: 90, damping: 20 });
  const rotateX = useSpring(y, { stiffness: 90, damping: 20 });
  useLayoutEffect(() => {
    if (committedProduct.current === product.id) return;
    committedProduct.current = product.id;
    target.current = active;
    request.current++;
    setLoading(false);
    setError(false);
  }, [active, product.id]);

  useEffect(() => {
    const timer = window.setTimeout(
      () =>
        showcaseProducts.slice(1).forEach((item) => {
          const image = new Image();
          image.src = asset(item.image);
        }),
      1000,
    );
    return () => {
      clearTimeout(timer);
      request.current++;
    };
  }, []);

  async function select(index: number) {
    const next = (index + showcaseProducts.length) % showcaseProducts.length;
    target.current = next;
    const token = ++request.current;
    setError(false);
    setLoading(true);
    const image = new Image();
    image.src = asset(showcaseProducts[next].image);
    try {
      await image.decode();
      if (token === request.current) {
        committedProduct.current = showcaseProducts[next].id;
        onThemeChange(showcaseProducts[next]);
        setLoading(false);
      }
    } catch {
      if (token === request.current) {
        setError(true);
        setLoading(false);
      }
    }
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - box.left) / box.width - 0.5) * 7);
    y.set(-((event.clientY - box.top) / box.height - 0.5) * 7);
  }

  return (
    <section
      id="beranda"
      className="hero"
      style={
        {
          "--product-accent": product.theme.accent,
          "--product-glow": product.theme.glow,
        } as CSSProperties
      }
      aria-label="Koleksi unggulan"
    >
      <div className="container hero-main">
        <div className="hero-copy">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="live-dot" /> {company.tagline.toUpperCase()}
          </motion.div>
          <h1>
            {company.headline.map((line, index) => (
              <span className="headline-mask" key={line}>
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={index === 1 ? "accent-text" : ""}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-description"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {company.description}
          </motion.p>
          <div className="hero-actions">
            <a href="#koleksi" className="button button-primary">
              Jelajahi Koleksi <ArrowUpRight size={19} />
            </a>
            <a href="#tentang" className="text-link">
              Kenali Projeka <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="short-rule" /> FOR YOUR EVERYDAY, AND BEYOND.
          </div>
        </div>

        <div
          className="hero-visual"
          onPointerMove={move}
          onPointerLeave={() => {
            x.set(0);
            y.set(0);
          }}
          onTouchStart={(event) => {
            touchStart.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
              void select(target.current + (dx < 0 ? 1 : -1));
            touchStart.current = null;
          }}
        >
          <div className="stage-caption">
            <span>{company.shortName} SELECTED</span>
            <span>
              VOL. 01 /{" "}
              {company.contentStatus === "demo"
                ? "CONCEPT SERIES"
                : "SELECTED SERIES"}
            </span>
          </div>
          <AnimatePresence initial={false}>
            <motion.div
              aria-hidden="true"
              key={product.id + "-halo"}
              className="product-halo"
              style={{
                background: `radial-gradient(ellipse, ${product.theme.glow} 0%, transparent 68%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.65 }}
            />
          </AnimatePresence>
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <span className="stage-word" aria-hidden="true">
            {product.name.split(" ")[0].toUpperCase()}.
          </span>
          <span className="stage-cross cross-one" aria-hidden="true">
            +
          </span>
          <span className="stage-cross cross-two" aria-hidden="true">
            +
          </span>
          <div className="shoe-shadow" aria-hidden="true" />
          <motion.div
            className="shoe-tilt"
            style={reduced ? {} : { rotateX, rotateY }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={product.id}
                className="hero-shoe"
                initial={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: 65, y: -15, rotate: -7, scale: 0.92 }
                }
                animate={{ opacity: 1, x: 0, y: 0, rotate: -12, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: -60, y: 15, rotate: -17, scale: 0.95 }
                }
                transition={{
                  duration: reduced ? 0.1 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductImage key={product.id} product={product} eager />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="product-callout">
            <span className="callout-line" />
            <span>
              DETAILS MAKE
              <br />
              THE DIFFERENCE.
            </span>
          </div>
          <button
            className="product-explore icon-button"
            aria-label={`Lihat detail ${product.name}`}
            onClick={() => onProduct(product)}
          >
            <Plus />
          </button>
          <div className="hero-product-info">
            <div aria-live="polite" aria-atomic="true">
              <span className="eyebrow tiny">{product.label}</span>
              <h2>
                {product.name}
                <span>®</span>
              </h2>
              <p>{product.colorName}</p>
            </div>
            <span className="edition-number" aria-hidden="true">
              /{product.edition}
            </span>
          </div>
        </div>
      </div>

      <div className="container hero-bottom">
        <a href="#koleksi" className="scroll-cue">
          <span>
            <ArrowDown size={15} />
          </span>
          SCROLL TO EXPLORE
        </a>
        <div className="slide-controls" aria-label="Pilih produk unggulan">
          <div className="slide-dots">
            {showcaseProducts.map((item, index) => (
              <button
                key={item.id}
                aria-label={`Tampilkan ${item.name}`}
                aria-pressed={active === index}
                className={active === index ? "active" : ""}
                style={{ "--dot-color": item.theme.accent } as CSSProperties}
                onClick={() => void select(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="slide-count">
            0{active + 1}
            <span> / 0{showcaseProducts.length}</span>
          </span>
          <button
            className="icon-button"
            aria-label="Produk sebelumnya"
            onClick={() => void select(target.current - 1)}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="Produk berikutnya"
            onClick={() => void select(target.current + 1)}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <div className="hero-status container" role="status">
        {loading ? (
          "Menyiapkan koleksi…"
        ) : error ? (
          <span>
            Visual gagal dimuat.{" "}
            <button onClick={() => void select(target.current)}>
              Coba lagi
            </button>
          </span>
        ) : null}
      </div>
    </section>
  );
}
