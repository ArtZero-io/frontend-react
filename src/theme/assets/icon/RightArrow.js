import { Icon } from "@chakra-ui/react";

export default function RightArrowIcon({
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
        d="M4.063 13h17.875m-7.313-7.312L21.938 13l-7.313 7.313"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
