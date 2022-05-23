import { Box } from "@chakra-ui/react";
import React from "react";

function PixelCard({ dimensions }) {
  return (
    <Box
      pos="absolute"
      top="0"
      left="0"
      bg="yellow"
      color="blue"
      zIndex="modal"
      fontSize="10px"
      px="1px"
    >
      {dimensions && dimensions?.borderBox?.width} px w
    </Box>
  );
}

export default PixelCard;
