import Link from "next/link";
import { ArrowUpRight, ArrowRight, Newspaper } from "lucide-react";
import type { NewsEntry } from "@/lib/ircc";
import { TYPE_TINT, DEFAULT_TINT, formatDate } from "@/lib/format";

function TypeBadge({ type, small }: { type: string; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border ${
        small ? "px-2 py-0.5 text-[9.5px]" : "px-2.5 py-1 text-[10.5px]"
      } uppercase tracking-[0.16em] font-mono font-semibold ${TYPE_TINT[type] ?? DEFAULT_TINT}`}
    >
      {type}
    </span>
  );
}

export function News({ items }: { items: NewsEntry[] }) {
  const featured = items[0];
  const recent = items.slice(1, 7);

  return (
    <section id="news" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Newsroom
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
              Canadian immigration, in real time.
            </h2>
            <p className="mt-7 max-w-xl text-[16px] text-[#4a5462] leading-[1.7]">
              The latest news releases, backgrounders and statements from{" "}
              <span className="text-[#0d1730] font-medium">
                Immigration, Refugees and Citizenship Canada
              </span>
              , pulled directly from the Government of Canada news feed.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/news" className="btn-ghost group">
              <Newspaper className="h-4 w-4" strokeWidth={1.8} />
              Browse the newsroom
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {!featured ? (
          <div className="mt-16 glass rounded-[24px] p-8 text-center">
            <p className="font-display text-[20px] text-[#0d1730]">
              The IRCC news feed is temporarily unavailable.
            </p>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-mono uppercase tracking-[0.16em] text-[#4f8a13]"
            >
              Read IRCC news on Canada.ca
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <>
            <div className="mt-16 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover glass group relative flex h-full flex-col overflow-hidden rounded-[24px] p-8"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#67b219] via-[#3e94c7] to-[#67b219]" />
                <div className="flex items-center gap-3">
                  <TypeBadge type={featured.type} />
                  <span className="text-[11px] font-mono text-[#6b7585] tracking-wider">
                    {formatDate(featured.publishedAt)} · IRCC
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#0d1730]">
                  {featured.title}
                </h3>
                {featured.summary && featured.summary !== featured.title && (
                  <p className="mt-5 text-[15px] leading-[1.7] text-[#4a5462]">
                    {featured.summary}
                  </p>
                )}
                <div className="mt-auto pt-7 flex justify-end">
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-mono uppercase tracking-[0.16em] text-[#4f8a13] group-hover:gap-2.5 transition-all">
                    Read on Canada.ca
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>

              <div className="grid gap-3">
                {recent.slice(0, 4).map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass relative overflow-hidden rounded-[18px] p-5 transition hover:shadow-[0_18px_36px_-14px_rgba(13,23,48,0.10)] hover:-translate-y-[1px]"
                  >
                    <div className="flex items-center gap-2">
                      <TypeBadge type={item.type} small />
                      <span className="text-[10.5px] font-mono text-[#6b7585]">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>
                    <h4 className="mt-2.5 font-display text-[15.5px] leading-[1.35] tracking-tight text-[#0d1730] line-clamp-3 group-hover:text-[#2a6e95] transition">
                      {item.title}
                    </h4>
                  </a>
                ))}
              </div>
            </div>

            {recent.length > 4 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {recent.slice(4, 6).map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover glass group relative overflow-hidden rounded-[18px] p-6"
                  >
                    <div className="flex items-center gap-2">
                      <TypeBadge type={item.type} />
                      <span className="text-[10.5px] font-mono text-[#6b7585]">
                        {formatDate(item.publishedAt)} · IRCC
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-[18px] leading-[1.3] tracking-tight text-[#0d1730] group-hover:text-[#2a6e95] transition">
                      {item.title}
                    </h4>
                    {item.summary && item.summary !== item.title && (
                      <p className="mt-3 text-[13px] text-[#4a5462] leading-[1.6] line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
