/* eslint-disable no-unused-vars */
import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { IPFS_BASE_URL } from "@constants/index";
import process from "process";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Layout = ({ backdrop, children, variant = null }) => {
  const getCollectionImage = (imageHash, size) => {
    const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
    return (
      baseURL +
      "/getImage?input=" +
      imageHash +
      "&size=" +
      size +
      "&url=" +
      callbackUrl
    );
  };

  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      minH="100vh"
      px="0"
      position="relative"
      bgImage={variant === "marketplace" && bgHeroFull}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      bg={
        variant === "collection-detail"
          ? "linear-gradient(180deg, #000000 3.25%, #000000 3.26%, rgba(0, 0, 0, 0) 16.2%)"
          : " "
      }
    >
      {variant === "collection-detail" && (
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          w="full"
          overflow="hidden"
          align="center"
          zIndex="hide"
        >
          <Box position="relative" w="full" h="full" overflow="hidden">
            <Image
              src={backdrop && getCollectionImage(backdrop, 1024)}
              alt="bg-heroFull"
              w="full"
              h="full"
            />
          </Box>
        </Flex>
      )}

      <Navbar variant={variant} />

      <Fade in="true" delay={0.25}>
        {children}
      </Fade>
    </Container>
  );
};

export default Layout;
