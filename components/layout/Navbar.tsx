"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import type { NavContent } from "@/lib/types";

type NavbarProps = {
  content: NavContent;
};

export default function Navbar({ content }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  function getNavLinkClass(href: string) {
    return `relative inline-flex items-center whitespace-nowrap rounded-[10px] px-2 py-2 text-sm transition-colors duration-200 hover:bg-white/5 hover:text-[var(--color-nav-hover)] ${
      isActive(href)
        ? "bg-white/10 font-medium text-[var(--color-primary)]"
        : "font-normal text-muted"
    }`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-copy/8 bg-ink/75 backdrop-blur-xl">
      <nav
        className="container-page grid h-[76px] min-w-0 grid-cols-[1fr_auto_1fr] items-center"
        aria-label={content.navigationLabel}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/acevisitor-logo.png"
            alt="AceVisitor logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-md object-cover"
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-[var(--color-primary)]">{content.brand}</span>
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-0.5 xl:gap-1 lg:flex">
          {content.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={getNavLinkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-5 lg:flex">
          <Link
            href="/login"
            aria-current={isActive("/login") ? "page" : undefined}
            className={getNavLinkClass("/login")}
          >
            {content.login}
          </Link>
          <Button href="/contact" variant="accent" size="sm">{content.demo}</Button>
        </div>

        <div className="col-start-3 justify-self-end lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            aria-label={isOpen ? content.menuClose : content.menuOpen}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
            icon={<IconBox icon={isOpen ? "x" : "menu"} />}
          >
            <span className="sr-only">{isOpen ? content.menuClose : content.menuOpen}</span>
          </Button>
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-line bg-ink/95 px-5 pb-6 pt-3 lg:hidden">
          <div className="container-page flex flex-col gap-1">
            {content.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${getNavLinkClass(link.href)} w-full px-3 py-3 ${isActive(link.href) ? "bg-white/10" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/login") ? "page" : undefined}
              className={`${getNavLinkClass("/login")} w-full px-3 py-3 ${isActive("/login") ? "bg-white/10" : ""}`}
            >
              {content.login}
            </Link>
            <div className="mt-2">
              <Button href="/contact" variant="accent" fullWidth>{content.demo}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
