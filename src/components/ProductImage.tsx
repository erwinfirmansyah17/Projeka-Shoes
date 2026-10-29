import { useState } from "react";
import { ImageOff } from "lucide-react";
import { asset, type Product } from "../data";

export default function ProductImage({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="image-fallback" role="img" aria-label={product.imageAlt}>
        <ImageOff />
        <span>Visual belum tersedia</span>
      </div>
    );
  return (
    <img
      src={asset(eager ? product.image : product.thumbnail)}
      alt={product.imageAlt}
      width="1200"
      height="800"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
      draggable="false"
    />
  );
}
