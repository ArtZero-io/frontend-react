import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { convertStringToPrice, convertStringToDateTime } from "@utils";
import { SCROLLBAR } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { Fragment } from "react";
import AddressCopier from "@components/AddressCopier/AddressCopier";
import { useSubstrateState } from "@utils/substrate";

function CommonTable({
  tableHeaders,
  tableData,
  onClickHandler,
  isOwner,
  // idSelected,
  // saleInfo,
}) {
  const { actionType, tokenIDArray, ...rest } = useTxStatus();
  const { chainToken, chainDecimal } = useSubstrateState();

  return (
    <TableContainer
      h="full"
      maxW="6xl-mid"
      sx={SCROLLBAR}
      overflow="auto"
      overflowY="scroll"
      fontSize={["md", "lg", "lg"]}
      maxH={{ base: "20rem", "2xl": "30rem" }}
    >
      {tableData?.length ? (
        <>
          <Table variant="striped" size="md" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                {tableHeaders?.map((item, idx) => (
                  <Th
                    top={0}
                    bg="#222"
                    key={idx}
                    zIndex={1}
                    fontSize="sm"
                    position="sticky"
                    fontWeight="normal"
                    textAlign="left"
                    fontFamily="Evogria"
                    py={{ base: "1rem", "2xl": "1.75rem" }}
                    display={item === "action" && !isOwner && "none"}
                  >
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {tableData?.map((item, idx) => (
                <Fragment key={idx}>
                  <Tr color="#fff">
                    <Td
                      color="#7ae7ff"
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                      textAlign="left"
                    >
                      <AddressCopier address={item.bidder} />
                    </Td>

                    <Td
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                      textAlign="left"
                    >
                      {convertStringToDateTime(item.bidDate)}
                    </Td>

                    <Td
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                      // isNumeric
                    >
                      <Tag pr={0} bg="transparent">
                        <TagLabel bg="transparent" minW="fit-content">
                          {convertStringToPrice(item.bidValue, chainDecimal)}
                        </TagLabel>
                        <AzeroIcon chainToken={chainToken} />
                      </Tag>
                    </Td>
                    {isOwner ? (
                      <Td
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                        textAlign="left"
                      >
                        <CommonButton
                          mx="0"
                          px="8px"
                          h="40px"
                          {...rest}
                          text="accept bid"
                          onClick={() => onClickHandler(item?.bidId)}
                          isDisabled={
                            actionType && !tokenIDArray?.includes(item.bidId)
                          }
                        />
                      </Td>
                    ) : (
                      ""
                    )}
                  </Tr>
                </Fragment>
              ))}
            </Tbody>
          </Table>
        </>
      ) : null}
    </TableContainer>
  );
}

export default CommonTable;
