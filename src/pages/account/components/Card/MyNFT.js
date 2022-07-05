/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
  Spacer,
  Square,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { getCachedImageShort, secondsToTime, delay } from "@utils";
import staking_calls from "@utils/blockchain/staking_calls";
import staking from "@utils/blockchain/staking";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "use-interval";
import { motion } from "framer-motion";
import { setTxStatus } from "@store/actions/txStatus";
import {
  START,
  STAKE,
  REQUEST_UNSTAKE,
  CANCEL_REQUEST_UNSTAKE,
  UNSTAKE,
} from "@constants";

function MyNFTCard({
  nftContractAddress,
  is_for_sale,
  price,
  avatar,
  tokenID,
  nftName,
  stakeStatus, //0 not show, 1 not staked, 2 staked , 3 pending unstake
  isBid,
  highest_bid,
}) {
  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const [unstakeRequestTime, setUnstakeRequestTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(0);
  const [isUnstakeTime, setIsUnstakeTime] = useState(false);
  const [limitUnstakeTime, setLimitUnstakeTime] = useState(0);

  const txStatus = useSelector((state) => state.txStatus);

  const getRequestTime = async () => {
    let time = await staking_calls.getRequestUnstakeTime(
      currentAccount,
      currentAccount.address,
      tokenID
    );
    /* eslint-disable no-useless-escape */
    const unstakeRequestTimeTmp = time.replace(/\,/g, "");
    setUnstakeRequestTime(unstakeRequestTimeTmp);

    let limitUnstakeTimeTmp = await staking_calls.getLimitUnstakeTime(
      currentAccount
    );
    setLimitUnstakeTime(limitUnstakeTimeTmp);
  };

  useInterval(() => {
    if (unstakeRequestTime) {
      let now = new Date().getTime() / 1000;
      let valid_time = unstakeRequestTime / 1000 + limitUnstakeTime * 60;
      if (valid_time - now > 0)
        setCountdownTime(secondsToTime(valid_time - now));
      else {
        setIsUnstakeTime(true);
        setCountdownTime({ h: 0, m: 0, s: 0 });
      }
    }
  }, 1000);

  useEffect(() => {
    if (stakeStatus === 3) getRequestTime();
  }, [stakeStatus]);

  async function stakeAction(stakeStatus) {
    if (stakeStatus === 1) {
      dispatch(setTxStatus({ txType: STAKE, txStatus: START }));

      let allowance = await artzero_nft_calls.allowance(
        currentAccount,
        currentAccount.address,
        staking.CONTRACT_ADDRESS,
        { u64: tokenID }
      );

      let res;

      if (!allowance) {
        toast.success("Step 1: Approving NFT for staking...");

        res = await artzero_nft_calls.approve(
          currentAccount,
          staking.CONTRACT_ADDRESS,
          { u64: tokenID },
          true,
          dispatch
        );
      }
      if (res || allowance) {
        //Token is unstaked, Stake Now
        toast.success(res ? "Step 2: Staking..." : "Staking...");

        await staking_calls.stake(
          currentAccount,
          [tokenID],
          dispatch,
          STAKE,
          api
        );
        return;
      }
    }

    if (stakeStatus === 2) {
      dispatch(setTxStatus({ txType: REQUEST_UNSTAKE, txStatus: START }));
      //Token is staked, Request Unstake Now
      toast.success("Request Unstaking NFT...");

      await staking_calls.requestUnstake(
        currentAccount,
        [tokenID],
        dispatch,
        REQUEST_UNSTAKE,
        api
      );
    } else if (stakeStatus === 3) {
      if (isUnstakeTime) {
        dispatch(setTxStatus({ txType: UNSTAKE, txStatus: START }));

        toast.success("Unstaking NFT...");
        await staking_calls.unstake(
          currentAccount,
          [tokenID],
          dispatch,
          UNSTAKE,
          api
        );
      } else {
        dispatch(
          setTxStatus({ txType: CANCEL_REQUEST_UNSTAKE, txStatus: START })
        );

        toast("Cancel Unstaking Request...");
        await staking_calls.cancelRequestUnstake(
          currentAccount,
          [tokenID],
          dispatch,
          CANCEL_REQUEST_UNSTAKE,
          api
        );
      }
    }
  }

  return (
    <motion.div
      className="my-collection-card"
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        borderWidth: "2px",
        borderColor: "#7ae7ff00",
        maxWidth: "14rem",

        transitionDuration: "0.15s",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
      }}
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        h="full"
        shadow="lg"
      >
        <Square h="13.75rem" w="13.75rem">
          <Image
            alt={nftName}
            w="full"
            h="full"
            objectFit="cover"
            src={getCachedImageShort(avatar, 500)}
            fallback={<Skeleton w="13.75rem" h="13.75rem" />}
          />
        </Square>

        <Box w="full" p={3}>
          <Heading mb={3} fontSize={["15px", "16px", "17px"]} textAlign="left">
            {nftName}
          </Heading>
          <Flex align="center" justify="start" w="full" mb={3}>
            {stakeStatus === 3 ? (
              <Text textAlign="center" color="brand.grayLight" size="2xs">
                Unstake in {countdownTime ? countdownTime.h : 0}h :{" "}
                {countdownTime ? countdownTime.m : 0}m :{" "}
                {countdownTime ? countdownTime.s : 0}s
              </Text>
            ) : null}
          </Flex>

          {!is_for_sale && stakeStatus !== 0 ? (
            <Flex align="center" justify="center" w="full">
              <Button
                isLoading={
                  txStatus?.stakeStatus ||
                  txStatus?.unstakeStatus ||
                  txStatus?.cancelRequestUnstakeStatus ||
                  txStatus?.requestUnstakeStatus
                }
                loadingText={
                  txStatus?.stakeStatus ||
                  txStatus?.unstakeStatus ||
                  txStatus?.cancelRequestUnstakeStatus ||
                  txStatus?.requestUnstakeStatus
                }
                variant="outline"
                onClick={() => stakeAction(stakeStatus)}
              >
                {stakeStatus === 1
                  ? "Stake"
                  : stakeStatus === 2
                  ? "Request Unstake"
                  : !isUnstakeTime
                  ? "Cancel Unstake"
                  : "Unstake"}
              </Button>
            </Flex>
          ) : null}

          {(is_for_sale || isBid) && (
            <>
              <Flex align="center" justify="start" w="full">
                <VStack align="start">
                  <Text ml={1} color="brand.grayLight">
                    {is_for_sale && "For Sale At"}
                  </Text>
                  <Tag>
                    <TagLabel>{price / 10 ** 12}</TagLabel>
                    <TagRightIcon as={AzeroIcon} />
                  </Tag>
                </VStack>
                <Spacer />
              </Flex>
              <Flex>
                <Spacer />

                <HStack align="center" justify="flex-end">
                  <Text color="brand.grayLight" textAlign="center" w="full">
                    {isBid?.status && "My offer"}
                  </Text>
                  {isBid?.status ? (
                    <HStack minH={"20px"} bg="transparent">
                      <TagLabel bg="transparent">
                        {isBid?.status && isBid?.bidPrice / 10 ** 12}
                      </TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </HStack>
                  ) : null}
                </HStack>

                {!isBid && (
                  <Flex w="full" mt="4px">
                    <Spacer />
                    <Flex
                      align="center"
                      textAlign="right"
                      color="brand.grayLight"
                      // direction="column"
                    >
                      <Text textAlign="center" w="full">
                        {highest_bid ? "Best offer" : "No offer"}
                      </Text>
                      {highest_bid ? (
                        <HStack ml={"6px"} bg="transparent" id="abc">
                          <Text color="#fff" bg="transparent">
                            {highest_bid / 10 ** 12}
                          </Text>
                          <TagRightIcon as={AzeroIcon} />
                        </HStack>
                      ) : null}
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </motion.div>
  );
}
export default MyNFTCard;
