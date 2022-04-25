/* eslint-disable no-unused-vars */
import {
  // Box,
  Center,
  Heading,
  Button,
  Flex,
  IconButton,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
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
import { DownloadIcon } from "@chakra-ui/icons";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ActiveIcon from "@theme/assets/icon/Active.js";
import InActiveIcon from "@theme/assets/icon/InActive.js";
import BulletPointIcon from "@theme/assets/icon/BulletPoint.js";
import FrameHomepage from "@theme/assets/icon/FrameHomepage.svg";
import FrameHomepageSmall from "@theme/assets/icon/FrameHomepageSmall.svg";
import SocialCard from "../../components/Card/Social";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import HomePageBg1 from "@theme/assets/bg-homepage-1.png";
import HomePageBg2 from "@theme/assets/bg-homepage-2.png";
import HomePageBg3 from "@theme/assets/bg-homepage-3.png";

function HomePage() {
  const [emailSubscribed, setEmailSubscribed] = useState(null);

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
      <Box as="section" maxW="container.2xl" p={0}>
        <Box w="full">
          <Box
            mx="auto"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            py={{ base: "20", "2xl": "56" }}
          >
            <Center w="full" textAlign="center" mb="2rem">
              <Heading size="h1" fontSize="100px" lineHeight="120px">
                Artzero <br />
                Smartnet Demo
              </Heading>
            </Center>

            <Center w="full" textAlign="center">
              <Text
                fontFamily="Evogria"
                fontSize="18px"
                size="h6"
                maxW="md"
                color="#fff"
                lineHeight="30px"
              >
                Welcome to ArtZero - The first NFT Marketplace on Aleph Zero
                Network!
              </Text>
            </Center>
          </Box>
        </Box>

        <Box
          w="full"
          bgImage={HomePageBg1}
          bgPosition="50% 100%"
          bgRepeat="no-repeat"
        >
          <Box
            mx="auto"
            fontFamily="Evogria"
            fontSize="18px"
            color="#fff"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            py={{ base: "20", "2xl": "12" }}
            mb={30}
          >
            <Center w="full" textAlign="center" mb="2rem">
              <Heading size="h2">how to start?</Heading>
            </Center>

            <Center w="full" textAlign="center" mb="2rem">
              <Text size="h6" maxW="2xl" lineHeight="30px">
                This version currently work with hyperlink SubWallet, polkadot
                js, Talisman extensions. Please make sure you installed at least
                one of these wallets and create an account.
              </Text>
            </Center>

            <Center w="full" textAlign="center" mb="4rem">
              <Text size="h6" maxW="2xl" lineHeight="30px">
                You will need some Smartnet AZero (SZERO) to start. Get free
                SZERO from{" "}
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
              mx="auto"
              w="full"
              maxW="77rem"
              ratio={16 / 9}
              justifyContent="center"
            >
              <iframe
                title="artzero-clip-youtube"
                src="https://www.youtube.com/embed/0_LBP78ixAc"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Box>

        <Box
          pos="relative"
          w="full"
          // bgImage={HomePageBg2}
          // bgPosition="50% 250%"
          // bgRepeat="no-repeat"
        >
          <Flex
            id="image-wrapper"
            position="absolute"
            insetX="0"
            bottom="0"
            w="full"
            h={"90vh"}
            overflow="hidden"
            align="center"
            zIndex="-1"
          >
            <Box position="relative" w="full" h="full">
              <Image
                src={HomePageBg2}
                alt="bg-heroFull"
                w="full"
                h="full"
                objectPosition="center"
                position="absolute"
              />
            </Box>
          </Flex>
          <Box
            mx="auto"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            py={{ base: "20", "2xl": "24" }}
          >
            <Center w="full" textAlign="center" mb="3rem">
              <Heading size="h2">Available features</Heading>
            </Center>

            <Box
              maxW="container.md"
              mx="auto"
              mb={36}
              w="full"
              p={14}
              fontFamily="Evogria"
              fontSize="18px"
              textAlign="left"
              bgImage={FrameHomepage}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={6}>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Support ERC721 (PSP34) Standard NFT
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Support Polkadot JS, SubWallet and Talisman Wallet
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  On-chain Profile
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Explore NFT Collections
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Create Collections in Simple mode and Advanced mode
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Create NFT
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  List, unlist, buy, bid NFTs
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Mint ArtZero NFTs on Smartnet (only 200 available)
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Stake ArtZero NFTs for trade discount
                </ListItem>
              </List>
            </Box>

            <Center w="full" textAlign="center" mb="3rem">
              <Heading size="h2">Up-coming Features</Heading>
            </Center>

            <Box
              maxW="container.md"
              mx="auto"
              w="full"
              p={14}
              fontFamily="Evogria"
              fontSize="18px"
              textAlign="left"
              bgImage={FrameHomepageSmall}
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <List spacing={6}>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Support ERC1155 (PSP1155) Standard
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  More documentation and tutorials
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Search for NFTs and Collections
                </ListItem>
                <ListItem>
                  <ListIcon as={BulletPointIcon} />
                  Launch Pad for NFT projects
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>

        <Box
          w="full"
          bgImage={HomePageBg3}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Box
            mx="auto"
            maxW={{ base: "6xl", "2xl": "7xl" }}
            py={{ base: "20", "2xl": "24" }}
            fontFamily="Evogria"
            fontSize="18px"
          >
            <Center w="full" textAlign="center" mb="2rem">
              <Heading size="h2">Subscribe to us</Heading>
            </Center>
            <Center w="full" textAlign="center" mb="3rem">
              <Text color="#fff" size="h6">
                Let’s make a great impact together
              </Text>
            </Center>
            <InputGroup
              mb={12}
              mx="auto"
              maxW="container.sm"
              w="full"
              bg="white"
              h={14}
              py={1}
              color="blackAlpha.900"
              borderRadius="0"
            >
              <InputRightElement
                isLoading={true}
                colorScheme="blue"
                spinner={<BeatLoader size={8} color="white" />}
                onClick={onClickHandler}
                cursor="pointer"
                bg="brand.blue"
                h="full"
                w={"10rem"}
                _before={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  borderRight: "14px solid #7ae7ff",
                  borderBottom: "10px solid white",
                  width: 0,
                  bg: "yellow",
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderLeft: "14px solid #7ae7ff",
                  borderTop: "10px solid #ffffff00",
                  bg: "transparent",
                  width: 0,
                }}
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
                  color: "blackAlpha.300",
                  fontSize: "lg",
                }}
              />
            </InputGroup>
            <Center w="full" textAlign="center" mb="3rem">
              <SocialCard profile={profile} />
            </Center>
            <Center w="full" textAlign="center" mb="3rem">
              <Text fontSize="sm">
                © Copyright 2022 artZero. All Rights Reserved
              </Text>
            </Center>
          </Box>
        </Box>

        {/* <Box>
          <Flex w="full" justify="start" p={4}>
            <Stack p={10} bg="#464646">
              <Tag>
                <TagLeftIcon as={AzeroIcon} />
                <TagLabel>Volume 1.11m</TagLabel>
              </Tag>
              <Tag>
                <TagLabel>Unlisted</TagLabel>
              </Tag>
              <Tag>
                <TagLabel>82.00</TagLabel>
                <TagRightIcon as={AzeroIcon} />
              </Tag>

              <Tag variant="outline">
                <TagLabel>Fees: 3%</TagLabel>
              </Tag>

              <Tag variant="grayBg" size="2xl">
                <TagLabel>8,999</TagLabel>
                <TagRightIcon as={AzeroIcon} />
              </Tag>

              <Tag variant="active">
                <TagLeftIcon as={ActiveIcon} />
                <TagLabel>Active</TagLabel>
              </Tag>

              <Tag variant="inActive">
                <TagLeftIcon as={InActiveIcon} />
                <TagLabel>Inactive</TagLabel>
              </Tag>
            </Stack>

            <Flex direction="column" mx={20} justify="space-between">
              <Button variant="outline">Outline</Button>
              <br />
              <Button variant="outline" isDisabled>
                isDisabled
              </Button>
              <br />
              <Button variant="solid">Default - Solid</Button>
              <br />
              <Button variant="solid" isDisabled>
                isDisabled
              </Button>
              <br />

              <IconButton
                aria-label="download"
                icon={<DownloadIcon />}
                size="icon"
                variant="iconOutline"
              />
              <br />
              <IconButton
                aria-label="download"
                icon={<DownloadIcon />}
                size="icon"
                variant="iconOutline"
                isDisabled
              />
              <br />
              <IconButton
                aria-label="download"
                icon={<DownloadIcon />}
                size="icon"
                variant="iconSolid"
              />
              <br />
              <IconButton
                aria-label="download"
                icon={<DownloadIcon />}
                size="icon"
                variant="iconSolid"
                isDisabled
              />
            </Flex>

            <Stack spacing={6}>
              <Text>Body text</Text>
              <Text fontSize="lg">Body text</Text>
              <Heading size="h1" isTruncated>
                heading 1 56/70
              </Heading>
              <Heading size="h2">heading 2 48/60</Heading>
              <Heading size="h3">heading 3 40/50</Heading>
              <Heading size="h4">heading 4 32/40</Heading>
              <Heading size="h5">heading 5 24/30</Heading>
              <Heading size="h6">heading 6 18/22.5</Heading>
            </Stack>
          </Flex>
        </Box> */}
      </Box>
    </HomeLayout>
  );
}

export default HomePage;
