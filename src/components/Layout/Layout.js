import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { IPFS_BASE_URL } from "@constants/index";
import process from "process";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Layout = ({ backdrop, children }) => {
  
  const getCollectionImage = (imageHash, size) => {
    const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
    return baseURL + '/getImage?input=' + imageHash + '&size=' + size + '&url=' + callbackUrl;
  }

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
            src={backdrop ? getCollectionImage(backdrop, 1024) : bgHeroFull}
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
