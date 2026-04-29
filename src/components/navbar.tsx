"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand";

const nav = [
  {
    label: "Services",
    href: "#services",
    sub: [
      { label: "Express Entry", href: "#services", note: "Permanent Residency" },
      { label: "Provincial Nominee", href: "#services", note: "PNP streams" },
      { label: "Work Permits & LMIA", href: "#services", note: "Employment" },
      { label: "Study Permits", href: "#services", note: "Education" },
      { label: "Family Sponsorship", href: "#services", note: "Reunion" },
      { label: "Business Immigration", href: "#services", note: "Investor" },
    ],
  },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Stories", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
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
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto transition-all duration-700 ${
          scrolled ? "mt-2 px-3 sm:px-4" : "mt-5 px-4 sm:px-6"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? "max-w-6xl rounded-2xl glass-strong px-4 py-2.5"
              : "max-w-7xl rounded-[24px] glass px-6 py-3.5"
          }`}
        >
          <BrandMark size={scrolled ? 34 : 38} />

          <nav className="hidden lg:flex items-center gap-0.5 text-[13.5px]">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[#e8edf2]/75 hover:text-[#ffffff] transition-colors duration-300"
                >
                  {item.label}
                  {item.sub && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180 group-hover:opacity-90" />
                  )}
                </Link>
                {item.sub && (
                  <div className="pointer-events-none absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-400 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                    <div className="glass-strong rounded-2xl p-2.5">
                      <div className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.22em] text-[#3e94c7]/80 font-mono">
                        Pathways
                      </div>
                      {item.sub.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] text-[#e8edf2]/85 hover:bg-[#7fb6d8]/5 hover:text-[#ffffff] transition group/item"
                        >
                          <span className="flex flex-col">
                            <span>{s.label}</span>
                            <span className="text-[10px] tracking-wider text-[#7a8590] uppercase">{s.note}</span>
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover/item:opacity-90 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="#contact" className="hidden sm:inline-flex btn-primary text-[13px] py-2.5 px-4">
              Book a Consult
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid lg:hidden h-10 w-10 place-items-center rounded-xl border border-[#7fb6d8]/15 bg-[#7fb6d8]/5 text-[#ffffff]"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mx-4 mt-3 rounded-2xl glass-strong p-3"
          >
            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-[#e8edf2]/85 hover:bg-[#7fb6d8]/5 hover:text-[#ffffff]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 justify-center"
              >
                Book Free Consult
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
