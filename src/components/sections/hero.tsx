"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Award, Plane, Globe2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
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
              RCIC‑Led <span className="text-[#6b7585] mx-1">·</span> IRCC Compliant <span className="text-[#6b7585] mx-1">·</span> Est. 2013
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-[clamp(2.7rem,6.4vw,5.6rem)] font-medium leading-[1.08] tracking-[-0.025em]"
            >
              <span className="text-gradient">Your</span>
              <span className="relative mx-3 inline-block align-middle">
                <span className="relative z-10 text-gradient-accent italic font-semibold">Canadian</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.3, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#67b219] via-[#3e94c7] to-transparent"
                />
              </span>
              <br className="hidden md:block" />
              <span className="text-gradient">dream, </span>
              <span className="text-gradient italic font-light">engineered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 max-w-xl text-[16.5px] md:text-[17.5px] text-[#2a3548] leading-[1.65] font-light"
            >
              A Toronto‑based immigration consultancy for the few who don&apos;t leave
              their future to chance. Regulated counsel, an engineered process,
              and a quiet obsession with the details that decide outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link href="#contact" className="btn-primary group">
                Book a Private Assessment
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="#process" className="btn-ghost group">
                <PlayCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                See the process
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
                <span>CICC‑Regulated Consultants</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-[#0d1730]/15" />
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-[#3e94c7]" strokeWidth={1.8} />
                <span>97% First‑Time Approval</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0 }}
              className="mt-14 grid max-w-xl grid-cols-3 gap-8 border-t border-[#0d1730]/10 pt-8"
            >
              {[
                { k: "4,800+", v: "Lives transformed" },
                { k: "60+", v: "Countries served" },
                { k: "12 yrs", v: "Trusted expertise" },
              ].map((s, i) => (
                <div key={s.v} className="relative">
                  {i > 0 && (
                    <span className="absolute -left-4 top-1.5 bottom-1.5 w-px bg-[#0d1730]/10" />
                  )}
                  <div className="font-display text-[28px] md:text-[34px] tracking-tight text-[#0d1730]">{s.k}</div>
                  <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[#6b7585] font-mono">
                    {s.v}
                  </div>
                </div>
              ))}
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
                      Live · Express Entry
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#3e94c7] font-semibold">Draw № 329</span>
                </div>

                <div className="relative mt-6">
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">Latest cut‑off</div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <div className="font-display text-[68px] leading-none tracking-[-0.03em] text-[#0d1730]">
                      497
                    </div>
                    <div className="flex flex-col text-[11px]">
                      <span className="text-[#67b219] font-semibold">▼ 3 pts</span>
                      <span className="text-[#6b7585]">vs. Apr 12</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-[#0d1730]/[0.08] bg-[#3e94c7]/[0.06] p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7585] font-mono">
                      ITAs issued
                    </div>
                    <div className="mt-1.5 text-[#0d1730] font-display text-lg">3,750</div>
                  </div>
                  <div className="rounded-2xl border border-[#0d1730]/[0.08] bg-[#67b219]/[0.07] p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b7585] font-mono">
                      Processing
                    </div>
                    <div className="mt-1.5 text-[#0d1730] font-display text-lg">~5 mo.</div>
                  </div>
                </div>

                <div className="relative mt-6 hairline" />

                <div className="relative mt-5 flex items-center justify-between text-[12px] text-[#2a3548]">
                  <span>Your estimated CRS</span>
                  <span className="font-mono text-[#0d1730] font-semibold">512</span>
                </div>
                <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#0d1730]/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#67b219] via-[#84c739] to-[#3e94c7]"
                  />
                </div>

                <button className="relative mt-7 w-full btn-primary justify-center text-[13.5px]">
                  Run my free CRS check
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-12 hidden md:flex items-center gap-2.5 rounded-full glass px-3.5 py-2 text-[11px] text-[#0d1730]"
              >
                <Plane className="h-3.5 w-3.5 text-[#3e94c7]" strokeWidth={2} />
                <span className="font-mono uppercase tracking-[0.16em] font-semibold">PR · Priya S.</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-4 bottom-6 hidden md:flex items-center gap-2.5 rounded-full glass px-3.5 py-2 text-[11px] text-[#0d1730]"
              >
                <Globe2 className="h-3.5 w-3.5 text-[#67b219]" strokeWidth={2} />
                <span className="font-mono uppercase tracking-[0.16em] font-semibold">Work · Lucas M.</span>
              </motion.div>
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
