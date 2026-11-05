import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitLayout from "@/components/ui/SplitLayout";
import { getContactContent } from "@/lib/api/content";

export default async function ContactPage() {
  const content = await getContactContent();

  return (
    <>
      <PageHero {...content.hero} />
      <Section tone="dark-1">
        <Container>
          <SplitLayout
            columns="minmax(0, 0.85fr) minmax(0, 1.15fr)"
            start={
              <SectionHeading
                eyebrow={content.contactEyebrow}
                title={content.contactTitle}
                description={content.contactDescription}
              />
            }
            end={<ContactForm content={content} />}
          />
        </Container>
      </Section>
    </>
  );
}
