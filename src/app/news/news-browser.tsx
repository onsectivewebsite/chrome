"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, X, Newspaper } from "lucide-react";
import type { NewsItem, NewsCategory } from "@/data/news";

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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PAGE = 24;

export function NewsBrowser({
  items,
  categories,
}: {
  items: NewsItem[];
  categories: NewsCategory[];
}) {
  const [active, setActive] = useState<NewsCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (active !== "All" && it.category !== active) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.summary.toLowerCase().includes(q) ||
        it.tags.some((t) => t.toLowerCase().includes(q)) ||
        (it.province ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, active, query]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: items.length };
    for (const c of categories) m[c] = 0;
    for (const it of items) m[it.category] = (m[it.category] ?? 0) + 1;
    return m;
  }, [items, categories]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden noise">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-[#67b219]/[0.18] to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-20 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.20] to-transparent blur-[120px]" />
        <div className="absolute inset-0 aurora-grid opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6">
          <span className="eyebrow">
            <span className="rule-gold" /> Newsroom · {items.length.toLocaleString()} stories
          </span>
          <h1 className="mt-7 font-display text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1.05] tracking-[-0.018em] text-[#0d1730]">
            Canadian immigration newsroom.
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[18px] text-[#4a5462] leading-[1.7]">
            Express Entry draws, PNP results, IRCC operational bulletins,
            Federal Court decisions and processing-time updates — summarised
            from{" "}
            <span className="text-[#0d1730] font-medium">CIC News</span>,{" "}
            <span className="text-[#0d1730] font-medium">Canada.ca</span>, the{" "}
            <span className="text-[#0d1730] font-medium">Federal Court</span>, and
            provincial nominee channels. Indexed and fully searchable.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7585]" />
              <input
                type="search"
                placeholder="Search 780 stories — Express Entry, PNP, study permits, court rulings…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE);
                }}
                className="w-full rounded-full border border-[#0d1730]/12 bg-white/80 backdrop-blur pl-11 pr-12 py-3.5 text-[14px] text-[#0d1730] placeholder:text-[#6b7585]/70 focus:border-[#3e94c7]/55 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition shadow-[0_4px_12px_-4px_rgba(13,23,48,0.06)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full hover:bg-[#0d1730]/05 text-[#6b7585]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="relative pb-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2">
            <Chip
              active={active === "All"}
              onClick={() => {
                setActive("All");
                setVisibleCount(PAGE);
              }}
              label="All"
              count={counts["All"] ?? 0}
            />
            {categories.map((c) => (
              <Chip
                key={c}
                active={active === c}
                onClick={() => {
                  setActive(c);
                  setVisibleCount(PAGE);
                }}
                label={c}
                count={counts[c] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between text-[12.5px] font-mono uppercase tracking-[0.18em] text-[#6b7585]">
            <span>
              Showing <span className="text-[#0d1730] font-semibold">{visible.length}</span> of{" "}
              <span className="text-[#0d1730] font-semibold">{filtered.length}</span> stories
              {active !== "All" && (
                <>
                  {" "}
                  in <span className="text-[#2a6e95]">{active}</span>
                </>
              )}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 grid place-items-center text-center">
              <Newspaper className="h-10 w-10 text-[#6b7585]" strokeWidth={1.4} />
              <p className="mt-4 font-display text-[20px] text-[#0d1730]">
                No stories match those filters.
              </p>
              <p className="mt-2 text-[14px] text-[#4a5462]">
                Try a broader category or clear the search box.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((it) => (
                <Link
                  key={it.id}
                  href={`/news/${it.slug}`}
                  className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-[20px] p-6"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.16em] font-mono font-semibold ${
                        CATEGORY_TINT[it.category] ??
                        "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30"
                      }`}
                    >
                      {it.category}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#6b7585]">
                      {formatDate(it.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[16px] leading-[1.35] tracking-tight text-[#0d1730] group-hover:text-[#2a6e95] transition line-clamp-3">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-[#4a5462] leading-[1.55] line-clamp-3">
                    {it.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="font-mono text-[10.5px] text-[#6b7585]">
                      {it.source}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#67b219] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {visible.length < filtered.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE)}
                className="btn-ghost"
              >
                Load {Math.min(PAGE, filtered.length - visible.length)} more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-medium transition border ${
        active
          ? "bg-gradient-to-br from-[#67b219] to-[#4f8a13] text-white border-[#4f8a13] shadow-[0_8px_18px_-8px_rgba(103,178,25,0.55)]"
          : "bg-white/70 text-[#0d1730] border-[#0d1730]/12 hover:border-[#3e94c7]/40 hover:bg-white"
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/20 text-white" : "bg-[#0d1730]/05 text-[#6b7585]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
