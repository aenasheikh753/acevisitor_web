import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  /** Natural pixel size of the file. The image always renders at this aspect ratio — never cropped or stretched. */
  width: number;
  height: number;
  sizes: string;
  /** Size the frame with Tailwind utilities, e.g. "mx-auto max-w-md". */
  className?: string;
  priority?: boolean;
  /** Frame shape: a crisp print ("square"), a soft doorway top ("soft"), or a full arch ("arch"). */
  shape?: "square" | "soft" | "arch";
};

const shapeClasses = {
  square: "rounded-lg",
  soft: "arch-soft",
  arch: "arch",
};

/**
 * A photo in a paper frame with the offset shadow. The image is shown at its real
 * proportions (`h-auto w-full`); limit its size with a `max-w-*` class so it is
 * always displayed well below its pixel width and stays sharp.
 */
export default function FramedImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  shape = "square",
}: FramedImageProps) {
  return (
    <div className={`framed-media relative w-full overflow-hidden ${shapeClasses[shape]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}
