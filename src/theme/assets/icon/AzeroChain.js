import { Image } from "@chakra-ui/react";
import AzeroChainIcon from "../icon/AzeroChain.png";

export default function AzeroChain({ width = "25px", height = "24px" }) {
  return <Image width={width} height={height} src={AzeroChainIcon} />;
}
