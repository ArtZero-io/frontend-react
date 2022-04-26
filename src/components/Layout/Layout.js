import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { IPFS_BASE_URL } from "@constants/index";

const Layout = ({ backdrop, children }) => {
  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      minH="100vh"
      px={{ sm: "0" }}
      position="relative"
    >
      <Flex
        id="image-wrapper"
        position="absolute"
        top={30}
        insetX="0"
        w="full"
        h={backdrop ? "xl" : "full"}
        overflow="hidden"
        align="center"
        zIndex="hide"
      >
        <Box position="relative" w="full" h="full">
          <Image
            src={backdrop ? `${IPFS_BASE_URL}/${backdrop}` : bgHeroFull}
            alt="bg-heroFull"
            w="full"
            h="full"
          />
          <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
        </Box>
      </Flex>

      <Navbar />

      <Fade in="true" delay={0.15}>
        {children}
      </Fade>
    </Container>
  );
};

export default Layout;
