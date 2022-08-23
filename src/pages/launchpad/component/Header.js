import {
  Box,
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { convertStringToPrice } from "@utils";
import useInterval from "use-interval";
import { getCachedImageShort } from "@utils/index";
import SocialCard from "@components/Card/Social";
import * as ROUTES from "@constants/routes";
import { useHistory } from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import UpdateURIModal from "./Modal/UpdateURIModal";
import UpdateAdminAddressModal from "./Modal/UpdateAdminAddressModal";
import UpdatePhasesModal from "./Modal/UpdatePhasesModal";
import UpdateWithdrawModal from "./Modal/UpdateWithdrawModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { truncateStr } from "@utils";
import numeral from "numeral";
import BaseURIIcon from "@theme/assets/icon/BaseURI";
import AdminAddressIcon from "@theme/assets/icon/AdminAddress";
import PhasesIcon from "@theme/assets/icon/Phases";
import ProjectInfoIcon from "@theme/assets/icon/ProjectInfo";
import toast from "react-hot-toast";
import { getCurrentPhaseStatusOfProject } from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { getPublicCurrentAccount } from "@utils";

function LaunchpadDetailHeader({
  project,
  currentWhitelist,
  collection_address,
  loading,
}) {
  // const { collection_address } = useParams();

  const [livePhase, setLivePhase] = useState(null);
  const {
    name,
    totalSupply,
    phases,
    description,
    projectOwner,
    projectAdminAddress,
    isActive,
    avatarImage,
    discord,
    twitter,
    website,
  } = project;

  const [countDownTimer, setCountDownTimer] = useState({});

  const history = useHistory();
  const { api, currentAccount } = useSubstrateState();

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

  useEffect(() => {
    const getLivePhase = async () => {
      if (currentAccount) {
        if (phases?.length > 0) {
          const data = phases.find((p) => p.isLive === 1);
          console.log("getLivePhase data", data);
          setLivePhase(data);
        }
      } else {
        const currPhaseStatus = await getCurrentPhaseStatusOfProject({
          currentAccount: getPublicCurrentAccount(),
          nftContractAddress: collection_address,
          api,
        });

        const data = {
          ...currPhaseStatus,
          startTime: currPhaseStatus?.startTime?.replaceAll(",", ""),
          endTime: currPhaseStatus?.endTime?.replaceAll(",", ""),
          code: currPhaseStatus?.title,
        };

        currPhaseStatus && setLivePhase(data);
      }
    };

    getLivePhase();
  }, [api, collection_address, currentAccount, phases]);

  useInterval(() => {
    if (livePhase && livePhase?.endTime) {
      const total = livePhase?.endTime - Date.now();

      if (total <= 0) {
        setCountDownTimer({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      setCountDownTimer({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }
  }, 1000);

  const [isSeeMore, setIsSeeMore] = useState(false);

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
            <Image
              alt={"name"}
              w="full"
              h="full"
              rounded="full"
              objectFit="cover"
              src={getCachedImageShort(avatarImage, 500)}
              fallback={
                <Skeleton
                  w={["68px", "120px", "120px"]}
                  h={["60px", "112px", "112px"]}
                  borderRadius="full"
                />
              }
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
                textAlign="center"
                justifyContent="space-between"
                minH={{ base: "3.5rem", "2xl": "7.125rem" }}
              >
                <Skeleton
                  w="full"
                  minH="fit-content"
                  isLoaded={!loading}
                  // h={["48px", "60px", "60px"]}
                >
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
                  pb={["0px", "30px"]}
                >
                  <Skeleton
                    isLoaded={!loading}
                    // h={["38px", "55px"]}
                  >
                    <Heading fontSize={["sm", "md"]} mb={["0px", "8px"]}>
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
                  pb={["16px", "30px"]}
                  w="full"
                  color="#888"
                  textAlign="center"
                  justifyContent="center"
                  fontSize={["16px", "18px"]}
                  minH={{ base: "1rem", "2xl": "3.375rem" }}
                  maxH={["56px", "80px"]}
                >
                  <Text mx={["5px", "42px"]}>
                    Supply:{" "}
                    <Text as="span" color="#fff">
                      {totalSupply}
                    </Text>
                  </Text>

                  {livePhase &&
                  !livePhase?.publicPhase &&
                  currentWhitelist.mintingFee ? (
                    <>
                      <Text mx={["5px", "42px"]}>
                        Price:{" "}
                        <Text as="span" color="#fff">
                          {convertStringToPrice(currentWhitelist.mintingFee)}{" "}
                          <AzeroIcon
                            mb="5px"
                            w={["14px", "16px"]}
                            h={["14px", "16px"]}
                          />
                        </Text>
                      </Text>
                    </>
                  ) : (
                    ""
                  )}

                  {livePhase && livePhase?.publicPhase ? (
                    <>
                      <Text mx={["5px", "42px"]}>
                        Price:{" "}
                        <Text as="span" color="#fff">
                          {convertStringToPrice(livePhase?.publicMintingFee)}{" "}
                          <AzeroIcon mb="5px" />
                        </Text>
                      </Text>
                    </>
                  ) : (
                    ""
                  )}

                  {livePhase?.code ? (
                    <>
                      <Text mx={["5px", "42px"]}>
                        Mint Phase:{" "}
                        <Text as="span" color="#fff">
                          {livePhase?.code}
                        </Text>
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </Skeleton>
              </VStack>
            </motion.div>
          </HStack>

          {livePhase ? (
            <Skeleton
              position="relative"
              w="full"
              isLoaded={!loading}
              my="30px"
              maxW="680px"
              borderWidth={2}
              color="brand.blue"
              borderColor="brand.blue"
              h={["200px", "full", "full"]}
            >
              <Box
                w="full"
                position="absolute"
                top="-12px"
                zIndex="100"
                p="2px 20px"
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
                  phase end in
                </Text>
              </Box>
              <Flex
                maxH={["200px", "110px"]}
                h={["200px", "full", "full"]}
                py={{ base: "0px", xl: "20px" }}
                position="relative"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
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
          ) : null}

          <Flex
            position="relative"
            w="full"
            pt="22px"
            px="15px"
            maxW="730px"
            color="#fff"
            textAlign="center"
            alignItems="start"
            pb={["0px", "30px"]}
            justifyContent="center"
            fontSize={["15px", "18px", "18px"]}
            overflow="hidden"
            maxHeight={!isSeeMore ? "130px" : "340px"}
            transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.1s"
            _after={{
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "full",
              height: description?.length > 300 ? "50px" : "0px",
              backgroundImage:
                "linear-gradient(0deg, #000000 3.25%, #000000 26%, rgba(0, 0, 0, 0) 100%);)",
            }}
          >
            <Text
            // noOfLines={[3, 3]}
            >
              {description}
            </Text>{" "}
            <Box
              display={description?.length > 300 ? "flex" : "none"}
              cursor="pointer"
              bg="#7ae7ff"
              position="absolute"
              bottom="-0"
              zIndex="100"
              p="2px 10px"
              onClick={() => setIsSeeMore(!isSeeMore)}
            >
              <Text fontFamily="Evogria" fontSize="13px" color="#000">
                {isSeeMore ? "see less" : "see more"}
              </Text>
            </Box>
          </Flex>

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
        left="100px"
        w={["full", "auto"]}
        display={["none", "flex"]}
        position={{ base: "unset", xl: "absolute" }}
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
        onClose={onClosePhase}
        collection_address={collection_address}
      />
    </Box>
  );
}

export default LaunchpadDetailHeader;
