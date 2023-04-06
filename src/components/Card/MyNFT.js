import {
  Box,
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
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import {
  getCloudFlareImage,
  secondsToTime,
  formatNumDynamicDecimal,
} from "@utils";
import staking_calls from "@utils/blockchain/staking_calls";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import useInterval from "use-interval";
import { motion } from "framer-motion";
import {
  STAKE,
  UNSTAKE,
  REQUEST_UNSTAKE,
  CANCEL_REQUEST_UNSTAKE,
} from "@constants";
import { useHistory } from "react-router-dom";
import CommonButton from "../Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import { MAX_ITEM_STAKE } from "@constants";

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

  const [isTicked, setIsTicked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { location } = useHistory();

  const imgCardSize = useBreakpointValue([154, 220]);
  const cardSize = useBreakpointValue([160, 226]);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const handleOnChangeCheckbox = ({ target }) => {
    if (target.checked && multiStakeData?.list?.length >= MAX_ITEM_STAKE) {
      !multiStakeData?.list?.includes(tokenID) && setIsTicked(false);

      return toast.error(`You can stake up to ${MAX_ITEM_STAKE} PMPs per transaction!`);
    }

    target.checked ? setIsTicked(true) : setIsTicked(false);

    if (
      !multiStakeData?.action ||
      multiStakeData?.action === getStakeAction(stakeStatus, isUnstakeTime)
    ) {
      handleSelectMultiNfts(
        tokenID,
        getStakeAction(stakeStatus, isUnstakeTime),
        target.checked
      );
      return;
    }

    return toast.error("Please select same action!");
  };

  useInterval(() => {
    if (unstakeRequestTime) {
      let now = new Date().getTime() / 1000;
      let valid_time = unstakeRequestTime / 1000 + limitUnstakeTime * 60;
      if (valid_time - now > 0)
        setCountdownTime(secondsToTime(valid_time - now));
      else {
        setIsUnstakeTime(true);
        setCountdownTime({ d: 0, h: 0, m: 0, s: 0 });
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
          setCountdownTime({ d: 0, h: 0, m: 0, s: 0 });
        }
      }

      setIsLoading(false);
    };

    if (stakeStatus === 3) getRequestTime();
  }, [currentAccount, stakeStatus, tokenID]);

  const [projImage, setProjImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    avatar &&
      getCloudFlareImage(avatar, 500).then((res) => {
        if (isMounted) {
          setProjImage(res);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [avatar]);

  return (
    <motion.div
      className="my-nft-card"
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        position: "relative",
        borderWidth: "2px",
        borderColor: `${
          multiStakeData?.list?.includes(tokenID) ? "#7ae7ff" : "transparent"
        }`,
        maxWidth: cardSize,

        transitionDuration: "0.15s",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
      }}
    >
      {!is_for_sale && location?.pathname === "/account/stakes" ? (
        <Checkbox
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
          isChecked={isTicked}
          isDisabled={
            actionType ||
            (multiStakeData?.action &&
              multiStakeData?.action !==
                getStakeAction(stakeStatus, isUnstakeTime))
          }
          onChange={(e) => handleOnChangeCheckbox(e)}
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
        <Square h={imgCardSize} w={imgCardSize}>
          <Image
            alt={nftName}
            w="full"
            h="full"
            src={projImage}
            objectFit="contain"
            fallback={<Skeleton w={imgCardSize} h={imgCardSize} />}
          />
        </Square>

        <Box w="full" p={3}>
          <Heading mb={3} fontSize={["xs", "md"]} textAlign="left">
            {nftName}
          </Heading>

          {stakeStatus === 3 ? (
            <Flex align="center" justify="start" w="full" mb={3}>
              <Text
                textAlign="center"
                color="brand.grayLight"
                fontSize={["xs", "md"]}
              >
                Unstake in {countdownTime?.d || 0}d: {countdownTime?.h || 0}h :{" "}
                {countdownTime?.m || 0}m : {countdownTime?.s || 0}s
              </Text>
            </Flex>
          ) : null}

          {!is_for_sale && stakeStatus !== 0 ? (
            <Flex align="center" justify="start" w="full">
              <CommonButton
                {...rest}
                isLoading={
                  isLoading || rest.isLoading
                  // || tokenIDArray?.includes(tokenID)
                }
                mx="0"
                variant="outline"
                // minW="100px"
                height={["36px", "40px"]}
                text={
                  stakeStatus === 1
                    ? "Stake"
                    : stakeStatus === 2
                    ? "Request Unstake"
                    : !isUnstakeTime
                    ? "Cancel Unstake"
                    : "Unstake"
                }
                onClick={() =>
                  handleStakeAction(
                    getStakeAction(stakeStatus, isUnstakeTime),
                    [tokenID]
                  )
                }
                isDisabled={
                  actionType && !tokenIDArray?.includes(tokenID)
                    ? true
                    : multiStakeData?.action
                    ? true
                    : false
                }
              />
            </Flex>
          ) : null}

          {(is_for_sale || isBid) && (
            <>
              <Flex align="center" justify="start" w="full">
                <VStack align="start">
                  <Text ml={1} color="brand.grayLight">
                    {is_for_sale && "For Sale At"}
                  </Text>
                  <Tag minH={["30px", "40px"]}>
                    <TagLabel>
                      {formatNumDynamicDecimal(price / 10 ** 18)}
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
                        {formatNumDynamicDecimal(isBid?.bidPrice / 10 ** 18)}
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
                    >
                      <Text textAlign="center" w="full">
                        {highest_bid ? "  Best offer" : "No offer"}
                      </Text>
                      {highest_bid ? (
                        <HStack ml={"6px"} bg="transparent" i>
                          <Text color="#fff" bg="transparent">
                            {formatNumDynamicDecimal(highest_bid / 10 ** 18)}
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
