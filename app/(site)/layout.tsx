import type { ReactNode } from "react";
import ChatWidget from "@/components/chat/ChatWidget";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getChatContent, getFooter, getNavContent } from "@/lib/api/content";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [nav, footer, chat] = await Promise.all([
    getNavContent(),
    getFooter(),
    getChatContent(),
  ]);

  return (
    <>
      <Navbar content={nav} />
      <main className="flex-1">{children}</main>
      <Footer content={footer} brand={nav.brand} />
      <ChatWidget content={chat} />
    </>
  );
}
