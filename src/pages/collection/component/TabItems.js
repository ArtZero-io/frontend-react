import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
  Stack,
  useDimensions,
  useBreakpointValue,
  useMediaQuery,
  HStack,
  SimpleGrid,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsGrid3X3 } from "react-icons/bs";
import BigGridIcon from "@theme/assets/icon/BigGrid";

import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import AddNewNFTModal from "./Modal/AddNewNFT";
import NFTDetailModal from "./Modal/NFTDetail";

import { formMode } from "@constants";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";

import Dropdown from "@components/Dropdown/Dropdown";
import CommonButton from "@components/Button/CommonButton";
import AnimationLoader from "@components/Loader/AnimationLoader";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { CommonCard } from "@components/Card/NFTChangeSize";
import LeftPanel from "./LeftPanel";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import toast from "react-hot-toast";
import { isMobile } from "react-device-detect";
import { useMemo } from "react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";

const CollectionItems = ({
  result,
  collectionOwner,
  contractType,
  loading,
  forceUpdate,
  loadingTime,
  totalCount,
  activeTab,
  setActiveTab,
  showOnChainMetadata,
  bigCard,
  setBigCard,
  rarityTable,
  nft_count,
  traitsQuery,
  setTraitsQuery,
  priceQuery,
  setPriceQuery,
  setSortData,
  name,
  pages,
  keyword,
  setKeyword,
  loadMoreRef,
  isFetchingNextPage,
  isLastPageResult,
  maxTotalSupply,
  ...rest
}) => {
  const { currentAccount, apiState } = useSubstrateState();

  const [bigCardNew, setBigCardNew] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);

  const { state } = useLocation();

  useEffect(() => {
    if (state?.selectedItem) {
      setSelectedItem(state?.selectedItem);
    }
  }, [state?.selectedItem]);

  const options = useMemo(() => {
    const options = [
      `${activeTab === "LISTED" ? "Price" : "ID"}: Highest first`,
      `${activeTab === "LISTED" ? "Price" : "ID"}: Lowest first`,
    ];

    activeTab === "LISTED" && options.push("Newly listed order");

    return options;
  }, [activeTab]);

  // index 0 High first, setSortData(1)
  // index 1 Low first, setSortData(2)
  // index 2 Newest, setSortData(3)

  const NFTList = useMemo(
    () =>
      pages?.reduce((a, b) => {
        return a.concat(b?.data);
      }, []),
    [pages]
  );

  const [sortedNFT, setSortedNFT] = useState();

  useEffect(() => {
    const fetchBidsData = async () => {
      let fetchData = [];

      if (!NFTList?.length) {
        return setSortedNFT(fetchData);
      }

      fetchData = await Promise.all(
        NFTList &&
          NFTList?.map(async (i) => {
            const sale_info = await marketplace_contract_calls.getNftSaleInfo(
              currentAccount,
              i.nftContractAddress,
              { u64: i.tokenID }
            );

            if (!sale_info) return i;

            let listBidder = await marketplace_contract_calls.getAllBids(
              currentAccount,
              i.nftContractAddress,
              sale_info?.nftOwner,
              { u64: i.tokenID }
            );

            // map array index to bidId
            listBidder = listBidder?.map((i, idx) => {
              return { ...i, bidId: idx };
            });

            //sort highest price first
            listBidder?.length &&
              listBidder.sort((a, b) => {
                return (
                  b.bidValue?.replaceAll(",", "") * 1 -
                  a.bidValue?.replaceAll(",", "") * 1
                );
              });

            const highest_bid =
              listBidder && listBidder[0]?.bidValue?.replaceAll(",", "");

            return { ...i, highest_bid };
          })
      );
      setSortedNFT(fetchData);
    };

    if (apiState !== "READY") return;

    fetchBidsData();
  }, [NFTList, currentAccount, apiState]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  // NEW FIXED GRID LAYOUT START
  const newGridWrapperRef = useRef();

  const dimensionsNewGridWrapper = useDimensions(newGridWrapperRef, true);
  const newGridWrapperWidth = dimensionsNewGridWrapper?.borderBox?.width;

  const columnsBigCardNew = useBreakpointValue({ base: 1, md: 3, xl: 4 });
  const columnsSmallCardNew = useBreakpointValue({ base: 2, md: 4, xl: 6 });

  const columns = bigCardNew ? columnsBigCardNew : columnsSmallCardNew;
  const stackSpacing = useBreakpointValue({ base: 15, md: 15, "2xl": 30 });

  const nftCardWidthNew =
    (newGridWrapperWidth - stackSpacing * (columns - 1)) / columns;
  // NEW FIXED GRID LAYOUT END

  const onChangeHandler = ({ target }) => {
    setKeyword(target.value);
  };

  const onClearHandler = () => {
    setKeyword("");
  };

  return (
    <Flex maxW="1920px" alignItems="stretch">
      <LeftPanel
        activeTab={activeTab}
        priceQuery={priceQuery}
        setPriceQuery={setPriceQuery}
        traitsQuery={traitsQuery}
        setTraitsQuery={setTraitsQuery}
        totalNftCount={maxTotalSupply || nft_count}
        rarityTable={rarityTable}
      />

      <Stack flexGrow={1}>
        <Box w="full" mx="auto" textAlign="left" px={["12px", 0]}>
          <Stack direction={{ base: "column", md: "row" }} w="full">
            {!isBigScreen && (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  w="full"
                  h="52px"
                  mx={[0, 1.5]}
                  value={keyword}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Search nft..."
                />

                {keyword && (
                  <InputRightElement width="4.5rem">
                    <Button
                      h="30px"
                      w="30px"
                      size="sm"
                      onClick={() => onClearHandler("")}
                    >
                      <CloseIcon />
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
            )}

            <HStack pb={[0, "8px"]} justifyContent="space-between">
              {!isBigScreen ? (
                <DropdownMobile
                  minW="256px"
                  width="full"
                  my="20px"
                  border="1px solid #343333"
                  fontSize="15px"
                  fontFamily="Evogria, san serif"
                  options={tabList}
                  selectedItem={activeTab}
                  setSelectedItem={(i) => {
                    if (i === "ALL" || i === "UNLISTED") {
                      setSelectedItem(1);
                      setSortData(2);
                    }
                    setActiveTab(i);
                  }}
                />
              ) : (
                Object.keys(tabList).map((item) => (
                  <CommonButton
                    key={item}
                    text={item}
                    variant="outline"
                    isActive={item === activeTab}
                    onClick={() => {
                      if (item === "ALL" || item === "UNLISTED") {
                        setSelectedItem(1);
                        setSortData(2);
                      }
                      setActiveTab(item);
                    }}
                    _active={{ bg: "brand.blue", color: "black" }}
                  />
                ))
              )}
            </HStack>

            {isBigScreen && (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  w="full"
                  h="52px"
                  mx={[0, 1.5]}
                  value={keyword}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Search nft..."
                />

                {keyword && (
                  <InputRightElement width="4.5rem">
                    <Button
                      h="30px"
                      w="30px"
                      size="sm"
                      onClick={() => onClearHandler("")}
                    >
                      <CloseIcon />
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
            )}

            <Spacer display={["none", "flex"]} />

            <Flex justifyContent="space-between" align="center" pr={[0, "8px"]}>
              <Dropdown
                width="full"
                minW={["330px", "250px"]}
                options={options}
                selectedItem={selectedItem}
                setSelectedItem={(i) => {
                  setSelectedItem(i);
                  setSortData(i + 1);
                }}
              />
            </Flex>

            <IconButton
              ml={3}
              mr={1.5}
              size="icon"
              variant="iconSolid"
              aria-label="big-card"
              bg={bigCardNew ? "#7ae7ff" : "#222"}
              color={bigCardNew ? "#000" : "#fff"}
              display={{ base: "none", xl: "flex" }}
              icon={<BigGridIcon />}
              onClick={() => setBigCardNew(true)}
            />

            <IconButton
              mx={1.5}
              size="icon"
              variant="iconSolid"
              aria-label="small-card"
              bg={!bigCardNew ? "#7ae7ff" : "#222"}
              color={!bigCardNew ? "#000" : "#fff"}
              display={{ base: "none", xl: "flex" }}
              icon={<BsGrid3X3 fontSize="20px" />}
              onClick={() => setBigCardNew(false)}
            />
          </Stack>

          <Flex
            align="center"
            pt={{ base: "10px", xl: "34px", "2xl": "34px" }}
            pb={{ base: "10px", xl: "16px" }}
            minH={{ base: 14, "2xl": 24 }}
            w="full"
          >
            {sortedNFT && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text px={2} color="#888">
                  {totalCount || 0} item
                  {totalCount > 1 ? "s " : " "}
                  {activeTab === "ALL"
                    ? "in total"
                    : activeTab === "LISTED"
                    ? "listed"
                    : activeTab === "UNLISTED"
                    ? "unlisted"
                    : ""}
                </Text>
              </motion.div>
            )}

            <Spacer />

            {currentAccount?.address === collectionOwner &&
            contractType === "Psp34Auto" ? (
              <AddNewNFTModal
                collectionOwner={collectionOwner}
                mode={formMode.ADD}
              />
            ) : null}
          </Flex>
        </Box>

        <Wrap>
          {Object.entries(traitsQuery).map(([k, arr]) => {
            return arr?.map((item, idx) => (
              <WrapItem key={k}>
                <Tag
                  mx="4px"
                  borderRadius="0"
                  border="none"
                  key={idx}
                  size="sm"
                  colorScheme="black"
                >
                  <TagLabel mx="4px" fontSize="14px">
                    {k}: {item}
                  </TagLabel>
                  <CloseButton
                    size="sm"
                    borderRadius="0"
                    onClick={() => {
                      const newTraitsQuery = { ...traitsQuery };
                      const newArray = traitsQuery[k].filter((i) => i !== item);

                      newArray.length === 0
                        ? delete newTraitsQuery[k]
                        : (newTraitsQuery[k] = newArray);

                      setTraitsQuery(newTraitsQuery);
                    }}
                  />
                </Tag>
              </WrapItem>
            ));
          })}
          <WrapItem>
            <Tag
              h="24px"
              mx="4px"
              size="sm"
              borderRadius="0"
              colorScheme="black"
              border="1px solid #7ae7ff"
              onClick={() => setTraitsQuery({})}
              display={Object.keys(traitsQuery)?.length === 0 ? "none" : "flex"}
            >
              <TagLabel cursor="pointer" mx="4px" fontSize="14px">
                Clear all
              </TagLabel>
            </Tag>
          </WrapItem>
        </Wrap>

        <Box
          ref={newGridWrapperRef}
          maxW="1722px"
          mx="auto"
          px={["12px", "0px"]}
        >
          {loading ? (
            <AnimationLoader loadingTime={loadingTime} />
          ) : (
            <CollectionGridNew
              selectedItem={selectedItem}
              columns={columns}
              gap={stackSpacing}
              cardWidth={nftCardWidthNew}
              dataList={sortedNFT}
              collectionOwner={collectionOwner}
              showOnChainMetadata={showOnChainMetadata}
              rarityTable={rarityTable}
              totalNftCount={maxTotalSupply || nft_count}
              bigCardNew={bigCardNew}
              name={name}
              {...rest}
            />
          )}
        </Box>

        <Spacer />

        {sortedNFT?.length ? (
          <HStack py={10} justifyContent="center" w="full">
            <Text ref={loadMoreRef}>
              {isFetchingNextPage ? (
                <BeatLoader color="#7ae7ff" size="10px" />
              ) : !isLastPageResult ? (
                ""
              ) : (
                "Nothing more to load"
              )}
            </Text>
          </HStack>
        ) : (
          ""
        )}
      </Stack>
    </Flex>
  );
};

export default CollectionItems;

export const tabList = {
  ALL: "show all",
  LISTED: "show listed",
  UNLISTED: "show unlisted",
};

const CollectionGridNew = ({
  columns,
  gap,
  cardWidth,
  dataList,
  collectionOwner,
  showOnChainMetadata,
  rarityTable,
  totalNftCount,
  bigCardNew,
  name,
  selectedItem,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);
  const location = useLocation();

  const history = useHistory();

  function handleOnClick(item) {
    if (!isMobile) {
      setSelectedNft(item);
      onOpen();
    } else {
      history.push({
        state: { selectedItem, ...location },
        pathname: `/nft/${item.nftContractAddress}/${
          item.azDomainName ?? item.tokenID
        }`,
      });
    }
  }

  function handleNav(id, step) {
    const currentIndex = dataList.findIndex(
      (item) => item?.tokenID === id || item?.azDomainName === id
    );

    if (step === -1 && currentIndex === 0) {
      return toast("This is first item!");
    }

    if (step === 1 && currentIndex === dataList?.length - 1) {
      return toast("End of page!");
    }

    const newCurrentItem = dataList[currentIndex + step];

    if (newCurrentItem) {
      setSelectedNft(newCurrentItem);
    }
  }
  return (
    <>
      {!isMobile && (
        <NFTDetailModal
          {...rest}
          {...selectedNft}
          handleNav={handleNav}
          rarityTable={rarityTable}
          totalNftCount={totalNftCount}
          isOpen={isOpen}
          onClose={onClose}
          name={name}
          collectionOwner={collectionOwner}
          showOnChainMetadata={showOnChainMetadata}
        />
      )}

      <SimpleGrid columns={columns} gap={gap}>
        {dataList?.map((token, idx) => (
          <div onClick={() => handleOnClick(token)} key={idx}>
            <CommonCard
              {...token}
              cardWidth={cardWidth}
              bigCardNew={bigCardNew}
            />
          </div>
        ))}
      </SimpleGrid>
    </>
  );
};
