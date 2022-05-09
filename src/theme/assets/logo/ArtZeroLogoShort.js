import { chakra } from "@chakra-ui/react";
import * as React from "react";

export const ArtZeroLogoShort = ({ display }) => {
  // const { iconColor = "currentColor", ...rest } = props;
  // const color = useToken("colors", iconColor);
  return (
    <chakra.svg
      display={display}
      width="37.3px"
      height="33px"
      viewBox="0 0 340 300"
      fill="none"
    >
      <path
        d="M339.842 0V300.283H277.838V261.646H140.303L200.974 198.514H277.838V89.3674L67.128 300.283H0V272.816L272.816 0H339.842Z"
        fill="#7AE7FF"
      />
    </chakra.svg>
  );
};
