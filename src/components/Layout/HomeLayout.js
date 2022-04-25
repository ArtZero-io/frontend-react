/* eslint-disable no-unused-vars */
import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { IPFS_BASE_URL } from "@constants/index";
import BigHomePageBg from "@theme/assets/bg-homepage-big.png";

const HomeLayout = ({ children }) => {
  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      px={{ sm: "0" }}
      position="relative"
      bgImage={BigHomePageBg}
      bgPosition="center"
      bgRepeat="no-repeat"
      zIndex="-9"
    >
      <Navbar />
      <Fade in="true" delay={0.15}>
        {children}
      </Fade>
    </Container>
  );
};

export default HomeLayout;
