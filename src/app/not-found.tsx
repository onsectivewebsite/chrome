import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden noise">
      <div className="pointer-events-none absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-[#67b219]/[0.16] to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute top-20 -left-40 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.18] to-transparent blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="eyebrow">
          <span className="rule-gold" /> Error 404
        </span>
        <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.018em] text-[#0d1730]">
          This page could not be found.
        </h1>
        <p className="mt-6 text-[17px] text-[#4a5462] leading-[1.7]">
          The link may be outdated or the page may have moved. Everything we
          offer is reachable from the home page.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link href="/assessment" className="btn-ghost">
            Free assessment
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
