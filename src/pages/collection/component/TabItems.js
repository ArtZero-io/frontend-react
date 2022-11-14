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
} from "@chakra-ui/react";
import { BsGrid3X3 } from "react-icons/bs";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BigGridIcon from "@theme/assets/icon/BigGrid";

import { useHistory } from "react-router-dom";
import React, { useRef, useState } from "react";
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
  ...rest
}) => {
  const { currentAccount } = useSubstrateState();

  const [bigCardNew, setBigCardNew] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const options = [
    // "Price: Newest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  // 0 Low first, setSortData(1)
  // 1 High first, setSortData(-1)
  // 2 Newest

  const getSortedNFT = () => {
    if (!result?.totalResults) return [];

    let ret = result?.NFTList;

    // if (selectedItem === 0) {
    //   ret = ret.sort((a, b) => a.price - b.price);
    // }

    // if (selectedItem === 1) {
    //   ret = ret.sort((a, b) => b.price - a.price);
    // }

    return ret;
  };

  const sortedNFT = getSortedNFT();

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  // NEW FIXED GRID LAYOUT START
  const newGridWrapperRef = useRef();

  const dimensionsNewGridWrapper = useDimensions(newGridWrapperRef, true);
  const newGridWrapperWidth = dimensionsNewGridWrapper?.borderBox?.width;

  const columnsBigCardNew = useBreakpointValue({ base: 1, md: 3, xl: 4 });
  const columnsSmallCardNew = useBreakpointValue({ base: 2, md: 4, xl: 6 });

  const columns = bigCardNew ? columnsBigCardNew : columnsSmallCardNew;
  const stackSpacing = useBreakpointValue({ base: 15, md: 15, xl: 30 });

  const nftCardWidthNew =
    (newGridWrapperWidth - stackSpacing * (columns - 1)) / columns;
  // NEW FIXED GRID LAYOUT END

  return (
    <Flex>
      <LeftPanel
        activeTab={activeTab}
        priceQuery={priceQuery}
        setPriceQuery={setPriceQuery}
        traitsQuery={traitsQuery}
        setTraitsQuery={setTraitsQuery}
        totalNftCount={nft_count}
        rarityTable={rarityTable}
      />

      <Stack flexGrow={1}>
        <Box w="full" mx="auto" textAlign="left" px={["12px", 0]}>
          <Stack direction={{ base: "column", md: "row" }} w="full">
            <HStack pb={[0, "8px"]} justifyContent="space-between">
              <IconButton
                mr="2px"
                size="icon"
                variant="iconSolid"
                aria-label="refresh"
                onClick={() => forceUpdate()}
                icon={<RefreshIcon />}
                _hover={{ color: "black", bg: "#7ae7ff" }}
              />

              <Spacer display={["none", "flex"]} />

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
                  setSelectedItem={(i) => setActiveTab(i)}
                />
              ) : (
                Object.keys(tabList).map((item) => (
                  <CommonButton
                    key={item}
                    text={item}
                    variant="outline"
                    isActive={item === activeTab}
                    onClick={() => setActiveTab(item)}
                    _active={{ bg: "brand.blue", color: "black" }}
                  />
                ))
              )}
            </HStack>

            <Spacer display={["none", "flex"]} />

            <Flex justifyContent="space-between" align="center" pr={[0, "8px"]}>
              <Dropdown
                width="full"
                minW={["330px", "250px"]}
                options={options}
                selectedItem={selectedItem}
                setSelectedItem={(i) => {
                  setSelectedItem(i);
                  i === 0 ? setSortData(1) : setSortData(-1);
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
              // onClick={() => setBigCard(true)}
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
              //   onClick={() => setBigCard(false)}
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
            contractType === 2 ? (
              <AddNewNFTModal
                collectionOwner={collectionOwner}
                mode={formMode.ADD}
              />
            ) : null}
          </Flex>
        </Box>

        <Wrap>
          {Object.entries(traitsQuery).map(([k, arr]) => (
            <WrapItem key={k}>
              {arr.map((item, idx) => (
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
              ))}
            </WrapItem>
          ))}
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
              columns={columns}
              gap={stackSpacing}
              cardWidth={nftCardWidthNew}
              dataList={sortedNFT}
              collectionOwner={collectionOwner}
              showOnChainMetadata={showOnChainMetadata}
              rarityTable={rarityTable}
              totalNftCount={nft_count}
            />
          )}
        </Box>
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
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  const history = useHistory();
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  function handleOnClick(item) {
    if (isBigScreen) {
      setSelectedNft(item);
      onOpen();
    } else {
      history.push(`/nft/${item.nftContractAddress}/${item.tokenID}`);
    }
  }

  return (
    <>
      {isBigScreen && (
        <NFTDetailModal
          {...selectedNft}
          rarityTable={rarityTable}
          totalNftCount={totalNftCount}
          isOpen={isOpen}
          onClose={onClose}
          collectionOwner={collectionOwner}
          showOnChainMetadata={showOnChainMetadata}
        />
      )}

      <SimpleGrid columns={columns} gap={gap}>
        {dataList.map((token, idx) => (
          <div onClick={() => handleOnClick(token)} key={idx}>
            <CommonCard {...token} cardWidth={cardWidth} />
          </div>
        ))}
      </SimpleGrid>
    </>
  );
};
