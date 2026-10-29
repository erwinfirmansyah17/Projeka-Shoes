import {
  ArrowUpRight,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { company, whatsappUrl } from "../data";
import Reveal from "../components/Reveal";

export default function Contact() {
  const { contact } = company;
  const whatsapp = whatsappUrl(
    "Halo Projeka Shoes, saya ingin bertanya tentang koleksi sepatu.",
  );
  return (
    <section id="kontak" className="contact section-space container">
      <Reveal className="contact-intro">
        <div className="eyebrow">
          <span className="short-rule" /> LET’S TALK SHOES
        </div>
        <h2>
          LANGKAH BERIKUTNYA?
          <br />
          <span className="outline-text">NGOBROL DULU.</span>
        </h2>
        <p>
          Punya pertanyaan tentang koleksi atau ingin menemukan pilihan yang
          pas? Mulai percakapan dengan Projeka.
        </p>
        {whatsapp ? (
          <a
            className="button button-primary"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> Chat via WhatsApp{" "}
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <div className="contact-pending">
            <span className="live-dot" />
            <span>Kontak toko akan segera tersedia.</span>
          </div>
        )}
      </Reveal>
      <Reveal className="contact-details">
        <div className="contact-row">
          <MapPin size={21} />
          <div>
            <h3>Temui Projeka</h3>
            <p>{contact.address || "Lokasi toko akan diumumkan di sini."}</p>
            {contact.mapsUrl && (
              <a
                className="text-link"
                href={contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Petunjuk Arah <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="contact-row">
          <Clock3 size={21} />
          <div>
            <h3>Waktu berkunjung</h3>
            <p>{contact.openingHours || "Jam operasional belum tersedia."}</p>
          </div>
        </div>
        <div className="contact-row">
          <Instagram size={21} />
          <div>
            <h3>Ikuti langkah kami</h3>
            {contact.instagramUrl ? (
              <a
                className="text-link"
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram Projeka <ArrowUpRight size={16} />
              </a>
            ) : (
              <p>Kanal resmi akan diperbarui di sini.</p>
            )}
          </div>
        </div>
        {contact.email && (
          <div className="contact-row">
            <Mail size={21} />
            <div>
              <h3>Tulis untuk kami</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
