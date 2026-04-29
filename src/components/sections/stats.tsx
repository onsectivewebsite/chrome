"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 2.4,
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const mv = useMotionValue(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-[#3e94c7]">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const items = [
    { k: 4800, suffix: "+", label: "Successful applications", sub: "Across 60+ nationalities" },
    { k: 97, suffix: "%", label: "First‑time approval rate", sub: "Above industry average of 62%" },
    { k: 12, suffix: "yrs", label: "Licensed experience", sub: "CICC‑regulated since 2013" },
    { k: 48, suffix: "h", label: "Avg. response time", sub: "Dedicated case manager" },
  ];
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20"
        >
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Measured, not promised
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.024em]">
              <span className="text-gradient">The numbers behind a </span>
              <span className="text-gradient-accent italic font-semibold">premium</span>
              <span className="text-gradient"> consultancy.</span>
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] text-[#e8edf2]/60 leading-[1.7] font-light">
              Canadian immigration is full of noise. We publish our real
              outcomes — so you can decide on evidence, not advertising.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#3a6810", "#3e94c7", "#1a330a", "#2a6e95"].map((c) => (
                  <span
                    key={c}
                    className="h-8 w-8 rounded-full border-2 border-[#06080c] bg-gradient-to-br shadow-[0_4px_12px_-4px_rgba(0,0,0,0.6)]"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}80)` }}
                  />
                ))}
              </div>
              <div className="text-[12.5px] text-[#e8edf2]/55 font-light">
                Trusted by clients from <span className="text-[#7fb6d8]">60+ countries</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover glass relative rounded-[22px] p-7 overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#3e94c7]/8 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="font-display text-[52px] md:text-[58px] leading-none tracking-[-0.03em] text-[#ffffff]">
                  <Counter to={s.k} suffix={s.suffix} />
                </div>
                <div className="mt-4 hairline" />
                <div className="mt-3 text-[13.5px] font-medium text-[#ffffff]">
                  {s.label}
                </div>
                <div className="mt-1 text-[11.5px] text-[#7a8590] font-light">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
