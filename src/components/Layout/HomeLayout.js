import { Box, Container, Fade, Flex, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";
import HomePageBgFull from "@theme/assets/bg-homepage-full.png";
import HomePageBgFullMobile from "@theme/assets/bg-homepage-full-mobile.png";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { useCallback } from "react";

const HomeLayout = ({ children }) => {
  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  return (
    <Container
      h="full"
      id="layout-container"
      minW="full"
      px={{ sm: "0" }}
      position="relative"
      pb="70px"
    >
      <Flex
        id="image-wrapper"
        position="absolute"
        inset="0"
        w="full"
        // h={"full"}
        // h={["2470px", "4090px", "4023px"]}
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <Image
            display={{ base: "none", xl: "block" }}
            src={HomePageBgFull}
            alt="bg-HomePageBgFull"
            w="full"
            h="full"
            objectPosition="top"
            objectFit="cover"
            // position="absolute"
          />
          <Image
            display={{ base: "block", xl: "none" }}
            src={HomePageBgFullMobile}
            alt="bg-HomePageBgFull"
            w="full"
            h="full"
            objectPosition="top"
            objectFit="cover"
            position="absolute"
          />
        </Box>
        <Particles
          canvasClassName="tsparticles-canvas"
          id="tsparticles"
          init={particlesInit}
          options={options1}
        />
      </Flex>

      <Navbar />

      <Fade in="true" delay={0.15}>
        {children}
      </Fade>
    </Container>
  );
};

export default HomeLayout;

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
