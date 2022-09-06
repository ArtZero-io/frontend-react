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
  HStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { getCachedImageShort } from "@utils/index";
import { memo } from "react";
import { formatNumDynamicDecimal } from "@utils";
import { useHistory } from "react-router-dom";

function StatsTable({ tableHeaders, tableData, azeroPrice, useAzeroUnit }) {
  const history = useHistory();

  const formatDataCell = (itemObj, headerValue) => {
    switch (headerValue) {
      case "order":
        return itemObj[headerValue];

      case "marketCap":
        return (
          <>
            {useAzeroUnit ? (
              <>
                {formatNumDynamicDecimal(
                  itemObj["nft_count"] * itemObj["floorPrice"]
                )}
                <TagRightIcon as={AzeroIcon} />
              </>
            ) : (
              <>
                ${" "}
                {formatNumDynamicDecimal(
                  azeroPrice * itemObj["nft_count"] * itemObj["floorPrice"],
                  2
                )}{" "}
              </>
            )}
          </>
        );

      case "floorPrice":
        return (
          <>
            {useAzeroUnit ? (
              <>
                {formatNumDynamicDecimal(itemObj[headerValue])}
                <TagRightIcon as={AzeroIcon} />
              </>
            ) : (
              <>
                ${" "}
                {formatNumDynamicDecimal(azeroPrice * itemObj[headerValue], 2)}
              </>
            )}
          </>
        );

      case "name":
        return (
          <Flex alignItems="center">
            <Square size="50px" mr="20px" shadow="lg">
              <Image
                width="full"
                height="full"
                src={getCachedImageShort(itemObj.avatarImage)}
              />
            </Square>

            <Flex direction="column" alignItems="flex-start">
              <Heading
                fontSize="16px"
                cursor="pointer"
                _hover={{ color: "brand.blue" }}
                onClick={() => {
                  history.push(`/collection/${itemObj.nftContractAddress}`);
                }}
              >
                {itemObj[headerValue]}
              </Heading>
              <Text color="#7ae7ff" fontSize="16px" mt="4px">
                {itemObj["nft_count"]} NFTs
              </Text>
            </Flex>
          </Flex>
        );

      case "volume":
        return (
          <>
            {useAzeroUnit ? (
              <>
                <Box>
                  {formatNumDynamicDecimal(itemObj[headerValue])}{" "}
                  <TagRightIcon as={AzeroIcon} />
                </Box>

                {/* <Box mt="6px" color="#34B979" fontSize="16px">
              +{itemObj[headerValue]["percent"]}%
            </Box> */}
              </>
            ) : (
              <>
                <Box>
                  ${" "}
                  {formatNumDynamicDecimal(
                    azeroPrice * itemObj[headerValue],
                    2
                  )}
                </Box>

                {/* <Box mt="6px" color="#34B979" fontSize="16px">
              +{itemObj[headerValue]["percent"]}%
            </Box> */}
              </>
            )}
          </>
        );
      case "stakedAmount":
        return (
          <Text textAlign="left">
            {formatNumDynamicDecimal(itemObj[headerValue])} token
            {1 * itemObj[headerValue] > 1 ? "s" : ""}{" "}
          </Text>
        );
      case "rewardAmount":
        return (
          <HStack justifyContent="end">
            <Text>{formatNumDynamicDecimal(itemObj[headerValue])} </Text>
            <TagRightIcon as={AzeroIcon} width="14px" height="14px" />
          </HStack>
        );

      default:
        return <Text textAlign="left">{itemObj[headerValue]}</Text>;
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
          shadow="lg"
          minH="500px"
          fontSize="lg"
          h="full"
          overflow="auto"
        >
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
                      ))}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {tableData?.map((item, index) => (
                      <Tr key={index} color="#fff">
                        {Object.keys(tableHeaders)?.map((i, idx) => (
                          <Td
                            // isNumeric={i !== "order" ? true : false}
                            key={idx}
                            py={{ base: "1rem", "2xl": "1.75rem" }}
                            textAlign="left"
                          >
                            {formatDataCell(item, i)}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Skeleton>
            ) : null}
          </motion.div>
        </TableContainer>
      )}
    </>
  );
}

export default memo(StatsTable);
