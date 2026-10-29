import { useState, type CSSProperties } from "react";
import { useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDialog from "./components/ProductDialog";
import Hero from "./sections/Hero";
import Collection from "./sections/Collection";
import {
  Benefits,
  BrandStory,
  BrandStrip,
  LifestyleFeature,
} from "./sections/BrandSections";
import Contact from "./sections/Contact";
import ProductDetailPage from "./components/ProductDetailPage";
import { productTone, products, type Product } from "./data";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const returnScrollY = useRef(0);
  function openProduct(product: Product) {
    returnScrollY.current = window.scrollY;
    setActiveProduct(product);
    setSelectedProduct(product);
  }
  function openProductDetail(product: Product) {
    setActiveProduct(product);
    setSelectedProduct(null);
    setDetailProduct(product);
  }
  function closeProductDetail() {
    setDetailProduct(null);
    requestAnimationFrame(() =>
      window.scrollTo({ top: returnScrollY.current, behavior: "instant" }),
    );
  }
  function navigateHome(anchor = "#beranda") {
    setDetailProduct(null);
    requestAnimationFrame(() =>
      document
        .getElementById(anchor.slice(1))
        ?.scrollIntoView({ behavior: "instant" }),
    );
  }
  const lightTheme = productTone(activeProduct) === "light";
  return (
    <div
      className="site-shell"
      data-theme={activeProduct.id}
      data-tone={lightTheme ? "light" : "dark"}
      style={
        {
          "--brand-accent": activeProduct.theme.accent,
          "--brand-accent-soft": activeProduct.theme.soft,
          "--product-glow": activeProduct.theme.glow,
          "--page-bg": lightTheme ? "#f4f6f8" : "#0e0e10",
          "--surface": lightTheme ? "#e5e9ee" : "#3b3f45",
          "--text-primary": lightTheme ? "#20242a" : "#d9dde1",
          "--text-muted": lightTheme ? "#444b55" : "#999da6",
          "--pattern-mix": lightTheme ? "#ffffff" : "#0e0e10",
          "--collection-surface": lightTheme ? "#e8edf2" : "#19191b",
          "--collection-surface-raised": lightTheme ? "#f5f7f9" : "#232325",
          "--collection-border": lightTheme ? "#20242a1c" : "#ffffff0b",
          "--collection-muted": lightTheme ? "#444b55" : "#9b9ea6",
        } as CSSProperties
      }
    >
      <div className="site-backdrop" aria-hidden="true">
        {products.map((product) => (
          <div
            key={product.id}
            className={`theme-pattern ${activeProduct.id === product.id ? "is-active" : ""}`}
            style={{ "--pattern-color": product.theme.accent } as CSSProperties}
          />
        ))}
      </div>
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>
      <Navbar
        onNavigate={detailProduct ? () => setDetailProduct(null) : undefined}
      />
      <main id="main">
        {detailProduct ? (
          <ProductDetailPage
            product={detailProduct}
            onClose={closeProductDetail}
            onSelect={(product) => {
              setDetailProduct(product);
              setActiveProduct(product);
            }}
            onContact={() => navigateHome("#kontak")}
          />
        ) : (
          <>
            <Hero
              product={activeProduct}
              onThemeChange={setActiveProduct}
              onProduct={openProduct}
            />
            <BrandStrip />
            <Benefits />
            <Collection onProduct={openProduct} />
            <BrandStory />
            <LifestyleFeature />
            <Contact />
          </>
        )}
      </main>
      <Footer
        onNavigate={detailProduct ? () => setDetailProduct(null) : undefined}
      />
      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onDetails={() => openProductDetail(selectedProduct)}
        />
      )}
    </div>
  );
}
