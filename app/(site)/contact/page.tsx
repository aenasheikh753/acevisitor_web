import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { getContactContent } from "@/lib/api/content";

export default async function ContactPage() {
  const content = await getContactContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section className="!pt-0">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow={content.contactEyebrow}
              title={content.contactTitle}
              description={content.contactDescription}
            />
          </div>
          <ContactForm content={content} />
        </Container>
      </Section>
    </>
  );
}
