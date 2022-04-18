import { Box, Container, Flex, Img, ScaleFade } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import { useSubstrateState } from "@utils/substrate";
import Loader from "../Loader/Loader";

const Layout = ({ backdrop, children }) => {
  const { apiState } = useSubstrateState();
  // const sub = useSubstrateState()

  // console.log('hehe sub', sub)
  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      height="100vh"
      px={{ sm: "0" }}
      position="relative"
    >
      <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h={backdrop ? "xl" : "full"}
        overflow="hidden"
        align="center"
        zIndex="hide"
      >
        <Box position="relative" w="full" h="full">
          <Img
            src={backdrop || bgHeroFull}
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
        initialScale={0.8}
        in="true"
        transitionEnd={{ opacity: 0 }}
        delay={0.2}
      >
        {apiState === "READY" ? <div>{children}</div> : <Loader />}
      </ScaleFade>
    </Container>
  );
};

export default Layout;
