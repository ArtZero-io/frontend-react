import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import HomePageBgFull from "@theme/assets/bg-homepage-full.png";

const HomeLayout = ({ children }) => {
  return (
    <Container
      id="layout-container"
      // maxW="container.3xl"
      minW="full"
      px={{ sm: "0" }}
      position="relative"
      // bgImage={HomePageBgFull}
      // bgRepeat="no-repeat"
      // bgPosition="top"
      // bgSize="cover"
      // zIndex="0"
    >
      <Flex
        id="image-wrapper"
        position="absolute"
        inset="0"
        w="full"
        // h={"90vh"}
        h="4133px"
        overflow="hidden"
        align="center"
        zIndex="-1"
      >
        <Box position="relative" w="full" h="full">
          <Image
            src={HomePageBgFull}
            alt="bg-HomePageBgFull"
            w="full"
            h="full"
            objectPosition="center"
            objectFit="cover"
            position="absolute"
          />
        </Box>
      </Flex>

      <Navbar />
      <Fade in="true" delay={0.15}>
        {children}
      </Fade>
    </Container>
  );
};

export default HomeLayout;
