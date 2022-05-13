/* eslint-disable no-unused-vars */
import { Box, Container, Fade, Flex, Image, Skeleton } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { IPFS_BASE_URL } from "@constants/index";
import process from "process";
import { Footer } from "../Footer/Footer";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const linerGradient =
  "linear-gradient(180deg, #000000 2%, #00000000 6%)"

const Layout = ({ backdrop, children, variant = null }) => {
  const getCollectionImage = (imageHash, size) => {
    const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;

    console.log("callbackUrl", callbackUrl);
    console.log("imageHash", imageHash);

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
      // bg={variant === "collection-detail" ? linerGradient : " "}
    >
      {variant === "collection-detail" && (
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          w="full"
          h={{ base: "full", xl: "auto" }}
          maxH={"41rem"}
          minH={{ base: "29rem", "2xl": "41rem" }}
          overflow="hidden"
          align="center"
          zIndex="hide"
        >
          <Box position="relative" w="full" h="full" overflow="hidden">
            <Image
              src={backdrop && getCollectionImage(backdrop, 1920)}
              alt="bg-heroFull"
              w="full"
              h="full"
              objectFit="cover"
              fallback={<Skeleton w="full" h="full" maxH={"16.25rem"} />}
            />
          </Box>
        </Flex>
      )}

      <Navbar variant={variant} />

      <Fade in="true" delay={0.25} style={{ minHeight: "calc(100vh - 7rem)" }}>
        {children}
      </Fade>
      <Footer />
    </Container>
  );
};

export default Layout;
