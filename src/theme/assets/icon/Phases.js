import { Icon } from "@chakra-ui/react";

export default function PhasesIcon({
  color = "#7ae7ff",
  width = "20px",
  height = "14px",
}) {
  return (
    <Icon
      className="phases-icon"
      width={width}
      height={height}
      viewBox="0 0 20 14"
      fill={color}
    >
      <path d="M17.719.438H4.594A1.312 1.312 0 0 0 3.28 1.75v9.844a.656.656 0 0 1-1.312 0V3.719a.656.656 0 1 0-1.313 0v7.875a1.969 1.969 0 0 0 1.969 1.969h14.438a1.977 1.977 0 0 0 1.968-1.97V1.75A1.312 1.312 0 0 0 17.72.437Zm-3.282 8.53H7.875a.656.656 0 1 1 0-1.312h6.563a.656.656 0 1 1 0 1.313Zm0-2.624H7.875a.656.656 0 1 1 0-1.313h6.563a.656.656 0 1 1 0 1.313Z" />
    </Icon>
  );
}
