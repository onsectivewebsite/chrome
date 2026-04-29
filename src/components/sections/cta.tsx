"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-[#3e94c7]/15 bg-gradient-to-br from-[#eef7e0] via-[#eef7e0] to-[#fafbf7] p-12 md:p-20 shadow-[0_50px_140px_-50px_rgba(103,178,25,0.45)]"
        >
          {/* Inner gold hairline */}
          <div className="pointer-events-none absolute inset-3 rounded-[30px] border border-[#3e94c7]/[0.08]" />
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#67b219] opacity-25 blur-[140px]" />
          <div className="absolute -left-24 -bottom-32 h-96 w-96 rounded-full bg-[#4f8a13] opacity-30 blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-[#3e94c7] opacity-[0.06] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 aurora-grid opacity-30" />

          <div className="relative grid items-center gap-12 md:grid-cols-[1.25fr_1fr]">
            <div>
              <span className="eyebrow">
                <span className="rule-gold" /> Initial Consultation
              </span>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.4rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
                Speak with an RCIC about your case.
              </h2>
              <p className="mt-7 max-w-lg text-[16px] text-[#4a5462] leading-[1.7]">
                A 30‑minute call with a CICC‑licensed Regulated Canadian
                Immigration Consultant. You&apos;ll receive a written
                eligibility analysis, the programs that apply to your
                profile, realistic timelines and an honest view of risk —
                whether you retain us or not.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/assessment" className="btn-primary">
                  Start free assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#services" className="btn-ghost">
                  Review practice areas
                </Link>
              </div>
            </div>

            <ul className="grid gap-2.5 text-sm">
              {[
                "Eligibility analysis against every applicable program",
                "Realistic timeline, cost and risk assessment",
                "CRS, IELTS / CELPIP targets specific to your file",
                "No bundled packages or pressure to retain",
                "Written engagement terms before any work begins",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3.5 rounded-2xl border border-[#3e94c7]/10 bg-[#3e94c7]/[0.025] p-4 transition hover:border-[#3e94c7]/[0.22] hover:bg-[#3e94c7]/[0.04]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#3e94c7] shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-[#0d1730]] leading-[1.55]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
