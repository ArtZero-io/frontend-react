import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { secondsToTime } from "@utils/index";
import * as ROUTES from "@constants/routes";
import useInterval from "use-interval";
import FadeIn from "react-fade-in";
import { useSubstrateState } from "@utils/substrate";
import { getCurrentPhaseStatusOfProject } from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { getPublicCurrentAccount } from "@utils";
import ImageCloudFlare from "../../../components/ImageWrapper/ImageCloudFlare";

export const Card = ({ variant, project }) => {
  const history = useHistory();
  const [countdown, setCountdown] = useState(null);
  const { api, currentAccount } = useSubstrateState();

  const [progressPercent, setProgressPercent] = useState(0);

  const {
    // status,
    avatarImage,
    name,
    nftContractAddress,
    startTime,
  } = project;

  useInterval(() => {
    if (variant !== "upcoming") {
      return;
    }

    const now = new Date().getTime() / 1000;

    const timeLeft = startTime.replaceAll(",", "") - now;

    if (timeLeft <= 0) {
      setCountdown({ h: 0, m: 0, s: 0 });
      return;
    }

    const timeLeftString = secondsToTime(timeLeft);

    timeLeftString && setCountdown(timeLeftString);
  }, 1000);

  const fetchData = useCallback(async () => {
    try {
      const currPhaseStatus = await getCurrentPhaseStatusOfProject({
        currentAccount: currentAccount || getPublicCurrentAccount(),
        nftContractAddress,
        api,
      });

      if (!currPhaseStatus) {
        return setProgressPercent(0);
      }
      setProgressPercent(
        (currPhaseStatus?.claimedAmount?.replaceAll(",", "") /
          currPhaseStatus?.whitelistAmount?.replaceAll(",", "")) *
          100
      );
    } catch (error) {
      // setLoading(false);

      console.log(error);
    }
  }, [api, currentAccount, nftContractAddress]);

  useEffect(() => {
    fetchData();
  }, [api, currentAccount, fetchData]);

  return (
    <FadeIn>
      <Flex
        m={{ base: "10px", "2xl": "15px" }}
        h="full"
        w="full"
        shadow="lg"
        maxW="288px"
        minH="450px"
        align="center"
        direction="column"
        textAlign="center"
        bg="brand.grayDark"
        position="relative"
      >
        {variant === "live" && (
          <Flex
            alignItems="start"
            justifyContent="flex-start"
            position="absolute"
            top="0"
            right="0"
            h="30px"
            minW="60px"
            bg="#34B979"
          >
            <Box position="relative" h="30px" w="30px">
              <motion.div
                animate={{
                  scale: [0.3, 0.5, 0.7, 1, 0.7],
                  opacity: [0.1, 0.3, 0.5, 0.25, 0.1],
                }}
                transition={{
                  loop: Infinity,
                  delay: 0,
                  duration: 1,
                }}
                style={{
                  top: "7px",
                  left: "7px",
                  position: "absolute",
                  overflow: "visible",
                }}
              >
                <Circle bg="white" h="16px" w="16px" />
              </motion.div>

              <Circle
                top="10px"
                left="10px"
                position="absolute"
                bg="white"
                h="10.5px"
                w="10.5px"
              />
            </Box>
            <Text mt="2px">Live</Text>
          </Flex>
        )}

        {variant === "upcoming" && (
          <Flex
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="0"
            right="0"
            h="30px"
            minW="55px"
            bg="#D72D2D"
          >
            <Text mx="10px">Upcoming</Text>
          </Flex>
        )}

        {variant === "ended" && (
          <Flex
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="0"
            right="0"
            h="30px"
            minW="55px"
            bg="#434343"
          >
            <Text mx="10px">Ended</Text>
          </Flex>
        )}

        <ImageCloudFlare
          cursor="pointer"
          onClick={() =>
            history.push(`${ROUTES.LAUNCHPAD_BASE}/${nftContractAddress}`)
          }
          w="288px"
          h="288px"
          src={avatarImage}
        />

        <Box w="full" px="16px" py="20px">
          {variant === "live" && (
            <Progress w="258px" h="8px" value={progressPercent} mb="12px" />
          )}

          <Heading
            mt={variant === "live" ? "20px" : 0}
            mb="14px"
            fontSize={["15px", "16px", "17px"]}
            textAlign="center"
          >
            {name}
          </Heading>

          {variant === "upcoming" && (
            <HStack
              alignItems="center"
              justifyContent="center"
              minH="30px"
              w="full"
              my="15px"
            >
              <Text mx="10px">
                {Math.ceil(countdown?.h / 24)} day
                {Math.ceil(countdown?.h / 24) > 1 ? "s" : ""}
              </Text>
              <Text>:</Text>
              <Text mx="10px">{countdown?.h % 24} hrs</Text>
              <Text>:</Text>
              <Text mx="10px">{countdown?.m} min</Text>
              <Text>:</Text>
              <Text mx="10px">{countdown?.s} s</Text>
            </HStack>
          )}

          <Button
            border="none"
            bg="black"
            variant="outline"
            w="full"
            onClick={() =>
              history.push(`${ROUTES.LAUNCHPAD_BASE}/${nftContractAddress}`)
            }
          >
            view project
          </Button>
          {variant === "ended" && (
            <Button
              mt="10px"
              variant="outline"
              w="full"
              onClick={() =>
                history.push(
                  `${ROUTES.DETAIL_COLLECTION_BASE}/${nftContractAddress}`
                )
              }
            >
              secondary market
            </Button>
          )}
        </Box>
      </Flex>
    </FadeIn>
  );
};
