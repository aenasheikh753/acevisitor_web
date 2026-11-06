import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import VisitorPath from "@/components/visuals/VisitorPath";
import type { FooterContent } from "@/lib/types";

type FooterProps = {
  content: FooterContent;
  brand: string;
};

function LinkColumn({ label, links }: { label: string; links: FooterContent["productLinks"] }) {
  return (
    <div>
      <h2 className="margin-note text-clay-light">{label}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="link-draw text-linen/80 transition-colors hover:text-linen">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ content, brand }: FooterProps) {
  return (
    <footer className="footer-surface relative isolate overflow-hidden pt-[clamp(4rem,8vw,7rem)]">
      {/* The visitor path runs faintly through the footer background, behind the content */}
      <VisitorPath
        variant="footer"
        strokeClassName="stroke-clay-light"
        className="pointer-events-none absolute inset-x-0 bottom-16 -z-10 h-28 w-full opacity-30 sm:bottom-14 sm:h-36 lg:bottom-10 lg:h-44"
      />

      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/acevisitor-logo.png"
                alt="AceVisitor logo"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 object-cover"
              />
              <span className="font-display text-[1.375rem] leading-none text-linen">{brand}</span>
            </Link>
            <p className="mt-8 max-w-xl font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] tracking-[-0.015em] text-linen">
              {content.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:pl-12">
            <LinkColumn label={content.productLabel} links={content.productLinks} />
            <LinkColumn label={content.companyLabel} links={content.companyLinks} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="margin-note text-clay-light">{content.contactLabel}</h2>
              <Link
                href={content.contactHref}
                className="group mt-5 inline-flex items-start gap-2 font-display text-[1.375rem] leading-tight text-linen"
              >
                <span className="link-draw">{content.contactCta}</span>
                <IconBox
                  icon="arrow-up-right"
                  size="md"
                  className="mt-1 text-clay-light transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-linen/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.875rem] text-linen/65 sm:flex-row sm:items-center sm:justify-between">
          <p>{content.copyright}</p>
          {/* Right padding keeps Terms clear of the floating chat button */}
          <div className="flex gap-6 sm:pr-24">
            <Link href="/contact" className="link-draw hover:text-linen">
              {content.privacy}
            </Link>
            <Link href="/contact" className="link-draw hover:text-linen">
              {content.terms}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
