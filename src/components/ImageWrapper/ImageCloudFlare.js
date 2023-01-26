import { Image, Skeleton, Square } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCloudFlareImage } from "@utils";

export default function ImageCloudFlare({
  src,
  size = 500,
  objectFitContain = false,
  ...props
}) {
  const [projImage, setProjImage] = useState("");

  useEffect(() => {
    try {
      src && getCloudFlareImage(src, size).then((res) => setProjImage(res));
    } catch (error) {
      console.log("err", error);
    }
  }, [size, src]);

  return (
    <Square {...props} overflow="hidden">
      <Image
        width="full"
        height="full"
        src={projImage}
        objectFit={objectFitContain ? "contain" : "cover"}
        fallback={<Skeleton />}
        className="image-cloudflare"
      />
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
    try {
      src && getCloudFlareImage(src, size).then((res) => setProjImage(res));
    } catch (error) {
      console.log("err", error);
    }
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
