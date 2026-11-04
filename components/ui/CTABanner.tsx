import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { LinkContent } from "@/lib/types";

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
    <section className="section-dark pb-12 sm:pb-16">
      <Container>
        <div className="cta-banner-surface relative overflow-hidden rounded-xl border border-cyan/20 px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="relative max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.035em] text-copy sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 leading-7 text-muted">{description}</p>
          </div>
          <div className="relative mt-7 flex flex-wrap gap-3 lg:mt-0">
            <Button href={primary.href} icon={icon}>{primary.label}</Button>
            {secondary ? (
              <Button href={secondary.href} variant="outline">{secondary.label}</Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
