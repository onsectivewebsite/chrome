"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Landmark, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Draw } from "@/lib/ircc";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export function Hero({
  latest,
  previous,
  poolSize,
}: {
  latest: Draw | null;
  previous: Draw | null;
  poolSize: number | null;
}) {
  const delta = latest && previous ? latest.crs - previous.crs : null;
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-44 noise">
      {/* Soft ambient brand blobs */}
      <div className="pointer-events-none absolute -top-32 -right-40 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-[#67b219]/[0.22] to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -left-40 h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.22] to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#84c739]/[0.14] to-transparent blur-[100px]" />

      <div className="absolute inset-0 aurora-grid opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#67b219] shadow-[0_0_10px_2px_rgba(103,178,25,0.55)]" />
              CICC RCIC{" "}
              {SITE.rcicNumber && (
                <>
                  <span className="text-[#6b7585] mx-1">·</span> {SITE.rcicNumber}{" "}
                </>
              )}
              <span className="text-[#6b7585] mx-1">·</span> Brampton, ON
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-[clamp(2.7rem,6.4vw,5.4rem)] font-medium leading-[1.08] tracking-[-0.018em] text-[#0d1730]"
            >
              Canadian immigration,
              <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10">handled by counsel.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.3, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#67b219] to-[#3e94c7]"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 max-w-xl text-[17px] md:text-[18px] text-[#2a3548] leading-[1.65]"
            >
              Chrome Visa Solutions is a Brampton, Ontario‑based immigration
              firm. We represent professionals, families and entrepreneurs
              through every Canadian permanent residence, work and study
              pathway — under the file of a CICC‑licensed RCIC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link href="/assessment" className="btn-primary group">
                Start free assessment
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/#process" className="btn-ghost group">
                <PlayCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Review our process
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-12 flex flex-wrap items-center gap-7 text-[13px] text-[#2a3548]"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#67b219]" strokeWidth={1.8} />
                <span>Regulated by CICC</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-[#0d1730]/15" />
              <div className="flex items-center gap-2.5">
                <Landmark className="h-4 w-4 text-[#3e94c7]" strokeWidth={1.8} />
                <span>Brampton, Ontario office</span>
              </div>
            </motion.div>

          </div>

          <div className="relative hidden lg:block">
            {/* Premium CRS card */}
            <motion.div
              initial={{ opacity: 0, y: 36, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative ml-auto w-[360px]"
              style={{ perspective: 1000 }}
            >
              <div className="glass-strong relative overflow-hidden rounded-[28px] p-7">
                {/* Decorative top gradient bar */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#67b219] via-[#3e94c7] to-[#67b219]" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#67b219] pulse-glow" />
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#2a3548] font-mono font-semibold">
                      Latest · Express Entry
                    </span>
                  </div>
                  {latest && (
                    <span className="text-[10.5px] font-mono text-[#3e94c7] font-semibold">
                      Draw № {latest.number}
                    </span>
                  )}
                </div>

                {latest ? (
                  <>
                    <div className="relative mt-6">
                      <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                        Minimum CRS
                      </div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <div className="font-display text-[68px] leading-none tracking-[-0.03em] text-[#0d1730]">
                          {latest.crs}
                        </div>
                        {delta !== null && previous && (
                          <div className="flex flex-col text-[11px]">
                            <span
                              className={`font-semibold ${
                                delta <= 0 ? "text-[#67b219]" : "text-[#b3122a]"
                              }`}
                            >
                              {delta === 0 ? "No change" : `${delta < 0 ? "▼" : "▲"} ${Math.abs(delta)} pts`}
                            </span>
                            <span className="text-[#6b7585]">vs. last same-type draw (#{previous.number})</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-[12px] text-[#4a5462] leading-[1.5]">
                        {latest.name}
                      </div>
                    </div>

                    <div className="relative mt-6 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border border-[#0d1730]/[0.08] bg-[#3e94c7]/[0.06] p-3.5">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7585] font-mono">
                          ITAs issued
                        </div>
                        <div className="mt-1.5 text-[#0d1730] font-display text-lg">
                          {latest.size.toLocaleString("en-CA")}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#0d1730]/[0.08] bg-[#67b219]/[0.07] p-3.5">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7585] font-mono">
                          Draw date
                        </div>
                        <div className="mt-1.5 text-[#0d1730] font-display text-lg">
                          {formatDate(latest.date)}
                        </div>
                      </div>
                    </div>

                    {poolSize !== null && (
                      <>
                        <div className="relative mt-6 hairline" />
                        <div className="relative mt-5 flex items-center justify-between text-[12px] text-[#2a3548]">
                          <span>Candidates in the pool</span>
                          <span className="font-mono text-[#0d1730] font-semibold">
                            {poolSize.toLocaleString("en-CA")}
                          </span>
                        </div>
                      </>
                    )}

                    <a
                      href={latest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-4 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.16em] text-[#2a6e95] hover:text-[#0d1730] transition"
                    >
                      Source: IRCC
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </>
                ) : (
                  <p className="relative mt-6 text-[14px] text-[#4a5462] leading-[1.6]">
                    Live draw data is temporarily unavailable. See the latest
                    rounds on{" "}
                    <a
                      href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2a6e95] underline underline-offset-4"
                    >
                      Canada.ca
                    </a>
                    .
                  </p>
                )}

                <Link
                  href="/assessment"
                  className="relative mt-7 w-full btn-primary justify-center text-[13.5px]"
                >
                  Get a free CRS assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Refined marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-[#0d1730]/[0.08] bg-white/40 backdrop-blur-sm py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafbf7] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fafbf7] to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex shrink-0 items-center gap-16 px-8 text-[12px] text-[#4a5462]">
              {[
                "Express Entry",
                "PNP · Ontario · BC · Alberta",
                "Study Permit",
                "LMIA",
                "Start‑up Visa",
                "Family Sponsorship",
                "Spousal Open Work Permit",
                "Citizenship",
                "Post‑Graduation Work Permit",
                "Visitor Visa",
              ].map((t) => (
                <span key={t} className="flex items-center gap-3.5">
                  <span className="h-[4px] w-[4px] rounded-full bg-[#67b219]" />
                  <span className="font-mono uppercase tracking-[0.24em] font-semibold">{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
