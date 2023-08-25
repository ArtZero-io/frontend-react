import { Image } from "@chakra-ui/react";
import AstarIcon from "../icon/Astar.png";

export default function Astar({ width = "25px", height = "24px" }) {
  return <Image width={width} height={height} src={AstarIcon} />;
}
