/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import {
  Box,
  HStack,
  Heading,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { APICall } from "@api/client";
import { useSubstrateState } from "@utils/substrate";
// import AzeroIcon from "@theme/assets/icon/Azero.js";
// import { FaDollarSign } from "react-icons/fa";
import EventTable from "@components/Table/EventTable";
import { getTimestamp, resolveDomain } from "@utils";
import { BeatLoader } from "react-spinners";
import { isMobile } from "react-device-detect";
import NFTDetailModal from "../../collection/component/Modal/NFTDetail";

function RecentNftTradesTab() {
  const [loading, setLoading] = useState(false);
  // const [useAzeroUnit, setUseAzeroUnit] = useState(true);
  const [topNftTradesList, setTopNftTradesList] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);
  const { api } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [NFTData, setNFTData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { ret } = await APICall.getRecentTrades({
          limit: 20,
          offset: 0,
          order: ["blockNumber DESC"],
        });

        if (ret?.length > 0) {
          ret = await Promise.all(
            ret?.map(async (event, idx) => {
              const { blockNumber, buyer, seller, trader } = event;

              const buyerDomain = await resolveDomain(buyer, api);
              const sellerDomain = await resolveDomain(seller, api);
              const traderDomain = await resolveDomain(trader, api);

              const eventFormatted = {
                ...event,
                buyerDomain,
                sellerDomain,
                traderDomain,
                rank: idx + 1,
              };

              const timestamp = await getTimestamp(api, blockNumber);

              if (timestamp) {
                eventFormatted.timestamp = timestamp;
              }

              return eventFormatted;
            })
          );
          setTopNftTradesList(ret);
          setLoading(false);
        }
      } catch (error) {
        setTopNftTradesList([]);
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);
  const fetchNFTData = async () => {
    try {
      if (selectedNft) {
        const { ret, status } = await APICall.getCollectionByAddress({
          collection_address: selectedNft?.nftContractAddress,
        });
        setNFTData(ret[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNFTData();
  }, [selectedNft]);
console.log(NFTData?.rarityTable);
  return (
    <>
      {!isMobile && (
        <NFTDetailModal
          // {...rest}
          {...selectedNft}
          // handleNav={handleNav}
          rarityTable={NFTData?.rarityTable}
          // totalNftCount={totalNftCount}
          isOpen={isOpen}
          onClose={onClose}
          name={"name"}
          collectionOwner={"collectionOwner"}
          // showOnChainMetadata={showOnChainMetadata}
        />
      )}
      <Box as="section" maxW="container.3xl">
        <Box mx="auto" py={["4", "12", "20"]}>
          <Stack
            direction={{ base: "column", xl: "row" }}
            w="full"
            alignItems="center"
            mb="30px"
          >
            <Heading
              mb="10px"
              minW="400px"
              fontSize={["3xl-mid", "5xl", "5xl"]}
            >
              Recent NFT Trades
            </Heading>{" "}
            <Spacer />
          </Stack>
          {loading ? (
            <HStack pt="80px" pb="20px" justifyContent="center" w="full">
              <BeatLoader color="#7ae7ff" size="10px" />
            </HStack>
          ) : (
            <EventTable
              onClickElement={(data) => {
                onOpen();
                setSelectedNft(data);
                console.log(data);
              }}
              tableHeaders={headers}
              tableData={topNftTradesList}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default RecentNftTradesTab;

const headers = {
  rank: "rank",
  nftName: "nft name",
  avatar: "image",
  price: "price",
  platformFee: "platform Fee",
  royaltyFee: "royalty fee",
  seller: "seller",
  buyer: "buyer",
  timestamp: "timestamp",
  eventDataType: "type",
};
