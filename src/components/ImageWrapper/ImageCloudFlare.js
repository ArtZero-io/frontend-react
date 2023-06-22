import { Image, Skeleton, Square } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { getCloudFlareImage } from "@utils";

export default function ImageCloudFlare({
  src,
  size = 500,
  objectFitContain = false,
  ...props
}) {
  const [projImage, setProjImage] = useState("");

  const isMp4 = useMemo(() => src?.includes(".mp4"), [src]);
  const isZeroId = useMemo(() => src?.includes("zero.id"), [src]);

  useEffect(() => {
    let isMounted = true;

    if (isMp4 || isZeroId) {
      return setProjImage(src);
    }

    try {
      src &&
        getCloudFlareImage(src, size).then((res) => {
          if (isMounted) {
            setProjImage(res);
          }
        });
    } catch (error) {
      console.log("err", error);
    }
    return () => (isMounted = false);
  }, [size, src]);

  return (
    <Square {...props} overflow="hidden">
      {isMp4 ? (
        <video
          loop
          autoPlay
          controls={true}
          playsInline={true}
          width="100%"
          height="100%"
          style={{
            objectFit: "contain",
            borderRadius: "initial",
          }}
        >
          <source src={projImage} type="video/mp4" />
        </video>
      ) : (
        <Image
          width="full"
          height="full"
          src={projImage}
          objectFit={objectFitContain ? "contain" : "cover"}
          fallback={<Skeleton />}
          className="image-cloudflare"
        />
      )}
    </Square>
  );
}

export function ImageCloudFlareLaunchpad({
  src,
  size = 500,
  objectFitContain = false,
  ...props
}) {
  const [projImage, setProjImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    try {
      src &&
        getCloudFlareImage(src, size).then((res) => {
          if (isMounted) {
            setProjImage(res);
          }
        });
    } catch (error) {
      console.log("err", error);
    }
    return () => (isMounted = false);
  }, [size, src]);

  return (
    <Square {...props} overflow="hidden">
      <Image
        width="full"
        height="full"
        src={projImage}
        objectFit={objectFitContain ? "contain" : "cover"}
        fallbackSrc="https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/Qmc1az4MVBL9MhfLLv3b1Hf9RCs9AoqXR2AZuUZb2XBhpJ/500"
        className="image-cloudflare"
      />
    </Square>
  );
}
