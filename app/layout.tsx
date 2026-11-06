import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { getNavContent } from "@/lib/api/content";
import "./globals.css";

/** Display serif: headlines, numerals, margin notes. Variable optical size + softness. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

/** Working sans: body, UI, labels, forms. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const navContent = await getNavContent();

  return {
    title: {
      default: navContent.metadataTitle,
      template: navContent.metadataTemplate,
    },
    description: navContent.metadataDescription,
    icons: {
      icon: "/images/acevisitor-logo.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
