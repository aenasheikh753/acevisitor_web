import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  /** Natural pixel size of the file; the frame keeps this aspect ratio and never renders wider than it. */
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * A raster image shown at its natural aspect ratio inside a framed card
 * (rounded-2xl, token border, soft shadow). It is never stretched or
 * upscaled beyond its natural width.
 */
export default function FramedImage({ src, alt, width, height, sizes, className = "", priority = false }: FramedImageProps) {
  return (
    <div
      className={`framed-media relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{ maxWidth: `${width}px`, aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
