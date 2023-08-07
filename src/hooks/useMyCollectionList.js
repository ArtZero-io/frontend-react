import { useQuery } from "@tanstack/react-query";
import { APICall } from "@api/client";

const queryKeys = { myCollectionList: "myCollectionList" };

// Hard code to remove azero domain collection inactive on testnet
const azeroDomainInactive = [
  "5EKDyn7uy1jVQnAhsCz2ySrR5g89nvTYreoMHCMAKb9C5rQn",
  "5HfQopC1yQSoG83auWgRLTxhWWFxiVQWT74LLXeXMLJDFBvP",
];
// End hard code to remove azero domain collection inactive on testnet

async function fetchCollectionList(filterSelected, ownerAddress) {
  try {
    const collectionList = await APICall.getCollectionList();

    let data =
      collectionList &&
      (await Promise.all(
        collectionList?.map(async (collection) => {
          const options = {
            collection_address: collection.nftContractAddress,
            owner: ownerAddress,
            limit: 10000,
            offset: 0,
            sort: -1,
          };

          let { ret: dataList } = await APICall.getNFTsByOwnerAndCollection(
            options
          );

          // Hard code to remove azero domain collection inactive on testnet
          dataList = dataList?.filter(
            (item) => !azeroDomainInactive.includes(item.nftContractAddress)
          );
          // Hard code to remove azero domain collection inactive on testnet

          if (filterSelected === "COLLECTED") {
            dataList = dataList?.filter((item) => item.is_for_sale !== true);
          }

          if (filterSelected === "LISTING") {
            dataList = dataList?.filter((item) => item.is_for_sale === true);
          }

          const data = dataList?.map((item) => {
            return { ...item, stakeStatus: 0 };
          });

          collection.listNFT = data;

          return collection;
        })
      ));

    //Don't Display Collection with no NFT
    data = data?.filter((item) => item.listNFT?.length > 0);

    return data;
  } catch (error) {
    console.log("error", error);

    return [];
  }
}

export function useMyCollectionList(filterSelected, ownerAddress) {
  const { data, refetch, isLoading } = useQuery(
    [queryKeys.myCollectionList, filterSelected, ownerAddress],
    () => fetchCollectionList(filterSelected, ownerAddress),
    { refetchOnWindowFocus: false }
  );

  return { myCollectionList: data, refetch, isLoading };
}
