import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Stats, type StatItem } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";
import { News } from "@/components/sections/news";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { getDraws, getNews } from "@/lib/ircc";

export const revalidate = 3600;

export default async function Home() {
  const [draws, news] = await Promise.all([getDraws(), getNews()]);

  const latest = draws[0] ?? null;
  const previous = latest
    ? (draws.find((d) => d.name === latest.name && d.number < latest.number) ?? null)
    : null;
  const poolSize = draws.find((d) => d.poolSize !== null)?.poolSize ?? null;

  const year = latest ? Number(latest.date.slice(0, 4)) : new Date().getFullYear();
  const thisYear = draws.filter((d) => d.date.startsWith(String(year)));
  const stats: StatItem[] =
    thisYear.length === 0
      ? []
      : [
          {
            k: thisYear.reduce((n, d) => n + d.size, 0),
            label: "Invitations issued",
            sub: `Across all Express Entry rounds in ${year}`,
          },
          {
            k: thisYear.length,
            label: "Rounds of invitations",
            sub: `Held by IRCC so far in ${year}`,
          },
          {
            k: Math.min(...thisYear.map((d) => d.crs)),
            label: "Lowest CRS cut-off",
            sub: `Of any ${year} round`,
          },
          ...(poolSize !== null
            ? [{ k: poolSize, label: "Candidates in the pool", sub: "As of IRCC's latest distribution" }]
            : []),
        ];

  return (
    <>
      <Hero latest={latest} previous={previous} poolSize={poolSize} />
      <Services />
      <Process />
      <Stats items={stats} year={year} />
      <WhyUs />
      <News items={news} />
      <CTA />
      <Contact />
    </>
  );
}
