import { Container, Fade } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import React from "react";

import { Footer } from "../Footer/Footer";

const NftLayout = ({ children, variant = null }) => {
  return (
    <Container px="0" id="layout-container" minW="full" h="100vh">
      <Navbar variant={variant} />

      <Fade in="true" delay={0.25}>
        {children}
      </Fade>

      <Footer />
    </Container>
  );
};

export default NftLayout;
