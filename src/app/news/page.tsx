import type { Metadata } from "next";
import { getDraws, getNews } from "@/lib/ircc";
import { NewsBrowser, type FeedItem } from "./news-browser";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Newsroom — Chrome Visa Solutions",
  description:
    "Live IRCC news releases, backgrounders, statements and every Express Entry round of invitations — sourced directly from the Government of Canada.",
};

export default async function NewsPage() {
  const [news, draws] = await Promise.all([getNews(), getDraws()]);

  const items: FeedItem[] = [
    ...news.map((n) => ({
      id: n.id,
      title: n.title,
      summary: n.summary !== n.title ? n.summary : "",
      url: n.url,
      date: n.publishedAt,
      type: n.type as string,
    })),
    ...draws.map((d) => ({
      id: `draw-${d.number}`,
      title: `Express Entry draw #${d.number}: ${d.size.toLocaleString("en-CA")} invitations, CRS ${d.crs}`,
      summary: `Round type: ${d.name}. Minimum Comprehensive Ranking System score of ${d.crs}.`,
      url: d.url,
      date: d.date,
      type: "Express Entry draw",
    })),
  ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return <NewsBrowser items={items} />;
}
