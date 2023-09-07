import { Box, Button, Flex } from "@chakra-ui/react";
import { useSubstrate } from "@utils/substrate/SubstrateContext";

import { loadAccounts } from "@utils/substrate/SubstrateContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

function WalletNotConnected({ onCloseMenu, display }) {
  const { dispatch, state } = useSubstrate();

  const { apiState } = state;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 0.99 },
  };

  async function handleConnect(wallet) {
    if (apiState !== "READY") {
      toast.error("Please wait a monent, network is not ready!");
      return;
    }
    try {
      onCloseMenu && onCloseMenu();
      console.log("handleConnect loadAccounts...");
      await loadAccounts(state, dispatch);
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
            <Button
              onClick={handleConnect}
              h="50px"
              px="8"
              fontSize="15px"
              lineHeight="shorter"
              minW="10rem"
              bg="brand.blue"
              color="blackAlpha.900"
            >
              connect wallet
            </Button>
          </motion.div>
        </Flex>
      </Box>
    </>
  );
}

export default WalletNotConnected;
