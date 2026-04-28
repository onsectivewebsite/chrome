import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand";

function SocialIcon({ name }: { name: "linkedin" | "instagram" | "facebook" | "youtube" }) {
  const common = "h-4 w-4";
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52v15H.24V8zm7.57 0h4.33v2.05h.06c.6-1.13 2.07-2.33 4.26-2.33 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.76c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V23H7.8V8z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2C16.4 4.1 15.4 4 14.2 4c-2.5 0-4.2 1.5-4.2 4.3v2.5H7v3.2h3V22h3.5z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5zM9.75 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

const cols = [
  {
    title: "Practice",
    links: [
      "Express Entry",
      "Provincial Nominee",
      "Work Permits",
      "Study Permits",
      "Family Sponsorship",
      "Business Immigration",
      "Citizenship",
      "LMIA",
    ],
  },
  {
    title: "Firm",
    links: ["About Us", "Our Team", "Careers", "Success Stories", "Insights", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Resources",
    links: ["CRS Calculator", "Eligibility Check", "NOC Finder", "Document Checklist", "Processing Times", "FAQs"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[#ead7af]/8">
      <div className="absolute inset-x-0 -top-px hairline" />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-7">
            <BrandMark size={42} />
            <p className="max-w-sm text-[14px] text-[#e9e4d8]/60 leading-[1.7] font-light">
              A Regulated Canadian Immigration Consultancy helping professionals,
              entrepreneurs and families turn Canada from a destination into home.
            </p>
            <div className="space-y-3 text-[13.5px]">
              <a
                href="mailto:hello@chromevisa.ca"
                className="flex items-center gap-3 text-[#e9e4d8]/75 hover:text-[#fff8e9] transition group"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ead7af]/5 border border-[#ead7af]/12 group-hover:border-[#ead7af]/30 transition">
                  <Mail className="h-4 w-4" strokeWidth={1.6} />
                </span>
                hello@chromevisa.ca
              </a>
              <a
                href="tel:+14165550199"
                className="flex items-center gap-3 text-[#e9e4d8]/75 hover:text-[#fff8e9] transition group"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ead7af]/5 border border-[#ead7af]/12 group-hover:border-[#ead7af]/30 transition">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                +1 (416) 555‑0199
              </a>
              <div className="flex items-center gap-3 text-[#e9e4d8]/75">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ead7af]/5 border border-[#ead7af]/12">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </span>
                181 Bay Street, Toronto ON M5J 2T3
              </div>
            </div>
            <div className="flex items-center gap-2">
              {([
                { name: "linkedin", label: "LinkedIn" },
                { name: "instagram", label: "Instagram" },
                { name: "facebook", label: "Facebook" },
                { name: "youtube", label: "YouTube" },
              ] as const).map(({ name, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[#ead7af]/12 bg-[#ead7af]/[0.025] text-[#e9e4d8]/65 hover:text-[#ead7af] hover:border-[#ead7af]/35 hover:bg-[#ead7af]/[0.06] transition"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-medium tracking-[0.24em] uppercase text-[#d4b078] font-mono">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3.5 text-[13.5px]">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="group inline-flex items-center gap-1.5 text-[#e9e4d8]/55 hover:text-[#fff8e9] transition font-light"
                    >
                      {l}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-70 -translate-x-1 group-hover:translate-x-0 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 hairline" />
        <div className="mt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11.5px] text-[#8a8395]">
          <p className="font-light">
            © {new Date().getFullYear()} Chrome Visa Solution Inc. — RCIC #R000000.
            All rights reserved.
          </p>
          <p className="font-mono tracking-[0.18em] uppercase">
            Crafted in Toronto · Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
