import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagRightIcon,
  Heading,
  HStack,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { formatNumDynamicDecimal } from "@utils";
import { memo } from "react";
import { SCROLLBAR } from "@constants";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";

import { Link as ReactRouterLink } from "react-router-dom";
import { truncateStr } from "@utils";

function EventTable({ tableHeaders, tableData, collectionOwner, type }) {
  // const { chainToken } = useSubstrateState();

  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <>
          <TableContainer
            w="full"
            fontSize="lg"
            sx={SCROLLBAR}
            overflowY="scroll"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tableData?.length ? (
                <Table variant="striped" colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      {Object.values(tableHeaders)?.map((item, idx) =>
                        item === "image" ? null : (
                          <Th
                            position="sticky"
                            top={0}
                            zIndex={1}
                            textAlign="left"
                            key={idx}
                            fontFamily="Evogria"
                            color="#888"
                            bg="#171717"
                            fontSize="15px"
                            fontWeight="400"
                            dropShadow="lg"
                            py={{ base: "1rem", "2xl": "1.75rem" }}
                          >
                            {item}
                          </Th>
                        )
                      )}
                      {/* <Th
                      position="sticky"
                      top={0}
                      zIndex={1}
                      textAlign="center"
                      fontFamily="Evogria"
                      color="#888"
                      bg="#171717"
                      fontSize="15px"
                      fontWeight="400"
                      dropShadow="lg"
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                    >
                      Time
                    </Th> */}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {tableData?.map((item, idx) => (
                      <Tr key={idx} color="#fff">
                        {Object.keys(tableHeaders)?.map((i, idx) =>
                          i === "avatar" ? null : (
                            <Td
                              key={idx}
                              textAlign="left"
                              py={{ base: "1rem", "2xl": "1.75rem" }}
                            >
                              {formatData(item, i, type)}
                            </Td>
                          )
                        )}
                        {/* <Td
                        key={idx}
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                        textAlign="center"
                        color="#fff"
                      >
                        {new Date(1657304023551).toLocaleString("en-US")}
                      </Td> */}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : null}
            </motion.div>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default memo(EventTable);

const formatData = (itemObj, headerValue, type) => {
  switch (headerValue) {
    case "avatar":
      return null;

    case "price":
      return (
        <>
          {formatNumDynamicDecimal(itemObj[headerValue])}
          <TagRightIcon as={AzeroIcon} w="16px" />
        </>
      );

    case "platformFee":
      return (
        <Flex>
          {formatNumDynamicDecimal(itemObj[headerValue])}
          <TagRightIcon as={AzeroIcon} w="16px" />
        </Flex>
      );

    case "royaltyFee":
      return (
        <>
          {formatNumDynamicDecimal(itemObj[headerValue])}
          <TagRightIcon as={AzeroIcon} w="16px" />
        </>
      );

    case "buyer":
      return (
        <Text color="#7ae7ff">
          <Link
            as={ReactRouterLink}
            to={`/public-account/collections/${itemObj[headerValue]}`}
            color="#7AE7FF"
            textTransform="none"
            textDecoration="underline"
          >
            {itemObj[`${headerValue}Domain`] ??
              truncateStr(itemObj[headerValue])}
          </Link>
        </Text>
      );

    case "seller":
      return (
        <Text color="#7ae7ff">
          <Link
            as={ReactRouterLink}
            to={`/public-account/collections/${itemObj[headerValue]}`}
            color="#7AE7FF"
            textTransform="none"
            textDecoration="underline"
          >
            {itemObj[`${headerValue}Domain`] ??
              truncateStr(itemObj[headerValue])}
          </Link>
        </Text>
      );

    case "trader":
      return (
        <Text color="#7ae7ff">
          <Link
            as={ReactRouterLink}
            to={`/public-account/collections/${itemObj[headerValue]}`}
            color="#7AE7FF"
            textTransform="none"
            textDecoration="underline"
          >
            {itemObj[`${headerValue}Domain`] ??
              truncateStr(itemObj[headerValue])}
          </Link>
        </Text>
      );

    case "nftName":
      return (
        <HStack justifyContent="start">
          <ImageCloudFlare
            w="50px"
            h="50px"
            size="100"
            mr="20px"
            src={itemObj["avatar"]}
          />

          <Text>{itemObj[headerValue]}</Text>
        </HStack>
      );

    default:
      return <Text> {itemObj[headerValue]} </Text>;
  }
};
