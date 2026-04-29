"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Compass, FileSearch, Send, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Discovery",
    desc: "A 30‑minute consult with an RCIC to map your goals, timeline, and the programs you actually qualify for. No fluff.",
    time: "Day 1",
    no: "I",
  },
  {
    icon: Compass,
    title: "Strategy",
    desc: "We engineer a multi‑path roadmap: primary pathway, backups, risk mitigation, and a week‑by‑week plan.",
    time: "Week 1",
    no: "II",
  },
  {
    icon: FileSearch,
    title: "Documentation",
    desc: "Evidence, translations, ECAs, police checks, medicals — collected and polished in a secure shared vault.",
    time: "Weeks 2–6",
    no: "III",
  },
  {
    icon: Send,
    title: "Submission",
    desc: "We draft, review, and submit — under your authorised RCIC of record, so IRCC corresponds with us, not you.",
    time: "Filed",
    no: "IV",
  },
  {
    icon: PartyPopper,
    title: "Landing",
    desc: "From pre‑landing checklists to SIN, health card, and settlement partners — we stay with you after approval.",
    time: "Arrival",
    no: "V",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">
            <span className="rule-gold" /> The Method
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.024em]">
            <span className="text-gradient">A precision </span>
            <span className="text-gradient-accent italic font-semibold">five‑act</span>
            <span className="text-gradient"> system.</span>
          </h2>
          <p className="mt-7 text-[15.5px] text-[#e8edf2]/60 leading-[1.7] font-light max-w-xl mx-auto">
            Most applications fail not because of who you are, but how the case
            is built. Our process is the safeguard.
          </p>
        </motion.div>

        <div className="relative mt-24">
          {/* Timeline rail with gold tint */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden lg:block">
            <div className="mx-auto h-px w-[88%] bg-gradient-to-r from-transparent via-[#3e94c7]/45 to-transparent" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative grid h-[72px] w-[72px] mx-auto place-items-center">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3e94c7] to-[#264a08] opacity-15 blur-xl" />
                  <span className="absolute inset-0 rounded-full border border-[#7fb6d8]/18 bg-gradient-to-br from-[#7fb6d8]/10 to-[#7fb6d8]/[0.02]" />
                  {/* Inner gold ring */}
                  <span className="absolute inset-2 rounded-full border border-[#7fb6d8]/8" />
                  <s.icon className="relative h-6 w-6 text-[#7fb6d8]" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#3a6810] to-[#1a330a] border border-[#7fb6d8]/25 text-[10.5px] font-mono text-[#7fb6d8] shadow-[0_8px_22px_-6px_rgba(103,178,25,0.7)]">
                    {s.no}
                  </span>
                </div>
                <div className="mt-7 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#3e94c7]/75">
                    {s.time}
                  </div>
                  <h3 className="mt-2 font-display text-[22px] font-medium tracking-tight text-[#ffffff]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-[#e8edf2]/60 leading-[1.65] font-light max-w-[230px] mx-auto">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
