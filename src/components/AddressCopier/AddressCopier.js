import React from "react";
import { useClipboard, Flex } from "@chakra-ui/react";
import { truncateStr } from "@utils";
import toast from "react-hot-toast";
import { CopyIcon } from "@chakra-ui/icons";

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
        {hasIcon && <CopyIcon ml="8px" />}
      </Flex>
    </>
  );
}
