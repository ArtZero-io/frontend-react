import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IPFS_BASE_URL } from "@constants/index";
import {
  convertStringToPrice
} from "@utils";
import useInterval from "use-interval";

function LaunchpadDetailHeader({project, currentWhitelist}) {
  const [livePhase, setLivePhase] = useState({});
  const { phases } = project;
  const [countDownTimer, setCountDownTimer] = useState({});

  useEffect(() => {
    if (phases?.length > 0) {
      const data = phases.find((p) => p.isLive === 1);
      console.log("data", data);
      setLivePhase(data);
    }
  }, [phases, useState]);

  useInterval(() => {
    const total = livePhase.endTime - Date.now();
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    setCountDownTimer({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }, 1000);

  return (
    <Box as="section" position="relative" w="full" mt="320px">
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
              // src={avatarImage && getCachedImageShort(avatarImage, 500)}
              src={`${IPFS_BASE_URL}/${project.avatarImage}`}
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
                textAlign="center"
                justifyContent="space-between"
                minH={{ base: "3.5rem", "2xl": "7.125rem" }}
              >
                <Heading
                  color="#fff"
                  fontSize={["32px", "48px", "48px"]}
                  lineHeight={["38px", "60px", "60px"]}
                  minH={{ base: "2.5rem", "2xl": "3.75rem" }}
                  py="30px"
                >
                  {project.name}{" "}
                </Heading>
                <Flex
                  color="#fff"
                  w="full"
                  justifyContent="space-between"
                  maxW="730px"
                  fontSize={["15px", "18px", "18px"]}
                  minH={{ base: "1rem", "2xl": "3.375rem" }}
                  py="30px"
                >
                  <Text>{project.description}</Text>
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
                  {
                    (livePhase && currentWhitelist.mintingFee) ? (
                      <>
                        <Text>
                          Price:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToPrice(currentWhitelist.mintingFee)} <AzeroIcon mb="5px" />
                          </Text>
                        </Text>
                      </>
                    ) : ''
                  }
                  {(livePhase ? (
                    <>
                      <Text>
                        Mint Phase:{" "}
                        <Text as="span" color="#fff">
                        {livePhase.code}
                        </Text>
                      </Text>
                    </>
                  ) : '')}
                  
                </Flex>
              </VStack>
            </motion.div>
          </HStack>

          <HStack
            flexWrap={["wrap", "noWrap", "noWrap"]}
            color="brand.blue"
            maxW="680px"
            maxH={["150px", "110px", "110px"]}
            h={["full", "full", "full"]}
            borderWidth={2}
            borderColor="brand.blue"
            px={{ base: 1, xl: 12, "2xl": 16 }}
            py={{ base: "0.5rem", "2xl": "1.125rem" }}
            justifyContent="space-between"
            bg="black"
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
          
        </VStack>
      </Box>
      <Box
        justifyContent="center"
        pos={{ base: "", xl: "absolute" }}
        right={"100px"}
        top="30px"
      >
        {/* <SocialCard profile={[{ website }, { twitter }, { discord }]} /> */}
      </Box>
    </Box>
  );
}

export default LaunchpadDetailHeader;
