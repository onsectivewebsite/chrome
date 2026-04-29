"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    quote:
      "I had two refusals before I found Chrome. Their RCIC rebuilt my narrative, caught the real issue, and my PR was approved in four months.",
    name: "Aarav Mehta",
    role: "Software Engineer",
    place: "Bengaluru → Toronto",
    badge: "Express Entry · CEC",
  },
  {
    quote:
      "They treated my case like it mattered. The dashboard, the weekly syncs, the pre‑landing checklist — nothing was left to chance.",
    name: "Priya Sharma",
    role: "Nurse",
    place: "Manila → Calgary",
    badge: "PNP · Alberta",
  },
  {
    quote:
      "We moved our family of four, including two school‑age kids, without a single delay. The communication alone was worth every dollar.",
    name: "Lucas Moreau",
    role: "Product Lead",
    place: "Paris → Montréal",
    badge: "Intra‑Company Transfer",
  },
  {
    quote:
      "My start‑up visa journey looked impossible on paper. They found a designated incubator, coached my pitch, and closed our letter in eight weeks.",
    name: "Noura Al‑Hassan",
    role: "Founder",
    place: "Dubai → Vancouver",
    badge: "Start‑up Visa",
  },
  {
    quote:
      "Refused once by IRCC, approved after Chrome's appeal submission. Their attention to procedural fairness was the turning point.",
    name: "Daniel Okafor",
    role: "Mechanical Engineer",
    place: "Lagos → Edmonton",
    badge: "Refusal Recovery",
  },
  {
    quote:
      "They were honest about timelines, honest about costs, honest about risks. In an industry full of promises, that's rare and priceless.",
    name: "Maria Rossi",
    role: "Architect",
    place: "Milan → Ottawa",
    badge: "FSW",
  },
];

function Initials({ name }: { name: string }) {
  const i = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2);
  return (
    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#7fb6d8]/20 bg-gradient-to-br from-[#0a1d10] to-[#0a0d12] font-display text-[14px] text-[#7fb6d8]">
      {i}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Client Stories
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.024em]">
              <span className="text-gradient">Real people.</span>{" "}
              <span className="text-gradient-accent italic font-semibold">Real</span>{" "}
              <span className="text-gradient">maple leaves.</span>
            </h2>
          </div>
          <div className="md:justify-self-end flex flex-col gap-2.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#3e94c7] text-[#3e94c7]" />
              ))}
            </div>
            <span className="text-[13px] text-[#e8edf2]/65 font-light">
              <span className="text-[#ffffff] font-medium font-display text-[15px]">4.96</span>{" "}
              / 5 · 1,240+ verified reviews
            </span>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover glass group relative flex h-full flex-col rounded-[22px] p-7 overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#3e94c7]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Editorial open quote */}
              <span
                aria-hidden
                className="absolute -top-2 left-6 font-display text-[80px] leading-none text-[#3e94c7]/22 select-none"
              >
                &ldquo;
              </span>

              <div className="flex items-center gap-1 relative">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#3e94c7] text-[#3e94c7]" />
                ))}
              </div>

              <blockquote className="mt-5 text-[14.5px] leading-[1.7] text-[#e8edf2]/82 font-light italic">
                {t.quote}
              </blockquote>

              <figcaption className="mt-7 flex items-center justify-between border-t border-[#7fb6d8]/10 pt-5">
                <div className="flex items-center gap-3">
                  <Initials name={t.name} />
                  <div>
                    <div className="font-display text-[15px] font-medium text-[#ffffff]">{t.name}</div>
                    <div className="text-[11px] text-[#7a8590] mt-0.5">
                      {t.role} <span className="text-[#3e94c7]/60">·</span> {t.place}
                    </div>
                  </div>
                </div>
                <span className="rounded-full border border-[#7fb6d8]/14 bg-[#7fb6d8]/[0.04] px-2.5 py-1 text-[9.5px] uppercase tracking-[0.18em] text-[#3e94c7]/85 font-mono whitespace-nowrap">
                  {t.badge}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
