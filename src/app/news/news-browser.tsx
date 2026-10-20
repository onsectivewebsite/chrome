"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, X, Newspaper } from "lucide-react";
import { TYPE_TINT, DEFAULT_TINT, formatDate } from "@/lib/format";

export type FeedItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  date: string;
  type: string;
};

const PAGE = 24;

export function NewsBrowser({ items }: { items: FeedItem[] }) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((it) => it.type))).sort(),
    [items],
  );
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (active !== "All" && it.type !== active) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.summary.toLowerCase().includes(q)
      );
    });
  }, [items, active, query]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: items.length };
    for (const c of categories) m[c] = 0;
    for (const it of items) m[it.type] = (m[it.type] ?? 0) + 1;
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
            <span className="rule-gold" /> Newsroom · Live from IRCC
          </span>
          <h1 className="mt-7 font-display text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1.05] tracking-[-0.018em] text-[#0d1730]">
            Canadian immigration newsroom.
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[18px] text-[#4a5462] leading-[1.7]">
            News releases, backgrounders and statements from{" "}
            <span className="text-[#0d1730] font-medium">
              Immigration, Refugees and Citizenship Canada
            </span>
            , plus every Express Entry round of invitations — pulled live from
            official{" "}
            <span className="text-[#0d1730] font-medium">Canada.ca</span> feeds
            and refreshed hourly. Each item links to the original source.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7585]" />
              <input
                type="search"
                placeholder={`Search ${items.length.toLocaleString()} items — Express Entry, study permits, CRS…`}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full hover:bg-[#0d1730]/[0.05] text-[#6b7585]"
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
              <span className="text-[#0d1730] font-semibold">{filtered.length}</span> items
              {active !== "All" && (
                <>
                  {" "}
                  in <span className="text-[#2a6e95]">{active}</span>
                </>
              )}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="mt-16 grid place-items-center text-center">
              <Newspaper className="h-10 w-10 text-[#6b7585]" strokeWidth={1.4} />
              <p className="mt-4 font-display text-[20px] text-[#0d1730]">
                The IRCC feeds are temporarily unavailable.
              </p>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-[14px] text-[#2a6e95] underline underline-offset-4"
              >
                Read IRCC news on Canada.ca
              </a>
            </div>
          ) : filtered.length === 0 ? (
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
                <a
                  key={it.id}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-[20px] p-6"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.16em] font-mono font-semibold ${
                        TYPE_TINT[it.type] ?? DEFAULT_TINT
                      }`}
                    >
                      {it.type}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#6b7585]">
                      {formatDate(it.date)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[16px] leading-[1.35] tracking-tight text-[#0d1730] group-hover:text-[#2a6e95] transition line-clamp-3">
                    {it.title}
                  </h3>
                  {it.summary && (
                    <p className="mt-2 text-[12.5px] text-[#4a5462] leading-[1.55] line-clamp-3">
                      {it.summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="font-mono text-[10.5px] text-[#6b7585]">
                      Canada.ca
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#67b219] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                </a>
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
          active ? "bg-white/20 text-white" : "bg-[#0d1730]/[0.05] text-[#6b7585]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
