import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Headline from "@/components/ui/Headline";
import Section from "@/components/ui/Section";
import type { LinkContent } from "@/lib/types";

/**
 * Closing call to action: the deepest teal ground with an open doorway
 * drawn into the right edge, and the headline set at display size.
 */
export default function CTABanner({
  title,
  description,
  primary,
  secondary,
  icon,
}: {
  title: string;
  description: string;
  primary: LinkContent;
  secondary?: LinkContent;
  icon?: ReactNode;
}) {
  return (
    <Section tone="cta" spacing="loose" className="relative overflow-hidden">
      {/* Nested doorways bleeding off the right edge */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 hidden h-[80%] w-[30rem] md:block xl:right-[-14rem] 2xl:right-[-6rem]">
        <div className="arch absolute inset-x-0 bottom-0 top-0 border border-clay-light/20" />
        <div className="arch absolute inset-x-16 bottom-0 top-20 border border-clay-light/20" />
        <div className="arch absolute inset-x-32 bottom-0 top-40 bg-clay" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="text-h1 text-linen lg:col-span-8">
            <Headline text={title} emphasisClassName="text-clay-light" />
          </h2>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-md text-body text-linen/75">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primary.href} variant="accent" tone="dark" size="lg" icon={icon}>
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="outline" tone="dark" size="lg">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
