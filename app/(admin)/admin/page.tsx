import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getAdminContent } from "@/lib/api/content";

export default async function AdminPage() {
  const adminContent = await getAdminContent();

  return (
    <Section className="min-h-screen">
      <Container className="pt-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">{adminContent.eyebrow}</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-copy">{adminContent.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">{adminContent.description}</p>
      </Container>
    </Section>
  );
}
