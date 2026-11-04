import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-12">{children}</main>;
}
