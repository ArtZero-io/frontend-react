import React, { useState, useEffect } from "react";
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
  TagRightIcon,
  Text
} from "@chakra-ui/react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import contractData from "@utils/blockchain/index";
import { useSubstrateState } from "@utils/substrate";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { convertStringToPrice } from "@utils";

function DataTable({
  avatar,
  nftName,
  description,
  attrsList,
  is_for_sale,
  price,
  isOffered,
  tokenID,
  owner,
  nftContractAddress,
  contractType,
}) {

  const [bidders, setBidders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { api, currentAccount } = useSubstrateState();

  useEffect(async () => {
    if (isLoaded === false) {
      marketplace_contract_calls.setMarketplaceContract(api, contractData.marketplace);
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(currentAccount, nftContractAddress, {'u64': tokenID});
      console.log(sale_info);
      const listBidder = await marketplace_contract_calls.getAllBids(currentAccount, nftContractAddress, sale_info.nftOwner, {'u64': tokenID});
      setBidders(listBidder);
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const acceptBid = async (bidId) => {
    marketplace_contract_calls.setMarketplaceContract(api, contractData.marketplace);
    await marketplace_contract_calls.acceptBid(
      currentAccount,
      nftContractAddress,
      {'u64': tokenID},
      bidId
    );
  }

  return (
    <TableContainer maxW="6xl-mid" fontSize="lg" minH={'30rem'}>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
              Address
            </Th>
            {/* <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
              Date
            </Th> */}
            <Th
              fontFamily="Evogria"
              fontSize="sm"
              fontWeight="normal"
              py={7}
              isNumeric
            >
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          { bidders.length && bidders.map((item, index) => (
            <Tr key={item.bidder} color="#fff">
              <Td color="#7ae7ff" py={7} onClick={() => acceptBid(index)}>
                {item.bidder}
              </Td>
              {/* <Td py={7}>{convertStringToDateTime(item.bidDate)}</Td> */}
              <Td py={7} isNumeric>
                <Text textAlign="right" color="brand.grayLight">
                    <Tag pr={0} bg="transparent">
                      <TagLabel bg="transparent">{convertStringToPrice(item.bidValue)}</TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
