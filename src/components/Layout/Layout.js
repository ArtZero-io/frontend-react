import {
  Box,
  Container,
  Fade,
  Flex,
  Image,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import bgHeroFull from "@theme/assets/bg-hero-full.png";
import React, { useCallback } from "react";

import { Footer } from "../Footer/Footer";
import { getCachedImageShort } from "@utils/index";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const linerGradient =
  "linear-gradient(0deg, #000000 30%, rgba(0, 0, 0, 43%) 95% , rgba(0, 0, 0, 0) 100%)";
const linerGradientLaunchpad =
  "linear-gradient(180deg, #000000 20px, #000000 30px, rgba(0, 0, 0, 0) 320px)";

const Layout = ({ backdrop, children, variant = null }) => {
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <Container
      id="layout-container"
      minW="full"
      minH="100vh"
      px="0"
      position="relative"
      bgImage={variant === "marketplace" && bgHeroFull}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      bg={
        variant === "collection-detail"
          ? linerGradient
          : variant === "launchpad-detail"
          ? linerGradientLaunchpad
          : ""
      }
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "full",
        height: "400px",
        backgroundImage:
          "linear-gradient(180deg, #000000 3.25%, #000000 3.26%, rgba(0, 0, 0, 0) 56.2%);",
      }}
    >
      {variant === "marketplace" && (
        <Particles
          canvasClassName="tsparticles-canvas"
          id="tsparticles"
          init={particlesInit}
          options={options1}
        />
      )}

      {variant === "collection-detail" && (
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          w="full"
          h="776px"
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
              objectPosition="center"
              fallback={<Skeleton w="full" h="full" maxH={"760px"} />}
            />
          </Box>
        </Flex>
      )}

      {variant === "launchpad-detail" && (
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          w="full"
          h="500px"
          overflow="hidden"
          align="center"
          zIndex="hide"
          _after={{
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "full",
            height: "12rem",
            backgroundImage:
              "linear-gradient(0deg, #000000 3.25%, #000000 18.26%, rgba(0, 0, 0, 0) 100%);)",
          }}
        >
          <Box
            position="relative"
            w="full"
            h="full"
            overflow="hidden"
            _after={{
              left: 0,
              bottom: 0,
              width: "full",
              height: "full",
              content: '""',
              position: "absolute",
              backgroundColor: isBigScreen ? "#0000" : "#0000009c",
            }}
          >
            <Image
              src={backdrop && getCachedImageShort(backdrop, 1920)}
              alt="bg-heroFull"
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="center"
              fallback={<Skeleton w="full" h="full" maxH={"760px"} />}
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

// eslint-disable-next-line no-unused-vars
const options = {
  fpsLimit: 120,
  interactivity: {
    detectsOn: "canvas",
    events: {
      // onClick: {
      //   enable: true,
      //   mode: "push",
      // },
      // onHover: {
      //   enable: true,
      //   mode: "repulse",
      // },
      resize: true,
    },
    // modes: {
    //   push: {
    //     quantity: 4,
    //   },
    //   repulse: {
    //     distance: 200,
    //     duration: 0.4,
    //   },
    // },
  },
  particles: {
    color: {
      value: "#ffffff",
    },

    // collisions: {
    //   enable: true,
    // },
    // move: {
    //   direction: "none",
    //   enable: true,
    //   outModes: {
    //     default: "bounce",
    //   },
    //   random: false,
    //   speed: 1,
    //   straight: false,
    // },
    number: {
      density: {
        enable: true,
        // area: 800,
        area: 1080,
      },
      // value: 80,
      limit: 0,
      value: 80,
    },
    opacity: {
      // value: 0.5,
      value: 1,
      animation: {
        enable: true,
        minimumValue: 0.5,
        speed: 1,
        sync: false,
      },
      random: {
        enable: true,
        minimumValue: 0.1,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      // value: { min: 0.5, max: 1 },
      random: {
        enable: true,
        minimumValue: 0.5,
      },
      value: 2,
    },
  },
  detectRetina: true,
  fullScreen: { enable: true },
};
const options1 = {
  fpsLimit: 480,
  interactivity: {
    detectsOn: "canvas",
    events: {
      // onClick: {
      //   enable: true,
      //   mode: "push",
      // },
      // onHover: {
      //   enable: true,
      //   mode: "repulse",
      // },
      resize: true,
    },
    // modes: {
    //   push: {
    //     quantity: 4,
    //   },
    //   repulse: {
    //     distance: 200,
    //     duration: 0.4,
    //   },
    // },
  },
  particles: {
    color: {
      value: "#ffffff",
    },

    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 0.1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        // area: 800,
        area: 1080,
      },
      // value: 80,
      limit: 0,
      value: 40,
    },
    opacity: {
      // value: 0.5,
      value: 1,
      animation: {
        enable: true,
        minimumValue: 0.5,
        speed: 0.1,
        sync: false,
      },
      random: {
        enable: true,
        minimumValue: 0.1,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      // value: { min: 0.5, max: 1 },
      random: {
        enable: true,
        minimumValue: 0.5,
      },
      value: 2,
    },
  },
  detectRetina: true,
  fullScreen: { enable: true },
};
