import companyData from "./company.json";
import productData from "./products.json";

export interface Product {
  id: string;
  name: string;
  edition: string;
  category: string;
  label: string;
  colorName: string;
  description: string;
  image: string;
  thumbnail: string;
  imageAlt: string;
  detailImages?: string[];
  anatomyImage?: string;
  materialSpecs?: { part: string; material: string; note: string }[];
  colorway?: { name: string; color: string }[];
  theme: {
    accent: string;
    soft: string;
    glow: string;
    tone?: "light" | "dark";
  };
  details: string[];
  featured: boolean;
  isConcept: boolean;
  price: number | null;
  sizes: string[];
  stockStatus: string;
}

export const company = companyData as Omit<typeof companyData, "contact"> & {
  contact: {
    whatsapp: string | null;
    email: string | null;
    instagramUrl: string | null;
    mapsUrl: string | null;
    address: string | null;
    openingHours: string | null;
  };
};
export const products = productData as Product[];
// Tone describes the dominant shoe colorway, including soft pastels and dark
// combinations. Keep it in product data so new products can choose deliberately.
export const productTone = (product: Product): "light" | "dark" =>
  product.theme.tone ?? "dark";
export const featuredProducts = products.filter((product) => product.featured);
export const categories = [
  "Semua",
  ...new Set(products.map((product) => product.category)),
];
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const whatsappUrl = (message: string) =>
  company.contact.whatsapp
    ? `https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : null;
