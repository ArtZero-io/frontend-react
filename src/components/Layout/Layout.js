import { Box, Container, Fade, Flex, Image, Skeleton } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";

import { Footer } from "../Footer/Footer";
import { getCachedImageShort } from "@utils/index";

const linerGradient = "linear-gradient(180deg, #000000 1.5rem, #00000000 8rem)";

const Layout = ({ backdrop, children, variant = null }) => {
  return (
    <Container
      id="layout-container 123123"
      // maxW="container.3xl"
      minW="full"
      minH="100vh"
      px="0"
      position="relative"
      bgImage={variant === "marketplace" && bgHeroFull}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      bg={variant === "collection-detail" ? linerGradient : " "}
    >
      {variant === "collection-detail" && (
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          w="full"
          h={{ base: "full", xl: "760px" }}
          // maxH={"41rem"}
          // h='776px'
          // minH={{ base: "29rem", "2xl": "41rem" }}
          overflow="hidden"
          align="center"
          zIndex="hide"
        >
          <Box position="relative" w="full" h="full" overflow="hidden">
            <Image
              src={backdrop && getCachedImageShort(backdrop, 1920)}
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
