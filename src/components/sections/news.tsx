import Link from "next/link";
import { ArrowUpRight, ArrowRight, Newspaper } from "lucide-react";
import { NEWS } from "@/data/news";

const CATEGORY_TINT: Record<string, string> = {
  "Express Entry": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  "Provincial Nominee": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  "Study Permit": "bg-[#84c739]/[0.10] text-[#4f8a13] border-[#84c739]/30",
  "Work Permit": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  "Family Sponsorship": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  "Citizenship": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  "LMIA": "bg-[#84c739]/[0.10] text-[#4f8a13] border-[#84c739]/30",
  "Start-up Visa": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  "Refugee & Asylum": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  "Processing Times": "bg-[#84c739]/[0.10] text-[#4f8a13] border-[#84c739]/30",
  "Policy Update": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  "Court Decision": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  "Industry Analysis": "bg-[#84c739]/[0.10] text-[#4f8a13] border-[#84c739]/30",
  "Settlement": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function News() {
  const featured = NEWS[0];
  const recent = NEWS.slice(1, 7);

  return (
    <section id="news" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Newsroom
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.024em]">
              <span className="text-gradient">The latest from</span>{" "}
              <span className="text-gradient-accent italic font-semibold">Canadian immigration</span>
              <span className="text-gradient">.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[15.5px] text-[#4a5462] leading-[1.7] font-light">
              IRCC bulletins, Express Entry draws, PNP results, court rulings,
              processing-time updates and policy briefs — curated weekly from{" "}
              <span className="text-[#0d1730] font-medium">CIC News</span>,{" "}
              <span className="text-[#0d1730] font-medium">Canada.ca</span> and{" "}
              <span className="text-[#0d1730] font-medium">provincial channels</span>.{" "}
              <span className="font-mono text-[12px] tracking-wider text-[#67b219]">
                {NEWS.length.toLocaleString()}+ stories indexed
              </span>
              .
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/news" className="btn-ghost group">
              <Newspaper className="h-4 w-4" strokeWidth={1.8} />
              Browse the full newsroom
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Featured + grid layout */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Featured */}
          <Link
            href={`/news/${featured.slug}`}
            className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#67b219] via-[#3e94c7] to-[#67b219]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#67b219]/[0.08] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] uppercase tracking-[0.16em] font-mono font-semibold ${
                  CATEGORY_TINT[featured.category] ?? "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30"
                }`}
              >
                {featured.category}
              </span>
              <span className="text-[11px] font-mono text-[#6b7585] tracking-wider">
                {formatDate(featured.publishedAt)} · {featured.source}
              </span>
            </div>

            <h3 className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#0d1730]">
              {featured.title}
            </h3>

            <p className="mt-5 text-[15px] leading-[1.7] text-[#4a5462] font-light">
              {featured.summary}
            </p>

            <div className="mt-auto pt-7">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {featured.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#0d1730]/10 bg-white/70 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-wider text-[#4a5462]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-mono uppercase tracking-[0.16em] text-[#4f8a13] group-hover:gap-2.5 transition-all">
                  Read brief
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Recent stack */}
          <div className="grid gap-3">
            {recent.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group glass relative overflow-hidden rounded-[18px] p-5 transition hover:shadow-[0_18px_36px_-14px_rgba(13,23,48,0.10)] hover:-translate-y-[1px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.16em] font-mono font-semibold ${
                      CATEGORY_TINT[item.category] ?? "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#6b7585]">
                    {formatDate(item.publishedAt)}
                  </span>
                </div>
                <h4 className="mt-2.5 font-display text-[15.5px] leading-[1.35] tracking-tight text-[#0d1730] line-clamp-3 group-hover:text-[#2a6e95] transition">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Three-up additional row */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {recent.slice(4, 6).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="card-hover glass group relative overflow-hidden rounded-[18px] p-6"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] font-mono font-semibold ${
                    CATEGORY_TINT[item.category] ?? "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30"
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-[10.5px] font-mono text-[#6b7585]">
                  {formatDate(item.publishedAt)} · {item.source}
                </span>
              </div>
              <h4 className="mt-3 font-display text-[18px] leading-[1.3] tracking-tight text-[#0d1730] group-hover:text-[#2a6e95] transition">
                {item.title}
              </h4>
              <p className="mt-3 text-[13px] text-[#4a5462] leading-[1.6] font-light line-clamp-2">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
