import { loadingContent } from "@/lib/content/states";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label={loadingContent.label}
      className="container-page flex min-h-[50vh] items-center justify-center"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-cyan" />
    </div>
  );
}
