"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { errorContent } from "@/lib/content/states";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section className="min-h-[65vh]">
      <Container className="flex flex-col items-start justify-center">
        <h1 className="font-heading text-3xl font-semibold text-copy">{errorContent.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">{errorContent.description}</p>
        <Button className="mt-7" onClick={reset}>{errorContent.retry}</Button>
      </Container>
    </Section>
  );
}
