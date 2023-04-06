import { Icon } from "@chakra-ui/react";

export default function UploadIcon({
  color = "#7ae7ff",
  width = "20px",
  height = "20px",
}) {
  return (
    <Icon
      className="UploadIcon"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      
    >
      <path
        d="M6.719 6.406 10 3.125l3.281 3.281M10 11.875v-8.75m6.875 8.75v4.375a.624.624 0 0 1-.625.625H3.75a.625.625 0 0 1-.625-.625v-4.375"
        stroke="#7AE7FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
