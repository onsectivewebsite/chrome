"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { BrandMark } from "./brand";

const nav = [
  {
    label: "Services",
    href: "/#services",
    sub: [
      { label: "Express Entry", href: "/#services", note: "Permanent Residency" },
      { label: "Provincial Nominee", href: "/#services", note: "PNP streams" },
      { label: "Work Permits & LMIA", href: "/#services", note: "Employment" },
      { label: "Study Permits", href: "/#services", note: "Education" },
      { label: "Family Sponsorship", href: "/#services", note: "Reunion" },
      { label: "Business Immigration", href: "/#services", note: "Investor" },
    ],
  },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Stories", href: "/#testimonials" },
  { label: "Newsroom", href: "/news" },
  { label: "Assessment", href: "/assessment" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_4px_20px_-8px_rgba(13,23,48,0.08)] border-b border-[#0d1730]/[0.06]"
            : "bg-white/80 backdrop-blur-xl border-b border-[#0d1730]/[0.04]"
        }`}
      >
        {/* Utility bar — premium consultancy detail */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="border-b border-[#0d1730]/[0.06] bg-gradient-to-r from-[#67b219]/[0.04] via-transparent to-[#3e94c7]/[0.04]">
            <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center justify-between text-[11.5px] font-mono">
              <div className="flex items-center gap-5 text-[#4a5462]">
                <a
                  href="tel:+16475374581"
                  className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#0d1730] transition"
                >
                  <Phone className="h-3 w-3 text-[#67b219]" strokeWidth={2.2} />
                  <span className="tracking-wider">+1 (647) 537‑4581</span>
                </a>
                <a
                  href="mailto:info@chromevisa.ca"
                  className="hidden md:inline-flex items-center gap-1.5 hover:text-[#0d1730] transition"
                >
                  <Mail className="h-3 w-3 text-[#3e94c7]" strokeWidth={2.2} />
                  <span className="tracking-wider">info@chromevisa.ca</span>
                </a>
                <span className="hidden lg:inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-[#6b7585]" strokeWidth={2.2} />
                  <span className="tracking-wider text-[#6b7585]">Mon–Fri · 9am–6pm ET</span>
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#4a5462]">
                <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.18em] text-[10.5px]">
                  <ShieldCheck className="h-3 w-3 text-[#67b219]" strokeWidth={2.2} />
                  <span className="font-semibold text-[#0d1730]">CICC</span>
                  <span className="text-[#6b7585]">RCIC #R000000</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="mx-auto max-w-[1400px] px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "py-2" : "py-3"
            }`}
          >
            <BrandMark height={scrolled ? 52 : 68} />

            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="relative inline-flex items-center gap-1 px-4 py-2.5 text-[14px] font-medium text-[#0d1730] hover:text-[#2a6e95] transition-colors duration-300"
                  >
                    {item.label}
                    {item.sub && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180 group-hover:opacity-90" />
                    )}
                    {/* Animated underline */}
                    <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full bg-gradient-to-r from-[#67b219] to-[#3e94c7]" />
                  </Link>
                  {item.sub && (
                    <div className="pointer-events-none absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                      <div className="rounded-2xl bg-white p-3 border border-[#0d1730]/[0.08] shadow-[0_24px_60px_-20px_rgba(13,23,48,0.18)]">
                        <div className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.22em] text-[#67b219] font-mono font-semibold">
                          Pathways
                        </div>
                        {item.sub.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] text-[#0d1730] hover:bg-gradient-to-r hover:from-[#67b219]/[0.06] hover:to-[#3e94c7]/[0.06] transition group/item"
                          >
                            <span className="flex flex-col">
                              <span className="font-medium">{s.label}</span>
                              <span className="text-[10px] tracking-wider text-[#6b7585] uppercase font-mono mt-0.5">
                                {s.note}
                              </span>
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#67b219] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/assessment"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0d1730] hover:text-[#2a6e95] transition"
              >
                Free assessment
              </Link>
              <Link
                href="/assessment"
                className="hidden sm:inline-flex btn-primary text-[13px] py-2.5 px-5"
              >
                Start Assessment
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid lg:hidden h-11 w-11 place-items-center rounded-xl border border-[#0d1730]/[0.10] bg-white text-[#0d1730] hover:border-[#3e94c7]/40 transition"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-b border-[#0d1730]/[0.08] shadow-[0_20px_40px_-20px_rgba(13,23,48,0.15)]"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-5">
              <div className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#0d1730] hover:bg-gradient-to-r hover:from-[#67b219]/[0.06] hover:to-[#3e94c7]/[0.06] transition"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#67b219] opacity-60" />
                  </Link>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#0d1730]/[0.08] flex flex-col gap-3">
                <a
                  href="tel:+16475374581"
                  className="flex items-center gap-3 text-[13px] text-[#4a5462]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#67b219]" strokeWidth={2.2} />
                  +1 (647) 537‑4581
                </a>
                <a
                  href="mailto:info@chromevisa.ca"
                  className="flex items-center gap-3 text-[13px] text-[#4a5462]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#3e94c7]" strokeWidth={2.2} />
                  info@chromevisa.ca
                </a>
                <Link
                  href="/assessment"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 justify-center"
                >
                  Start Free Assessment
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
