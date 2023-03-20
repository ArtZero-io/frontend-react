import { Icon } from "@chakra-ui/react";

export default function LeftArrowIcon({
  color = "#7ae7ff",
  width = "26px",
  height = "26px",
}) {
  return (
    <Icon
      className="LeftArrowIcon"
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M21.938 13H4.063m7.312-7.312L4.062 13l7.313 7.313"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
