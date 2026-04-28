"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, BadgeCheck, Lock, HeartHandshake, LineChart } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Regulated, on record.",
    desc:
      "Every file is handled by a CICC‑licensed RCIC of record — the only kind of professional authorised to represent you before IRCC.",
    no: "01",
  },
  {
    icon: Gauge,
    title: "Engineered for speed.",
    desc:
      "Our proprietary case system shaves weeks off documentation and submission cycles without cutting corners on quality.",
    no: "02",
  },
  {
    icon: BadgeCheck,
    title: "Evidence‑first narratives.",
    desc:
      "We don't just fill forms — we build an IRCC‑grade case story with every work letter, reference, and SOP calibrated.",
    no: "03",
  },
  {
    icon: Lock,
    title: "Your data, your control.",
    desc:
      "Bank‑grade encryption, access logs, and a private client portal. No PDFs floating in inboxes. Ever.",
    no: "04",
  },
  {
    icon: HeartHandshake,
    title: "One client, one team.",
    desc:
      "A dedicated case manager plus an RCIC of record — you'll know every person touching your file, and they'll know you.",
    no: "05",
  },
  {
    icon: LineChart,
    title: "Transparent outcomes.",
    desc:
      "Weekly progress, honest timelines, and a post‑mortem on every refusal we take on — we earn trust with evidence.",
    no: "06",
  },
];

export function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">
            <span className="rule-gold" /> The Difference
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.024em]">
            <span className="text-gradient">A different kind of </span>
            <span className="text-gradient-accent italic font-semibold">immigration firm</span>
            <span className="text-gradient">.</span>
          </h2>
          <p className="mt-7 text-[15.5px] text-[#e9e4d8]/60 leading-[1.7] font-light max-w-xl mx-auto">
            Built by immigrants, for immigrants — with the process rigour you&apos;d
            expect from a top‑tier consulting firm.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover glass group relative rounded-[22px] p-8 overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#d4b078]/12 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#ead7af]/15 bg-gradient-to-br from-[#ead7af]/10 to-[#ead7af]/[0.02] text-[#ead7af] transition-all duration-500 group-hover:border-[#ead7af]/35">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#8a8395]">
                  № {p.no}
                </span>
              </div>

              <h3 className="mt-7 font-display text-[24px] font-medium tracking-tight text-[#f6f0e1] leading-[1.15]">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] text-[#e9e4d8]/62 leading-[1.7] font-light">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
