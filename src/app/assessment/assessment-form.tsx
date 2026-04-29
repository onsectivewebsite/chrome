"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  User,
  Languages,
  GraduationCap,
  Briefcase,
  FileCheck2,
  MapPin,
  Info,
  Phone,
  Mail,
} from "lucide-react";

const SECTIONS = [
  { id: "personal", label: "Personal Profile", icon: User },
  { id: "language", label: "Language Skills", icon: Languages },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "work", label: "Work History", icon: Briefcase },
  { id: "express-entry", label: "Express Entry", icon: FileCheck2 },
  { id: "job-offer", label: "Canadian Job Offer", icon: MapPin },
  { id: "additional", label: "Additional Info", icon: Info },
];

const COUNTRIES = [
  "India", "Philippines", "Nigeria", "China", "Pakistan", "United Kingdom",
  "United States", "Iran", "Bangladesh", "Brazil", "Mexico", "United Arab Emirates",
  "Saudi Arabia", "Türkiye", "France", "Germany", "South Africa", "Egypt",
  "Vietnam", "South Korea", "Sri Lanka", "Nepal", "Colombia", "Peru",
  "Ukraine", "Russia", "Morocco", "Algeria", "Kenya", "Ghana", "Other",
];

const LANGUAGE_TESTS_EN = [
  "IELTS General Training",
  "CELPIP-General",
  "PTE Core",
  "None / Not yet taken",
];
const LANGUAGE_TESTS_FR = [
  "TEF Canada",
  "TCF Canada",
  "None / Not yet taken",
];

const EDUCATION_LEVELS = [
  "None",
  "Secondary (high school)",
  "One‑year post‑secondary diploma",
  "Two‑year post‑secondary diploma",
  "Three‑year post‑secondary diploma or bachelor's",
  "Two or more credentials, one being three+ years",
  "Master's degree",
  "Doctoral (PhD) degree",
  "Professional degree",
];

const TEER_LEVELS = [
  "TEER 0 — Management",
  "TEER 1 — Usually requires university degree",
  "TEER 2 — Requires college diploma or 2+ years apprenticeship",
  "TEER 3 — Requires college diploma or under 2 years apprenticeship",
  "TEER 4 — Requires high school + on-the-job training",
  "TEER 5 — Short demonstration / no formal training",
  "Not sure",
];

const PATHWAY_INTEREST = [
  "Express Entry",
  "Provincial Nominee Program",
  "Work Permit / LMIA",
  "Study Permit",
  "Family Sponsorship",
  "Start‑up Visa",
  "Citizenship",
  "Refusal recovery / Appeal",
  "Not sure — please advise",
];

type FormState = "idle" | "sending" | "sent";

export function AssessmentForm() {
  const [state, setState] = useState<FormState>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 1400);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-12 overflow-hidden noise">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-[#67b219]/[0.18] to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-20 -left-40 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#3e94c7]/[0.20] to-transparent blur-[120px]" />
        <div className="absolute inset-0 aurora-grid opacity-40" />

        <div className="relative mx-auto max-w-5xl px-6">
          <span className="eyebrow">
            <span className="rule-gold" /> Free Assessment · Confidential
          </span>
          <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.018em] text-[#0d1730]">
            Free Canadian immigration assessment.
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] md:text-[18px] text-[#4a5462] leading-[1.7]">
            Complete the assessment below. A CICC‑licensed Regulated Canadian
            Immigration Consultant will review your profile and respond
            within one business day with a written eligibility analysis
            covering the programs that apply to your case, realistic
            timelines, and an honest view of risk.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[12.5px] text-[#4a5462]">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#67b219]" strokeWidth={2} />
              <span>CICC confidentiality standards</span>
            </div>
            <div className="hidden sm:inline-block h-3 w-px bg-[#0d1730]/15" />
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3e94c7]" strokeWidth={2} />
              <span>No obligation, no charge</span>
            </div>
            <div className="hidden md:inline-block h-3 w-px bg-[#0d1730]/15" />
            <div className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#2a6e95]" strokeWidth={2} />
              <a href="tel:+16475374581" className="underline-offset-4 hover:underline">
                +1 (647) 537‑4581
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form body with side nav */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            {/* Sticky section nav */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#67b219] font-mono font-semibold pb-3">
                  On this form
                </div>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-[#4a5462] hover:bg-gradient-to-r hover:from-[#67b219]/[0.06] hover:to-[#3e94c7]/[0.06] hover:text-[#0d1730] transition"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[#0d1730]/[0.08] bg-white text-[10.5px] font-mono font-semibold text-[#2a6e95] group-hover:border-[#3e94c7]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.label}</span>
                    </a>
                  ))}
                </nav>

                <div className="mt-8 rounded-2xl border border-[#3e94c7]/22 bg-[#3e94c7]/[0.05] p-5">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-[#2a6e95] font-mono font-semibold">
                    Need help?
                  </div>
                  <p className="mt-2 text-[13px] text-[#2a3548] leading-[1.6]">
                    Speak with a case manager directly:
                  </p>
                  <a
                    href="tel:+16475374581"
                    className="mt-3 flex items-center gap-2 text-[13.5px] text-[#0d1730] font-medium hover:text-[#2a6e95] transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#67b219]" strokeWidth={2.2} />
                    +1 (647) 537‑4581
                  </a>
                  <a
                    href="mailto:info@chromevisa.ca"
                    className="mt-1.5 flex items-center gap-2 text-[13.5px] text-[#0d1730] font-medium hover:text-[#2a6e95] transition"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#3e94c7]" strokeWidth={2.2} />
                    info@chromevisa.ca
                  </a>
                </div>
              </div>
            </aside>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={onSubmit}
              className="space-y-12"
            >
              <PersonalProfile />
              <LanguageSkills />
              <Education />
              <WorkHistory />
              <ExpressEntry />
              <JobOffer />
              <AdditionalInfo />

              {/* Pathway interest */}
              <Section id="pathway" no="08" title="Pathway of Interest" icon={FileCheck2}>
                <div className="flex flex-wrap gap-2">
                  {PATHWAY_INTEREST.map((p) => (
                    <label key={p} className="cursor-pointer">
                      <input type="checkbox" name="pathway" value={p} className="peer sr-only" />
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#0d1730]/[0.10] bg-white px-3.5 py-2 text-[13px] text-[#0d1730] transition peer-checked:border-[#67b219] peer-checked:bg-[#67b219]/[0.10] peer-checked:text-[#4f8a13] hover:border-[#3e94c7]/40">
                        {p}
                      </span>
                    </label>
                  ))}
                </div>
              </Section>

              {/* Consent + submit */}
              <div className="rounded-[24px] border border-[#0d1730]/[0.08] bg-white p-7 shadow-[0_18px_36px_-16px_rgba(13,23,48,0.08)]">
                <label className="flex items-start gap-3 text-[13px] text-[#4a5462] leading-[1.55]">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#0d1730]/25 text-[#67b219] focus:ring-[#67b219]/35"
                  />
                  <span>
                    I authorise Chrome Visa Solutions to review my information
                    for the purpose of providing an immigration assessment.
                    My information is handled under{" "}
                    <span className="text-[#0d1730] font-medium">
                      CICC confidentiality standards
                    </span>{" "}
                    and is not shared with any third party.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className="btn-primary mt-6 w-full justify-center disabled:opacity-75"
                >
                  {state === "idle" && (
                    <>
                      Submit assessment
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                  {state === "sending" && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  )}
                  {state === "sent" && (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Submitted — we&apos;ll respond within one business day
                    </>
                  )}
                </button>

                <p className="mt-4 text-[11.5px] text-[#6b7585] text-center font-mono tracking-wider uppercase">
                  Reviewed by RCIC #R000000 · Brampton, Ontario
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}

// === Sections ===

function PersonalProfile() {
  return (
    <Section id="personal" no="01" title="Personal Profile" icon={User}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" name="firstName" required />
        <Field label="Last name (family name)" name="lastName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+1 647 537 4581" required />
        <Field label="Date of birth" name="dob" type="date" required />
        <Select label="Marital status" name="maritalStatus" required options={[
          "Single", "Married", "Common-law partner",
          "Divorced", "Widowed", "Separated",
        ]} />
        <Select label="Country of citizenship" name="citizenship" required options={COUNTRIES} />
        <Select label="Country of current residence" name="residence" required options={COUNTRIES} />
        <Select label="Number of dependent children" name="children" options={[
          "0", "1", "2", "3", "4", "5+",
        ]} />
        <Select label="Spouse will accompany you?" name="spouseAccompany" options={[
          "Not applicable", "Yes", "No",
        ]} />
      </div>
    </Section>
  );
}

function LanguageSkills() {
  return (
    <Section
      id="language"
      no="02"
      title="Language Skills"
      icon={Languages}
      hint="Describe your proficiency in English and / or French. If you have not yet taken an approved test, estimate your CLB / NCLC band."
    >
      <SubsectionTitle>English</SubsectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="English test taken" name="englishTest" options={LANGUAGE_TESTS_EN} />
        <Field label="Test date (if applicable)" name="englishTestDate" type="date" />
      </div>
      <CLBGrid prefix="english" />

      <div className="my-8 hairline" />

      <SubsectionTitle>French</SubsectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="French test taken" name="frenchTest" options={LANGUAGE_TESTS_FR} />
        <Field label="Test date (if applicable)" name="frenchTestDate" type="date" />
      </div>
      <CLBGrid prefix="french" />
    </Section>
  );
}

function CLBGrid({ prefix }: { prefix: "english" | "french" }) {
  const skills = ["Speaking", "Listening", "Reading", "Writing"];
  const bands = ["CLB 4", "CLB 5", "CLB 6", "CLB 7", "CLB 8", "CLB 9", "CLB 10+"];
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((s) => (
        <Select
          key={s}
          label={s}
          name={`${prefix}_${s.toLowerCase()}`}
          options={["Not yet tested", ...bands]}
        />
      ))}
    </div>
  );
}

function Education() {
  return (
    <Section
      id="education"
      no="03"
      title="Education and Training"
      icon={GraduationCap}
    >
      <RadioRow
        label="Have you completed high school (secondary school)?"
        name="highSchool"
        options={["Yes", "No"]}
        required
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Select label="Highest level completed" name="educationLevel" options={EDUCATION_LEVELS} required />
        <Select label="Where did you complete it?" name="educationCountry" options={["Canada", "Outside Canada"]} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RadioRow label="Educational Credential Assessment (ECA) completed?" name="eca" options={["Yes", "No", "In progress"]} compact />
        <RadioRow label="Studied in Canada?" name="studiedInCanada" options={["Yes", "No"]} compact />
      </div>
      <div className="mt-4">
        <Field label="Field of study (most recent credential)" name="fieldOfStudy" placeholder="e.g. Bachelor of Computer Science" />
      </div>
    </Section>
  );
}

function WorkHistory() {
  return (
    <Section id="work" no="04" title="Work History" icon={Briefcase}>
      <RadioRow
        label="Have you done any paid work during the last 10 years?"
        name="workLast10"
        options={["Yes", "No"]}
        required
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Select
          label="Years of full‑time work in Canada"
          name="workInCanada"
          options={["0", "1", "2", "3", "4", "5+"]}
        />
        <Select
          label="Years of full‑time work outside Canada"
          name="workOutsideCanada"
          options={["0", "1", "2", "3", "4", "5+", "8+"]}
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Most recent job title" name="jobTitle" placeholder="e.g. Software Developer" />
        <Field label="NOC code (if known)" name="nocCode" placeholder="e.g. 21232" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Select label="TEER level (if known)" name="teerLevel" options={TEER_LEVELS} />
        <Field label="Most recent employer" name="employer" />
      </div>
    </Section>
  );
}

function ExpressEntry() {
  return (
    <Section
      id="express-entry"
      no="05"
      title="Express Entry Profile"
      icon={FileCheck2}
    >
      <RadioRow
        label="Have you already submitted an Express Entry profile to the Government of Canada within the past 12 months?"
        name="hasEEProfile"
        options={["Yes", "No"]}
        required
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Your CRS score (if known)" name="crsScore" type="number" placeholder="e.g. 478" />
        <Field label="Profile / EE number (if known)" name="eeNumber" placeholder="EE‑XXXXXXXXXX" />
      </div>
      <div className="mt-4">
        <RadioRow label="Have you received an Invitation to Apply (ITA)?" name="hasITA" options={["Yes", "No", "Previously expired"]} compact />
      </div>
    </Section>
  );
}

function JobOffer() {
  return (
    <Section id="job-offer" no="06" title="Canadian Job Offer" icon={MapPin}>
      <RadioRow
        label="Do you have a written job offer from a Canadian employer?"
        name="hasJobOffer"
        options={["Yes", "No"]}
        required
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Employer name" name="offerEmployer" />
        <Field label="Employer location (city, province)" name="offerLocation" placeholder="e.g. Brampton, Ontario" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Position / job title" name="offerTitle" />
        <RadioRow label="LMIA‑supported offer?" name="offerLMIA" options={["Yes", "No", "Not sure"]} compact />
      </div>
    </Section>
  );
}

function AdditionalInfo() {
  return (
    <Section id="additional" no="07" title="Additional Information" icon={Info}>
      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#6b7585] font-mono font-semibold">
          Anything else relevant to your assessment?
        </span>
        <textarea
          name="additional"
          rows={5}
          placeholder="Prior refusals, family ties to Canada, planned timeline, settlement funds available, business idea, anything you'd want a consultant to know before the call…"
          className="mt-2.5 w-full rounded-2xl border border-[#0d1730]/[0.10] bg-white px-4 py-3.5 text-[14.5px] text-[#0d1730] placeholder:text-[#6b7585]/65 focus:border-[#3e94c7]/55 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition"
        />
      </label>
    </Section>
  );
}

// === Field primitives ===

function Section({
  id,
  no,
  title,
  icon: Icon,
  hint,
  children,
}: {
  id: string;
  no: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32 rounded-[24px] border border-[#0d1730]/[0.08] bg-white p-7 md:p-9 shadow-[0_18px_36px_-18px_rgba(13,23,48,0.08)]"
    >
      <header className="flex items-center justify-between gap-4 pb-6 border-b border-[#0d1730]/[0.06]">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#67b219]/[0.10] to-[#3e94c7]/[0.10] border border-[#3e94c7]/[0.20] text-[#2a6e95]">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#67b219] font-semibold uppercase">
              Section {no}
            </div>
            <h2 className="mt-1 font-display text-[22px] md:text-[24px] font-medium leading-tight tracking-tight text-[#0d1730]">
              {title}
            </h2>
          </div>
        </div>
      </header>
      {hint && (
        <p className="mt-5 text-[13.5px] text-[#4a5462] leading-[1.7]">{hint}</p>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-display text-[16px] font-medium text-[#0d1730]">{children}</span>
      <span className="h-px flex-1 bg-[#0d1730]/[0.08]" />
    </div>
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
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#6b7585] font-mono font-semibold">
        {label}
        {required && <span className="text-[#b3122a] ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-[#0d1730]/[0.10] bg-white px-4 py-3 text-[14.5px] text-[#0d1730] placeholder:text-[#6b7585]/65 focus:border-[#3e94c7]/55 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#6b7585] font-mono font-semibold">
        {label}
        {required && <span className="text-[#b3122a] ml-1">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-[#0d1730]/[0.10] bg-white px-4 py-3 text-[14.5px] text-[#0d1730] focus:border-[#3e94c7]/55 focus:outline-none focus:ring-2 focus:ring-[#3e94c7]/20 transition appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b7585%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem] pr-10"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function RadioRow({
  label,
  name,
  options,
  required,
  compact,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <span className={`block text-[10.5px] uppercase tracking-[0.22em] text-[#6b7585] font-mono font-semibold ${compact ? "" : "mb-3"}`}>
        {label}
        {required && <span className="text-[#b3122a] ml-1">*</span>}
      </span>
      <div className={`flex flex-wrap gap-2 ${compact ? "mt-2" : ""}`}>
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={required} className="peer sr-only" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0d1730]/[0.10] bg-white px-4 py-2 text-[13.5px] text-[#0d1730] transition peer-checked:border-[#67b219] peer-checked:bg-[#67b219]/[0.10] peer-checked:text-[#4f8a13] peer-checked:font-medium hover:border-[#3e94c7]/40">
              {o}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
