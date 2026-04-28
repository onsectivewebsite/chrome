import Link from "next/link";

export function BrandMark({
  size = 36,
  withWord = true,
}: {
  size?: number;
  withWord?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 select-none"
      aria-label="Chrome Visa Solution"
    >
      <span
        className="relative grid place-items-center rounded-[12px]"
        style={{ width: size, height: size }}
      >
        {/* Outer wine bezel */}
        <span className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-[#c41a32] via-[#7a0d1c] to-[#3a0610] shadow-[0_8px_28px_-10px_rgba(179,18,42,0.65)]" />
        {/* Gold hairline */}
        <span className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-[#ead7af]/35 to-transparent" />
        {/* Ink core */}
        <span className="absolute inset-[2px] rounded-[10px] bg-[#0a0a10]" />
        {/* Monogram */}
        <svg
          viewBox="0 0 32 32"
          width={size * 0.6}
          height={size * 0.6}
          className="relative z-10"
          aria-hidden
        >
          <defs>
            <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ead7af" />
              <stop offset="0.55" stopColor="#d4b078" />
              <stop offset="1" stopColor="#b08144" />
            </linearGradient>
          </defs>
          <path
            fill="url(#leaf)"
            d="M16 3l1.6 4.6L22 5.2l-1.5 4.5 4.7.2-3.4 3.3 4 2.8-4.5 1.2 2.2 4.2-4.7-.8.4 4.8L16 22.1l-3.2 3.3.4-4.8-4.7.8 2.2-4.2L6.2 16l4-2.8-3.4-3.3 4.7-.2L10 5.2l4.4 2.4L16 3z"
          />
        </svg>
      </span>
      {withWord && (
        <span className="leading-tight">
          <span className="block font-display text-[18px] font-medium tracking-tight text-[#f6f0e1]">
            Chrome <span className="italic text-[#ead7af]">Visa</span>
          </span>
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.32em] text-[#8a8395]">
            Solution · Est. 2013
          </span>
        </span>
      )}
    </Link>
  );
}
