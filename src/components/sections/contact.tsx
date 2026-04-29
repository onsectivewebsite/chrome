"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Shield, Loader2, CheckCircle2 } from "lucide-react";

const pathways = [
  "Express Entry",
  "Provincial Nominee",
  "Work Permit / LMIA",
  "Study Permit",
  "Family Sponsorship",
  "Start‑up Visa",
  "Citizenship / Other",
];

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <section id="contact" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">
              <span className="rule-gold" /> Get in touch
            </span>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium leading-[1.1] tracking-[-0.024em]">
              <span className="text-gradient">Tell us your </span>
              <span className="text-gradient-accent italic font-semibold">story</span>
              <span className="text-gradient">.</span>
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] text-[#4a5462] leading-[1.7] font-light">
              Share a few details and a case manager will reach out within one
              business day with a tailored plan.
            </p>

            <div className="mt-10 space-y-3 text-sm">
              <a
                href="mailto:hello@chromevisa.ca"
                className="flex items-center gap-3.5 rounded-2xl border border-[#3e94c7]/10 bg-[#3e94c7]/[0.025] p-4 hover:border-[#3e94c7]/25 hover:bg-[#3e94c7]/[0.045] transition group"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#67b219] to-[#4f8a13] border border-[#4f8a13]/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                  <Mail className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                    Email
                  </div>
                  <div className="text-[#0d1730] mt-0.5">hello@chromevisa.ca</div>
                </div>
              </a>
              <a
                href="tel:+14165550199"
                className="flex items-center gap-3.5 rounded-2xl border border-[#3e94c7]/10 bg-[#3e94c7]/[0.025] p-4 hover:border-[#3e94c7]/25 hover:bg-[#3e94c7]/[0.045] transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#3e94c7] to-[#2a6e95] border border-[#2a6e95]/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                  <Phone className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                    Direct line
                  </div>
                  <div className="text-[#0d1730] mt-0.5">+1 (416) 555‑0199</div>
                </div>
              </a>
              <div className="flex items-center gap-3.5 rounded-2xl border border-[#3e94c7]/10 bg-[#3e94c7]/[0.025] p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#3e94c7]/[0.08] border border-[#3e94c7]/20 text-[#2a6e95]">
                  <MapPin className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                    Office
                  </div>
                  <div className="text-[#0d1730] mt-0.5">
                    181 Bay Street, Suite 1800 · Toronto, ON M5J 2T3
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-[#3e94c7]/[0.22] bg-[#3e94c7]/[0.04] p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#67b219]/[0.12] border border-[#67b219]/25 text-[#4f8a13]">
                  <Shield className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="text-[13px] text-[#2a3548]] leading-[1.55] font-light">
                  Your information is handled under <span className="text-[#3e94c7]">CICC confidentiality standards</span>.
                  We never share, sell, or spam.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setState("sending");
              setTimeout(() => setState("sent"), 1200);
            }}
            className="glass-strong rounded-[28px] p-7 md:p-9 relative"
          >
            <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#3e94c7]/[0.08]" />
            <div className="relative">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Jane Kaur" required />
                <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
                <Field label="Phone (optional)" name="phone" placeholder="+1 416 555 0199" />
                <Field label="Current country" name="country" placeholder="India / UAE / …" />
              </div>

              <div className="mt-5">
                <label className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                  Pathway of interest
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pathways.map((p) => (
                    <label key={p} className="group cursor-pointer">
                      <input type="radio" name="pathway" value={p} className="peer sr-only" />
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#3e94c7]/[0.12] bg-[#3e94c7]/[0.025] px-3.5 py-2 text-[13px] text-[#2a3548] transition peer-checked:border-[#3e94c7]/55 peer-checked:bg-[#3e94c7]/[0.12] peer-checked:text-[#0d1730] hover:border-[#3e94c7]/[0.28] hover:text-[#0d1730]">
                        {p}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
                  Tell us about your situation
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Education, work history, family, timeline, any prior refusals…"
                  className="mt-2.5 w-full rounded-2xl border border-[#3e94c7]/[0.12] bg-[#3e94c7]/[0.025] px-4 py-3.5 text-[#0d1730] placeholder:text-[#6b7585]/65 focus:border-[#3e94c7]/45 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition font-light"
                />
              </div>

              <label className="mt-5 flex items-start gap-3 text-[12px] text-[#6b7585] font-light">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#3e94c7]/25 bg-[#3e94c7]/[0.08] text-[#3e94c7] focus:ring-[#3e94c7]/35"
                />
                <span>
                  I agree that Chrome Visa Solution may contact me about my
                  enquiry. I&apos;ve read the privacy policy.
                </span>
              </label>

              <button
                type="submit"
                disabled={state !== "idle"}
                className="btn-primary mt-7 w-full justify-center disabled:opacity-75"
              >
                {state === "idle" && (
                  <>
                    Send enquiry <ArrowRight className="h-4 w-4" />
                  </>
                )}
                {state === "sending" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                )}
                {state === "sent" && (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Received — we&apos;ll be in touch
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2.5 w-full rounded-2xl border border-[#3e94c7]/[0.12] bg-[#3e94c7]/[0.025] px-4 py-3.5 text-[#0d1730] placeholder:text-[#6b7585]/65 focus:border-[#3e94c7]/45 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition font-light"
      />
    </label>
  );
}
