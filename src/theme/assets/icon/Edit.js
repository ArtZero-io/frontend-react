import { Icon } from "@chakra-ui/react";

export default function EditIcon({
  color = "#7ae7ff",
  width = "28px",
  height = "28px",
}) {
  return (
    <Icon
      className="edit-icon"
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        _hover={{
          stroke: "#000",
        }}
        d="M10.5 23.625H5.25a.875.875 0 0 1-.875-.875v-4.887a.875.875 0 0 1 .256-.62L17.756 4.12a.875.875 0 0 1 1.238 0l4.887 4.887a.875.875 0 0 1 0 1.238L10.5 23.625ZM14.875 7 21 13.125"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
