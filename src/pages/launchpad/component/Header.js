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
  Tag,
  Text,
  Tooltip,
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
import launchpad_psp34_nft_standard from "../../../utils/blockchain/launchpad-psp34-nft-standard";
import { useEffect } from "react";
import { execContractQuery } from "../../account/nfts/nfts";
import { useMemo } from "react";
import { APICall } from "../../../api/client";

function LaunchpadDetailHeader({
  loading,
  userWLInfo,
  currentPhase,
  project = {},
  activePhaseId,
  phasesInfo = [],
  isLastPhaseEnded,
  collection_address,
  loadingPhaseInfo,
  loadingUserWLInfo,
}) {
  const {
    name,
    discord,
    twitter,
    website,
    telegram,
    isActive,
    avatarImage,
    description,
    nftContractAddress,
    nft_count: totalSupply,
    collectionOwner: projectOwner,
  } = project;

  const history = useHistory();
  const { currentAccount, api } = useSubstrateState();
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

  const nextPhaseWhenNoCurrPhaseId = useMemo(() => {
    const _phasesInfo = [...phasesInfo];

    if (isLastPhaseEnded) {
      return {
        phase: _phasesInfo.pop(),
        countDownTimer: 0,
      };
    }

    if (!activePhaseId) {
      const timeStampOnly = phasesInfo.reduce((prev, curr) => {
        prev.push(curr.startTime);
        prev.push(curr.endTime);
        return prev;
      }, []);

      let phase;
      let timeNeedCount;

      for (let i = 0; i < timeStampOnly?.length; i++) {
        const p = timeStampOnly[i];
        const now = Date.now();

        if (now > p) {
          continue;
        }

        timeNeedCount = p;
        phase = phasesInfo[Math.floor(i / 2)];
      }

      return {
        phase: phase,
        countDownTimer: timeNeedCount,
      };
    }
  }, [activePhaseId, isLastPhaseEnded, phasesInfo]);

  // console.log("nextPhaseWhenNoCurrPhaseId", nextPhaseWhenNoCurrPhaseId);

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
      countDownTimer = nextPhaseWhenNoCurrPhaseId?.countDownTimer - Date.now();
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

  const isProjOwner = useMemo(() => {
    return projectOwner === currentAccount?.address;
  }, [currentAccount?.address, projectOwner]);

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!api || !currentAccount?.address) return;
      const queryResult1 = await execContractQuery(
        currentAccount?.address,
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        nftContractAddress,
        "accessControl::hasRole",
        3739740293,
        currentAccount?.address
      );

      setIsAdmin(queryResult1?.toHuman().Ok);
    };
    checkIsAdmin();
  }, [api, currentAccount?.address, nftContractAddress]);

  const [isDoxxed, setIsDoxxed] = useState(false);
  const [isDuplicationChecked, setIsDuplicationChecked] = useState(false);

  useEffect(() => {
    const fetchProjInfo = async () => {
      const { ret, status } = await APICall.getCollectionByAddress({
        collection_address,
      });

      if (status === "OK") {
        const proj = ret[0];

        setIsDoxxed(proj?.isDoxxed);
        setIsDuplicationChecked(proj?.isDuplicationChecked);
      }
    };

    fetchProjInfo();
  }, [collection_address]);

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

          <HStack spacing="10px" pt="10px">
            {isDoxxed && (
              <Tooltip label="At least one of team members verified his identity.">
                <Box p="1">
                  <Tag border="1px solid #7ae7ff">DOXXED</Tag>
                </Box>
              </Tooltip>
            )}

            {isDuplicationChecked && (
              <Tooltip label="Artwork is verified by third-party for its uniqueness">
                <Box p="1">
                  <Tag border="1px solid #7ae7ff">VERIFIED</Tag>
                </Box>
              </Tooltip>
            )}
          </HStack>

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
                <Heading
                  w="full"
                  color="#fff"
                  fontSize={["32px", "48px"]}
                  lineHeight={["38px", "60px"]}
                >
                  {name}
                </Heading>

                <VStack
                  minW={["auto", "870px"]}
                  w="full"
                  borderBottom="#282828 solid"
                  borderBottomWidth={["0px", "1px"]}
                  pt={["12px", "12px"]}
                  pb={["20px", "30px"]}
                >
                  <Heading fontSize={["sm", "md"]} mb={["6px", "8px"]}>
                    project creator:{" "}
                    <Text as="span" color="#7ae7ff">
                      {truncateStr(projectOwner)}{" "}
                    </Text>
                  </Heading>

                  <Skeleton isLoaded={!loading}>
                    {isAdmin && (
                      <Heading fontSize={["sm", "md"]}>
                        project admin:{" "}
                        <Text as="span" color="#7ae7ff">
                          {truncateStr(currentAccount?.address)}
                        </Text>
                      </Heading>
                    )}
                  </Skeleton>
                </VStack>

                <Flex
                  color="#888"
                  pt={["2px", "22px"]}
                  pb={["30px", "30px"]}
                  w={["340px", "full"]}
                  textAlign="center"
                  justifyContent="center"
                  fontSize={["16px", "18px"]}
                  maxH={["56px", "80px"]}
                  minH={{ base: "1rem", "2xl": "3.375rem" }}
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
                      <Skeleton
                        w="150px"
                        as="span"
                        isLoaded={!loadingPhaseInfo}
                      >
                        <Text
                          as="span"
                          display={["block", "inline"]}
                          color="#fff"
                        >
                          {currentPhase?.publicMintingFee / 10 ** 18 || nextPhaseWhenNoCurrPhaseId?.phase
                              ?.publicMintingFee /
                              10 ** 18 ||
                             0}{" "}
                          <AzeroIcon
                            width={["14px", "16px"]}
                            height={["14px", "16px"]}
                          />
                        </Text>
                      </Skeleton>
                    </Text>
                  )}

                  {currentAccount?.address &&
                    (!userWLInfo[currentPhase?.id - 1] ||
                      userWLInfo[currentPhase?.id - 1]?.remainAmount <= 0) && (
                      <Text mx={["25px", "42px"]} w="150px">
                        Price:{" "}
                        <Skeleton as="span" isLoaded={!loadingUserWLInfo}>
                          <Skeleton
                            w="150px"
                            as="span"
                            isLoaded={!loadingPhaseInfo}
                          >
                            <Text
                              as="span"
                              display={["block", "inline"]}
                              color="#fff"
                            >
                              {currentPhase?.publicMintingFee / 10 ** 18 || 0}{" "}
                              <AzeroIcon
                                mb={["2px", "5px"]}
                                width={["14px", "16px"]}
                                height={["14px", "16px"]}
                              />
                            </Text>
                          </Skeleton>
                        </Skeleton>
                      </Text>
                    )}

                  {currentAccount?.address &&
                    userWLInfo[currentPhase?.id - 1]?.remainAmount > 0 && (
                      <Text mx={["25px", "42px"]} w="150px">
                        Price:{" "}
                        <Text
                          as="span"
                          display={["block", "inline"]}
                          color="#fff"
                        >
                          {userWLInfo[currentPhase?.id - 1]?.mintingFee /
                            10 ** 18}{" "}
                          <AzeroIcon
                            mb={["2px", "5px"]}
                            width={["14px", "16px"]}
                            height={["14px", "16px"]}
                          />
                        </Text>
                      </Text>
                    )}

                  <Text textAlign="left" mx={["25px", "42px"]}>
                    Phase:{" "}
                    <Text
                      as="span"
                      minW="60px"
                      display={["block", "inline"]}
                      color="#fff"
                    >
                      {currentPhase?.title ||
                        nextPhaseWhenNoCurrPhaseId?.phase?.title}
                    </Text>
                  </Text>
                </Flex>
              </VStack>
            </motion.div>
          </HStack>

          {/* project ended? */}
          {/* {isLastPhaseEnded && <CountDownTimer status="mint ended" />} */}
          {/* <CountDownTimer status="mint ended" /> */}
          {/* project not started? */}
          {/* {!isLastPhaseEnded && (
            <CountDownTimer
              countDownTimer={countDownTimer}
              status={`phase ${!activePhaseId ? "start" : "end"} in`}
            />
          )} */}
          <CountDownTimer
            countDownTimer={countDownTimer}
            status={`phase ${!activePhaseId ? "start" : "end"} in`}
          />
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

          {isProjOwner || isAdmin ? (
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
                  isProjOwner
                    ? onOpenURI()
                    : toast.error(
                        "You must be the project owner to update art location!"
                      )
                }
              >
                <BaseURIIcon color={isProjOwner ? "#fff" : "#888"} />

                <Heading
                  fontSize={["md", "sm"]}
                  color={isProjOwner ? "brand.blue" : "#888"}
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  update art location
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
                  isProjOwner
                    ? onOpenUpdateAdminAddressModal()
                    : toast.error(
                        "You must be the project owner to grant admin role!"
                      )
                }
              >
                <AdminAddressIcon color={isProjOwner ? "#fff" : "#888"} />

                <Heading
                  fontSize={["md", "sm"]}
                  color={isProjOwner ? "brand.blue" : "#888"}
                  textDecoration="underline"
                  fontFamily="Evogria, sans-serif"
                >
                  grant admin role
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
                  isProjOwner
                    ? onOpenWithdrawModal()
                    : toast.error(
                        "You must be the project owner to withdraw balance!"
                      )
                }
              >
                <ProjectInfoIcon color={isProjOwner ? "#fff" : "#888"} />

                <Heading
                  fontSize={["md", "sm"]}
                  color={isProjOwner ? "brand.blue" : "#888"}
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
                  isProjOwner || isAdmin
                    ? history.push({
                        state: {
                          formMode: "EDIT",
                          collection_address,
                          projectInfo: project,
                        },
                        pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                      })
                    : toast.error(
                        "You must be the project owner/admin to update project info!"
                      )
                }
              >
                <ProjectInfoIcon color="#fff" />

                <Heading
                  fontSize={["md", "sm"]}
                  color="#7ae7ff"
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
                  isProjOwner || isAdmin
                    ? onOpenPhase()
                    : toast.error(
                        "You must be the project owner/admin to update phases!"
                      )
                }
              >
                <PhasesIcon color="#fff" />

                <Heading
                  fontSize={["md", "sm"]}
                  color="#7ae7ff"
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
        cursor="pointer"
        onClick={() => history.goBack()}
        mt="27px"
        top="0"
        w={["full", "auto"]}
        display={["none", "flex"]}
        left={{ base: "30px", xl: "100px" }}
        position={{ base: "unset", md: "absolute" }}
        // _hover={{
        //   bg: "brand.blue",
        //   // color: "black",
        //   borderWidth: "0",
        // }}
      >
        <IconButton
          mr="8px"
          variant="iconOutline"
          width={["40px", "50px"]}
          height={["40px", "50px"]}
          icon={<ArrowBackIcon fontSize="2xl" />}
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
        <SocialCard
          profile={[{ website }, { twitter }, { discord }, { telegram }]}
        />
      </VStack>

      {(isProjOwner || isAdmin) && (
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
          <UpdatePhasesModal
            {...project}
            isOpen={isOpenPhase}
            onClose={() => {
              onClosePhase();
            }}
            collection_address={collection_address}
          />
        </>
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
      h={["202px", "full", "full"]}
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
