import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getNotFoundContent } from "@/lib/api/content";

export default async function NotFound() {
  const content = await getNotFoundContent();

  return (
    <Section className="min-h-[65vh]">
      <Container className="flex flex-col items-start justify-center">
        <h1 className="font-heading text-3xl font-semibold text-copy">{content.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">{content.description}</p>
        <Button href="/" className="mt-7">{content.actionLabel}</Button>
      </Container>
    </Section>
  );
}
