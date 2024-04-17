import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { resolveDomain, truncateStr } from "@utils";
import { useSubstrateState } from "@utils/substrate";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SUB_DOMAIN } from "../../constants";

function Copier({ address, hasIcon, truncateStrNum }) {
  const { onCopy } = useClipboard(address?.value);

  const handleCopy = () => {
    toast.success(`${address?.type} copied!`);
    onCopy();
  };

  return (
    <Flex
      _hover={{
        color: "#7ae7ff",
      }}
      cursor="pointer"
      alignItems="center"
      onClick={handleCopy}
    >
      {address?.type === "Address"
        ? truncateStr(address?.value, truncateStrNum)
        : address?.value}
      {hasIcon && <CopyIcon ml="8px" />}
    </Flex>
  );
}

export default function AddressCopier({
  address,
  truncateStrNum = 5,
  hasIcon = false,
}) {
  const [domains, setDomains] = useState();
  const { api, apiState } = useSubstrateState();

  useEffect(() => {
    if (apiState !== "READY") return;

    try {
      const fetchDomain = async () => {
        const addressDomain = await resolveDomain(address, api);
        setDomains(addressDomain);
        return;
      };

      fetchDomain();
    } catch (error) {
      console.log("error", error);
    }
  }, [address, api, apiState]);

  if (!domains) {
    return (
      <Copier hasIcon={hasIcon} address={{ type: "Address", value: address }} />
    );
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            _hover={{
              color: "#7ae7ff",
            }}
            isActive={isOpen}
            id="address-copier-button"
          >
            <Flex>
              {domains ?? truncateStr(address, truncateStrNum)}{" "}
              <CopyIcon ml="8px" />
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
            zIndex={11}
          >
            <MenuItem
              w="205px"
              h="45px"
              p="0"
              pl="10px"
              lineHeight="20px"
              textTransform="none"
              _hover={{ bg: "#000" }}
            >
              <Copier
                hasIcon={hasIcon}
                address={{ type: "Address", value: address }}
              />
            </MenuItem>
            <MenuItem
              w="205px"
              h="45px"
              p="0"
              pl="10px"
              lineHeight="20px"
              textTransform="none"
              _hover={{ bg: "#000" }}
            >
              <Copier
                hasIcon={hasIcon}
                address={{ type: "Domain", value: domains }}
              />
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export function UrlCopier({ url }) {
  const { onCopy } = useClipboard(url);

  const handleCopy = () => {
    toast.success("Link copied!");
    onCopy();
  };

  return (
    <Flex cursor="pointer" onClick={handleCopy} alignItems="center">
      <CopyIcon />
    </Flex>
  );
}

export function PublicProfileLinkCopier({ tabPath = "nfts", accountAddress }) {
  const link = `${SUB_DOMAIN}/public-account/${tabPath}/${accountAddress}`;

  const { onCopy } = useClipboard(link);

  const handleCopy = () => {
    toast.success("Link copied!");
    onCopy();
  };

  return (
    <>
      <Flex onClick={handleCopy} alignItems="center" ml="8px">
        <Tooltip
          hasArrow
          bg="#333"
          color="#fff"
          cursor="pointer"
          borderRadius="0"
          label="Click to copy your public social link"
        >
          <IconButton
            variant="iconOutline"
            width={["40px", "50px"]}
            height={["40px", "50px"]}
            icon={<LinkIcon />}
            _hover={{
              bg: "#7ae7ff",
              color: "black",
              borderWidth: "0",
            }}
          />
        </Tooltip>
      </Flex>
    </>
  );
}
