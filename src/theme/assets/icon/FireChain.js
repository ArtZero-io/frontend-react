import { Image } from "@chakra-ui/react";
import FireChainIcon from "../icon/FireChain.png";

export default function FireChain({ width = "25px", height = "24px" }) {
  return <Image width={width} height={height} src={FireChainIcon} />;
}
