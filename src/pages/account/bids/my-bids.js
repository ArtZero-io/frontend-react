import {
    Box,
    HStack,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    useMediaQuery,
  } from "@chakra-ui/react";
  import BidsTable from "@components/Table/BidsTable";
  
  import React, { useEffect } from "react";
  
  import { APICall } from "@api/client";
  import CommonContainer from "@components/Container/CommonContainer";
  import DropdownMobile from "@components/Dropdown/DropdownMobile";
  import { SCROLLBAR } from "@constants";
  import { useInfiniteQuery } from "@tanstack/react-query";
  import { resolveDomain, convertNumberToPrice, convertStringToDateTime} from "@utils";
  import { useSubstrateState } from "@utils/substrate";
  import { useCallback, useMemo } from "react";
  import { useInView } from "react-intersection-observer";
  import { BeatLoader } from "react-spinners";
  import azero_domains_nft from "@blockchain/azero-domains-nft";
  
  const NUMBER_NFT_PER_PAGE = 5;
  
  function MyBidsPages() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [isBigScreen] = useMediaQuery("(min-width: 480px)");
  
    const tabData = [
      {
        label: "My Bids",
        content: <EventTableWrapper type="BUY" tableHeaders={headers.buy} />,
      },
      {
        label: "The Bids of My Nfts",
        content: <EventTableWrapper type="SELL" tableHeaders={headers.sell} />,
      }
    ];
  
    return (
      <CommonContainer>
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={[0, "24px"]}>
            <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>My Bids</Heading>
          </Box>
        </VStack>
  
        <Tabs
          px="0px"
          isLazy
          index={tabIndex}
          align="center"
          colorScheme="brand.blue"
          onChange={(i) => setTabIndex(i)}
        >
          {!isBigScreen ? (
            <DropdownMobile
              minW="325px"
              my="20px"
              border="1px solid #343333"
              fontSize="15px"
              fontFamily="Evogria, san serif"
              options={dropDownMobileOptions}
              selectedItem={Object.keys(dropDownMobileOptions)[tabIndex]}
              setSelectedItem={(i) =>
                setTabIndex(Object.keys(dropDownMobileOptions).indexOf(i))
              }
            />
          ) : (
            <TabList
              pt="11px"
              pr="5px"
              pb="8px"
              sx={SCROLLBAR}
              overflowX="scroll"
              borderColor="#171717"
              justifyContent="center"
            >
              {tabData.map((tab, index) => (
                <Tab
                  color="#888"
                  border="1px solid #343333"
                  minW="180px"
                  minH="50px"
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  py={{ base: "4px", xl: "12px" }}
                  fontSize={{ base: "sm", xl: "15px" }}
                  fontFamily="Evogria , san serif"
                  _selected={{ border: "2px solid #7ae7ff", color: "#7ae7ff" }}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>
          )}
  
          <TabPanels h="full" minH="md">
            {tabData.map((tab, index) => (
              <TabPanel p="0px" key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </CommonContainer>
    );
  }
  
  export default MyBidsPages;
  
  const EventTableWrapper = ({ type, tableHeaders }) => {
    const { ref, inView } = useInView();
    const { api, apiState, currentAccount } = useSubstrateState();
  
    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);
  
    const fetchEvents = useCallback(
      async ({ pageParam, bidder }) => {
        console.log('pageParam', pageParam);
        console.log('bidder', bidder);
        if (pageParam === undefined || apiState !== "READY" || bidder === undefined) return;
  
        let eventsList = [];
        let options = {};
        console.log("type", type);
        if (type === "BUY") {
          options = {
            bidder: bidder,
            limit: 10000,
            offset: 0,
            sort: -1,
          };
          let {ret} = await APICall.getBidsByBidderAddress(options);
          eventsList= ret;
        } else {
          options = {
            seller: bidder,
            limit: 10000,
            offset: 0,
            sort: -1,
          };
          let {ret} = await APICall.getBidsBySellerAddress(options);
          eventsList= ret;
        }
        
        
  
        if (eventsList?.length > 0) {
          eventsList = await Promise.all(
            eventsList?.map(async (event) => {
              const { nftContractAddress, tokenID, azDomainName, seller, bidder, bid_value, bid_date } = event;
  
              const buyerDomain = await resolveDomain(bidder, api);
              const sellerDomain = await resolveDomain(seller, api);
              console.log('nftContractAddress', nftContractAddress);
              console.log('tokenID', tokenID);
              let nftInformationData = {};
              let originalPrice = 0;
              let highestBidPrice = 0;
              let bidPrice = convertNumberToPrice(bid_value);
              let bidDate = convertStringToDateTime(bid_date);
              if (nftContractAddress) {
                if (nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
                  const { ret: nftInformationRes, status } = await APICall.getNFTByID({
                    collection_address: nftContractAddress,
                    azDomainName: azDomainName,
                  });
                  if (status === "OK") {
                    nftInformationData = nftInformationRes[0];
                    originalPrice = convertNumberToPrice(nftInformationData.price);
                    highestBidPrice = convertNumberToPrice(nftInformationData.highest_bid);
                  }
                } else {
                  const { ret: nftInformationRes, status } = await APICall.getNFTByID({
                    collection_address: nftContractAddress,
                    token_id: tokenID,
                  });
                  if (status === "OK") {
                    nftInformationData = nftInformationRes[0];
                    originalPrice = convertNumberToPrice(nftInformationData.price);
                    highestBidPrice = convertNumberToPrice(nftInformationData.highest_bid);
                  }
                }
              }
              
              const eventFormatted = {
                ...event,
                ...nftInformationData,
                buyerDomain,
                sellerDomain,
                originalPrice,
                bidPrice,
                bidDate,
                highestBidPrice
              };
              console.log('eventFormatted', eventFormatted);
              return eventFormatted;
            })
          );
        }
  
        return {
          eventsList,
          nextId: pageParam + NUMBER_NFT_PER_PAGE,
        };
      },
      [api, apiState, type, currentAccount?.address]
    );
  
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
      useInfiniteQuery(
        [`getEvents${type}`, currentAccount?.address, apiState],
        ({ pageParam = 0, bidder = currentAccount?.address }) => fetchEvents({ pageParam, bidder }),
        {
          getNextPageParam: (lastPage) => {
            if (lastPage?.eventsList?.length < NUMBER_NFT_PER_PAGE) {
              return undefined;
            }
            return lastPage?.nextId || 0;
          },
        }
      );
  
    const dataFormatted = useMemo(
      () =>
        data?.pages?.reduce((a, b) => {
          return a.concat(b?.eventsList);
        }, []),
      [data]
    );
  
    return (
      <>
        {isLoading ? (
          <HStack pt="80px" pb="20px" justifyContent="center" w="full">
            <BeatLoader color="#7ae7ff" size="10px" />
          </HStack>
        ) : (
          <BidsTable
            type={type}
            tableHeaders={tableHeaders}
            tableData={dataFormatted}
          />
        )}
  
        {dataFormatted?.length ? (
          <HStack pt="80px" pb="20px" justifyContent="center" w="full">
            <Text ref={ref}>
              {isFetchingNextPage ? (
                <BeatLoader color="#7ae7ff" size="10px" />
              ) : hasNextPage ? (
                ""
              ) : (
                "Nothing more to load"
              )}
            </Text>
          </HStack>
        ) : (
          ""
        )}
      </>
    );
  };
  
  const dropDownMobileOptions = {
    BUY: "buy"
  };
  
  const headers = {
    buy: {
      nftName: "nft name",
      avatar: "image",
      originalPrice: "price",
      highestBidPrice: "highest bid",
      bidPrice: "bid amount",
      bidDate: "bid date",
      seller: "seller"
    },
    sell: {
      nftName: "nft name",
      avatar: "image",
      originalPrice: "price",
      highestBidPrice: "highest bid",
      bidPrice: "bid amount",
      bidDate: "bid date",
      bidder: "bidder"
    },
  };
  