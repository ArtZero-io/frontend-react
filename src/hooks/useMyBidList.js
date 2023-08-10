import { useQuery } from "@tanstack/react-query";
import { APICall } from "@api/client";
import azero_domains_nft from "@utils/blockchain/azero-domains-nft";
const queryKeys = { myBidList: "myBidList" };

async function fetchMyBidList(bidderAddress) {
  try {
    const options = {
      bidder: bidderAddress,
      limit: 10000,
      offset: 0,
      sort: -1,
    };

    let { ret: bidList } = await APICall.getBidsByBidderAddress(options);

    let length = bidList.length;
    let collections = [];

    for (var i = 0; i < length; i++) {
      let bid = bidList[i];

      let { ret: collection } = await APICall.getCollectionByAddress({
        collection_address: bid.nftContractAddress,
      });

      if (!collection) return;

      let options = {};

      if (bid.nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
        options = {
          collection_address: bid.nftContractAddress,
          azDomainName: bid.azDomainName,
        };
      } else {
        options = {
          collection_address: bid.nftContractAddress,
          token_id: bid.tokenID,
        };
      }
      
      let { ret: dataList } = await APICall.getNFTByID(options);

      if (!dataList) return;

      let data = dataList?.map((item) => {
        return {
          ...item,
          stakeStatus: 0,
          isBid: {
            status: true,
            bidPrice: bid.bid_value,
          },
        };
      });

      // filter nft have is_for_sale is false
      data = data.filter((item) => item.is_for_sale === true);

      if (collections.length > 0) {
        const collectionAddressMap = collections.map(
          (i) => i.nftContractAddress
        );

        const indexFound = collectionAddressMap.indexOf(
          collection[0].nftContractAddress
        );

        if (indexFound !== -1) {
          const tempNFTList = collections[indexFound]["listNFT"];

          collections[indexFound]["listNFT"] = [...tempNFTList, ...data];
        } else {
          collection[0].listNFT = data;
          collections.push(collection[0]);
        }
      } else {
        collection[0].listNFT = data;
        collections.push(collection[0]);
      }
    }

    collections = collections.filter((item) => item.listNFT?.length > 0);

    return collections;
  } catch (error) {
    console.log("error", error);

    return [];
  }
}

export function useMyBidList(ownerAddress) {
  const { data, refetch, isLoading } = useQuery(
    [queryKeys.myBidList, ownerAddress],
    () => fetchMyBidList(ownerAddress),
    { refetchOnWindowFocus: false }
  );

  return { myBidList: data, refetch, isLoading };
}
