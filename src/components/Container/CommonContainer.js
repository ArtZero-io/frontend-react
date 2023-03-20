import React from "react";
import { Box } from "@chakra-ui/react";

function CommonContainer({ children, ...rest }) {
  return (
    <Box as="section" maxW="container.3xl">
      <Box
        {...rest}
        mx="auto"
        maxW="1242px"
        px={{ base: "24px", md: "16px" }}
        py={{ base: "35px", md: "80px" }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CommonContainer;
