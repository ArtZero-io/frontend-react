import { Box } from "@chakra-ui/react";
import React from "react";

function PixelCard({ dimensions, top = 0 }) {
  return (
    <Box
      pos="absolute"
      top={top}
      left="0"
      bg="yellow"
      color="blue"
      zIndex="modal"
      fontSize="20px"
      px="1px"
    >
      {dimensions && dimensions?.borderBox?.width.toFixed(2)}
    </Box>
  );
}

export default PixelCard;
