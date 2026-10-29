import { asset, company } from "../data";
import { useId } from "react";

export default function Brand({
  footer = false,
  onNavigate,
}: {
  footer?: boolean;
  onNavigate?: () => void;
}) {
  const tintId = `brand-tint-${useId().replace(/:/g, "")}`;
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#beranda"
      aria-label={`${company.name}, ke beranda`}
      onClick={onNavigate}
    >
      <svg
        className="brand-logo"
        viewBox="0 0 1254 1254"
        aria-hidden="true"
        width="44"
        height="44"
      >
        <defs>
          <filter id={tintId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer result="shading">
              <feFuncR type="linear" slope="1.8" intercept="0.12" />
              <feFuncG type="linear" slope="1.8" intercept="0.12" />
              <feFuncB type="linear" slope="1.8" intercept="0.12" />
            </feComponentTransfer>
            <feFlood floodColor="var(--brand-accent)" />
            <feBlend in2="shading" mode="multiply" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
        <image
          href={asset("images/brand-logo.png")}
          width="1254"
          height="1254"
          filter={`url(#${tintId})`}
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
