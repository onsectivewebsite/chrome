import Link from "next/link";
import Image from "next/image";

export function BrandMark({
  size = 40,
  withWord = true,
}: {
  size?: number;
  withWord?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 select-none"
      aria-label="Chrome Visa Solutions"
    >
      <Image
        src="/chrome-visa-logo.png"
        alt="Chrome Visa Solutions"
        width={size}
        height={size}
        priority
        className="object-contain"
      />
      {withWord && (
        <span className="leading-tight">
          <span className="block font-display text-[17px] font-semibold tracking-tight text-[#0d1730]">
            Chrome <span className="text-[#3e94c7]">Visa</span>
          </span>
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.32em] text-[#67b219] font-semibold">
            Solutions
          </span>
        </span>
      )}
    </Link>
  );
}
