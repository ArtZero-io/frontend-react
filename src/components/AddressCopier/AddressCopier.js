import React from "react";
import { useClipboard, Flex, Text } from "@chakra-ui/react";
import { truncateStr } from "@utils";
import toast from "react-hot-toast";
import { CopyIcon } from "@chakra-ui/icons";

export default function AddressCopier({
  address,
  truncateStrNum = 5,
  hasIcon = false,
  textOnly = false,
}) {
  const { onCopy } = useClipboard(address);

  const handleCopy = () => {
    toast.success("Address copied!");
    onCopy();
  };

  return (
    <>
      {textOnly ? (
        <Text as="span" cursor="pointer" _hover={{ color: "#7ae7ff" }} onClick={handleCopy}>
          {truncateStr(address, truncateStrNum)}{" "}
        </Text>
      ) : (
        <Flex
          cursor="pointer"
          _hover={{ color: "#7ae7ff" }}
          onClick={handleCopy}
          alignItems="center"
        >
          {truncateStr(address, truncateStrNum)}{" "}
          {address && hasIcon && <CopyIcon ml="8px" />}
        </Flex>
      )}
    </>
  );
}
