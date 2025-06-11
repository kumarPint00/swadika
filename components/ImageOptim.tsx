import NextImage, { ImageProps } from "next/image";

export default function ImageOptim(props: ImageProps) {
  return (
    <NextImage
      priority={props.priority ?? false}
      sizes={props.sizes ?? "(max-width:600px) 100vw, 50vw"}
      placeholder="blur"
      blurDataURL="/blur.jpg" // tiny 1×1 base64 fallback
      {...props}
    />
  );
}
