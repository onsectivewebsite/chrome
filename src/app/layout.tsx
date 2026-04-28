import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sans = Inter({
  variable: "--font-sans-display",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chrome Visa Solution — Premium Canadian Immigration Consultancy",
  description:
    "Chrome Visa Solution is a Canadian immigration firm guiding professionals, entrepreneurs, and families to permanent residency, work permits, study permits and citizenship.",
  keywords: [
    "Canadian immigration",
    "Express Entry",
    "PNP",
    "Work Permit",
    "Study Permit",
    "Visa consultant",
    "Chrome Visa Solution",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
