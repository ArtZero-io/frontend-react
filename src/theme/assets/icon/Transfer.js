import { Icon } from "@chakra-ui/react";

export default function TransferIcon({
  color = "#7ae7ff",
  width = "21px",
  height = "21px",
}) {
  return (
    <Icon
      className="transfer-icon"
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="m13.75 11.25 2.5 2.5-2.5 2.5m-10-2.5h12.5m-10-5-2.5-2.5 2.5-2.5m10 2.5H3.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}
