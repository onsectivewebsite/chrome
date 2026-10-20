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

export type StatItem = { k: number; suffix?: string; label: string; sub: string };

export function Stats({ items, year }: { items: StatItem[]; year: number }) {
  if (items.length === 0) return null;
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
              <span className="rule-gold" /> Express Entry · {year}
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
              The {year} Express Entry picture.
            </h2>
            <p className="mt-7 max-w-md text-[16px] text-[#4a5462] leading-[1.7]">
              Year-to-date figures calculated from IRCC&apos;s official rounds
              of invitations, refreshed hourly. We plan every Express Entry
              file against the draws as they actually happen.
            </p>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.16em] text-[#2a6e95] hover:text-[#0d1730] transition"
            >
              Source: IRCC rounds of invitations ↗
            </a>
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
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#3e94c7]/[0.08] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="font-display text-[52px] md:text-[58px] leading-none tracking-[-0.03em] text-[#0d1730]">
                  <Counter to={s.k} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-4 hairline" />
                <div className="mt-3 text-[13.5px] font-medium text-[#0d1730]">
                  {s.label}
                </div>
                <div className="mt-1 text-[11.5px] text-[#6b7585]">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
