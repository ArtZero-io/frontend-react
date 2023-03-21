import { Icon } from "@chakra-ui/react";

export default function BigGridIcon({
  color = "#7ae7ff",
  width = "21px",
  height = "21px",
}) {
  return (
    <Icon
      className="big-grid-icon"
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M18.612 1H2.326a.857.857 0 0 0-.857.857v16.286c0 .473.384.857.857.857h16.286a.857.857 0 0 0 .857-.857V1.857A.857.857 0 0 0 18.612 1Zm-8.143 0v18m9-9h-18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
