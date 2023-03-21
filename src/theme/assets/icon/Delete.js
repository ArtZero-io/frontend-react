import { Icon } from "@chakra-ui/react";

export default function DeleteIcon({
  color = "#7ae7ff",
  width = "25px",
  height = "25px",
}) {
  return (
    <Icon
      className="lock-icon"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        _hover={{
          stroke: "#7ae7ff",
        }}
        d="M21.094 5.469H3.906m6.25 4.687v6.25m4.688-6.25v6.25m4.687-10.937v14.843a.781.781 0 0 1-.781.782H6.25a.781.781 0 0 1-.781-.782V5.47"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        _hover={{
          stroke: "#7ae7ff",
        }}
        d="M16.406 5.469V3.906a1.563 1.563 0 0 0-1.562-1.562h-4.688a1.562 1.562 0 0 0-1.562 1.562V5.47"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
