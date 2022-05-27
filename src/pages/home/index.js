import {
  Center,
  Heading,
  Text,
  Box,
  Link,
  AspectRatio,
  List,
  ListIcon,
  ListItem,
  InputGroup,
  InputRightElement,
  Input,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import HomeLayout from "@components/Layout/HomeLayout";
import BulletPointIcon from "@theme/assets/icon/BulletPoint.js";
import FrameHomepage from "@theme/assets/icon/FrameHomepage.svg";
import FrameHomepageMobile from "@theme/assets/icon/FrameHomepageMobile.svg";
import FrameHomepageSmallMobile from "@theme/assets/icon/FrameHomepageSmallMobile.svg";
import FrameHomepageSmall from "@theme/assets/icon/FrameHomepageSmall.svg";
import SocialCard from "../../components/Card/Social";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

import UFO1 from "@theme/assets/ufo-1.png";
import UFO2 from "@theme/assets/ufo-2.png";
import UFO3 from "@theme/assets/ufo-3.png";
import { AnimatePresence, motion } from "framer-motion";

function HomePage() {
  const [emailSubscribed, setEmailSubscribed] = useState("");

  const profile = [
    { discord: "https://discord.gg/wzkZ2JTvN4" },
    { twitter: "https://twitter.com/ArtZero_io" },
    { medium: "https://medium.com/@artzero_io" },
    { telegram: "https://t.me/artzero_io" },
    { mail: "mailto:admin@artzero.io" },
  ];

  const onClickHandler = (e) => {
    e.preventDefault();

    const submitPOST = async () => {
      if (!emailSubscribed) return toast.error("Please fill your email!");

      const reg =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{3,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!reg.test(String(emailSubscribed).toLowerCase())) {
        return toast.error(`${emailSubscribed} is not a valid email address.`);
      }

      try {
        const data = { email: emailSubscribed };

        // eslint-disable-next-line no-undef
        Pageclip.send(
          "zqaVEbuvCPviRe5ho1vL42Drc3GyedOG",
          "subscribe",
          data,
          function (error, res) {
            if (error) return toast.error("Please try again!");

            if (res.data === "ok") {
              toast.success("Thank you. Submit successful!");
              setEmailSubscribed("");
            }
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    submitPOST();
  };
  console.log("first");
  const ufoStyleOne = useBreakpointValue({
    base: {
      position: "absolute",
      top: "-180px",
      right: "-240px",
    },
    xl: {
      position: "absolute",
      top: "0px",
      right: "-140px",
      width: "490px",
      height: "445px",
    },
  });
  const ufoAnimationOne = useBreakpointValue({
    base: {
      scale: [0.38, 0.38, 0.38, 0.38],
      y: [0, 2, 0, 4],
      rotate: -3,
    },
    xl: {
      scale: [1, 1, 1, 1],
      y: [0, 2, 0, 4],
      rotate: -3,
    },
  });

  const ufoStyleTwo = useBreakpointValue({
    base: {
      position: "absolute",
      top: "260px",
      left: "-55px",
    },
    xl: {
      position: "absolute",
      top: "350px",
      left: "-65px",
      width: "215px",
      height: "144px",
      transform: "scale(1)",
    },
  });
  const ufoAnimationTwo = useBreakpointValue({
    base: {
      y: [0, 5, 0],
      rotate: 3,
      scale: [0.4, 0.4, 0.4],
    },
    xl: {
      y: [0, 5, 0],
      rotate: 3,
      scale: [1, 1, 1],
    },
  });
  const ufoStyleThree = useBreakpointValue({
    base: {
      display: "none",
    },
    xl: {
      position: "absolute",
      id: "image-ufo-3",
      top: "625px",
      right: "115px",
      width: "115px",
      height: "45px",
    },
  });

  const placeholderStyleB = useBreakpointValue({
    base: {
      color: "#ababab",
      fontSize: "13px",
    },
    xl: {
      color: "#ababab",
      fontSize: "16px",
    },
  });
  return (
    <HomeLayout>
      <Box as="section" maxW="container.2xl" p={0} position="relative">
        <Box w="full">
          <Box
            position="relative"
            overflow={["hidden", "visible", "visible"]}
            mx="auto"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            pt={["80px", "220px", "220px"]}
            pb={["170px", "180px", "180px"]}
            h={["395px", "732px", "732px"]}
          >
            <AnimatePresence>
              {/* UFO 1 */}
              <motion.div
                id="image-ufo-1"
                style={ufoStyleOne}
                animate={
                  ufoAnimationOne
                  // {
                  // flying
                  // x: [0, 0, -980, -220, 0, 0],
                  // y: [0, 10, 30, 380, 10, 0],
                  // rotate: [0, -30, -30, 0, -30, 0],
                  // scale: [1, 1, 0.6, 0.3, 1, 1],
                  //   scale: [0.38, 0.38, 0.38, 0.38],
                  //   y: [0, 2, 0, 4],
                  //   rotate: -3,
                  // }
                }
                transition={{
                  duration: 2,
                  // duration: 15,
                  // curve: [1, -0.14, 0.15, 1.4],
                  // cubic-bezier(1,-0.14,.15,1.4)
                  // ease: [1, -0.14, 0.15, 1.4],

                  curve: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                  src={UFO1}
                  alt="UFO1"
                  w="full"
                  h="full"
                  objectPosition="center"
                />
              </motion.div>
            </AnimatePresence>

            {/* UFO 2 */}
            <AnimatePresence>
              <motion.div
                id="image-ufo-2"
                style={ufoStyleTwo}
                animate={ufoAnimationTwo}
                transition={{
                  duration: 1.5,
                  curve: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="2000"
                  src={UFO2}
                  alt="UFO2"
                  w="full"
                  h="full"
                  objectPosition="center"
                />
              </motion.div>
            </AnimatePresence>

            {/* UFO 3 */}
            <AnimatePresence>
              <motion.div
                style={ufoStyleThree}
                animate={{
                  y: [0, 3, 0],
                  rotate: 10,
                }}
                transition={{
                  duration: 3,
                  curve: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  data-aos="fade-left"
                  data-aos-delay="300"
                  data-aos-duration="3000"
                  src={UFO3}
                  alt="UFO3"
                  w="full"
                  h="full"
                  objectPosition="center"
                />
              </motion.div>
            </AnimatePresence>

            <Center
              w="full"
              textAlign="center"
              mb={["10px", "2rem"]}
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading
                color="#fff"
                fontSize={["40px", null, "100px"]}
                lineHeight={["48px", null, "120px"]}
              >
                <Text
                  textTransform="uppercase"
                  as="span"
                  zIndex="0"
                  pos="relative"
                >
                  artzero <br />
                </Text>
                <Text textTransform="uppercase" as="span">
                  smartnet demo
                </Text>
              </Heading>
            </Center>

            <Center
              w="full"
              textAlign="center"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text
                fontFamily="Evogria"
                maxW={["316px", null, "434px"]}
                color="#fff"
                fontSize={["13px", null, "18px"]}
                lineHeight={["21px", null, "30px"]}
              >
                welcome to artzero - the first nft marketplace on aleph zero
                network!
              </Text>
            </Center>
          </Box>
        </Box>

        <Box pos="relative" w="full">
          <Box
            mx="auto"
            fontFamily="Evogria"
            fontSize="18px"
            color="#fff"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            py={{ base: "50px", "2xl": "12" }}
            mb={30}
          >
            <Center
              w="full"
              textAlign="center"
              mb={["20px", "2rem"]}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading fontSize={["32px", null, "36px"]}>how to start?</Heading>
            </Center>

            <Center
              w={["328px", "610px", "610px"]}
              mx="auto"
              textAlign="center"
              mb={["20px", "2rem"]}
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text
                textTransform="uppercase"
                size="h6"
                w={["328px", "610px", "610px"]}
                fontSize={["13px", null, "18px"]}
                lineHeight={["21px", null, "30px"]}
              >
                this version works with{" "}
                <Link
                  color="#7ae7ff"
                  textDecoration="underline"
                  href="https://subwallet.app/"
                  target="_blank"
                >
                  subwallet
                </Link>
                ,{" "}
                <Link
                  color="#7ae7ff"
                  textDecoration="underline"
                  href="https://polkadot.js.org/extension/"
                  target="_blank"
                >
                  polkadot js
                </Link>{" "}
                and{" "}
                <Link
                  color="#7ae7ff"
                  textDecoration="underline"
                  href="https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld"
                  target="_blank"
                >
                  talisman
                </Link>
                .please make sure you installed at least one of these wallets
                and created an account.
              </Text>
            </Center>

            <Center
              w={["328px", "610px", "610px"]}
              mx="auto"
              textAlign="center"
              mb={["60px", "100px"]}
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text
                textTransform="uppercase"
                fontSize={["13px", null, "18px"]}
                lineHeight={["21px", null, "30px"]}
              >
                you will need some smartnet azero (szero) to start. get free
                szero from{" "}
                <Link
                  color="#7ae7ff"
                  textDecoration="underline"
                  href="https://faucet-smartnet.test.azero.dev"
                >
                  https://faucet-smartnet.test.azero.dev
                </Link>
              </Text>
            </Center>

            <AspectRatio
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              px={4}
              mx="auto"
              w={["300px", "full", "full"]}
              maxW="77rem"
              ratio={16 / 9}
              justifyContent="center"
            >
              <iframe
                title="artzero-clip-youtube"
                src="https://www.youtube.com/embed/V-7hWodoLl0"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Box>

        <Box pos="relative" w="full">
          <Box
            mx="auto"
            pt={["0px", "50px", "50px"]}
            maxW={{ base: "6xl", "2xl": "7xl" }}
          >
            <Center
              w={["155px", "full", "full"]}
              textAlign="center"
              mb={["0px", "3rem", "3rem"]}
              mx="auto"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading fontSize={["32px", null, "36px"]}>
                available features
              </Heading>
            </Center>

            <Box
              color="#ABABAB"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              maxW="container.md"
              mx="auto"
              mb={["74px", "144px", "144px"]}
              w="full"
              p={{ base: 12, xl: 14 }}
              fontFamily="Evogria"
              fontSize={["13px", null, "18px"]}
              lineHeight={["21px", null, "30px"]}
              textAlign="left"
              bgImage={{ base: FrameHomepageMobile, xl: FrameHomepage }}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={[2.5, 6, 6]}>
                {availableFeaturesText.map((item, idx) => (
                  <ListItem
                    display="flex"
                    alignItems="center"
                    key={idx}
                    _hover={{ pl: "10px", color: "#fff" }}
                    transition="all 0.33s"
                  >
                    <ListIcon as={BulletPointIcon} />
                    <Text as="span">{item}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Center
              w={["full", "full", "full"]}
              textAlign="center"
              mb={["0px", "3rem", "3rem"]}
              mx="auto"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading
                w={["80%", "full", "full"]}
                fontSize={["32px", null, "36px"]}
              >
                up-coming features
              </Heading>
            </Center>

            <Box
              color="#ABABAB"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              maxW="container.md"
              mx="auto"
              w="full"
              p={{ base: 12, xl: 14 }}
              fontFamily="Evogria"
              fontSize={["13px", null, "18px"]}
              lineHeight={["21px", null, "30px"]}
              textAlign="left"
              bgImage={{
                base: FrameHomepageSmallMobile,
                xl: FrameHomepageSmall,
              }}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={[2.5, 6, 6]}>
                {upComingFeaturesText.map((item, idx) => (
                  <ListItem
                    display="flex"
                    alignItems="center"
                    key={idx}
                    _hover={{ pl: "10px", color: "#fff" }}
                    transition="all 0.33s"
                  >
                    <ListIcon as={BulletPointIcon} />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>

        <Box
          w="full"
          // bgImage={HomePageBg3}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Box
            mx="auto"
            px={4}
            pt={["155px", "250px", "250px"]}
            maxW={{ base: "6xl", "2xl": "7xl" }}
            fontFamily="Evogria"
            fontSize="18px"
          >
            <Center
              w="full"
              textAlign="center"
              mb={["10px", "18px", "18px"]}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading fontSize={["32px", null, "36px"]}>
                subscribe to us
              </Heading>
            </Center>
            <Center
              w="full"
              textAlign="center"
              mb={["45px", "100px", "100px"]}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text
                textTransform="uppercase"
                color="#fff"
                fontSize={["13px", null, "18px"]}
                lineHeight={["21px", null, "30px"]}
              >
                let’s make a great impact together
              </Text>
            </Center>
            <InputGroup
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              mb={("36px", "48px")}
              mx="auto"
              maxW={["327px", "572px", "572px"]}
              w="full"
              bg="white"
              h={["48px", "60px", "60px"]}
              py={1}
              color="blackAlpha.900"
              borderRadius="0"
            >
              <InputRightElement
                spinner={<BeatLoader size={8} color="white" />}
                onClick={onClickHandler}
                cursor="pointer"
                bg="brand.blue"
                h="full"
                fontSize={["15px", "18px", "18px"]}
                w={["110px", "10rem", "10rem"]}
              >
                SUBSCRIBE
              </InputRightElement>
              <Input
                autoComplete="off"
                type="email"
                name="email"
                id="email"
                required
                value={emailSubscribed}
                onChange={({ target }) => setEmailSubscribed(target.value)}
                variant="unstyled"
                my={1}
                pl={5}
                placeholder="Enter your email"
                _placeholder={placeholderStyleB}
              />
            </InputGroup>
            <Center
              w="full"
              textAlign="center"
              mt={["32px", "60px", "60px"]}
              mb={["12px", "60px", "60px"]}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <SocialCard profile={profile} />
            </Center>
            <Center
              w="full"
              textAlign="center"
              mb={["30px", "70px", "70px"]}
              data-aos="fade-down"
              data-aos-delay="300"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
            >
              <Text
                textTransform="uppercase"
                fontSize={["13px", "sm", "sm"]}
                color="#ababab"
                width={["175px", "full", "full"]}
              >
                © copyright 2022 artzero. all rights reserved
              </Text>
            </Center>
          </Box>
        </Box>
      </Box>
    </HomeLayout>
  );
}

export default HomePage;

const availableFeaturesText = [
  "support erc721 (psp34) standard nft",
  "support polkadot js, subWallet and talisman wallet",
  "on-chain profile",
  "explore nft collections",
  "create collections in simple mode and advanced mode",
  "create nft",
  "list, unlist, buy, bid nfts",
  "mint artzero nfts on smartnet (only 200 available)",
  "stake artzero nfts for trade discount and profit share",
];

const upComingFeaturesText = [
  "support erc1155 (psp1155) standard",
  "more documentation and tutorials",
  "search for nfts and collections",
  "launch pad for nft projects",
];
