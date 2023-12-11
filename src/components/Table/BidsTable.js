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
  import CommonButton from "@components/Button/CommonButton";
  import { Link as ReactRouterLink } from "react-router-dom";
  import { truncateStr } from "@utils";
  import { useSubstrateState } from "@utils/substrate";
  import {
    START,
    ACCEPT_BID,
    REMOVE_BID
  } from "@constants";
  import { useDispatch } from "react-redux";
  import { setTxStatus } from "@store/actions/txStatus";
  import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
  import marketplace_azero_domains_contract_calls from "@utils/blockchain/marketplace-azero-domains-calls";
  
  import azero_domains_nft from "@blockchain/azero-domains-nft";
  import toast from "react-hot-toast";
  import { fetchUserBalance } from "../../pages/launchpad/component/Form/AddNewProject";
import { delay } from "../../utils";
  
  function BidsTable({ tableHeaders, tableData, collectionOwner, type, reload }) {
    console.log('BidsTable::type', type);
    const dispatch = useDispatch();
    const { currentAccount, api } = useSubstrateState();
    const { apiState } = useSubstrateState();
    
    return (
      <>
        {apiState !== "READY" || tableData?.length === 0 ? (
          <Heading py="30px" size="h6">
            No bid found!
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
                      </Tr>
                    </Thead>
  
                    <Tbody>
                    {console.log('tableData', tableData)}
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
                          {(type === "BUY") ? (<Td>
                              <CommonButton
                                mx="0"
                                px="8px"
                                h="40px"
                                text="Remove bid"
                                onClick={() => removeBid(
                                  api,
                                  currentAccount,
                                  item['nftContractAddress'],
                                  item['is_for_sale'] ? item['nft_owner'] : item['owner'],
                                  item['tokenID'],
                                  item['azDomainName'],
                                  dispatch,
                                  reload
                                )}
                              />
                            </Td>) : ""}
                            {(type === "SELL") ? (
                              <Td>
                                <CommonButton
                                    mx="0"
                                    px="8px"
                                    h="40px"
                                    text="Accept bid"
                                    onClick={() => acceptBid(
                                      api,
                                      currentAccount,
                                      item['nftContractAddress'],
                                      item['tokenID'],
                                      item['bidId'],
                                      item['azDomainName'],
                                      dispatch
                                    )}
                                  />
                              </Td>
                            ) : ""}
                            
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
  
  export default memo(BidsTable);
  
  const formatData = (itemObj, headerValue, type) => {
    switch (headerValue) {
      case "avatar":
        return null;
  
      case "originalPrice":
        return (
          <>
            {formatNumDynamicDecimal(itemObj[headerValue])}
            <TagRightIcon as={AzeroIcon} w="16px" />
          </>
        );
  
      case "highestBidPrice":
        return (
          <Flex>
            {formatNumDynamicDecimal(itemObj[headerValue])}
            <TagRightIcon as={AzeroIcon} w="16px" />
          </Flex>
        );
  
      case "bidPrice":
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
  
        case "bidder":
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

  const acceptBid = async (
    api,
    currentAccount,
    nftContractAddress,
    tokenID,
    bidId,
    azDomainName,
    dispatch
  ) => {
    // check wallet connected
    if (!currentAccount) {
      toast.error("Please connect wallet first!");
      return;
    }
    if (nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
      dispatch(
        setTxStatus({
          type: ACCEPT_BID,
          step: START,
          tokenIDArray: Array.of(azDomainName),
        })
      );
      await marketplace_azero_domains_contract_calls.acceptBid(
        currentAccount,
        nftContractAddress,
        currentAccount.address,
        { bytes: azDomainName },
        bidId,
        dispatch,
        ACCEPT_BID,
        api
      );
    } else {
      dispatch(
        setTxStatus({
          type: ACCEPT_BID,
          step: START,
          tokenIDArray: Array.of(tokenID),
        })
      );
      await marketplace_contract_calls.acceptBid(
        currentAccount,
        nftContractAddress,
        currentAccount.address,
        { u64: tokenID },
        bidId,
        dispatch,
        ACCEPT_BID,
        api
      );
    }
    
  };

  const removeBid = async (
    api,
    currentAccount,
    nftContractAddress,
    ownerAddress,
    tokenID,
    azDomainName,
    dispatch,
    reloadData
  ) => {
    // check wallet connected
    if (!currentAccount) {
      toast.error("Please connect wallet first!");
      return;
    }
  
    // check balance
    const { balance } = await fetchUserBalance({ currentAccount, api });
  
    if (balance < 0.001) {
      toast.error(`Balance is low!`);
      return;
    }

    if (nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {

      dispatch(
        setTxStatus({
          type: REMOVE_BID,
          step: START,
          tokenIDArray: Array.of(azDomainName),
        })
      );
    
      await marketplace_azero_domains_contract_calls.removeBid(
        currentAccount,
        nftContractAddress,
        ownerAddress,
        { bytes: azDomainName },
        dispatch,
        REMOVE_BID,
        api
      );
      await delay(1000);
      await delay(10000).then(() => {
        reloadData();
      });
    } else {
      dispatch(
        setTxStatus({
          type: REMOVE_BID,
          step: START,
          tokenIDArray: Array.of(tokenID),
        })
      );
    
      await marketplace_contract_calls.removeBid(
        currentAccount,
        nftContractAddress,
        ownerAddress,
        { u64: tokenID },
        dispatch,
        REMOVE_BID,
        api
      );
      await delay(1000);
      await delay(10000).then(() => {
        reloadData();
      });
    }
  
    
  };
  