import type { Metadata } from "next";
import { NEWS, CATEGORIES } from "@/data/news";
import { NewsBrowser } from "./news-browser";

export const metadata: Metadata = {
  title: "Newsroom — Chrome Visa Solutions",
  description: `Curated Canadian immigration news: Express Entry draws, PNP results, IRCC policy, court rulings and processing times. ${NEWS.length}+ stories indexed.`,
};

export default function NewsPage() {
  return (
    <NewsBrowser items={NEWS} categories={CATEGORIES} />
  );
}
