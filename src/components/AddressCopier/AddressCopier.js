import React from "react";
import { useClipboard, Flex, Tooltip, IconButton } from "@chakra-ui/react";
import { truncateStr } from "@utils";
import toast from "react-hot-toast";
import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import { SUB_DOMAIN } from "../../constants";

export default function AddressCopier({
  address,
  truncateStrNum = 5,
  hasIcon = false,
}) {
  const { onCopy } = useClipboard(address);

  const handleCopy = () => {
    toast.success("Address copied!");
    onCopy();
  };

  return (
    <>
      <Flex
        cursor="pointer"
        _hover={{ color: "#7ae7ff" }}
        onClick={handleCopy}
        alignItems="center"
      >
        {truncateStr(address, truncateStrNum)}{" "}
        {address && hasIcon && <CopyIcon ml="8px" />}
      </Flex>
    </>
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
