import Link from "next/link";
import Image from "next/image";

/**
 * The supplied chrome-visa-logo.png is a 2400x2400 square, but the actual
 * mark only occupies a 1884×736 landscape bbox in the middle (35% vertical
 * whitespace, 11% horizontal whitespace).  We crop to that bbox so the
 * displayed glyph is full-bleed and properly sized.
 *
 * Pass `height` — the width is computed from the content aspect ratio (2.56:1).
 */
const SRC = { w: 2400, h: 2400 };
const BBOX = { x: 252, y: 832, w: 1884, h: 736 };
const ASPECT = BBOX.w / BBOX.h; // ≈ 2.56

export function BrandMark({
  height = 48,
}: {
  height?: number;
  /** Kept for backwards compatibility */
  size?: number;
  withWord?: boolean;
}) {
  const width = Math.round(height * ASPECT);
  const scale = width / BBOX.w;
  const imgW = Math.round(SRC.w * scale);
  const imgH = Math.round(SRC.h * scale);
  const offsetX = Math.round(-BBOX.x * scale);
  const offsetY = Math.round(-BBOX.y * scale);

  return (
    <Link
      href="/"
      className="group inline-flex items-center select-none shrink-0"
      aria-label="Chrome Visa Solutions"
    >
      <span
        className="relative inline-block overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ width, height }}
      >
        <Image
          src="/chrome-visa-logo.png"
          alt="Chrome Visa Solutions"
          width={imgW}
          height={imgH}
          priority
          className="max-w-none"
          style={{
            position: "absolute",
            left: offsetX,
            top: offsetY,
            width: imgW,
            height: imgH,
          }}
        />
      </span>
    </Link>
  );
}
