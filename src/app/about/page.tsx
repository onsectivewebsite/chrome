import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Chrome Visa Solutions",
  description:
    "Chrome Visa Solutions is a Brampton, Ontario-based Canadian immigration consultancy representing clients under a CICC-licensed RCIC.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-44 pb-16 overflow-hidden noise">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-[#67b219]/[0.18] to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-20 -left-40 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.20] to-transparent blur-[120px]" />
        <div className="absolute inset-0 aurora-grid opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <span className="eyebrow">
                <span className="rule-gold" /> About Us
              </span>
              <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.06] tracking-[-0.018em] text-[#0d1730]">
                A regulated immigration practice in Brampton, Ontario.
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] md:text-[18px] text-[#4a5462] leading-[1.7]">
                Chrome Visa Solutions represents professionals, families and
                entrepreneurs across Canadian permanent residence, work,
                study, family sponsorship and citizenship pathways. Every file
                is handled under the regulated record of a Regulated Canadian
                Immigration Consultant licensed by the College of Immigration
                and Citizenship Consultants (CICC).
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/assessment" className="btn-primary">
                  Start free assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/#contact" className="btn-ghost">
                  Contact our office
                </Link>
              </div>
            </div>

            <div className="glass-strong rounded-[24px] p-7 space-y-4 text-[14px]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#67b219] shrink-0" strokeWidth={2} />
                <span className="text-[#2a3548]">
                  CICC-licensed RCIC{SITE.rcicNumber ? ` · ${SITE.rcicNumber}` : ""}.{" "}
                  <a
                    href="https://register.college-ic.ca/Public-Register-EN/RCIC_Search.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2a6e95] underline underline-offset-4"
                  >
                    Verify on the CICC register
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#3e94c7] shrink-0" strokeWidth={2} />
                <span className="text-[#2a3548]">{SITE.address}</span>
              </div>
              <a href={SITE.phoneHref} className="flex items-start gap-3 text-[#2a3548] hover:text-[#0d1730]">
                <Phone className="mt-0.5 h-4 w-4 text-[#67b219] shrink-0" strokeWidth={2} />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 text-[#2a3548] hover:text-[#0d1730]">
                <Mail className="mt-0.5 h-4 w-4 text-[#3e94c7] shrink-0" strokeWidth={2} />
                {SITE.email}
              </a>
              <div className="pt-2 text-[12px] font-mono uppercase tracking-[0.16em] text-[#6b7585]">
                {SITE.hours}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyUs />
      <Process />
    </>
  );
}
