import Link from "next/link";
import Image from "next/image";

export function BrandMark({
  size = 56,
}: {
  size?: number;
  /** Kept for backwards compatibility — the logo already contains the wordmark */
  withWord?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center select-none"
      aria-label="Chrome Visa Solutions"
    >
      <Image
        src="/chrome-visa-logo.png"
        alt="Chrome Visa Solutions"
        width={size}
        height={size}
        priority
        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  );
}
