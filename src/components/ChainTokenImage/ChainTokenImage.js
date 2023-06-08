import { Image } from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { CHAIN_TOKEN_LIST } from "@constants";
import AstarLogoImage from "@theme/assets/icon/Astar.png";
import FiveireLogoImage from "@theme/assets/icon/5ire.png";

export const ChainTokenImage = ({ chainToken, ...rest }) => {
  switch (chainToken) {
    case CHAIN_TOKEN_LIST.AZERO:
      return <AzeroIcon {...rest} />;

    case CHAIN_TOKEN_LIST.TZERO:
      return <AzeroIcon {...rest} />;

    case CHAIN_TOKEN_LIST.ASTR:
      return <Image {...rest} src={AstarLogoImage} />;

    case CHAIN_TOKEN_LIST.SBY:
      return <Image {...rest} src={AstarLogoImage} />;

    case CHAIN_TOKEN_LIST.FIVE_IRE:
      return <Image {...rest} src={FiveireLogoImage} />;

    default:
      return null;
  }
};
