import { company } from "../data";

export default function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#beranda"
      aria-label={`${company.name}, ke beranda`}
    >
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M4 33 16 7h20L29 23H16l-5 10Zm17-19-2 5h6l3-5Z"
          fill="currentColor"
        />
      </svg>
      <span>
        {company.shortName}
        <span className="brand-dot">®</span>
        <small>SHOES & CHARACTER</small>
      </span>
    </a>
  );
}
