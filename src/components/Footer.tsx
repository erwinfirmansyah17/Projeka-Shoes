import { ArrowUpRight } from "lucide-react";
import { company } from "../data";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand footer />
            <p>Sepatu pilihan. Karakter tanpa batas.</p>
          </div>
          <nav aria-label="Navigasi footer">
            {company.navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#beranda" className="back-top">
            Kembali ke atas{" "}
            <span>
              <ArrowUpRight size={21} />
            </span>
          </a>
        </div>
        <div className="footer-word" aria-hidden="true">
          {company.shortName}
          <span>®</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}
          </span>
          <span>{company.tagline.toUpperCase()}</span>
          <span>DESIGNED TO KEEP YOU MOVING ↗</span>
        </div>
        {company.contentStatus === "demo" && (
          <p className="demo-notice">{company.demoNotice}</p>
        )}
      </div>
    </footer>
  );
}
