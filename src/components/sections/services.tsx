"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  FileCheck2,
  Globe2,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Express Entry",
    desc:
      "CEC, FSW and FST streams — from profile optimisation to post‑ITA submission, handled end‑to‑end.",
    tag: "Permanent Residency",
    no: "01",
  },
  {
    icon: Globe2,
    title: "Provincial Nominee",
    desc:
      "Ontario, BC, Alberta, Saskatchewan and Manitoba — nomination strategies matched to your profile.",
    tag: "PNP",
    no: "02",
  },
  {
    icon: Briefcase,
    title: "Work Permits & LMIA",
    desc:
      "Employer‑specific, open, and intra‑company transfers with airtight LMIA and compliance docs.",
    tag: "Employment",
    no: "03",
  },
  {
    icon: GraduationCap,
    title: "Study Permits",
    desc:
      "SDS, Non‑SDS, DLI selection and SOP engineering — applications admissions love.",
    tag: "Education",
    no: "04",
  },
  {
    icon: Users,
    title: "Family Sponsorship",
    desc:
      "Spouse, common‑law, parents and grandparents — navigated with evidence that holds up to scrutiny.",
    tag: "Reunion",
    no: "05",
  },
  {
    icon: Rocket,
    title: "Start‑up Visa",
    desc:
      "From designated organisation letters to pitch sculpting — launch your venture in Canada.",
    tag: "Entrepreneurs",
    no: "06",
  },
  {
    icon: Building2,
    title: "Business Immigration",
    desc:
      "Self‑employed, entrepreneur and investor streams with jurisdiction‑specific playbooks.",
    tag: "Investor",
    no: "07",
  },
  {
    icon: FileCheck2,
    title: "Citizenship & Appeals",
    desc:
      "Oath‑to‑application, and refusal recovery with court‑ready submissions when stakes are high.",
    tag: "Citizenship",
    no: "08",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 sm:py-40">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Practice Areas
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
              Every Canadian immigration pathway, under one file.
            </h2>
          </div>
          <p className="text-[16px] text-[#4a5462] leading-[1.7] md:max-w-md md:justify-self-end">
            We act for clients across the full range of permanent residence,
            work, study, family and business pathways. Each file is opened
            under the regulated record of an RCIC and prepared to IRCC
            standard from day one.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.a
              href="#contact"
              key={s.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover glass group relative flex h-full flex-col rounded-[22px] p-7 overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#3e94c7]/[0.14] to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#3e94c7]/15 bg-gradient-to-br from-[#3e94c7]/10 to-[#3e94c7]/[0.02] text-[#3e94c7] transition-all duration-500 group-hover:border-[#3e94c7]/35 group-hover:scale-105">
                  <s.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#6b7585]">
                  № {s.no}
                </span>
              </div>

              <h3 className="mt-7 font-display text-[22px] font-medium tracking-tight text-[#0d1730] leading-tight">
                {s.title}
              </h3>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.2em] text-[#3e94c7]/75 font-mono">
                {s.tag}
              </div>
              <p className="mt-4 text-[13.5px] text-[#4a5462] leading-[1.65] flex-1">
                {s.desc}
              </p>
              <div className="mt-7 inline-flex items-center gap-1.5 text-[12.5px] text-[#3e94c7]/85 group-hover:text-[#3e94c7] group-hover:gap-2.5 transition-all duration-400 font-mono uppercase tracking-[0.16em]">
                Explore
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
