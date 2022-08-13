import {
  Box,
  Button,
  Center,
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
import { getUsernameOnchain } from "@utils/blockchain/profile_calls";
import { ArrowBackIcon } from "@chakra-ui/icons";

function LaunchpadDetailHeader({
  project,
  currentWhitelist,
  collection_address,
  loading,
}) {
  const [livePhase, setLivePhase] = useState({});
  const { phases, projectOwner, projectAdminAddress } = project;
  const [countDownTimer, setCountDownTimer] = useState({});
  const [ownerName, setOwnerName] = useState(null);

  const history = useHistory();
  const { currentAccount } = useSubstrateState();

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
  

  useEffect(() => {
    if (phases?.length > 0) {
      const data = phases.find((p) => p.isLive === 1);
      console.log("data", data);
      setLivePhase(data);
    }
  }, [phases]);

  useInterval(() => {
    if (livePhase && livePhase.endTime) {
      const total = livePhase.endTime - Date.now();
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

  useEffect(() => {
    const fetchOwnerName = async () => {
      const name = await getUsernameOnchain({
        accountAddress: projectOwner,
      });

      setOwnerName(name);
    };

    fetchOwnerName();
  }, [projectOwner]);

  return (
    <Box as="section" position="relative" w="full" mt="320px">
      {!loading && (
        <Box mx="auto" w="full" maxW="870px">
          <VStack>
            <Center
              rounded="full"
              w={["80px", "120px", "120px"]}
              h={["80px", "120px", "120px"]}
              p="-px"
              border="4px solid"
              borderColor="white"
              filter="drop-shadow(0px 4px 4px #00320025)"
              bg="#333"
            >
              <Image
                alt={"name"}
                w="full"
                h="full"
                rounded="full"
                objectFit="cover"
                src={getCachedImageShort(project?.avatarImage, 500)}
                fallback={
                  <Skeleton
                    w={["80px", "120px", "120px"]}
                    h={["72px", "112px", "112px"]}
                    borderRadius="full"
                  />
                }
              />
            </Center>

            <HStack w="full" justifyContent="space-around">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <VStack
                  pt="30px"
                  textAlign="center"
                  justifyContent="space-between"
                  minH={{ base: "3.5rem", "2xl": "7.125rem" }}
                >
                  <HStack w="full" pos="relative">
                    <Heading
                      w="full"
                      color="#fff"
                      fontSize={["32px", "48px", "48px"]}
                      lineHeight={["38px", "60px", "60px"]}
                    >
                      {project.name}{" "}
                    </Heading>

                    <IconButton
                      pos="absolute"
                      left="0"
                      top="5px"
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
                  </HStack>

                  <Heading py="15px" fontSize={["sm", "md", "md"]}>
                    Project creator:{" "}
                    <Text as="span" color="#7ae7ff">
                      {ownerName}
                    </Text>
                  </Heading>
                  <Stack alignItems="center" direction="row">
                  {currentAccount &&
                      currentAccount.address &&
                      projectOwner === currentAccount.address &&
                      <>
                      <Button
                      px="16px"
                      variant="outline"
                      onClick={() => onOpenURI()}
                    >
                      update base uri
                    </Button>
                    <Button
                    px="16px"
                    variant="outline"
                    onClick={() => onOpenUpdateAdminAddressModal()}
                  >
                    update admin address
                  </Button>
                  </>
                  }
                 
                    {currentAccount &&
                      currentAccount.address &&
                      projectAdminAddress === currentAccount.address && (
                        <>
                          <Button
                            px="16px"
                            variant="outline"
                            onClick={() =>
                              history.push({
                                state: { formMode: "EDIT", collection_address },
                                pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                              })
                            }
                          >
                            edit project information
                          </Button>
                          <Button
                            px="16px"
                            variant="outline"
                            onClick={() => onOpenPhase()}
                          >
                            update phases
                          </Button>
                        </>
                      )}{" "}
                  </Stack>
                  <Flex
                    pb="40px"
                    alignItems="start"
                    color="#fff"
                    w="full"
                    justifyContent="space-between"
                    maxW="730px"
                    fontSize={["15px", "18px", "18px"]}
                    // minH={{ base: "120px", "2xl": "120px" }}
                  >
                    <Text noOfLines={[3, 3]}>{project.description}</Text>
                  </Flex>
                  <Flex
                    color="#888"
                    w="full"
                    justifyContent="space-between"
                    minW="500px"
                    fontSize={["15px", "18px", "18px"]}
                    minH={{ base: "1rem", "2xl": "3.375rem" }}
                  >
                    <Text>
                      Supply:{" "}
                      <Text as="span" color="#fff">
                        {project.totalSupply}
                      </Text>
                    </Text>
                    {livePhase &&
                    !livePhase.publicPhase &&
                    currentWhitelist.mintingFee ? (
                      <>
                        <Text>
                          Price:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToPrice(currentWhitelist.mintingFee)}{" "}
                            <AzeroIcon mb="5px" />
                          </Text>
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                    {livePhase && livePhase.publicPhase ? (
                      <>
                        <Text>
                          Price:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToPrice(livePhase.publicMintingFee)}{" "}
                            <AzeroIcon mb="5px" />
                          </Text>
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                    {livePhase ? (
                      <>
                        <Text>
                          Mint Phase:{" "}
                          <Text as="span" color="#fff">
                            {livePhase.code}
                          </Text>
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                  </Flex>
                </VStack>
              </motion.div>
            </HStack>

            {livePhase && livePhase ? (
              <HStack
                flexWrap={["wrap", "noWrap", "noWrap"]}
                color="brand.blue"
                maxW="680px"
                maxH="110px"
                h={["full", "full", "full"]}
                borderWidth={2}
                borderColor="brand.blue"
                px={{ base: 1, xl: 12, "2xl": 16 }}
                py={{ base: "0.5rem", "2xl": "40px" }}
                justifyContent="space-between"
                my="30px"
              >
                <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {countDownTimer.days}{" "}
                      </Text>
                      <Text fontSize={["13px", "16px", "16px"]}>Days</Text>
                    </motion.div>
                  </>
                </VStack>

                <Divider
                  transform="rotate(90deg)"
                  width="300px"
                  bg="#232323"
                  display={{ base: "none", xl: "inline" }}
                />

                <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {countDownTimer.hours}{" "}
                      </Text>
                      <Text fontSize={["13px", "16px", "16px"]}>Hours</Text>
                    </motion.div>
                  </>
                </VStack>

                <Divider
                  transform="rotate(90deg)"
                  width="300px"
                  bg="#232323"
                  display={{ base: "none", xl: "inline" }}
                />
                <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {countDownTimer.minutes}{" "}
                      </Text>
                      <Text fontSize={["13px", "16px", "16px"]}>Mins</Text>
                    </motion.div>
                  </>
                </VStack>

                <Divider
                  transform="rotate(90deg)"
                  width="300px"
                  bg="#232323"
                  display={{ base: "none", xl: "inline" }}
                />
                <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {countDownTimer.seconds}{" "}
                      </Text>
                      <Text fontSize={["13px", "16px", "16px"]}>Seconds</Text>
                    </motion.div>
                  </>
                </VStack>
              </HStack>
            ) : (
              ""
            )}
          </VStack>
        </Box>
      )}

      {!loading && (
        <VStack
          pt="15px"
          top="0"
          right="100px"
          w={["full", "auto"]}
          position={{ base: "unset", xl: "absolute" }}
        >
          <SocialCard
            profile={[
              { website: "https://twitter.com/ArtZero_io" },
              { twitter: "https://twitter.com/ArtZero_io" },
              { discord: "https://discord.gg/wzkZ2JTvN4" },
            ]}
          />
        </VStack>
      )}

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
      <UpdatePhasesModal
        isOpen={isOpenPhase}
        onClose={onClosePhase}
        collection_address={collection_address}
      />
    </Box>
  );
}

export default LaunchpadDetailHeader;
