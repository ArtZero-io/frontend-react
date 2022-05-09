import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Grid,
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSubstrateState } from "@utils/substrate";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { delay, truncateStr } from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ActiveIcon from "@theme/assets/icon/Active.js";
import InActiveIcon from "@theme/assets/icon/InActive.js";
import BN from "bn.js";
import toast from "react-hot-toast";

function MintHeader() {
  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);
  const { api, currentAccount, keyringState, apiState } = useSubstrateState();

  const [balance, setBalance] = useState(0);
  const [whitelist, setWhitelist] = useState(null);
  const [mintMode, setMintMode] = useState(-1);
  const [fee1, setFee1] = useState(-1);
  const [fee2, setFee2] = useState(-1);
  const [amount1, setAmount1] = useState(-1);
  const [totalMinted, setTotalMinted] = useState(0);
  const [whitelistAmount, setWhitelistAmount] = useState(1);

  const onGetTotalMinted = useCallback(
    async (e) => {
      let res = await artzero_nft_calls.totalSupply(currentAccount);

      if (res) setTotalMinted(res);
      else setTotalMinted(0);
    },
    [currentAccount]
  );

  useEffect(() => {
    const onGetWhiteList = async (e) => {
      let whitelist = await artzero_nft_calls.getWhitelist(
        currentAccount,
        currentAccount?.address
      );
      if (whitelist) setWhitelist(whitelist);
      else setWhitelist(null);
    };
    const onGetBalance = async (e) => {
      let res = await artzero_nft_calls.balanceOf(
        currentAccount,
        currentAccount?.address
      );
      if (res) setBalance(res);
      else setBalance(0);
    };
    onGetBalance();
    onGetWhiteList();
  }, [currentAccount]);

  const onGetMintMode = async (e) => {
    let mintMode = await artzero_nft_calls.getMintMode(currentAccount);
    if (mintMode) setMintMode(mintMode);
    else setMintMode(-1);
  };

  const onGetFee1 = async (e) => {
    let res = await artzero_nft_calls.getFee1(currentAccount);
    if (res) setFee1(res);
    else setFee1(-1);
  };

  const onGetFee2 = async (e) => {
    let res = await artzero_nft_calls.getFee2(currentAccount);
    if (res) setFee2(res);
    else setFee2(-1);
  };

  const onGetAmount1 = async (e) => {
    let res = await artzero_nft_calls.getAmount1(currentAccount);
    if (res) setAmount1(res);
    else setAmount1(-1);
  };

  const onWhiteListMint = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );
    if (balance.free.div(new BN(10 ** 12)).toNumber() < 0.01) {
      toast.error("Your balance is low.");
      return;
    }
    await artzero_nft_calls.whitelistMint(
      currentAccount,
      whitelistAmount,
      dispatch
    );
    await delay(10000);
    await onRefresh();
  };

  const onPaidMint = async () => {
    const { data } = await api.query.system.account(currentAccount.address);

    // const balance = new BN(data.free, 10, "le") / 10 ** 12;

    const balance = new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6;
    
    if (mintMode === "1") {
      if (balance < fee1 + 0.01) {
        toast.error("Not enough balance to mint");
        return;
      }
      await artzero_nft_calls.paidMint(currentAccount, fee1, dispatch);
    } else if (mintMode === "2") {
      if (balance < fee2 + 0.01) {
        toast.error("Not enough balance to mint");
        return;
      }
      await artzero_nft_calls.paidMint(currentAccount, fee2, dispatch);
    }

    await delay(10000);
    await onRefresh();
  };

  const onRefresh = useCallback(async () => {
    // await onGetBalance();
    // await onGetWhiteList();
    await onGetMintMode();
    await onGetFee1();
    await onGetFee2();
    await onGetAmount1();
    await onGetTotalMinted();
  }, []);

  const fetchMintData = useCallback(async () => {
    await onRefresh();
  }, []);

  // useEffect(() => {
  //   apiState && keyringState && currentAccount?.address && fetchMintData();
  // }, [apiState, currentAccount?.address, fetchMintData, keyringState]);

  useEffect(() => {
    apiState && keyringState && currentAccount?.address && fetchMintData();
  }, [apiState, currentAccount?.address, fetchMintData, keyringState]);

  return (
    <>
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "8", "2xl": "10" }}
      >
        <VStack textAlign="center" justifyContent="space-between">
          <Center w="full" pos="relative">
            <Heading size="h2">Token Generation Event</Heading>
          </Center>

          <Text fontSize="lg" maxW="6xl-mid" color="#fff" mt={5}>
            In the TGE, whitelisted addresses can mint NFTs for free. If you are
            not in the whitelist, you still can purchase an NFT.
          </Text>
        </VStack>

        <Grid
          templateColumns="repeat(auto-fill, minmax(min(100%, 24rem), 1fr))"
          gap={6}
          maxW="6xl-mid"
          mx="auto"
          my={12}
        >
          <Box fontSize="lg" bg="brand.grayDark" padding={7} minH="xs">
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box h="full">
                <Heading size="h6">Your Account:</Heading>
                <Text mt={3}>
                  Your address:{" "}
                  <span style={{ color: "#7ae7ff" }}>
                    {truncateStr(currentAccount?.address, 9) || 'n/a'}
                  </span>
                </Text>
                <Text mt={3}>
                  Your ArtZero's NFT Balance:{" "}
                  <span style={{ color: "#fff" }}>{balance} NFTs</span>
                </Text>
              </Box>
              <Box>
                <Heading size="h6">ArtZero's NFT information:</Heading>
                <Text mt={3}>
                  Total Supply: <span style={{ color: "#fff" }}>200</span>
                </Text>
                <Text mt={3}>
                  Total Minted:{" "}
                  <span style={{ color: "#fff" }}>{totalMinted}</span>
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box fontSize="lg" bg="brand.grayDark" padding={7} minH="xs">
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box>
                {!whitelist && (
                  <Heading size="h6">
                    You are not in the whitelist for minting ArtZero NFTs
                  </Heading>
                )}
                {whitelist && (
                  <>
                    <Heading size="h6">
                      You are in the whitelist for minting ArtZero NFTs
                    </Heading>
                    <Text mt={3}>
                      You can claim:{" "}
                      <span style={{ color: "#fff" }}>
                        {whitelist?.whitelistAmount} ArtZero NFTs
                      </span>
                    </Text>
                    <Text mt={3}>
                      You already claimed:{" "}
                      <span style={{ color: "#fff" }}>
                        {whitelist?.claimedAmount} ArtZero NFTs
                      </span>
                    </Text>
                  </>
                )}
              </Box>
              <Box>
                <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                  Enter amount to mint
                </Text>
                <Flex justify="space-between">
                  <NumberInput
                    isDisabled={!whitelist}
                    bg="black"
                    defaultValue={!whitelist ? "0" : "1"}
                    min={1}
                    max={5}
                    onChange={(valueString) => setWhitelistAmount(valueString)}
                    value={whitelistAmount}
                    mr={3}
                    h="3.125rem"
                  >
                    <NumberInputField
                      h="3.125rem"
                      borderRadius={0}
                      borderWidth={0}
                      color="#fff"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Button
                    isDisabled={!whitelist}
                    variant="outline"
                    onClick={() => onWhiteListMint()}
                  >
                    WhiteList Mint (FREE)
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box fontSize="lg" bg="brand.grayDark" padding={7} minH="xs">
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box>
                <Heading size="h6">Public Minting</Heading>
                {mintMode <= "0" ? (
                  <Flex alignItems="center">
                    <Text>Status:</Text>
                    <Tag variant="inActive">
                      <TagLeftIcon as={InActiveIcon} />
                      <TagLabel>Disabled</TagLabel>
                    </Tag>
                  </Flex>
                ) : (
                  <Flex alignItems="center">
                    <Text>Status:</Text>
                    <Tag variant="active">
                      <TagLeftIcon as={ActiveIcon} />
                      <TagLabel>Enabled</TagLabel>
                    </Tag>
                  </Flex>
                )}
                {mintMode === "1" ? (
                  <>
                    <Text alignItems="center" mt={3}>
                      Minting fee: <span style={{ color: "#fff" }}>{fee1}</span>{" "}
                      <AzeroIcon mb={1.5} />
                    </Text>
                    <Text mt={3}>
                      Max Mint:{" "}
                      <span style={{ color: "#fff" }}>{amount1} NFTs</span>
                    </Text>
                  </>
                ) : null}

                {mintMode === "2" ? (
                  <>
                    <Text alignItems="center" mt={3}>
                      Minting fee: <span style={{ color: "#fff" }}>{fee2}</span>{" "}
                      <AzeroIcon mb={1.5} />
                    </Text>
                    <Text mt={3}>
                      Max Mint:{" "}
                      <span style={{ color: "#fff" }}>{amount1} NFTs</span>
                    </Text>
                  </>
                ) : null}
              </Box>

              <Button
                isDisabled={mintMode <= 0}
                spinnerPlacement="start"
                isLoading={tnxStatus}
                loadingText={`${tnxStatus?.status}`}
                variant="solid"
                onClick={() => onPaidMint()}
              >
                Mint Now
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default MintHeader;
