// Live data from official Government of Canada feeds. Both are cached and
// revalidated hourly; on failure we return an empty result so pages render a
// "feed unavailable" state instead of crashing or showing invented data.

const EE_ROUNDS_URL =
  "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json";
const EE_ROUNDS_PAGE =
  "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html";
const NEWS_URL =
  "https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&pick=100&format=atom";

const REVALIDATE = 3600;

export type Draw = {
  number: number;
  date: string; // YYYY-MM-DD
  name: string;
  size: number;
  crs: number;
  poolSize: number | null;
  url: string;
};

export type NewsType =
  | "News release"
  | "Backgrounder"
  | "Statement"
  | "Media advisory"
  | "Speech"
  | "Other";

export type NewsEntry = {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  type: NewsType;
};

export { EE_ROUNDS_PAGE };

const toInt = (s: unknown) => {
  const n = parseInt(String(s ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
};

export async function getDraws(): Promise<Draw[]> {
  try {
    const res = await fetch(EE_ROUNDS_URL, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = (await res.json()) as { rounds?: Record<string, string>[] };
    return (data.rounds ?? [])
      .map((r): Draw | null => {
        const number = toInt(r.drawNumber);
        const crs = toInt(r.drawCRS);
        const size = toInt(r.drawSize);
        if (number === null || crs === null || size === null || !r.drawDate) return null;
        return {
          number,
          date: r.drawDate,
          name: r.drawName ?? "",
          size,
          crs,
          poolSize: toInt(r.dd18),
          url: `https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds/invitations.html?q=${number}`,
        };
      })
      .filter((d): d is Draw => d !== null)
      .sort((a, b) => b.number - a.number);
  } catch {
    return [];
  }
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/­/g, "")
    .trim();

const TYPE_MAP: Record<string, NewsType> = {
  "news releases": "News release",
  backgrounders: "Backgrounder",
  statements: "Statement",
  "media advisories": "Media advisory",
  speeches: "Speech",
};

export async function getNews(): Promise<NewsEntry[]> {
  try {
    const res = await fetch(NEWS_URL, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    return entries
      .map((e): NewsEntry | null => {
        const pick = (re: RegExp) => decode(e.match(re)?.[1] ?? "");
        const url = e.match(/<link[^>]*href="([^"]+)"/)?.[1] ?? "";
        const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/);
        if (!url || !title) return null;
        const term = (e.match(/<category[^>]*term="([^"]+)"/)?.[1] ?? "").toLowerCase();
        return {
          id: url,
          title,
          summary: pick(/<summary[^>]*>([\s\S]*?)<\/summary>/),
          url: url.replace(/^http:/, "https:"),
          publishedAt: pick(/<updated>([\s\S]*?)<\/updated>/),
          type: TYPE_MAP[term] ?? "Other",
        };
      })
      .filter((n): n is NewsEntry => n !== null);
  } catch {
    return [];
  }
}
