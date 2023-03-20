import { Icon } from "@chakra-ui/react";

export default function LockIcon({
  color = "#7ae7ff",
  width = "21px",
  height = "21px",
}) {
  return (
    <Icon
      className="lock-icon"
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M10 12.5a1.563 1.563 0 1 0 0-3.125 1.563 1.563 0 0 0 0 3.125Zm0 0v1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 6.875H3.75a.625.625 0 0 0-.625.625v8.75c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V7.5a.625.625 0 0 0-.625-.625Zm-9.062 0V4.062a2.813 2.813 0 0 1 5.625 0v2.813"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
