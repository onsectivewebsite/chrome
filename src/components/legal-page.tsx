export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <section className="relative pt-44 pb-10 overflow-hidden noise">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-[#67b219]/[0.14] to-transparent blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <span className="eyebrow">
            <span className="rule-gold" /> {eyebrow}
          </span>
          <h1 className="mt-7 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.018em] text-[#0d1730]">
            {title}
          </h1>
          <p className="mt-4 text-[13px] font-mono uppercase tracking-[0.16em] text-[#6b7585]">
            Last updated {updated}
          </p>
        </div>
      </section>
      <article className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          <div className="hairline" />
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-[22px] font-medium text-[#0d1730]">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-[15.5px] leading-[1.75] text-[#2a3548]">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
