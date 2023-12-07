import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Astar from "@theme/assets/icon/Astar";
import AzeroChain from "@theme/assets/icon/AzeroChain";
import FireChain from "@theme/assets/icon/FireChain.js";

const netList = [
  {
    id: "AZERO_MAINNET",
    code: "alephzero mainnet",
    icon: <AzeroChain />,
    url: "http://localhost:8002/",
  },
  {
    id: "AZERO_TESTNET",
    code: "alephzero testnet",
    icon: <AzeroChain />,
    url: "http://localhost:8002/",
  },
  {
    id: "ASTAR_MAINNET",
    code: "astar network",
    icon: <Astar />,
    url: "http://localhost:8002/",
  },
  {
    id: "5IRECHAIN_TESTNET",
    code: "5irechain testnet",
    icon: <FireChain />,
    url: "http://localhost:8002/",
  },
];

function ChainDropdown() {
  const whitelistMode = netList?.find(
    (e) => e.id === process.env.REACT_APP_CHAIN
  );

  return (
    <Menu autoSelect={false} placement="bottom-start" offset={[0, 27]}>
      <MenuButton
        ring={0}
        p="0"
        minW="200px"
        h="28px"
        as={Button}
        bg="black"
        fontSize="15px"
        textTransform="none"
        borderRadius="0"
        border="0px #7ae7ff solid"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent", border: 0 }}
        _focus={{ bg: "transparent", border: 0 }}
        rightIcon={<ChevronDownIcon fontSize="3xl" w="20px" color="#fff" />}
      >
        <Flex
          minW="fit-content"
          alignItems="center"
          justifyContent="start"
          w="full"
          h="28px"
        >
          {whitelistMode?.icon || netList[0]?.icon}

          <Text
            ml="8px"
            color="#fff"
            isTruncated
            fontSize="15px"
            textAlign="left"
            lineHeight="20px"
            textTransform="lowercase"
            fontFamily="Evogria,sans-serif"
          >
            {whitelistMode?.code || netList[0]?.code}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList
        p="12px"
        bg="#222"
        minW="235px"
        display="flex"
        flexDirection="column"
        borderRadius="0"
        borderWidth="2px"
        borderColor="brand.blue"
      >
        {netList?.map(({ id, code, icon, url }) => (
          <MenuItem
            w="205px"
            h="45px"
            key={id}
            p="0"
            pl="10px"
            lineHeight="20px"
            textTransform="none"
            _hover={{ bg: "#000" }}
            display={whitelistMode?.id === id ? "none" : ""}
            onClick={() => window?.location?.replace(url)}
          >
            <Flex
              w="full"
              color="#fff"
              lineHeight="20px"
              fontSize="15px"
              justifyContent="start"
              _hover={{ color: "#fff" }}
            >
              {icon}
              <Text ml="8px">{code}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default ChainDropdown;
