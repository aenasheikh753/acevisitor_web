import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import IconBox from "@/components/ui/IconBox";
import type { FooterContent } from "@/lib/types";

type FooterProps = {
  content: FooterContent;
  brand: string;
};

export default function Footer({ content, brand }: FooterProps) {
  return (
    <footer className="border-t border-line bg-ink pb-8 pt-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/acevisitor-logo.png"
                alt="AceVisitor logo"
                width={36}
                height={36}
                className="h-10 w-10 shrink-0 object-cover"
              />
              <span className="font-heading text-lg font-semibold tracking-tight text-copy">{brand}</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted">{content.summary}</p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-copy">{content.productLabel}</h2>
            <ul className="mt-4 space-y-3">
              {content.productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition hover:text-copy">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-copy">{content.companyLabel}</h2>
            <ul className="mt-4 space-y-3">
              {content.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition hover:text-copy">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-copy">{content.contactLabel}</h2>
            <Link href={content.contactHref} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-copy">
              {content.contactCta}<IconBox icon="arrow-up-right" size="sm" />
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{content.copyright}</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-copy">{content.privacy}</Link>
            <Link href="/contact" className="hover:text-copy">{content.terms}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
