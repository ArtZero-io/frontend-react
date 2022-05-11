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
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import BN from "bn.js";
import { motion, AnimatePresence } from "framer-motion";

function GeneralPage() {
  const history = useHistory();
  const { currentAccount } = useSubstrateState();
  const { hasCopied, onCopy } = useClipboard(currentAccount.address);

  const [nftList, setNftList] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);
  const [tradeFee, setTradeFee] = useState(null);
  //const [platformTotalStaked,setPlatformTotalStaked] = useState(3);
  const [estimatedEarning, setEstimatedEarning] = useState(0);
  useEffect(() => {
    const fetchAllNfts = async () => {
      const options = {
        owner: currentAccount?.address,
      };

      try {
        const nftListPromise = await clientAPI(
          "post",
          "/getNFTsByOwner",
          options
        );
        const platformTotalStaked = await staking_calls.getTotalStaked(
          currentAccount
        );
        //setPlatformTotalStaked(platformTotalStaked);

        const totalStakedPromise = await staking_calls.getTotalStakedByAccount(
          currentAccount,
          currentAccount?.address
        );

        const currentProfit = await marketplace_contract_calls.getCurrentProfit(
          currentAccount
        );
        const estimatedEarning = platformTotalStaked
          ? (currentProfit * 0.3 * totalStakedPromise) / platformTotalStaked
          : 0;
        setEstimatedEarning(estimatedEarning);

        Promise.all([nftListPromise, totalStakedPromise]).then(
          ([nftList, totalStaked]) => {
            const nftForSale = nftList.reduce(function (a, b) {
              return (a.is_for_sale & 1) + (b.is_for_sale & 1);
            }, 0);

            let info = [{ address: currentAccount?.address }];

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
    if (
      !nftList ||
      (dashboardInfo?.length &&
        dashboardInfo[0].address !== currentAccount?.address)
    ) {
      fetchAllNfts();
    }
    const getTradeFee = async () => {
      let my_total_staked_az_nfts = await staking_calls.getTotalStakedByAccount(
        currentAccount,
        currentAccount.address
      );
      let stakingDiscountCriteria =
        await marketplace_contract_calls.getStakingDiscountCriteria(
          currentAccount
        );
      let stakingDiscountRate =
        await marketplace_contract_calls.getStakingDiscountRate(currentAccount);
      let my_discount_rate =
        (await marketplace_contract_calls.getPlatformFee(currentAccount)) / 100;
      let length = stakingDiscountRate.length;

      for (var index = 0; index < length; index++) {
        if (
          my_total_staked_az_nfts >=
          new BN(stakingDiscountCriteria[index]).toNumber()
        ) {
          my_discount_rate =
            (my_discount_rate *
              (10000 - new BN(stakingDiscountRate[index]).toNumber())) /
            10000;
          break;
        }
      }
      setTradeFee(my_discount_rate);
    };
    getTradeFee();
  }, [currentAccount]);

  return (
    <Box as="section" maxW="container.3xl">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={6}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
              </motion.div>
            </AnimatePresence>
          </Box>

          <Grid
            w="full"
            templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
            gap={6}
            minH={"7rem"}
          >
            {dashboardInfo
              ?.filter((item) => !Object.keys(item).includes("address"))
              .map((item, idx) => {
                return (
                  <GridItem key={idx} w="100%" h="100%">
                    <Box
                      w="full"
                      textAlign="left"
                      bg="brand.grayDark"
                      px={4}
                      py={3}
                      fontSize="lg"
                    >
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Flex w="full">
                            <Box>
                              <Text>{item.name}</Text>
                              {/* <Flex alignItems="center">
                                <Tag bg="transparent" pl={0}>
                                  <TagLabel
                                    bg="transparent"
                                    fontSize="5xl"
                                    fontFamily="DS-Digital"
                                  >
                                    {item.value}
                                  </TagLabel>
                                  {item.name === "Amount Trades" && (
                                    <TagRightIcon
                                      fontSize="2xl"
                                      as={AzeroIcon}
                                    />
                                  )}
                                </Tag>
                              </Flex> */}
                            </Box>
                            <Spacer />
                          </Flex>
                          <Flex w="full" textAlign="left">
                            <Spacer />
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
                            {/* <Text color="brand.blue"> $ {item.text1}</Text> */}
                          </Flex>
                        </motion.div>
                      </AnimatePresence>
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
            <img
              src={`${process.env.PUBLIC_URL}/static/media/image-account-banner.png`}
              className="App-logo"
              alt="logo"
              width={400}
            />
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
                  Praying Mantis Predators
                </span>
                <div />
                <span>to reduce your </span>
                <span style={{ color: "#7AE7FF" }}>fees</span>
                <span> and earn </span>
                <span style={{ color: "#7AE7FF" }}>AZERO</span>
              </Box>
              <Spacer />
              <Box variant="outline" h={32} w={32}>
                <Tag variant="outline" h={6} w={32} mt={3}>
                  {
                    <TagLabel>
                      Trade Fees: {tradeFee && `${tradeFee}%`}
                    </TagLabel>
                  }
                </Tag>
              </Box>
            </Flex>

            <Flex w="full">
              <Text mt={0} mb={1} fontSize="lg" color="#fff">
                Your Total Stake:{" "}
                <span style={{ color: "#7AE7FF" }}>
                  {totalStaked || 0} NFTs{" "}
                </span>
              </Text>
            </Flex>
            <Flex w="full">
              <Text mt={0} mb={1} fontSize="lg" color="#fff">
                Your Estimated Earning:{" "}
                <span style={{ color: "#7AE7FF" }}>
                  {parseFloat(estimatedEarning).toFixed(3) || 0} AZERO{" "}
                </span>
                &nbsp;&nbsp;&nbsp;Next Payout:{" "}
                <span style={{ color: "#7AE7FF" }}>July 01, 2022</span>
              </Text>
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
