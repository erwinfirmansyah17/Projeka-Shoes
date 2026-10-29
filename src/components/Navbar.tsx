import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { company } from "../data";
import Brand from "./Brand";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav
          id="main-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navigasi utama"
        >
          {company.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#kontak"
            onClick={() => setOpen(false)}
          >
            Hubungi Toko <ArrowUpRight size={16} />
          </a>
        </nav>
        <a href="#kontak" className="button button-outline nav-contact">
          Hubungi Toko <ArrowUpRight size={16} />
        </a>
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
