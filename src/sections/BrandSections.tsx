import {
  ArrowUpRight,
  Compass,
  Footprints,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react";
import { asset, company } from "../data";
import Reveal from "../components/Reveal";

const icons = {
  footprints: Footprints,
  palette: Palette,
  compass: Compass,
  message: MessageCircle,
};

export function BrandStrip() {
  return (
    <div className="brand-strip" aria-label="Filosofi Projeka">
      <div className="container strip-inner">
        <span>YOUR PACE.</span>
        <Sparkles aria-hidden="true" />
        <span>YOUR PATH.</span>
        <Sparkles aria-hidden="true" />
        <span>
          YOUR <strong>{company.shortName}.</strong>
        </span>
        <Sparkles aria-hidden="true" />
        <span className="strip-extra">{company.tagline.toUpperCase()}</span>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <section
      id="keunggulan"
      className="benefits container"
      aria-label="Nilai Projeka"
    >
      {company.values.map((value, index) => {
        const Icon = icons[value.icon as keyof typeof icons];
        return (
          <Reveal className="benefit" delay={index * 0.06} key={value.title}>
            <Icon size={25} strokeWidth={1.5} />
            <h2>{value.title}</h2>
            <p>{value.description}</p>
          </Reveal>
        );
      })}
    </section>
  );
}

export function BrandStory() {
  const titleWords = company.story.title.split(" ");
  const lastWord = titleWords.pop();
  return (
    <section id="tentang" className="story section-space container">
      <Reveal className="story-photo">
        <img
          src={asset("images/editorial.webp")}
          alt="Ilustrasi gaya: sneakers hitam-oranye dikenakan saat berjalan di tangga beton"
          width="1200"
          height="800"
          loading="lazy"
        />
        <div className="photo-caption">
          <span>BUILT AROUND YOUR EVERYDAY.</span>
          <span>
            {company.shortName} /{" "}
            {company.contentStatus === "demo"
              ? "EDITORIAL CONCEPT"
              : "EDITORIAL"}
          </span>
        </div>
        <div className="photo-stamp" aria-hidden="true">
          P<span>↗</span>
        </div>
      </Reveal>
      <Reveal className="story-copy">
        <div className="eyebrow">
          <span className="short-rule" />
          {company.story.eyebrow}
        </div>
        <h2>
          {titleWords.join(" ")}{" "}
          <span className="accent-brand">{lastWord}</span>
        </h2>
        {company.story.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <div className="story-signature">{company.story.signature}</div>
        <a href="#kontak" className="text-link">
          Mari mulai percakapan <ArrowUpRight size={18} />
        </a>
      </Reveal>
    </section>
  );
}

export function LifestyleFeature() {
  return (
    <section className="container lifestyle-wrap">
      <Reveal className="lifestyle">
        <div className="lifestyle-top">
          <span className="eyebrow">NO TWO JOURNEYS ARE THE SAME.</span>
          <Compass size={30} strokeWidth={1.3} />
        </div>
        <div className="lifestyle-main">
          <h2>
            DARI RUTINITAS.
            <br />
            KE DESTINASI <span>BERIKUTNYA.</span>
          </h2>
          <div>
            <p>
              Ke mana pun harimu membawa,
              <br />
              bawa karaktermu bersama.
            </p>
            <a className="button button-dark" href="#koleksi">
              Temukan Pilihanmu <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
        <span className="lifestyle-lines" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
