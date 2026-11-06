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
  /** Optional tighter display cap (any CSS length); the natural pixel width always applies too. */
  maxWidth?: string;
  /** Frame shape: a crisp print ("square"), a soft doorway top ("soft"), or a full arch ("arch"). */
  shape?: "square" | "soft" | "arch";
  /** Override the natural aspect ratio (image is cropped with object-cover). */
  aspect?: string;
};

const shapeClasses = {
  square: "rounded-[0.5rem]",
  soft: "arch-soft",
  arch: "arch",
};

/**
 * A raster image shown in a paper frame with the offset shadow.
 * It is never upscaled beyond its natural width.
 */
export default function FramedImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  maxWidth,
  shape = "square",
  aspect,
}: FramedImageProps) {
  return (
    <div
      className={`framed-media relative w-full overflow-hidden ${shapeClasses[shape]} ${className}`}
      style={{ maxWidth: maxWidth ? `min(${width}px, ${maxWidth})` : `${width}px`, aspectRatio: aspect ?? `${width} / ${height}` }}
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
