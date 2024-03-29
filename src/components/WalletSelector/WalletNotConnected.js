import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSubstrate } from "@utils/substrate/SubstrateContext";
import { SUPPORTED_WALLET_LIST } from "@constants/index";
import SubwalletLogo from "@utils/wallets/SubWalletLogo.svg";
import NovaWalletLogo from "@utils/wallets/NovaWalletLogo.jpg";
import PolkadotjsLogo from "@utils/wallets/PolkadotjsLogo.svg";
import AzeroSignerLogo from "@utils/wallets/AzeroSignerLogo.svg";
import NightlyLogo from "@utils/wallets/Nightly.svg";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { loadAccounts } from "@utils/substrate/SubstrateContext";
import { motion } from "framer-motion";
import { browserName, isMobile } from "react-device-detect";
import { isEmptyObj } from "@utils";
import { toast } from "react-hot-toast";
import { useState } from "react";
const win = window || {};

function WalletNotConnected(props) {
  const { dispatch, state } = useSubstrate();
  const [, setSelectedExtensionLocal] = useLocalStorage("selectedExtension");

  const { keyring, apiState } = state;
  const buttonVariants = {
    initial: {
      scale: 1,
    },

    hover: {
      scale: 0.99,
    },
  };

  SUPPORTED_WALLET_LIST.map(
    (item) =>
      (item.installed = Object.keys(window?.injectedWeb3).includes(
        item.extensionName
      ))
  );

  let supportedWalletList = SUPPORTED_WALLET_LIST;

  const [tryConnect, setTryConnect] = useState(0);

  if (isMobile) {
    const injectedWeb3 = win?.injectedWeb3;
    if (!isEmptyObj(injectedWeb3)) {
      if (injectedWeb3["subwallet-js"]) {
        supportedWalletList = SUPPORTED_WALLET_LIST.filter(
          (item) => item.extensionName === "subwallet-js"
        );
      } else {
        supportedWalletList = SUPPORTED_WALLET_LIST.filter(
          (item) => item.extensionName === "polkadot-js"
        );
      }
    }
  }

  function handleConnect(wallet) {
    if (apiState !== "READY") {
      toast.error("Please wait a monent, network is not ready!");
      return;
    }

    if (tryConnect >= 2) {
      localStorage.clear();
      setTryConnect(0);
    } else {
      setTryConnect(tryConnect + 1);
    }

    if (!keyring) {
      setSelectedExtensionLocal(wallet);
      loadAccounts(state, dispatch, wallet);
    }
  }

  const noWalletInstalled = supportedWalletList
    .map((i) => i.installed)
    .every((i) => i === false);

  return (
    <>
      <Box
        display={props.display}
        bg="transparent"
        height="full"
        mx="auto"
        maxH="55px"
        mb={{ base: "20px", md: "auto" }}
      >
        <Flex align="center" justify="end" height="100%">
          <Menu autoSelect={false} placement="bottom-end" offset={[0, 18]}>
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={buttonVariants}
              transition={{
                // ease: [0.34, 1.56, 0.64, 1],
                curve: [0.17, 0.67, 0.83, 0.67],
              }}
            >
              {!isMobile ? (
                <MenuButton
                  as={Button}
                  h="50px"
                  px="8"
                  fontSize="15px"
                  lineHeight="shorter"
                  minW="10rem"
                  bg="brand.blue"
                  color="blackAlpha.900"
                >
                  connect wallet
                </MenuButton>
              ) : (
                <>
                  {noWalletInstalled ? (
                    <Button
                      variant="outline"
                      minW="36"
                      alignItems="center"
                      isDisabled={true}
                    >
                      <MenuItem>
                        <Box>
                          <Flex align="center" justifyContent="start">
                            <Flex align="center" fontSize="15px">
                              No Wallet Installed
                            </Flex>
                          </Flex>
                        </Box>
                      </MenuItem>
                    </Button>
                  ) : (
                    supportedWalletList.map((wallet) => (
                      <Button
                        variant="outline"
                        key={wallet.extensionName}
                        minW="36"
                        alignItems="center"
                      >
                        <MenuItem
                          isDisabled={!wallet.installed}
                          onClick={() => handleConnect(wallet.extensionName)}
                        >
                          <Box>
                            <Flex align="center" justifyContent="start">
                              {wallet.extensionName === "subwallet-js" && (
                                <Flex align="center" fontSize="15px">
                                  Connect {wallet.title}
                                  <Flex w="26px" ml="2">
                                    <Image
                                      src={SubwalletLogo}
                                      alt={wallet.extensionName}
                                    />
                                  </Flex>
                                </Flex>
                              )}
                              {wallet.extensionName === "polkadot-js" && (
                                <Flex align="center" fontSize="15px">
                                  Connect Nova Wallet
                                  <Flex w="26px" ml="2">
                                    <Image borderRadius='8px'
                                      src={NovaWalletLogo}
                                      alt={wallet.extensionName}
                                    />
                                  </Flex>
                                </Flex>
                              )}
                            </Flex>
                          </Box>
                        </MenuItem>
                      </Button>
                    ))
                  )}
                </>
              )}
            </motion.div>

            <MenuList
              bg={"brand.grayDark"}
              borderRadius="0"
              borderWidth={2}
              borderColor="brand.blue"
              p={3}
            >
              {supportedWalletList.map((wallet) => (
                <Flex
                  key={wallet.extensionName}
                  minW="36"
                  alignItems="center"
                  _hover={{ bg: "blackAlpha.900" }}
                >
                  <MenuItem
                    w="170px"
                    isDisabled={!wallet.installed}
                    onClick={() => handleConnect(wallet.extensionName)}
                    _hover={{ bg: "blackAlpha.900" }}
                  >
                    <Box>
                      <Flex justifyContent="start" align="center">
                        <Box boxSize="26px">
                          {wallet.extensionName === "subwallet-js" && (
                            <Image
                              src={SubwalletLogo}
                              alt={wallet.extensionName}
                            />
                          )}

                          {wallet.title === "Polkadot{.js}" && (
                            <Image
                              src={PolkadotjsLogo}
                              alt={wallet.extensionName}
                            />
                          )}
                          {wallet.title === "Azero Signer" && (
                            <Image
                              src={AzeroSignerLogo}
                              alt={wallet.extensionName}
                            />
                          )}
                          {wallet.title === "Nightly" && (
                            <Image
                              src={NightlyLogo}
                              alt={wallet.extensionName}
                            />
                          )}
                        </Box>
                        <Text fontSize="15px" pl="16px" mr="2">
                          {wallet.title}
                        </Text>
                      </Flex>
                    </Box>
                  </MenuItem>
                  {!isMobile
                    ? !wallet.installed && (
                        <Link
                          href={wallet[`installUrl${browserName}`]}
                          isExternal="true"
                          fontSize="14px"
                          color="#fff"
                          pr="2px"
                          fontFamily="Evogria, sans-serif"
                          _hover={{ bg: "blackAlpha.900", color: "#7ae7ff" }}
                        >
                          Install <ExternalLinkIcon mx="1px" />
                        </Link>
                      )
                    : ""}
                </Flex>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}

export default WalletNotConnected;
