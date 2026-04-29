import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import {
  NEWS,
  getNewsBySlug,
  getRelatedNews,
} from "@/data/news";

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
  return new Date(iso).toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "News not found" };
  return {
    title: `${item.title} — Chrome Visa Solutions`,
    description: item.summary,
  };
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = getRelatedNews(item, 4);
  const tint =
    CATEGORY_TINT[item.category] ??
    "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-12 overflow-hidden noise">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-[#67b219]/[0.16] to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-20 -left-40 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.18] to-transparent blur-[120px]" />
        <div className="absolute inset-0 aurora-grid opacity-40" />

        <div className="relative mx-auto max-w-3xl px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[12.5px] font-mono uppercase tracking-[0.18em] text-[#4a5462] hover:text-[#0d1730] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to newsroom
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] uppercase tracking-[0.16em] font-mono font-semibold ${tint}`}
            >
              {item.category}
            </span>
            <span className="text-[11.5px] font-mono text-[#6b7585]">
              <Calendar className="h-3 w-3 inline -mt-0.5 mr-1" />
              {formatDate(item.publishedAt)}
            </span>
            <span className="text-[11.5px] font-mono text-[#6b7585]">·</span>
            <span className="text-[11.5px] font-mono text-[#0d1730] font-semibold">
              {item.source}
            </span>
            {item.province && (
              <>
                <span className="text-[11.5px] font-mono text-[#6b7585]">·</span>
                <span className="text-[11.5px] font-mono text-[#0d1730] font-semibold">
                  {item.province}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-6 font-display text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.022em] text-[#0d1730]">
            {item.title}
          </h1>

          <p className="mt-7 text-[17px] md:text-[18px] text-[#2a3548] leading-[1.7] font-light">
            {item.summary}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="hairline mb-10" />
          <div className="prose-like text-[16.5px] leading-[1.8] text-[#2a3548] font-light space-y-6">
            {item.body
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((para, i) => {
                // Drop-cap on first paragraph for editorial polish
                if (i === 0) {
                  const first = para.charAt(0);
                  const rest = para.slice(1);
                  return (
                    <p key={i} className="text-[17px] leading-[1.75]">
                      <span className="float-left mr-2 mt-1 font-display text-[56px] leading-none text-[#67b219] font-medium">
                        {first}
                      </span>
                      {rest}
                    </p>
                  );
                }
                // Italic blockquote for sentences containing direct quotes
                if (/^["“]/.test(para) || /said\b|noted\b|warned\b|observed\b/.test(para)) {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-[#67b219] pl-6 py-1 italic text-[#2a3548] text-[16.5px]"
                    >
                      {para}
                    </blockquote>
                  );
                }
                return <p key={i}>{para}</p>;
              })}
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-[#6b7585]" strokeWidth={1.8} />
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#0d1730]/10 bg-white/70 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#4a5462]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Disclaimer / source */}
          <div className="mt-12 rounded-2xl border border-[#3e94c7]/22 bg-[#3e94c7]/[0.05] p-6">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-[#2a6e95] font-mono font-semibold">
              Source &amp; verification
            </div>
            <p className="mt-3 text-[13.5px] text-[#2a3548] leading-[1.65] font-light">
              This brief is summarised from public IRCC, Canada.ca and provincial
              channels by Chrome Visa Solutions. For your file, do not rely on
              summaries alone — book a 30-minute consult with a CICC-licensed
              RCIC for application-specific guidance.
            </p>
            <Link
              href="/#contact"
              className="mt-5 btn-primary text-[13px] py-2.5"
            >
              Speak to an RCIC
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="hairline mb-10" />
            <span className="eyebrow">
              <span className="rule-gold" /> Related in {item.category}
            </span>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/news/${r.slug}`}
                  className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-[18px] p-6"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.16em] font-mono font-semibold ${
                        CATEGORY_TINT[r.category] ?? tint
                      }`}
                    >
                      {r.category}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#6b7585]">
                      {formatDate(r.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[16px] leading-[1.35] tracking-tight text-[#0d1730] group-hover:text-[#2a6e95] transition line-clamp-3">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
