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
import PolkadotjsLogo from "@utils/wallets/PolkadotjsLogo.svg";
import TalismanLogo from "@utils/wallets/TalismanLogo.svg";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { loadAccounts } from "@utils/substrate/SubstrateContext";

function WalletNotConnected() {
  const { dispatch, state } = useSubstrate();
  const [, setSelectedExtensionLocal] = useLocalStorage("selectedExtension");

  const { keyring } = state;

  SUPPORTED_WALLET_LIST.map(
    (item) =>
      (item.installed = Object.keys(window?.injectedWeb3).includes(
        item.extensionName
      ))
  );

  function handleConnect(wallet) {
    if (!keyring) {
      setSelectedExtensionLocal(wallet);
      loadAccounts(state, dispatch, wallet);
    }
  }

  return (
    <>
      <Box bg="transparent" height="100%" mx="auto" w={["", "28rem", "28rem"]}>
        <Flex align="center" justify="end" height="100%">
          <Menu autoSelect={false} placement="bottom-end">
            <MenuButton
              as={Button}
              height="14"
              px="8"
              size="md"
              minW="10rem"
              bg="brand.blue"
              color="blackAlpha.900"
            >
              Connect Wallet
            </MenuButton>
            <MenuList
              bg={"brand.grayDark"}
              borderRadius="0"
              borderWidth={2}
              borderColor="brand.blue"
              p={3}
            >
              {SUPPORTED_WALLET_LIST.map(
                ({ extensionName, title, installUrl, installed }) => (
                  <MenuItem
                    _hover={{ bg: "blackAlpha.900" }}
                    key={extensionName}
                    isDisabled={!installed}
                    onClick={() => handleConnect(extensionName)}
                  >
                    <Box minW="36">
                      <Flex justifyContent="start" align="center">
                        <Box boxSize="26px">
                          {extensionName === "subwallet-js" && (
                            <Image src={SubwalletLogo} alt={extensionName} />
                          )}
                          {extensionName === "talisman" && (
                            <Image src={TalismanLogo} alt={extensionName} />
                          )}
                          {extensionName === "polkadot-js" && (
                            <Image src={PolkadotjsLogo} alt={extensionName} />
                          )}
                        </Box>
                        <Text size="sm" ml="3" mr="2">
                          {title}
                        </Text>

                        {!installed && (
                          <Link href={installUrl} isExternal>
                            Install <ExternalLinkIcon mx="1px" />
                          </Link>
                        )}
                      </Flex>
                    </Box>
                  </MenuItem>
                )
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}

export default WalletNotConnected;
