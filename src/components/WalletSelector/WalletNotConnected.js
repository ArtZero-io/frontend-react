import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
  TagLabel,
  Link,
} from "@chakra-ui/react";
import { useSubstrate } from "@utils/substrate/SubstrateContext";

import { loadAccounts } from "@utils/substrate/SubstrateContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import FireWalletIcon from "@utils/wallets/FireWallet.png";

function WalletNotConnected({ onCloseMenu, display }) {
  const { dispatch, state } = useSubstrate();

  const { apiState } = state;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 0.99 },
  };

  async function handleConnect(walletAdapterType) {
    if (apiState !== "READY") {
      toast.error("Please wait a moment, network is not ready!");
      return;
    }
    try {
      onCloseMenu && onCloseMenu();
      await loadAccounts(state, dispatch, walletAdapterType);
    } catch (error) {
      toast.error("User cancelled!");
      console.log("error", error);
    }
  }
  return (
    <>
      <Box
        display={display}
        bg="transparent"
        height="full"
        mx="auto"
        maxH="55px"
        mb={{ base: "20px", md: "auto" }}
      >
        <Flex align="center" justify="end" height="100%">
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
            transition={{
              curve: [0.17, 0.67, 0.83, 0.67],
            }}
          >
            <Flex
              display={display}
              maxH="55px"
              height="full"
              w={["full", "auto"]}
              align="center"
              justify="space-between"
              pl={{ base: "10px", md: "auto" }}
              mb={{ base: "20px", md: "auto" }}
              ml={{ base: "10px", md: "auto" }}
              flexDirection={{ md: "colum" }}
            >
              <Menu autoSelect={false} placement="bottom-end" offset={[0, 25]}>
                <MenuButton
                  ring={0}
                  h="50px"
                  px="2"
                  fontSize="15px"
                  lineHeight="shorter"
                  minW="11rem"
                  bg="brand.blue"
                  color="blackAlpha.900"
                >
                  connect wallet
                </MenuButton>
                <MenuList
                  minW="260px"
                  display="flex"
                  flexDirection="column"
                  borderRadius="0"
                  borderWidth="2px"
                  borderColor="brand.blue"
                  bg="#222"
                >
                  <Flex
                    _hover={{ bg: "#000" }}
                    cursor="pointer"
                    p="20px"
                    pt="12px"
                    pb="18px"
                  >
                    <Flex alignItems="center" w="full">
                      <Flex
                        w="full"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="start"
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          variant="grayBg"
                          height="full"
                          minW="fit-content"
                          bg="transparent"
                          w="full"
                        >
                          <TagLabel
                            w="full"
                            display="flex"
                            alignItems="center"
                            color="#7ae7ff"
                            fontSize="18px"
                            onClick={() => {
                              window?.fire
                                ? handleConnect("5IRE_WALLET")
                                : toast.error(
                                    "Please install 5ire Wallet extension!"
                                  );
                            }}
                          >
                            <Flex
                              width="32px"
                              height="32px"
                              alignItems="center"
                              justifyContent="center"
                              mr="12px"
                            >
                              <Image
                                src={FireWalletIcon}
                                alt={"currentAccount"}
                              />
                            </Flex>
                            <Text
                              isTruncated
                              maxW="120px"
                              color="#fff"
                              fontSize="15px"
                              textAlign="left"
                              lineHeight="20px"
                              textTransform="lowercase"
                              fontFamily="Evogria,sans-serif"
                            >
                              5IRE WALLET
                            </Text>{" "}
                          </TagLabel>
                          <Link
                            isDisable
                            href="https://chromewebstore.google.com/detail/5ire-wallet/keenhcnmdmjjhincpilijphpiohdppno"
                            isExternal
                          >
                            <ExternalLinkIcon mx="2px" />
                          </Link>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex
                    onClick={() => handleConnect("NIGHTLY_WALLET")}
                    _hover={{ bg: "#000" }}
                    cursor="pointer"
                    p="20px"
                    pt="12px"
                    pb="18px"
                  >
                    <Flex alignItems="center" w="full">
                      <Flex
                        w="full"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="start"
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          variant="grayBg"
                          height="full"
                          minW="fit-content"
                          bg="transparent"
                          w="full"
                        >
                          <TagLabel display="flex" alignItems="center" w="full">
                            <Flex
                              width="32px"
                              height="32px"
                              alignItems="center"
                              justifyContent="center"
                              mr="12px"
                            >
                              <Image
                                src="https://registry.nightly.app/wallets/nightly/default.png"
                                alt={"currentAccount"}
                              />
                            </Flex>
                            <Text
                              isTruncated
                              maxW="120px"
                              color="#fff"
                              fontSize="15px"
                              textAlign="left"
                              lineHeight="20px"
                              textTransform="lowercase"
                              fontFamily="Evogria,sans-serif"
                            >
                              NIGHTLY
                            </Text>{" "}
                          </TagLabel>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </MenuList>
              </Menu>
            </Flex>
          </motion.div>
        </Flex>
      </Box>
    </>
  );
}

export default WalletNotConnected;
