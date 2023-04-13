import { Icon } from "@chakra-ui/react";

export default function PrevArrowIcon({
  color = "#7ae7ff",
  width = "14",
  height = "26",
}) {
  return (
    <Icon
      className="PrevArrowIcon"
      width={width}
      height={height}
      viewBox="0 0 14 26"
      fill="none"
    >
      <path d="M13 1 2 12l11 11" stroke="#fff" stroke-width="2" />
    </Icon>
  );
}
