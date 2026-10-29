import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { company, type Product, whatsappUrl } from "../data";
import ProductImage from "./ProductImage";

export default function ProductDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const link = whatsappUrl(
    `Halo ${company.name}, saya tertarik dengan ${product.name} (${product.colorName}). Boleh informasi harga dan ukuran yang tersedia?`,
  );
  useEffect(() => {
    const element = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="product-dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = ref.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClose={() => {
        if (!ref.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          className="icon-button dialog-close"
          aria-label="Tutup detail produk"
          onClick={onClose}
          autoFocus
        >
          <X />
        </button>
        <div
          className="dialog-stage"
          style={{
            background: `radial-gradient(ellipse, ${product.theme.glow}, transparent 75%)`,
          }}
        >
          <span className="eyebrow">
            {company.shortName} / {product.edition}
          </span>
          <ProductImage product={product} eager />
          {product.isConcept && (
            <span className="concept-pill">VISUAL KONSEP</span>
          )}
        </div>
        <div className="dialog-info">
          <span className="eyebrow" style={{ color: product.theme.accent }}>
            {product.category} COLLECTION
          </span>
          <h2 id="dialog-title">{product.name}</h2>
          <p className="dialog-color">
            <span style={{ background: product.theme.accent }} />
            {product.colorName}
          </p>
          <p id="dialog-description">{product.description}</p>
          <ul>
            {product.details.map((detail) => (
              <li key={detail}>
                <Check size={15} />
                {detail}
              </li>
            ))}
          </ul>
          <div className="product-availability">
            <span>Harga</span>
            <strong>
              {product.price === null
                ? "Tanyakan harga"
                : new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
            </strong>
            <span>Ukuran</span>
            <strong>
              {product.sizes.length
                ? product.sizes.join(" · ")
                : "Konfirmasi dengan toko"}
            </strong>
          </div>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Tanyakan Produk Ini <ArrowUpRight size={18} />
            </a>
          ) : (
            <a
              href="#kontak"
              onClick={onClose}
              className="button button-primary"
            >
              Lihat Informasi Kontak <ArrowUpRight size={18} />
            </a>
          )}
          {product.isConcept && (
            <p className="dialog-note">
              Produk ilustratif. Spesifikasi, harga, dan ketersediaan belum
              dikonfirmasi.
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
