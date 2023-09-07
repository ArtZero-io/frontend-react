import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";

import React, { useState } from "react";
import MyNFTGroupCard from "@components/Card/MyNFTGroup";
import MyAzeroDomainsNFTGroupCard from "@components/Card/MyAzeroDomainsNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import AnimationLoader from "@components/Loader/AnimationLoader";
import CommonButton from "@components/Button/CommonButton";
import CommonContainer from "@components/Container/CommonContainer";
import useForceUpdate from "@hooks/useForceUpdate";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import {
  REMOVE_BID,
  UNLIST_TOKEN,
  LIST_TOKEN,
  LOCK,
  TRANSFER,
  ACCEPT_BID,
  EDIT_NFT,
} from "@constants";
import { useMyCollectionList } from "@hooks/useMyCollectionList";
import { useMyBidList } from "@hooks/useMyBidList";
import azero_domains_nft from "@blockchain/azero-domains-nft";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [
      REMOVE_BID,
      ACCEPT_BID,
      UNLIST_TOKEN,
      LIST_TOKEN,
      LOCK,
      TRANSFER,
      EDIT_NFT,
      "MULTI_DELIST",
      "MULTI_LISTING",
      "MULTI_TRANSFER",
      "MULTI_REMOVE_BIDS",
      "UPDATE_BID_PRICE",
    ],
    () => handleForceUpdate()
  );

  const [filterSelected, setFilterSelected] = useState("COLLECTED");

  const handleForceUpdate = async () => {
    refetchMyCollectionList();
    refetchMyBidList();
  };

  function onClickHandler(v) {
    if (filterSelected !== v) {
      setFilterSelected(Object.keys(tabList)[v]);
    }
  }

  const {
    myCollectionList,
    isLoading: isLoadingMyCollectionList,
    refetch: refetchMyCollectionList,
  } = useMyCollectionList(filterSelected, currentAccount.address);

  const {
    myBidList,
    isLoading: isLoadingMyBidList,
    refetch: refetchMyBidList,
  } = useMyBidList(currentAccount.address);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="center"
        mb={["20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl"]} minW="100px">
          my nfts
        </Heading>

        <Spacer />

        {isBigScreen && (
          <HStack maxW={{ base: "320px", md: "500px" }}>
            {[
              { id: "COLLECTED", text: "my collected" },
              { id: "LISTING", text: "my listings" },
              { id: "BIDS", text: "my bids" },
            ].map((i, idx) => (
              <CommonButton
                {...i}
                key={i.id}
                variant="outline"
                isActive={filterSelected === i.id}
                onClick={() => onClickHandler(idx)}
              />
            ))}

            <IconButton
              mx={1}
              size="icon"
              variant="iconSolid"
              aria-label="refresh"
              icon={<RefreshIcon />}
              onClick={() => {
                filterSelected !== "BIDS"
                  ? refetchMyCollectionList()
                  : refetchMyBidList();
              }}
            />
          </HStack>
        )}
      </Flex>

      {!isBigScreen && (
        <HStack w="full" pb={[0, "8px"]} justifyContent="space-between">
          <IconButton
            mr="2px"
            size="icon"
            variant="iconSolid"
            aria-label="refresh"
            onClick={() => {
              filterSelected !== "BIDS"
                ? refetchMyCollectionList()
                : refetchMyBidList();
            }}
            icon={<RefreshIcon />}
            _hover={{ color: "black", bg: "#7ae7ff" }}
          />

          <Spacer display={["none", "flex"]} />

          <DropdownMobile
            minW="256px"
            width="full"
            my="20px"
            border="1px solid #343333"
            fontSize="15px"
            fontFamily="Evogria, san serif"
            options={tabList}
            selectedItem={filterSelected}
            setSelectedItem={(i) => {
              setFilterSelected(i);
            }}
          />
        </HStack>
      )}

      {loadingForceUpdate ? (
        <AnimationLoader loadingTime={loadingTime} />
      ) : (
        <>
          <MyNFTGroupCardContainer
            isLoading={
              filterSelected !== "BIDS"
                ? isLoadingMyCollectionList
                : isLoadingMyBidList
            }
            list={filterSelected !== "BIDS" ? myCollectionList : myBidList}
            filterSelected={filterSelected}
          />
        </>
      )}
    </CommonContainer>
  );
};

export default MyNFTsPage;

export const tabList = {
  COLLECTED: "COLLECTED",
  LISTING: "MY LISTING",
  BIDS: "MY BIDS",
};



function MyNFTGroupCardContainer({ list, filterSelected, isLoading }) {
  return isLoading ? (
    <AnimationLoader />
  ) : (
    <>
      {list?.length === 0 && (
        <HStack py={10} ml={3} w={"full"} align="start" justifyContent="center">
          <Text textAlign="center" color="brand.grayLight" size="2xs">
            No NFT found.
          </Text>
        </HStack>
      )}
      {list?.map((item, idx) => {
        console.log(item.nftContractAddress);
        console.log(item.nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS);
        if (item.nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
          return (
            <MyAzeroDomainsNFTGroupCard
              {...item}
              key={idx}
              filterSelected={filterSelected}
            />
          );
        } else {
          return (
            <MyNFTGroupCard
              {...item}
              key={idx}
              filterSelected={filterSelected}
            />
          );
        }
      })}
    </>
  );
}
