"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import type { NavContent } from "@/lib/types";

type NavbarProps = {
  content: NavContent;
};

/** The small doorway that marks the current page. */
function ActiveArch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 9" aria-hidden="true" className={className} fill="none">
      <path d="M1.5 8.5V7a6.5 6.5 0 0 1 13 0v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({ content }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  function navLinkClass(href: string) {
    return `relative inline-flex flex-col items-center whitespace-nowrap rounded-[0.3rem] px-2.5 pb-2 pt-1.5 text-[0.9375rem] transition-colors duration-200 ${
      isActive(href) ? "font-semibold text-linen" : "text-linen/70 hover:text-linen"
    }`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linen/10 bg-spruce/85 backdrop-blur-md [--focus:var(--clay-light)]">
      <nav
        className="container-page grid h-[var(--nav-h)] min-w-0 grid-cols-[auto_1fr_auto] items-center gap-6"
        aria-label={content.navigationLabel}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/acevisitor-logo.png"
            alt="AceVisitor logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-cover"
          />
          <span className="font-display text-[1.375rem] leading-none tracking-[-0.02em] text-linen">{content.brand}</span>
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex">
          {content.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={navLinkClass(link.href)}
            >
              {link.label}
              <ActiveArch
                className={`absolute bottom-0 h-[7px] w-3.5 text-clay-light transition-opacity duration-200 ${isActive(link.href) ? "opacity-100" : "opacity-0"}`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-3 xl:flex">
          <Link
            href="/login"
            aria-current={isActive("/login") ? "page" : undefined}
            className="link-draw rounded-[0.3rem] px-2 py-1 text-[0.9375rem] font-medium text-linen"
          >
            {content.login}
          </Link>
          <Button href="/contact" variant="accent" tone="dark" size="sm">
            {content.demo}
          </Button>
        </div>

        <div className="col-start-3 justify-self-end xl:hidden">
          <Button
            variant="ghost"
            tone="dark"
            size="sm"
            shape="circle"
            className="h-11 w-11 !px-0"
            aria-label={isOpen ? content.menuClose : content.menuOpen}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
            icon={<IconBox icon={isOpen ? "x" : "menu"} size="lg" />}
          >
            <span className="sr-only">{isOpen ? content.menuClose : content.menuOpen}</span>
          </Button>
        </div>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-t border-linen/10 bg-spruce xl:hidden"
        >
          <div className="container-page flex flex-col pb-10 pt-6">
            <ul className="flex flex-col">
              {[...content.links, { label: content.login, href: "/login" }].map((link) => (
                <li key={link.href} className="border-b border-linen/10">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 font-display text-[1.75rem] leading-tight tracking-[-0.015em] ${
                      isActive(link.href) ? "italic text-clay-light" : "text-linen"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) ? <ActiveArch className="h-3 w-5 text-clay-light" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact" variant="accent" tone="dark" size="lg" fullWidth>
                {content.demo}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
