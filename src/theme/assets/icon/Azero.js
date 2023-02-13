import { Image } from "@chakra-ui/react";
import AstarLogo from "@theme/assets/logo/astar-logo.png"

export default function AzeroIcon({
  fill = "#7AE7FF",
  w = "18px",
  h = "18px",
  ...rest
}) {
  return (
    <Image {...rest} marginBottom={'0px'} w={w} h={w || h} src={AstarLogo} display="inline-block" >
    </Image>
  );
}
