"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative pt-48 pb-32">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="eyebrow">
          <span className="rule-gold" /> Something went wrong
        </span>
        <h1 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
          We couldn&apos;t load this page.
        </h1>
        <p className="mt-6 text-[17px] text-[#4a5462] leading-[1.7]">
          Please try again. If the problem continues, reach us at{" "}
          <a href="mailto:info@chromevisa.ca" className="text-[#2a6e95] underline underline-offset-4">
            info@chromevisa.ca
          </a>{" "}
          or{" "}
          <a href="tel:+16475374581" className="text-[#2a6e95] underline underline-offset-4">
            +1 (647) 537‑4581
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => unstable_retry()} className="btn-primary">
            <RotateCw className="h-4 w-4" />
            Try again
          </button>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
