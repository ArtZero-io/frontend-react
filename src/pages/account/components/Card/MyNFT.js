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
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import {
  getCachedImageShort,
  secondsToTime,
  formatNumDynamicDecimal,
} from "@utils";
import staking_calls from "@utils/blockchain/staking_calls";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useInterval from "use-interval";
import { motion } from "framer-motion";
import {
  STAKE,
  UNSTAKE,
  REQUEST_UNSTAKE,
  CANCEL_REQUEST_UNSTAKE,
} from "@constants";
import { useHistory } from "react-router-dom";

// Stake Status
// 0 not show, 1 not staked,
// 2 staked ,  3 pending unstake

function MyNFTCard({
  nftContractAddress,
  is_for_sale,
  price,
  avatar,
  tokenID,
  nftName,
  stakeStatus,
  isBid,
  highest_bid,
  handleStakeAction,
  handleSelectMultiNfts,
  multiStakeData,
}) {
  const { currentAccount } = useSubstrateState();
  const [unstakeRequestTime, setUnstakeRequestTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(0);
  const [isUnstakeTime, setIsUnstakeTime] = useState(false);
  const [limitUnstakeTime, setLimitUnstakeTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { location } = useHistory();

  const txStatus = useSelector((state) => state.txStatus);

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
    const getRequestTime = async () => {
      setIsLoading(true);
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

      if (unstakeRequestTimeTmp) {
        let now = new Date().getTime() / 1000;
        let valid_time =
          unstakeRequestTimeTmp / 1000 + limitUnstakeTimeTmp * 60;
        if (valid_time - now > 0)
          setCountdownTime(secondsToTime(valid_time - now));
        else {
          setIsUnstakeTime(true);
          setCountdownTime({ h: 0, m: 0, s: 0 });
        }
      }

      setIsLoading(false);
    };

    if (stakeStatus === 3) getRequestTime();
  }, [currentAccount, stakeStatus, tokenID]);

  return (
    <motion.div
      className="my-collection-card"
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        position: "relative",
        borderWidth: "2px",
        borderColor: `${
          multiStakeData?.list?.includes(tokenID) ? "brand.blue" : "#7ae7ff00"
        }`,
        maxWidth: "14rem",

        transitionDuration: "0.15s",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
      }}
    >
      {location?.pathname === "/account/stakes" ? (
        <Checkbox
          id="aaa"
          sx={{
            "span.chakra-checkbox__control": {
              borderRadius: "0",
              borderWidth: "0.2px",
              borderColor: "brand.blue",
              backgroundColor: "brand.semiBlack",
            },
            "span.chakra-checkbox__control[data-checked] > div": {
              color: "brand.blue",
            },
          }}
          size="lg"
          top="10px"
          right="10px"
          position="absolute"
          isDisabled={
            txStatus?.stakeStatus ||
            txStatus?.unstakeStatus ||
            txStatus?.cancelRequestUnstakeStatus ||
            txStatus?.requestUnstakeStatus ||
            (multiStakeData?.action &&
              multiStakeData?.action !==
                getStakeAction(stakeStatus, isUnstakeTime))
          }
          onChange={({ target }) => {
            if (
              !multiStakeData?.action ||
              multiStakeData?.action ===
                getStakeAction(stakeStatus, isUnstakeTime)
            ) {
              handleSelectMultiNfts(
                tokenID,
                getStakeAction(stakeStatus, isUnstakeTime),
                target.checked
              );
              return;
            }

            return toast.error("Please select same action!");
          }}
        />
      ) : null}{" "}
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
                Unstake in {countdownTime?.h || 0}h : {countdownTime?.m || 0}m :{" "}
                {countdownTime?.s || 0}s
              </Text>
            ) : null}
          </Flex>

          {!is_for_sale && stakeStatus !== 0 ? (
            <Flex align="center" justify="start" w="full">
              <Button
                isLoading={isLoading || txStatus?.tokenID?.includes(tokenID)}
                isDisabled={
                  txStatus?.stakeStatus ||
                  txStatus?.unstakeStatus ||
                  txStatus?.cancelRequestUnstakeStatus ||
                  txStatus?.requestUnstakeStatus ||
                  multiStakeData?.action
                }
                variant="outline"
                onClick={() =>
                  handleStakeAction(
                    getStakeAction(stakeStatus, isUnstakeTime),
                    [tokenID]
                  )
                }
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
                    <TagLabel>
                      {formatNumDynamicDecimal(price / 10 ** 12)}
                    </TagLabel>
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
                        {formatNumDynamicDecimal(isBid?.bidPrice / 10 ** 12)}
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
                        {highest_bid ? "  Best offer" : "No offer"}
                      </Text>
                      {highest_bid ? (
                        <HStack ml={"6px"} bg="transparent" i>
                          <Text color="#fff" bg="transparent">
                            {formatNumDynamicDecimal(highest_bid / 10 ** 12)}
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

export const getStakeAction = (stakeStatus, isUnstakeTime) => {
  if (stakeStatus === 0) return;

  if (stakeStatus === 1) {
    return STAKE;
  }

  if (stakeStatus === 2) {
    return REQUEST_UNSTAKE;
  }

  if (stakeStatus === 3) {
    return isUnstakeTime ? UNSTAKE : CANCEL_REQUEST_UNSTAKE;
  }
};
