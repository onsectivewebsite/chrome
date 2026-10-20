import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand";
import { SITE } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };

const IRCC = "https://www.canada.ca/en/immigration-refugees-citizenship";

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Practice",
    links: [
      { label: "Express Entry", href: "/#services" },
      { label: "Provincial Nominee", href: "/#services" },
      { label: "Work Permits & LMIA", href: "/#services" },
      { label: "Study Permits", href: "/#services" },
      { label: "Family Sponsorship", href: "/#services" },
      { label: "Business Immigration", href: "/#services" },
      { label: "Citizenship & Appeals", href: "/#services" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "Our Process", href: "/#process" },
      { label: "Free Assessment", href: "/assessment" },
      { label: "Newsroom", href: "/news" },
      { label: "Contact", href: "/#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
  {
    title: "Official Tools",
    links: [
      { label: "CRS Calculator", href: `${IRCC}/services/immigrate-canada/express-entry/check-score.html`, external: true },
      { label: "Eligibility Check", href: `${IRCC}/services/come-canada-tool-immigration-express-entry.html`, external: true },
      { label: "NOC Finder", href: "https://noc.esdc.gc.ca/", external: true },
      { label: "Processing Times", href: `${IRCC}/services/application/check-processing-times.html`, external: true },
      { label: "Verify an RCIC", href: "https://register.college-ic.ca/Public-Register-EN/RCIC_Search.aspx", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[#3e94c7]/[0.08]">
      <div className="absolute inset-x-0 -top-px hairline" />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-7">
            <BrandMark height={100} />
            <p className="max-w-sm text-[14.5px] text-[#4a5462] leading-[1.7]">
              Brampton-based Canadian immigration consultancy. We represent
              professionals, families and entrepreneurs across every Canadian
              permanent residence, work, study and citizenship pathway under
              the regulated record of a CICC-licensed RCIC.
            </p>
            <div className="space-y-3 text-[13.5px]">
              <a
                href="mailto:info@chromevisa.ca"
                className="flex items-center gap-3 text-[#2a3548] hover:text-[#0d1730] transition group"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#3e94c7]/5 border border-[#3e94c7]/[0.12] group-hover:border-[#3e94c7]/30 transition">
                  <Mail className="h-4 w-4" strokeWidth={1.6} />
                </span>
                info@chromevisa.ca
              </a>
              <a
                href="tel:+16475374581"
                className="flex items-center gap-3 text-[#2a3548] hover:text-[#0d1730] transition group"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#3e94c7]/5 border border-[#3e94c7]/[0.12] group-hover:border-[#3e94c7]/30 transition">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                +1 (647) 537‑4581
              </a>
              <div className="flex items-center gap-3 text-[#2a3548]">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#3e94c7]/5 border border-[#3e94c7]/[0.12]">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </span>
                8450 Creditview Rd, Brampton, ON L6Y 0G4
              </div>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-medium tracking-[0.24em] uppercase text-[#3e94c7] font-mono">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3.5 text-[13.5px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[#6b7585] hover:text-[#0d1730] transition"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-40 group-hover:opacity-80 transition" />
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[#6b7585] hover:text-[#0d1730] transition"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-70 -translate-x-1 group-hover:translate-x-0 transition" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 hairline" />
        <div className="mt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11.5px] text-[#6b7585]">
          <p>
            © {new Date().getFullYear()} Chrome Visa Solutions Inc.
            {SITE.rcicNumber && <> — RCIC {SITE.rcicNumber}.</>} All rights reserved.
          </p>
          <p className="font-mono tracking-[0.18em] uppercase text-[10.5px]">
            Brampton · Ontario · Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
