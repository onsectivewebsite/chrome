"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";

const HeroScene = dynamic(
  () => import("@/components/3d/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-32 noise">
      <div className="absolute inset-0 aurora-grid opacity-50" />
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,7,11,0.6)_85%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4b078] shadow-[0_0_12px_2px_rgba(212,176,120,0.7)]" />
              RCIC‑Led <span className="text-[#8a8395] mx-1">·</span> IRCC Compliant <span className="text-[#8a8395] mx-1">·</span> Est. 2013
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-[clamp(2.7rem,6.4vw,5.6rem)] font-medium leading-[1.0] tracking-[-0.025em]"
            >
              <span className="text-gradient">Your</span>
              <span className="relative mx-3 inline-block align-middle">
                <span className="relative z-10 text-gradient-accent italic font-semibold">Canadian</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.3, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#ead7af] via-[#d4b078] to-transparent"
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
              className="mt-9 max-w-xl text-[16.5px] md:text-[17.5px] text-[#e9e4d8]/65 leading-[1.65] font-light"
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
              className="mt-12 flex flex-wrap items-center gap-7 text-[13px] text-[#e9e4d8]/55"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#d4b078]" />
                <span>CICC‑Regulated Consultants</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-[#ead7af]/15" />
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-[#d4b078]" />
                <span>97% First‑Time Approval</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0 }}
              className="mt-14 grid max-w-xl grid-cols-3 gap-8 border-t border-[#ead7af]/10 pt-8"
            >
              {[
                { k: "4,800+", v: "Lives transformed" },
                { k: "60+", v: "Countries served" },
                { k: "12 yrs", v: "Trusted expertise" },
              ].map((s, i) => (
                <div key={s.v} className="relative">
                  {i > 0 && (
                    <span className="absolute -left-4 top-1.5 bottom-1.5 w-px bg-[#ead7af]/10" />
                  )}
                  <div className="font-display text-[28px] md:text-[34px] tracking-tight text-[#f6f0e1]">{s.k}</div>
                  <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[#8a8395]">
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
                {/* Inner gold hairline */}
                <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#ead7af]/8" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-glow" />
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#e9e4d8]/65 font-mono">
                      Live · Express Entry
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#d4b078]/85">Draw № 329</span>
                </div>

                <div className="relative mt-6">
                  <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#8a8395] font-mono">Latest cut‑off</div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <div className="font-display text-[68px] leading-none tracking-[-0.03em] text-[#f6f0e1]">
                      497
                    </div>
                    <div className="flex flex-col text-[11px]">
                      <span className="text-[#d4b078]">▼ 3 pts</span>
                      <span className="text-[#8a8395]">vs. Apr 12</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-[#ead7af]/10 bg-[#ead7af]/[0.025] p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8a8395] font-mono">
                      ITAs issued
                    </div>
                    <div className="mt-1.5 text-[#f6f0e1] font-display text-lg">3,750</div>
                  </div>
                  <div className="rounded-2xl border border-[#ead7af]/10 bg-[#ead7af]/[0.025] p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#8a8395] font-mono">
                      Processing
                    </div>
                    <div className="mt-1.5 text-[#f6f0e1] font-display text-lg">~5 mo.</div>
                  </div>
                </div>

                <div className="relative mt-6 hairline" />

                <div className="relative mt-5 flex items-center justify-between text-[12px] text-[#e9e4d8]/65">
                  <span>Your estimated CRS</span>
                  <span className="font-mono text-[#f6f0e1]">512</span>
                </div>
                <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#ead7af]/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#ead7af] via-[#d4b078] to-[#b3122a]"
                  />
                </div>

                <button className="relative mt-7 w-full btn-primary justify-center text-[13.5px]">
                  Run my private CRS check
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Floating chips — refined */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-12 hidden md:flex items-center gap-2.5 rounded-full glass px-3.5 py-2 text-[11px] text-[#e9e4d8]/85"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4b078]" />
                <span className="font-mono uppercase tracking-[0.16em]">PR · Priya S.</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-4 bottom-6 hidden md:flex items-center gap-2.5 rounded-full glass px-3.5 py-2 text-[11px] text-[#e9e4d8]/85"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono uppercase tracking-[0.16em]">Work · Lucas M.</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Refined marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-[#ead7af]/8 bg-black/20 py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07070b] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07070b] to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex shrink-0 items-center gap-16 px-8 text-[12px] text-[#e9e4d8]/45">
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
                  <span className="h-[3px] w-[3px] rounded-full bg-[#d4b078]/70" />
                  <span className="font-mono uppercase tracking-[0.24em]">{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
