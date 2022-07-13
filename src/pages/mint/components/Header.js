import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
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
  HStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSubstrateState } from "@utils/substrate";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { truncateStr } from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ActiveIcon from "@theme/assets/icon/Active.js";
import InActiveIcon from "@theme/assets/icon/InActive.js";
import BN from "bn.js";
import toast from "react-hot-toast";
import StatusBuyButton from "@components/Button/StatusBuyButton";
import { AccountActionTypes } from "@store/types/account.types";
import staking_calls from "@utils/blockchain/staking_calls";
import {
  fetchMyPMPPendingCount,
  fetchMyPMPStakedCount,
} from "../../account/stakes";

const MAX_MINT_COUNT = 200;

function MintHeader({ loading }) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);

  const [balance, setBalance] = useState(0);
  const [balanceStake, setBalanceStake] = useState(0);
  const [balancePending, setBalancePending] = useState(0);
  const [whitelist, setWhitelist] = useState(null);
  const [mintMode, setMintMode] = useState(-1);
  const [fee1, setFee1] = useState(-1);
  const [amount1, setAmount1] = useState(-1);
  const [publicSaleMintedCount, setPublicSaleMintedCount] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [whitelistAmount, setWhitelistAmount] = useState(1);

  const [action, setAction] = useState("");

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

      if (whitelist) {
        setWhitelist((prev) => {
          return { ...prev, ...whitelist };
        });
      } else {
        setWhitelist((prev) => {
          return null;
        });
      }
    };
    const onGetBalance = async (e) => {
      let unstakedCount = await artzero_nft_calls.balanceOf(
        currentAccount,
        currentAccount?.address
      );
      const stakedCount = await fetchMyPMPStakedCount(
        currentAccount,
        staking_calls
      );
      setBalanceStake(stakedCount);
      const pendingCount = await fetchMyPMPPendingCount(
        currentAccount,
        staking_calls
      );
      setBalancePending(pendingCount);
      const totalCount = stakedCount + pendingCount + unstakedCount;

      if (totalCount) {
        setBalance(totalCount);
      } else {
        setBalance(0);
      }
    };
    const onGetMintMode = async (e) => {
      let mintMode = await artzero_nft_calls.getMintMode(currentAccount);

      if (mintMode) setMintMode(Number(mintMode));
      else setMintMode(-1);
    };

    onGetBalance();
    onGetWhiteList();
    onGetMintMode();
  }, [currentAccount, currentAccount?.address, loading]);

  const onGetMintingFee = async (e) => {
    let res = await artzero_nft_calls.getMintingFee(currentAccount);
    if (res) {
      setFee1(res);
    } else {
      setFee1(-1);
    }
  };

  const onGetPublicSaleAmount = async (e) => {
    let res = await artzero_nft_calls.getPublicSaleAmount(currentAccount);

    if (res) {
      setAmount1(res);
    } else {
      setAmount1(-1);
    }
  };

  const onGetPublicSaleMintedCount = useCallback(
    async (e) => {
      let res = await artzero_nft_calls.getPublicSaleMintedAmount(
        currentAccount
      );
      if (res) {
        setPublicSaleMintedCount(res);
      } else {
        setPublicSaleMintedCount(0);
      }
    },
    [currentAccount]
  );

  const onWhiteListMint = async () => {
    setAction("");

    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    const freeBalance =
      new BN(balance.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6;

    if (freeBalance < 0.01) {
      toast.error("Your balance is low.");
      return;
    }

    try {
      setAction("whitelist");

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });

      await artzero_nft_calls.whitelistMint(
        currentAccount,
        whitelistAmount,
        dispatch
      );

      // await onRefresh();
    } catch (error) {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      setAction("");
      toast.error(error);
    }
  };

  const onPaidMint = async () => {
    const { data } = await api.query.system.account(currentAccount.address);

    // const balance = new BN(data.free, 10, "le") / 10 ** 12;

    const balance = new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6;

    if (balance < fee1 + 0.01) {
      toast.error("Not enough balance to mint");
      return;
    }

    if (Number(mintMode) === 1) {
      try {
        setAction("public");

        dispatch({
          type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
          payload: {
            status: "Start",
          },
        });

        await artzero_nft_calls.paidMint(currentAccount, fee1, dispatch);
      } catch (error) {
        dispatch({
          type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
        });
        setAction("");
        toast.error(error);
      }
    }

    // await delay(10000);
    // await onRefresh();
  };

  const onRefresh = useCallback(async () => {
    await onGetMintingFee();
    await onGetPublicSaleAmount();
    onGetPublicSaleMintedCount();
    await onGetTotalMinted();
  }, [
    onGetMintingFee,
    onGetPublicSaleAmount,
    onGetPublicSaleMintedCount,
    onGetTotalMinted,
  ]);

  const fetchMintData = useCallback(async () => {
    await onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    fetchMintData();
  }, [currentAccount, fetchMintData, loading]);

  return (
    <>
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "8", "2xl": "10" }}
      >
        <VStack textAlign="center" justifyContent="space-between">
          <Center w="full" pos="relative">
            <Heading size="h2" textTransform="uppercase">
              Token Generation Event
            </Heading>
          </Center>

          <Text fontSize="lg" maxW="6xl-mid" color="#fff" mt={5}>
            In the TGE, whitelisted addresses can mint NFTs for free. If you are
            not in the whitelist, you still can purchase an NFT.
          </Text>
        </VStack>

        <Grid
          color="#888"
          templateColumns="repeat(auto-fill, minmax(min(100%, 24rem), 1fr))"
          gap={6}
          maxW="6xl-mid"
          mx="auto"
          my={12}
        >
          <Box fontSize="lg" bg="brand.grayDark" padding={7} minH="xs">
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box h="full">
                <Heading textTransform="uppercase" size="h6">
                  Your{" "}
                  <Text as="span" color="#7ae7ff">
                    PRAYING MANTIS PREDATORS (PMP)
                  </Text>{" "}
                  NFT Balance
                </Heading>
                <HStack align="flex-end" justify="space-between">
                  <Text mt={3}>
                    Your address:{" "}
                    <span style={{ color: "#7ae7ff" }}>
                      {truncateStr(currentAccount?.address, 5) || "n/a"}
                    </span>
                  </Text>

                  <Text mt={3}>
                    Total own:{" "}
                    <span style={{ color: "#fff" }}>{balance} NFTs</span>
                  </Text>
                </HStack>
                <HStack align="flex-end" justify="space-between">
                  <Text mt={2}>
                    Staked/pending:{" "}
                    <span style={{ color: "#fff" }}>
                      {balanceStake + balancePending} NFTs
                    </span>
                  </Text>

                  <Text mt={2}>
                    Available:{" "}
                    <span style={{ color: "#fff" }}>
                      {balance - balanceStake - balancePending} NFTs
                    </span>
                  </Text>
                </HStack>
              </Box>
              <Box>
                <Heading textTransform="uppercase" size="h6">
                
                  <Text as="span" color="#7ae7ff">
                    PRAYING MANTIS PREDATORS (PMP)
                  </Text>{" "}
                   NFT information:
                </Heading>
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
                <Heading textTransform="uppercase" size="h6">
                  whitelist minting
                </Heading>
                {!whitelist ? (
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
                {!whitelist && (
                  <Heading py="30px" size="h6" textTransform="uppercase">
                    Notice: You are not in the whitelist for minting ArtZero
                    NFTs
                  </Heading>
                )}
                {whitelist && (
                  <>
                    <>
                      <Text alignItems="center" mt={3}>
                        Minting fee: <span style={{ color: "#fff" }}>0</span>{" "}
                        <AzeroIcon mb={1.5} />
                      </Text>
                      <Text mt={3}>
                        Minted / Max Mint:{" "}
                        <span style={{ color: "#fff" }}>
                          {whitelist?.claimedAmount} /{" "}
                          {whitelist?.whitelistAmount} NFTs
                        </span>
                      </Text>
                    </>
                    {/* <Text size="h6" textTransform="uppercase">
                      You are in the whitelist for minting ArtZero NFTs
                    </Text>
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
                    </Text> */}
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

                  <StatusBuyButton
                    shouldDisabled={
                      whitelist?.claimedAmount >= whitelist?.whitelistAmount ||
                      !whitelist ||
                      totalMinted >= MAX_MINT_COUNT ||
                      (addNftTnxStatus?.status &&
                        !(!action || action === "whitelist"))
                    }
                    // shouldDisabled={action && action !== "whitelist"}
                    // isDisabled={!whitelist || totalMinted >= MAX_MINT_COUNT}
                    isDo={action === "whitelist"}
                    type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                    text="whitelist"
                    isLoading={addNftTnxStatus}
                    loadingText={`${addNftTnxStatus?.status}`}
                    onClick={onWhiteListMint}
                    variant="outline"
                    maxW="full"
                    minW="225px"
                    height="50px"
                  />
                  {/* <Button
                    isDisabled={!whitelist || totalMinted >= MAX_MINT_COUNT}
                    variant="outline"
                    onClick={() => onWhiteListMint()}
                  >
                    WhiteList Mint (FREE)
                  </Button> */}
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box fontSize="lg" bg="brand.grayDark" padding={7} minH="xs">
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box>
                <Heading textTransform="uppercase" size="h6">
                  Public Minting
                </Heading>
                {Number(mintMode) <= 0 ? (
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
                {Number(mintMode) === 1 ? (
                  <>
                    <Text alignItems="center" mt={3}>
                      Minting fee: <span style={{ color: "#fff" }}>{fee1}</span>{" "}
                      <AzeroIcon mb={1.5} />
                    </Text>
                    <Text mt={3}>
                      Minted / Max Mint:{" "}
                      <span style={{ color: "#fff" }}>
                        {publicSaleMintedCount} / {amount1} NFTs
                      </span>
                    </Text>
                  </>
                ) : null}

                {Number(mintMode) === 2 ? (
                  <>
                    <Text alignItems="center" mt={3}>
                      Only Whitelist Mint Allowed
                    </Text>
                  </>
                ) : null}
              </Box>

              <StatusBuyButton
                shouldDisabled={
                  Number(mintMode) === 2 ||
                  Number(mintMode) <= 0 ||
                  totalMinted >= MAX_MINT_COUNT ||
                  publicSaleMintedCount >= amount1 ||
                  (addNftTnxStatus?.status && !(!action || action === "public"))
                }
                // shouldDisabled={action && action !== "public"}
                // isDisabled={
                //   Number(mintMode) === 2 ||
                //   Number(mintMode) <= 0 ||
                //   totalMinted >= MAX_MINT_COUNT
                // }
                isDo={action === "public"}
                type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                text="public"
                isLoading={addNftTnxStatus}
                loadingText={`${addNftTnxStatus?.status}`}
                onClick={onPaidMint}
                variant="solid"
                maxW="full"
                height="50px"
              />
              {/* <Button
                isDisabled={
                  Number(mintMode) === 2 || Number(mintMode) <= 0 || totalMinted >= MAX_MINT_COUNT
                  Number(mintMode) === 2 ||
                  Number(mintMode) <= 0 ||
                  totalMinted >= MAX_MINT_COUNT
                }
                spinnerPlacement="start"
                isLoading={tnxStatus}
                loadingText={`${tnxStatus?.status}`}
                variant="solid"
                onClick={() => onPaidMint()}
              >
                Mint Now
              </Button> */}
            </Flex>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default memo(MintHeader);
