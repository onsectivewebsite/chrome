"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Compass, FileSearch, Send, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Consultation",
    desc: "A 30‑minute call with a CICC‑licensed RCIC to review your profile, identify the programs you qualify for, and outline realistic timelines.",
    time: "Day 1",
    no: "I",
  },
  {
    icon: Compass,
    title: "Strategy",
    desc: "We prepare a written immigration plan: primary pathway, backup options, eligibility analysis, and a documented schedule.",
    time: "Week 1",
    no: "II",
  },
  {
    icon: FileSearch,
    title: "Documentation",
    desc: "Evidence collection — work references, ECAs, language tests, police certificates, medicals — assembled and reviewed in a secure client portal.",
    time: "Weeks 2–6",
    no: "III",
  },
  {
    icon: Send,
    title: "Submission",
    desc: "We draft, review and file the application as your representative of record. All IRCC correspondence is directed to our office.",
    time: "Filed",
    no: "IV",
  },
  {
    icon: PartyPopper,
    title: "Landing",
    desc: "Pre‑landing checklist, SIN application, provincial health enrolment, and introductions to settlement agencies in your destination city.",
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
            <span className="rule-gold" /> Our Process
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
            How we work with you, from first call to landing.
          </h2>
          <p className="mt-7 text-[16px] text-[#4a5462] leading-[1.7] max-w-xl mx-auto">
            Most refused applications fail on how the case was built — not on
            who the applicant was. Our process exists to remove that risk
            before it reaches the officer.
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
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3e94c7] to-[#4f8a13] opacity-15 blur-xl" />
                  <span className="absolute inset-0 rounded-full border border-[#3e94c7]/[0.18] bg-gradient-to-br from-[#3e94c7]/10 to-[#3e94c7]/[0.02]" />
                  {/* Inner gold ring */}
                  <span className="absolute inset-2 rounded-full border border-[#3e94c7]/[0.08]" />
                  <s.icon className="relative h-6 w-6 text-[#3e94c7]" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#67b219] to-[#4f8a13] border border-[#3e94c7]/25 text-[10.5px] font-mono text-[#3e94c7] shadow-[0_8px_22px_-6px_rgba(103,178,25,0.7)]">
                    {s.no}
                  </span>
                </div>
                <div className="mt-7 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#3e94c7]/75">
                    {s.time}
                  </div>
                  <h3 className="mt-2 font-display text-[22px] font-medium tracking-tight text-[#0d1730]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-[#4a5462] leading-[1.65] max-w-[230px] mx-auto">
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
