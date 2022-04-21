import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack,
  TagRightIcon,
  Input,
  useClipboard,
  Square,
  Image,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ImageAccountBanner from "@theme/assets/image-account-banner.png";

import FeeInfoModal from "./components/Modal/FeeInfo";

import { clientAPI } from "@api/client";
import { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";

import staking_calls from "@utils/blockchain/staking_calls";

function GeneralPage() {
  const history = useHistory();
  const { currentAccount } = useSubstrateState();
  const { hasCopied, onCopy } = useClipboard(currentAccount.address);

  const [nftList, setNftList] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);

  useEffect(() => {
    const fetchAllNfts = async () => {
      const options = {
        owner: currentAccount.address,
      };

      try {
        const nftListPromise = await clientAPI(
          "post",
          "/getNFTsByOwner",
          options
        );

        const totalStakedPromise = await staking_calls.getTotalStakedByAccount(
          currentAccount,
          currentAccount.address
        );

        Promise.all([nftListPromise, totalStakedPromise]).then(
          ([nftList, totalStaked]) => {
            const nftForSale = nftList.reduce(function (a, b) {
              return (a.is_for_sale & 1) + (b.is_for_sale & 1);
            }, 0);

            console.log("nftForSale", nftForSale);

            let info = [];

            info = [
              ...info,
              { name: "NFTs for sale", value: nftForSale },
              { name: "Owned NFTs", value: nftList.length },
            ];

            setDashboardInfo(info);

            setNftList(nftList);
            setTotalStaked(totalStaked);
          }
        );
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    !nftList && fetchAllNfts();
  }, [currentAccount, currentAccount.address, nftList]);

  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={6}>
            <Heading size="h2">DASHBOARD</Heading>

            <Flex alignItems="center">
              <Button
                variant="outline"
                onClick={onCopy}
                borderWidth={1}
                borderColor="#7AE7FF"
                p={2}
                my={3}
                mr={3}
                h={9}
              >
                <Text fontFamily="Oswald">{currentAccount.address}</Text>
                <Input
                  display="none"
                  defaultValue={currentAccount.address}
                  px={2}
                  h={8}
                  mx={0}
                  minW={"sm"}
                  readOnly={true}
                  cursor="pointer"
                  color="brand.blue"
                  borderWidth={1}
                  borderColor="brand.blue"
                />
              </Button>
              {hasCopied ? (
                <Tag variant="outline">
                  <TagLabel>Copied</TagLabel>
                </Tag>
              ) : (
                ""
              )}
              <Spacer />
            </Flex>
          </Box>

          <Grid
            w="full"
            templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
            gap={6}
            minH={"7rem"}
          >
            {dashboardInfo?.map((item, idx) => {
              return (
                <GridItem
                  key={idx}
                  w="100%"
                  h="100%"
                  // _hover={{ bg: "brand.blue" }}
                >
                  <Box
                    w="full"
                    textAlign="left"
                    bg="brand.grayDark"
                    px={4}
                    py={3}
                    fontSize="lg"
                  >
                    <Flex w="full">
                      <Box>
                        <Text>{item.name}</Text>
                        <Flex alignItems="center">
                          <Tag bg="transparent" pl={0}>
                            <TagLabel
                              bg="transparent"
                              fontSize="5xl"
                              fontFamily="DS-Digital"
                            >
                              {item.value}
                            </TagLabel>
                            {item.name === "Amount Trades" && (
                              <TagRightIcon fontSize="2xl" as={AzeroIcon} />
                            )}
                          </Tag>
                        </Flex>
                      </Box>
                      <Spacer />
                    </Flex>
                    <Flex w="full" textAlign="left">
                      <Spacer />
                      {/* <Text color="brand.blue"> $ {item.text1}</Text> */}
                    </Flex>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>

        <HStack
          h="full"
          my={10}
          p={{ base: "6", "2xl": "7" }}
          maxW="container.xl"
          bg="black"
          pos="relative"
        >
          <Square size={{ base: "18rem", "2xl": "20rem" }} bg="#222">
            <Image w="full" h="full" src={ImageAccountBanner} />
          </Square>

          <VStack
            w="full"
            h={72}
            pr={2}
            pl={{ base: "4", "2xl": "10" }}
            textAlign="left"
          >
            <Flex w="full">
              <Box fontFamily="Evogria Italic" fontSize="3xl-mid" color="#FFF">
                <span>Stake your </span>
                <span style={{ color: "#7AE7FF" }}>
                  Praying Mantis Predator
                </span>
                <div />
                <span>to reduce your </span>
                <span style={{ color: "#7AE7FF" }}>fees</span>
              </Box>
              <Spacer />
              <Box variant="outline" h={32} w={36}>
                <Tag variant="outline" h={6} w={40} mt={3}>
                  <TagLabel>Market Fees: 3.0%</TagLabel>
                </Tag>
                <Tag variant="outline" h={6} w={40} mt={3}>
                  <TagLabel>Discount Fees: 2.1%</TagLabel>
                </Tag>
              </Box>
            </Flex>

            <Flex w="full">
              <Text mt={0} mb={8} fontSize="lg" color="#fff">
                You currently have{" "}
                <span style={{ color: "#7AE7FF" }}>
                  {totalStaked || 0} NFTs{" "}
                </span>
                staked.
              </Text>
              <Spacer />
            </Flex>

            <Flex w="full" alignItems="center">
              <Button
                variant="solid"
                onClick={() => history.push(ROUTES.ACCOUNT_MY_STAKES)}
              >
                Stake now
              </Button>

              <FeeInfoModal />
            </Flex>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default GeneralPage;

// const dashboardInfo = [
//   { name: "Owned NFTs", text1: "82.00", value: "99" },
//   { name: "Amount Trades", text1: "82.00", value: "143" },
//   { name: "Ratio Purchase/Sell", text1: "82.00", value: "30%" },
//   { name: "NFTs for sale", text1: "82.00", value: "56" },
//   { name: "NFTs offers placed", text1: "82.00", value: "45" },
//   { name: "NFTs offers received", text1: "82.00", value: "38" },
// ];
