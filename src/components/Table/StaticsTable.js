import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagRightIcon,
  Skeleton,
  Image,
  Square,
  Heading,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { AnimatePresence, motion } from "framer-motion";

import { memo } from "react";

function StaticsTable({ tableHeaders, tableData }) {
  const formatDataCell = (itemObj, itemIndex, headerValue) => {
    switch (headerValue) {
      case "index":
        return Number(itemIndex + 1);
      case "totalStakers":
        return <>{itemObj[headerValue]} Stakers</>;
      case "marketCap":
        return (
          <>
            {itemObj[headerValue]} <TagRightIcon as={AzeroIcon} />
          </>
        );

      case "floorPrice":
        return (
          <>
            {itemObj[headerValue]} <TagRightIcon as={AzeroIcon} />
          </>
        );

      case "totalAmount":
        return (
          <>
            {itemObj[headerValue]} <TagRightIcon as={AzeroIcon} />
          </>
        );
      case "collectionName":
        return (
          <Flex alignItems="center">
            <Square size="50px" mr="20px">
              <Image width="full" height="full" src={itemObj.avatarImage} />
            </Square>

            <Flex direction="column" alignItems="flex-start">
              <Heading fontSize="16px">{itemObj[headerValue]}</Heading>
              <Text color="#7ae7ff" fontSize="16px" mt="4px">
                {itemObj["totalSupply"]}
              </Text>
            </Flex>
          </Flex>
        );
      case "vol7Day":
        return (
          <>
            <Box>
              {itemObj[headerValue]["amount"]} <TagRightIcon as={AzeroIcon} />
            </Box>
            <Box mt="6px" color="#34B979" fontSize="16px">
              +{itemObj[headerValue]["percent"]}%
            </Box>
          </>
        );
      case "averagePrice24h":
        return (
          <>
            <Box>
              {itemObj[headerValue]["amount"]} <TagRightIcon as={AzeroIcon} />
            </Box>
            <Box mt="6px" color="#34B979" fontSize="16px">
              {itemObj[headerValue]["percent"]} %
            </Box>
          </>
        );

      default:
        return <>{itemObj[headerValue]}</>;
    }
  };

  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <TableContainer
          minH="500px"
          // maxH={{ base: "20rem", "2xl": "30rem" }}
          fontSize="lg"
          h="full"
          overflow="auto"
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tableData?.length ? (
                <Skeleton minH="200px" h="full" isLoaded={tableData}>
                  <Table variant="striped" size="md" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        {Object.values(tableHeaders)?.map((item, idx) => (
                          <Th
                            position="sticky"
                            top={0}
                            zIndex={1}
                            textAlign="center"
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
                        ))}
                      </Tr>
                    </Thead>

                    <Tbody>
                      {tableData?.map((item, index) => (
                        <Tr key={index} color="#fff">
                          {Object.keys(tableHeaders)?.map((i, idx) => (
                            <Td
                              key={idx}
                              py={{ base: "1rem", "2xl": "1.75rem" }}
                              textAlign="center"
                            >
                              {formatDataCell(item, index, i)}
                            </Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Skeleton>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </TableContainer>
      )}
    </>
  );
}

export default memo(StaticsTable);
