import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { getNavContent } from "@/lib/api/content";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const navContent = await getNavContent();

  return {
    title: {
      default: navContent.metadataTitle,
      template: navContent.metadataTemplate,
    },
    description: navContent.metadataDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
