"use client";

import Image from "next/image";
import { useState } from "react";

type ImageSlotProps = {
  src?: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
};

export default function ImageSlot({
  src,
  alt,
  aspectRatio = "16 / 10",
  className = "",
}: ImageSlotProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div
      className={`reveal relative isolate overflow-hidden rounded-xl border border-copy/10 bg-panel ${className}`}
      style={{ aspectRatio }}
    >
      {showImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="image-slot-placeholder absolute inset-0 overflow-hidden"
        >
          <div className="image-slot-grid absolute inset-0 opacity-30" />
          <div className="absolute left-[8%] top-[12%] h-[76%] w-[84%] rounded-lg border border-copy/15 bg-ink/75 p-4 shadow-glow sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="flex gap-1.5">
                <i className="h-2 w-2 rounded-button bg-caution" />
                <i className="h-2 w-2 rounded-button bg-positive" />
                <i className="h-2 w-2 rounded-button bg-cyan" />
              </span>
              <i className="h-2 w-16 rounded-button bg-copy/10" />
            </div>
            <div className="mt-4 grid h-[calc(100%-2.5rem)] grid-cols-[0.72fr_1.7fr] gap-3">
              <div className="space-y-2 rounded-md border border-line bg-copy/[0.03] p-2">
                <i className="block h-2 w-3/4 rounded-button bg-cyan/50" />
                <i className="block h-2 w-full rounded-button bg-copy/10" />
                <i className="block h-2 w-4/5 rounded-button bg-copy/10" />
                <i className="mt-4 block h-8 rounded-sm bg-copy/5" />
                <i className="block h-8 rounded-sm bg-copy/5" />
              </div>
              <div className="min-w-0">
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <i className="h-12 rounded-md border border-line bg-copy/[0.04]" />
                  <i className="h-12 rounded-md border border-line bg-copy/[0.04]" />
                  <i className="h-12 rounded-md border border-line bg-copy/[0.04]" />
                </div>
                <div className="space-y-2 rounded-md border border-line bg-copy/[0.03] p-2">
                  <i className="block h-2 w-1/3 rounded-button bg-copy/15" />
                  <i className="block h-5 rounded-sm bg-copy/5" />
                  <i className="block h-5 rounded-sm bg-cyan/10" />
                  <i className="block h-5 rounded-sm bg-copy/5" />
                </div>
              </div>
            </div>
          </div>
          <span className="absolute bottom-4 left-5 max-w-[75%] text-xs leading-5 text-copy/60 sm:bottom-6 sm:left-7">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
