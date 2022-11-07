import {
  Box,
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { ArrowBackIcon } from "@chakra-ui/icons";
import PhasesIcon from "@theme/assets/icon/Phases";
import BaseURIIcon from "@theme/assets/icon/BaseURI";
import ProjectInfoIcon from "@theme/assets/icon/ProjectInfo";
import AdminAddressIcon from "@theme/assets/icon/AdminAddress";

import numeral from "numeral";
import toast from "react-hot-toast";
import { memo, useState } from "react";
import useInterval from "use-interval";
import { useHistory } from "react-router-dom";

import { truncateStr } from "@utils";
import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import UpdateURIModal from "./Modal/UpdateURIModal";
import UpdatePhasesModal from "./Modal/UpdatePhasesModal";
import UpdateWithdrawModal from "./Modal/UpdateWithdrawModal";
import UpdateAdminAddressModal from "./Modal/UpdateAdminAddressModal";

import SocialCard from "@components/Card/Social";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";

function LaunchpadDetailHeader({
  loading,
  userWLInfo,
  currentPhase,
  project = {},
  activePhaseId,
  phasesInfo = [],
  isLastPhaseEnded,
  collection_address,
}) {
  const {
    name,
    discord,
    twitter,
    website,
    isActive,
    avatarImage,
    description,
    nft_count: totalSupply,
    collectionOwner: projectOwner,
    collectionAdmin: projectAdminAddress,
  } = project;

  const history = useHistory();
  const { currentAccount } = useSubstrateState();
  const descLength = useBreakpointValue([115, 175]);

  const [isSeeMore, setIsSeeMore] = useState(false);
  const [countDownTimer, setCountDownTimer] = useState({});

  const {
    isOpen: isOpenURI,
    onOpen: onOpenURI,
    onClose: onCloseURI,
  } = useDisclosure();

  const {
    isOpen: isOpenPhase,
    onOpen: onOpenPhase,
    onClose: onClosePhase,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateAdminAddressModal,
    onOpen: onOpenUpdateAdminAddressModal,
    onClose: onCloseUpdateAdminAddressModal,
  } = useDisclosure();

  const {
    isOpen: isOpenWithdrawModal,
    onOpen: onOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

  useInterval(() => {
    if (isLastPhaseEnded) {
      setCountDownTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      return;
    }

    let countDownTimer;

    if (!activePhaseId) {
      const firstPhase = phasesInfo?.[0];

      countDownTimer = firstPhase?.startTime - Date.now();
    } else {
      countDownTimer = currentPhase?.endTime - Date.now();
    }

    const seconds = Math.floor((countDownTimer / 1000) % 60);
    const minutes = Math.floor((countDownTimer / 1000 / 60) % 60);
    const hours = Math.floor((countDownTimer / (1000 * 60 * 60)) % 24);
    const days = Math.floor(countDownTimer / (1000 * 60 * 60 * 24));

    setCountDownTimer({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  }, 1000);

  return (
    <Box as="section" position="relative" w="full" mt={["30px", "320px"]}>
      <Box mx="auto" w="full" maxW="870px">
        <VStack px="35px" pb="30px">
          <Center
            p="-px"
            position="relative"
            rounded="full"
            border="4px solid"
            borderColor="white"
            h={["68px", "120px", "120px"]}
            w={["68px", "120px", "120px"]}
            filter="drop-shadow(0px 4px 4px #00320025)"
            bg="#333"
          >
            <ImageCloudFlare
              size="500"
              border="4px solid white"
              borderRadius="full"
              h={["68px", "120px", "120px"]}
              w={["68px", "120px", "120px"]}
              src={avatarImage}
            />

            <Circle
              bottom="-5px"
              right="-5px"
              position="absolute"
              width={["20px", "32px"]}
              height={["20px", "32px"]}
              border="black solid"
              borderWidth={["3px", "4px"]}
              filter="drop-shadow(0px 4px 4px #00320025)"
              bg={isActive ? "#34B979" : "#666"}
            />
          </Center>

          <HStack w="full" justifyContent="space-around">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VStack
                pt={["6px", "26px"]}
                pb={["26px", "0px"]}
                textAlign="center"
                justifyContent="space-between"
                minH={{ base: "3.5rem", "2xl": "7.125rem" }}
              >
                <Skeleton w="full" minH="fit-content" isLoaded={!loading}>
                  <Heading
                    w="full"
                    color="#fff"
                    fontSize={["32px", "48px"]}
                    lineHeight={["38px", "60px"]}
                  >
                    {name}
                  </Heading>
                </Skeleton>

                <VStack
                  minW={["auto", "870px"]}
                  w="full"
                  borderBottom="#282828 solid"
                  borderBottomWidth={["0px", "1px"]}
                  pt={["12px", "12px"]}
                  pb={["20px", "30px"]}
                >
                  <Skeleton isLoaded={!loading}>
                    <Heading fontSize={["sm", "md"]} mb={["6px", "8px"]}>
                      project creator:{" "}
                      <Text as="span" color="#7ae7ff">
                        {truncateStr(projectOwner)}{" "}
                      </Text>
                    </Heading>

                    {(projectAdminAddress === currentAccount?.address ||
                      projectOwner === currentAccount?.address) && (
                      <Heading fontSize={["sm", "md"]}>
                        project admin:{" "}
                        <Text as="span" color="#7ae7ff">
                          {truncateStr(projectAdminAddress)}
                        </Text>
                      </Heading>
                    )}
                  </Skeleton>
                </VStack>

                <Skeleton
                  display="flex"
                  isLoaded={!loading}
                  pt={["2px", "22px"]}
                  pb={["30px", "30px"]}
                  w="full"
                  color="#888"
                  textAlign="center"
                  justifyContent="center"
                  fontSize={["16px", "18px"]}
                  minH={{ base: "1rem", "2xl": "3.375rem" }}
                  maxH={["56px", "80px"]}
                >
                  <Text mx={["25px", "42px"]}>
                    Supply:{" "}
                    <Text as="span" display={["block", "inline"]} color="#fff">
                      {totalSupply}
                    </Text>
                  </Text>

                  {!currentAccount?.address && (
                    <Text mx={["25px", "42px"]}>
                      Price:{" "}
                      <Text display={["block", "inline"]} color="#fff">
                        {/* <Skeleton
                          w="150px"
                          as="span"
                          isLoaded={currentPhase?.isPublic}
                        > */}
                        {currentPhase?.publicMintingFee / 10 ** 12}{" "}
                        <AzeroIcon
                          mb={["2px", "5px"]}
                          width={["14px", "16px"]}
                          height={["14px", "16px"]}
                        />
                        {/* </Skeleton> */}
                      </Text>
                    </Text>
                  )}

                  {/* <Skeleton w="150px" as="span" isLoaded={userWLInfo}> */}
                  {currentAccount?.address &&
                    (!userWLInfo[currentPhase?.id - 1] ||
                      userWLInfo[currentPhase?.id - 1]?.remainAmount <= 0) && (
                      <Text mx={["25px", "42px"]} w="150px">
                        Price:{" "}
                        <Text display={["block", "inline"]} color="#fff">
                          {/* <Skeleton
                              w="150px"
                              as="span"
                              isLoaded={currentPhase?.publicMintingFee}
                            > */}
                          {currentPhase?.publicMintingFee / 10 ** 12}{" "}
                          <AzeroIcon
                            mb={["2px", "5px"]}
                            width={["14px", "16px"]}
                            height={["14px", "16px"]}
                          />
                          {/* </Skeleton> */}
                        </Text>
                      </Text>
                    )}

                  {currentAccount?.address &&
                    userWLInfo[currentPhase?.id - 1]?.remainAmount > 0 && (
                      <Text mx={["25px", "42px"]} w="150px">
                        Price:{" "}
                        <Text display={["block", "inline"]} color="#fff">
                          {userWLInfo[currentPhase?.id - 1]?.mintingFee /
                            10 ** 12}{" "}
                          <AzeroIcon
                            mb={["2px", "5px"]}
                            width={["14px", "16px"]}
                            height={["14px", "16px"]}
                          />
                        </Text>
                      </Text>
                    )}
                  {/* </Skeleton> */}

                  <Text mx={["5px", "42px"]}>
                    Phase:{" "}
                    <Text display={["block", "inline"]} color="#fff">
                      {currentPhase?.title}
                    </Text>
                  </Text>
                </Skeleton>
              </VStack>
            </motion.div>
          </HStack>

          {/* project ended? */}
          {isLastPhaseEnded && <CountDownTimer status="mint ended" />}

          {/* project not started? */}
          {!isLastPhaseEnded && (
            <CountDownTimer
              countDownTimer={countDownTimer}
              status={`phase ${!activePhaseId ? "start" : "end"} in`}
            />
          )}

          <Skeleton
            pt="22px"
            display="flex"
            justifyContent="center"
            w="full"
            maxW="680px"
            isLoaded={name?.length}
          >
            <Flex
              paddingBottom="24px"
              w="full"
              maxW="576px"
              textAlign="center"
              position="relative"
              minH={["48px", "54px"]}
              justifyContent="center"
              fontSize={["16px", "18px"]}
            >
              <Text noOfLines={[isSeeMore ? 999 : 2]}>{description}</Text>

              <Flex
                w="full"
                bottom="0"
                right="0"
                minW="75px"
                px="2px"
                cursor="pointer"
                color="#7ae7ff"
                zIndex="docked"
                position="absolute"
                justifyContent="center"
                textDecoration="underline"
                onClick={() => setIsSeeMore(!isSeeMore)}
                display={description?.length > descLength ? "flex" : "none"}
              >
                {isSeeMore ? "See less" : "Show more"}
              </Flex>
            </Flex>
          </Skeleton>

          {projectOwner === currentAccount?.address ||
          projectAdminAddress === currentAccount?.address ? (
            <Stack
              py="30px"
              spacing={["20px", "10px"]}
              minW={["fit-content", "870px"]}
              justifyContent="space-between"
              alignItems="center"
              direction={["column", "row"]}
            >
              <HStack
                minW="fit-content"
                cursor="pointer"
                onClick={() =>
                  projectOwner === currentAccount?.address
                    ? onOpenURI()
                    : toast.error(
                        "You must be the project owner to update base uri!"
                      )
                }
              >
                <BaseURIIcon
                  color={
                    projectOwner === currentAccount?.address ? "#fff" : "#888"
                  }
                />

                <Heading
                  fontSize={["md", "sm"]}
                  color={
                    projectOwner === currentAccount?.address
                      ? "brand.blue"
                      : "#888"
                  }
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  update base uri
                </Heading>
              </HStack>

              <Divider
                width="2px"
                height="30px"
                bg="#232323"
                display={["none", "inline"]}
              />

              <HStack
                minW="fit-content"
                cursor="pointer"
                onClick={() =>
                  projectOwner === currentAccount?.address
                    ? onOpenUpdateAdminAddressModal()
                    : toast.error(
                        "You must be the project owner to update admin address!"
                      )
                }
              >
                <AdminAddressIcon
                  color={
                    projectOwner === currentAccount?.address ? "#fff" : "#888"
                  }
                />

                <Heading
                  fontSize={["md", "sm"]}
                  color={
                    projectOwner === currentAccount?.address
                      ? "brand.blue"
                      : "#888"
                  }
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  update admin address
                </Heading>
              </HStack>

              <Divider
                width="2px"
                height="30px"
                bg="#232323"
                display={["none", "inline"]}
              />

              <HStack
                minW="fit-content"
                cursor="pointer"
                onClick={() =>
                  projectOwner === currentAccount?.address
                    ? onOpenWithdrawModal()
                    : toast.error(
                        "You must be the project owner to withdraw balance!"
                      )
                }
              >
                <ProjectInfoIcon
                  color={
                    projectOwner === currentAccount?.address ? "#fff" : "#888"
                  }
                />

                <Heading
                  fontSize={["md", "sm"]}
                  color={
                    projectOwner === currentAccount?.address
                      ? "brand.blue"
                      : "#888"
                  }
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  withdraw balance
                </Heading>
              </HStack>

              <Divider
                width="2px"
                height="30px"
                bg="#232323"
                display={["none", "inline"]}
              />

              <HStack
                minW="fit-content"
                cursor="pointer"
                onClick={() =>
                  projectAdminAddress === currentAccount?.address
                    ? history.push({
                        state: { formMode: "EDIT", collection_address },
                        pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                      })
                    : toast.error(
                        "You must be the project admin to update project info!"
                      )
                }
              >
                <ProjectInfoIcon
                  color={
                    projectAdminAddress === currentAccount?.address
                      ? "#fff"
                      : "#888"
                  }
                />

                <Heading
                  fontSize={["md", "sm"]}
                  color={
                    projectAdminAddress === currentAccount?.address
                      ? "#7ae7ff"
                      : "#888"
                  }
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  update project info
                </Heading>
              </HStack>

              <Divider
                width="2px"
                height="30px"
                bg="#232323"
                display={["none", "inline"]}
              />

              <HStack
                minW="fit-content"
                cursor="pointer"
                onClick={() =>
                  projectAdminAddress === currentAccount?.address
                    ? onOpenPhase()
                    : toast.error(
                        "You must be the project admin to update phases!"
                      )
                }
              >
                <PhasesIcon
                  color={
                    projectAdminAddress === currentAccount?.address
                      ? "#fff"
                      : "#888"
                  }
                />

                <Heading
                  fontSize={["md", "sm"]}
                  color={
                    projectAdminAddress === currentAccount?.address
                      ? "#7ae7ff"
                      : "#888"
                  }
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  update phases
                </Heading>
              </HStack>
            </Stack>
          ) : null}
        </VStack>
      </Box>

      <HStack
        pt="27px"
        top="0"
        w={["full", "auto"]}
        display={["none", "flex"]}
        left={{ base: "30px", xl: "100px" }}
        position={{ base: "unset", md: "absolute" }}
      >
        <IconButton
          mr="8px"
          onClick={() => history.goBack()}
          variant="iconOutline"
          width={["40px", "50px"]}
          height={["40px", "50px"]}
          icon={<ArrowBackIcon fontSize="2xl" />}
          _hover={{
            bg: "brand.blue",
            color: "black",
            borderWidth: "0",
          }}
        />
        <Text fontSize="lg">Go back</Text>
      </HStack>

      <VStack
        pt="15px"
        top="0"
        right="100px"
        w={["full", "auto"]}
        position={{ base: "unset", xl: "absolute" }}
      >
        <SocialCard profile={[{ website }, { twitter }, { discord }]} />
      </VStack>

      {projectOwner === currentAccount?.address && (
        <>
          <UpdateURIModal
            isOpen={isOpenURI}
            onClose={onCloseURI}
            collection_address={collection_address}
          />
          <UpdateAdminAddressModal
            isOpen={isOpenUpdateAdminAddressModal}
            collection_address={collection_address}
            onClose={onCloseUpdateAdminAddressModal}
          />
          <UpdateWithdrawModal
            isOpen={isOpenWithdrawModal}
            collection_address={collection_address}
            onClose={onCloseWithdrawModal}
          />
        </>
      )}

      {projectAdminAddress === currentAccount?.address && (
        <UpdatePhasesModal
          {...project}
          isOpen={isOpenPhase}
          onClose={onClosePhase}
          collection_address={collection_address}
        />
      )}
    </Box>
  );
}

export default LaunchpadDetailHeader;

const CountDownTimer = memo(({ countDownTimer, status }) => {
  return (
    <Skeleton
      position="relative"
      w="full"
      isLoaded={!false}
      my="30px"
      maxW="680px"
      borderWidth={2}
      color="brand.blue"
      borderColor="brand.blue"
      h={["210px", "full", "full"]}
    >
      <Box
        h="32px"
        w="full"
        position="absolute"
        top="-16px"
        zIndex="docked"
        p="6px 20px"
        textAlign="center"
      >
        <Text
          mx="auto"
          maxW="120px"
          bg="#7ae7ff"
          fontFamily="Evogria"
          fontSize="16px"
          color="#000"
        >
          {status}
        </Text>
      </Box>

      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        maxH={["200px", "110px"]}
        h={["200px"]}
        py={{ base: "0px", xl: "20px" }}
        flexWrap={["wrap", "noWrap", "noWrap"]}
        w="full"
      >
        <VStack
          textAlign="center"
          px={["2px", "12px"]}
          w={["45%", "full", "full"]}
        >
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                lineHeight="none"
                fontFamily="DS-Digital"
                fontSize={["40px", "48px"]}
              >
                {numeral(countDownTimer?.days).format("00,0")}
              </Text>
              <Text fontSize={["14px", "16px"]}> Days</Text>
            </motion.div>
          </>
        </VStack>

        <Divider
          transform="rotate(90deg)"
          width="300px"
          bg="#232323"
          display={{ base: "none", xl: "inline" }}
        />

        <VStack
          textAlign="center"
          px={["2px", "12px"]}
          w={["45%", "full", "full"]}
        >
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                lineHeight="none"
                fontFamily="DS-Digital"
                fontSize={["40px", "48px"]}
              >
                {numeral(countDownTimer?.hours).format("00,0")}
              </Text>
              <Text fontSize={["14px", "16px"]}>Hours</Text>
            </motion.div>
          </>
        </VStack>

        {/* // mobile + line */}
        <Divider
          bg="#555"
          pos="absolute"
          width="2px"
          height="340px"
          display={["inline", "none"]}
          transform="rotate(90deg) translateY(0px)"
        />
        <Divider
          pos="absolute"
          bg="#555"
          width="2px"
          height="195px"
          display={["inline", "none"]}
        />
        {/* // End mobile + line */}

        <Divider
          transform="rotate(90deg)"
          width="300px"
          bg="#232323"
          display={{ base: "none", xl: "inline" }}
        />

        <VStack
          textAlign="center"
          px={["2px", "12px"]}
          w={["45%", "full", "full"]}
        >
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                lineHeight="none"
                fontFamily="DS-Digital"
                fontSize={["40px", "48px"]}
              >
                {numeral(countDownTimer?.minutes).format("00,0")}
              </Text>
              <Text fontSize={["14px", "16px"]}> Mins</Text>
            </motion.div>
          </>
        </VStack>

        <Divider
          transform="rotate(90deg)"
          width="300px"
          bg="#232323"
          display={{ base: "none", xl: "inline" }}
        />

        <VStack
          textAlign="center"
          px={["2px", "12px"]}
          w={["45%", "full", "full"]}
        >
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text
                lineHeight="none"
                fontFamily="DS-Digital"
                fontSize={["40px", "48px"]}
              >
                {numeral(countDownTimer?.seconds).format("00,0")}
              </Text>
              <Text fontSize={["14px", "16px"]}> Seconds</Text>
            </motion.div>
          </>
        </VStack>
      </Flex>
    </Skeleton>
  );
});
