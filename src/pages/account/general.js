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
  Tag,
  TagLabel,
  useMediaQuery,
  Stack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import AzeroIcon from "@theme/assets/icon/Azero.js";
// import ImageAccountBanner from "@theme/assets/image-account-banner.png";

import FeeInfoModal from "./components/Modal/FeeInfo";

import { clientAPI } from "@api/client";
import { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";

import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import BN from "bn.js";
import { motion, AnimatePresence } from "framer-motion";
import { truncateStr } from "@utils";
import CommonContainer from "../../components/Container/CommonContainer";

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
              return a + (b.is_for_sale | 0);
            }, 0);
            let info = [{ address: currentAccount?.address }];

            info = [
              ...info,
              { name: "NFTs for sale", value: nftForSale },
              { name: "Staked NFTs", value: totalStaked },
              { name: "Total Owned NFTs", value: nftList.length + totalStaked },
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

  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  return (
    <CommonContainer>
      <VStack as="section" w="full">
        <Box w="full" textAlign="left" mb={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>dashboard</Heading>

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
                <Text fontFamily="Oswald">
                  {isLargerThan480
                    ? currentAccount?.address
                    : truncateStr(currentAccount?.address, 16)}
                </Text>
                <Input
                  display="none"
                  defaultValue={currentAccount?.address}
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
        </Box>

        <Grid
          gap={{ base: "10px", md: "30px" }}
          minH={"7rem"}
          w="full"
          templateColumns={{
            base: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            lg: "repeat(auto-fill, minmax(min(100%, 290px), 1fr))",
            xl: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          }}
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
                  >
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Flex w="full">
                          <Box>
                            <Text
                              fontSize={{ base: "md", md: "lg" }}
                              color="#888"
                            >
                              {item.name}
                            </Text>
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
                                fontSize={["4xl", "5xl", "5xl"]}
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

      <Stack
        direction={{ base: "column", xl: "row" }}
        h="full"
        my={10}
        p={{ base: "35px", "2xl": "7" }}
        maxW="container.xl"
        bg="black"
        pos="relative"
      >
        <Square size={{ base: "16rem", xl: "18rem", "2xl": "20rem" }} bg="#222">
          <Image
            w="full"
            h="full"
            src="https://api.artzero.io/getImage?input=QmQRXjhAbKc6Jv9nKyd4Z7Ncit143F8ghcJEkEezgNGNkH&size=500&url=https://ipfs.infura.io/ipfs/QmQRXjhAbKc6Jv9nKyd4Z7Ncit143F8ghcJEkEezgNGNkH"
          />
        </Square>

        <VStack
          w="full"
          h={{ xl: "288px" }}
          pr={2}
          pl={{ base: "0", xl: "40px" }}
          textAlign="left"
        >
          <Flex w="full">
            <Box
              w="full"
              fontFamily="Evogria Italic"
              fontSize={{ base: "24px", xl: "3xl-mid" }}
              color="#FFF"
            >
              <span>stake your </span>
              <span style={{ color: "#7AE7FF" }}>praying mantis predators</span>
              <div />
              <span>to reduce your </span>
              <span style={{ color: "#7AE7FF" }}>fees</span>
              <span> and earn </span>
              <span style={{ color: "#7AE7FF" }}>AZERO</span>
            </Box>
            <Spacer />
            <Box
              display={{ base: "none", xl: "flex" }}
              variant="outline"
              h={32}
              w={28}
            >
              <Tag variant="outline" h={6} w={"128px"} mt={3}>
                {
                  <TagLabel fontSize="14px">
                    Trade Fee: {tradeFee && `${tradeFee}%`}
                  </TagLabel>
                }
              </Tag>
            </Box>
          </Flex>

          <Flex w="full">
            <Text
              mt={0}
              mb={1}
              fontSize={{ base: "16px", xl: "lg" }}
              color="#fff"
            >
              Your Total Stake:{" "}
              <span style={{ color: "#7AE7FF" }}>
                {totalStaked || 0} NFT{totalStaked > 1 ? "s" : ""}
              </span>
            </Text>
          </Flex>
          <Stack
            direction={{ base: "column", xl: "row" }}
            w="full"
            align="flex-start"
          >
            <Text
              mt={0}
              mb={1}
              fontSize={{ base: "16px", xl: "lg" }}
              color="#fff"
            >
              Your Estimated Earning:{" "}
              <Text as="span" color="#7AE7FF" mr="30px">
                {parseFloat(estimatedEarning).toFixed(3) || 0}{" "}
                <AzeroIcon
                  mb="2px"
                  w={["14px", "16px", "16px"]}
                  h={["14px", "16px", "16px"]}
                />
              </Text>
            </Text>
            <Text fontSize={{ base: "16px", xl: "lg" }}>
              Next Payout:{" "}
              <Text as="span" color="#7AE7FF" mr="30px">
                Aug 01, 2022
              </Text>
            </Text>
          </Stack>

          <Stack
            pt="20px"
            // align="center"
            w="full"
            align="center"
            justify="flex-start"
            direction={{ base: "column", xl: "row" }}
          >
            <Box
              pb="20px"
              w={"full"}
              variant="outline"
              display={{ base: "flex", xl: "none" }}
            >
              <Tag
                h={6}
                // w={"full"}
                mt={3}
                mx="auto"
                textAlign="center"
                variant="outline"
              >
                <TagLabel textAlign="center">
                  Your Current Trade Fee: {tradeFee && `${tradeFee}%`}
                </TagLabel>
              </Tag>
            </Box>

            <Button
              w={{ base: "full", xl: "auto" }}
              variant="solid"
              onClick={() => history.push(ROUTES.ACCOUNT_MY_STAKES)}
            >
              Stake now
            </Button>

            <FeeInfoModal />
          </Stack>
        </VStack>
      </Stack>
    </CommonContainer>
  );
}

export default GeneralPage;
