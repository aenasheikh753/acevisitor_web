import ChatWidget from "@/components/chat/ChatWidget";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getChatContent, getFooter, getNavContent, getNotFoundContent } from "@/lib/api/content";

export default async function NotFound() {
  const [nav, footer, chat, content] = await Promise.all([
    getNavContent(),
    getFooter(),
    getChatContent(),
    getNotFoundContent(),
  ]);

  return (
    <>
      <Navbar content={nav} />
      <main>
        <Section className="min-h-[65vh]">
          <Container className="flex flex-col items-start justify-center">
            <h1 className="font-heading text-3xl font-semibold text-copy">{content.title}</h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">{content.description}</p>
            <Button href="/" className="mt-7">{content.actionLabel}</Button>
          </Container>
        </Section>
      </main>
      <Footer content={footer} brand={nav.brand} />
      <ChatWidget content={chat} />
    </>
  );
}
