import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getAuthContent, getNavContent } from "@/lib/api/content";

const fieldClass =
  "mt-2 w-full rounded-md border border-line bg-copy/[0.04] px-4 py-3 text-sm text-copy placeholder:text-muted/70 focus-visible:border-cyan focus-visible:outline-none";

export default async function LoginPage() {
  const [authContent, navContent] = await Promise.all([
    getAuthContent(),
    getNavContent(),
  ]);

  return (
    <div className="glass-card w-full max-w-md rounded-xl p-7 sm:p-10">
      <Link href="/" className="inline-flex items-center gap-2.5">
        <Image
          src="/images/acevisitor-logo.png"
          alt="AceVisitor logo"
          width={36}
          height={36}
          className="h-10 w-10 shrink-0 object-cover"
        />
        <span className="font-heading text-lg font-semibold text-copy">{navContent.brand}</span>
      </Link>
      <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-cyan">{authContent.loginEyebrow}</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-copy">{authContent.loginTitle}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">{authContent.loginDescription}</p>
      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="login-email" className="text-sm font-medium text-copy">{authContent.emailLabel}</label>
          <input id="login-email" name="email" type="email" autoComplete="username" required placeholder={authContent.emailPlaceholder} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="login-password" className="text-sm font-medium text-copy">{authContent.passwordLabel}</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder={authContent.passwordPlaceholder} className={fieldClass} />
        </div>
        <Button type="submit" fullWidth>{authContent.submitLabel}</Button>
      </form>
      <div className="mt-5 flex flex-col items-center gap-4 text-xs text-muted">
        <Link href="/contact" className="transition hover:text-cyan">{authContent.forgotPassword}</Link>
        <p>{authContent.note}</p>
      </div>
    </div>
  );
}
