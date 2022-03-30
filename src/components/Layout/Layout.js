import { Box, Container, Flex, Img, ScaleFade } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";

const Layout = ({ children }) => {
  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      height="100%"
      px={{ sm: "0"}} position="relative"
    >
       <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          insetY="0"
          w="full"
          h="full"
          overflow="hidden"
          align="center"
          zIndex='hide'
        >
          <Box position="relative" w="full" h="full">
            <Img
              src={bgHeroFull}
              alt="bg-heroFull"
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="top bottom"
              position="absolute"
            />
            <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
          </Box>
        </Flex>
      <Navbar />
      <ScaleFade
        initialScale={0.5}
        in="true"
        transitionEnd={{ opacity: 0 }}
        delay={0.5}
      >
        <div>{children}</div>
      </ScaleFade>
    </Container>
  );
};

export default Layout;
