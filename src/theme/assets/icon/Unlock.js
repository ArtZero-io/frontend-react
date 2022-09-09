import { Icon } from "@chakra-ui/react";

export default function UnlockIcon({
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
        d="M10.4 13.1a1.562 1.562 0 1 0 0-3.125 1.562 1.562 0 0 0 0 3.125Zm0 0v1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.65 7.475H4.15a.625.625 0 0 0-.626.625v8.75c0 .345.28.625.625.625h12.5c.346 0 .625-.28.625-.625V8.1a.625.625 0 0 0-.625-.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.587 7.475V4.663a2.813 2.813 0 0 1 5.625 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
