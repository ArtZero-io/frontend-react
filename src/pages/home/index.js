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
} from "@chakra-ui/react";
import React, { useState } from "react";
import HomeLayout from "@components/Layout/HomeLayout";
import BulletPointIcon from "@theme/assets/icon/BulletPoint.js";
import FrameHomepage from "@theme/assets/icon/FrameHomepage.svg";
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

  return (
    <HomeLayout>
      <Box as="section" maxW="container.2xl" p={0} position="relative">
        <Box w="full">
          <Box
            position="relative"
            mx="auto"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            pt="220px"
            pb="180px"
            h="732px"
            // py={{ base: "20", "2xl": "56" }}
          >
            <AnimatePresence>
              {/* UFO 1 */}
              <motion.div
                style={{
                  position: "absolute",
                  id: "image-ufo-1",
                  // top: "5px",
                  // right: "175px",
                  top: "0px",
                  right: "-140px",
                  width: "490px",
                  height: "445px",
                }}
                animate={{
                  x: [0, 0, -980, -220, 0, 0],
                  y: [0, 10, 30, 380, 10, 0],
                  rotate: [0, -30, -30, 0, -30, 0],
                  scale: [1, 1, 0.6, 0.3, 1, 1],

                  // rotate: [0, -30, -30, -10, -5, -20, -30, 0],
                }}
                transition={{
                  duration: 15,
                  // curve: [1, -0.14, 0.15, 1.4],
                  // cubic-bezier(1,-0.14,.15,1.4)
                  // ease: [1, -0.14, 0.15, 1.4],
                  curve: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                }}
              >
                <Image
                  filter="drop-shadow(15px -10px 25px #7AE7FF70)"
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
                style={{
                  position: "absolute",
                  id: "image-ufo-2",
                  top: "350px",
                  left: "-65px",
                  width: "215px",
                  height: "144px",
                }}
                animate={{
                  y: [0, 5, 0],
                  rotate: 3,
                }}
                transition={{
                  duration: 1.5,
                  curve: [0.42, 0, 0.58, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  filter="drop-shadow(1px 3px 7px #7AE7FF70)"
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
                style={{
                  position: "absolute",
                  id: "image-ufo-3",
                  top: "625px",
                  right: "115px",
                  width: "115px",
                  height: "45px",
                }}
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
                  filter="drop-shadow(1px 3px 7px #7AE7FF70)"
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
              mb="2rem"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading
                // size="h1"
                // fontSize={{ base: "48px", xl: "80px", "2xl": "100px" }}
                // lineHeight={{ base: "60px", xl: "100px", "2xl": "120px" }}
                color="#fff"
                fontSize="100px"
                lineHeight="120px"
              >
                <Text as="span" zIndex="0" pos="relative">
                  artzero <br />
                </Text>
                <Text as="span">smartnet demo</Text>
              </Heading>
            </Center>

            <Center
              w="full"
              textAlign="center"
              px={4}
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="1000"
            >
              <Text
                fontFamily="Evogria"
                maxW="434px"
                color="#fff"
                fontSize="18px"
                lineHeight="30px"
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
            py={{ base: "20", "2xl": "12" }}
            mb={30}
          >
            <Center
              w="full"
              textAlign="center"
              mb="2rem"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <Heading size="h2">how to start?</Heading>
            </Center>

            <Center
              w="610px"
              mx="auto"
              textAlign="center"
              mb="2rem"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text size="h6" maxW="2xl" lineHeight="30px">
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
                .<br />
                please make sure you installed at least one of these wallets and
                created an account.
              </Text>
            </Center>

            <Center
              w="600px"
              mx="auto"
              textAlign="center"
              mb="100px"
              px={4}
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="1000"
            >
              <Text size="h6" lineHeight="30px">
                you will need some smartnet azero (szero) to start. <br />
                get free szero from{" "}
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
              data-aos-delay="900"
              data-aos-duration="1000"
              px={4}
              mx="auto"
              w="full"
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
            pt="50px"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            // py={{ base: "20", "2xl": "24" }}
          >
            <Center
              w="full"
              textAlign="center"
              mb="3rem"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading size="h2">available features</Heading>
            </Center>

            <Box
              color="#ABABAB"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="1000"
              maxW="container.md"
              mx="auto"
              mb={36}
              w="full"
              p={{ base: 6, xl: 14 }}
              fontFamily="Evogria"
              fontSize="18px"
              textAlign="left"
              bgImage={{ base: "", xl: FrameHomepage }}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={6}>
                {availableFeaturesText.map((item, idx) => (
                  <ListItem
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

            <Center
              w="full"
              textAlign="center"
              mb="3rem"
              px={4}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading size="h2">up-coming features</Heading>
            </Center>

            <Box
              color="#ABABAB"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="1000"
              maxW="container.md"
              mx="auto"
              w="full"
              p={{ base: 6, xl: 14 }}
              fontFamily="Evogria"
              fontSize="18px"
              textAlign="left"
              bgImage={{ base: "", xl: FrameHomepageSmall }}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={6}>
                {upComingFeaturesText.map((item, idx) => (
                  <ListItem
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
            pt="325px"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            // py={{ base: "20", "2xl": "24" }}
            fontFamily="Evogria"
            fontSize="18px"
          >
            <Center
              w="full"
              textAlign="center"
              mb="18px"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Heading size="h2">subscribe to us</Heading>
            </Center>
            <Center
              w="full"
              textAlign="center"
              mb="100px"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <Text color="#fff" size="h6">
                let’s make a great impact together
              </Text>
            </Center>
            <InputGroup
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              mb={12}
              mx="auto"
              maxW="572px"
              w="full"
              bg="white"
              h="60px"
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
                w={"10rem"}
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
                _placeholder={{
                  color: "#ababab",
                  fontSize: "lg",
                }}
              />
            </InputGroup>
            <Center
              w="full"
              textAlign="center"
              my="60px"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              <SocialCard profile={profile} />
            </Center>
            <Center
              w="full"
              textAlign="center"
              pb="70px"
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
            >
              <Text fontSize="sm" color="#ababab">
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
