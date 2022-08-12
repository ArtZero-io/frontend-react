import { Icon } from "@chakra-ui/react";

export default function SendIcon({
  color = "#7ae7ff",
  width = "25px",
  height = "25px",
}) {
  return (
    <Icon
      className="edit-icon"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        _hover={{
          stroke: "#000",
        }}
        d="m8.398 8.007 4.102-4.1 4.102 4.1M12.5 14.844V3.909m8.594 10.935v5.469a.781.781 0 0 1-.782.78H4.688a.781.781 0 0 1-.78-.78v-5.47"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
