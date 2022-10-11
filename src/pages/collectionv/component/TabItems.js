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
  // AspectRatio,
  // Button,
  // Image,
  // Link,
  // Skeleton,
  // useColorModeValue,
  // Square,
  // Heading,
} from "@chakra-ui/react";
import { BsGrid3X3 } from "react-icons/bs";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BigGridIcon from "@theme/assets/icon/BigGrid";

import { useHistory } from "react-router-dom";
import React, {
  //  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  // AnimatePresence,
  //   useAnimation
} from "framer-motion";

import AddNewNFTModal from "./Modal/AddNewNFT";
import NFTDetailModal from "./Modal/NFTDetail";

import { formMode } from "@constants";
// import { getCachedImageShort } from "@utils/index";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";

import Dropdown from "@components/Dropdown/Dropdown";
import CommonButton from "@components/Button/CommonButton";
// import NFTChangeSizeCard from "@components/Card/NFTChangeSize";
import AnimationLoader from "@components/Loader/AnimationLoader";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { CommonCard } from "@components/Card/NFTChangeSize";
import { Fragment } from "react";
import LeftPanel from "./LeftPanel";

const CollectionItems = ({
  NFTListFormatted,
  collectionOwner,
  contractType,
  loading,
  forceUpdate,
  loadingTime,
  totalCollectionsCount,
  activeTab,
  setActiveTab,
  showOnChainMetadata,
  bigCard,
  setBigCard,
  rarityTable,
  nft_count,
  ...rest
}) => {
  const { currentAccount } = useSubstrateState();

  // eslint-disable-next-line no-unused-vars
  const [bigCardNew, setBigCardNew] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const options = [
    // "Price: Newest",
    "Price: Low to High",
    "Price: High to Low",
  ];
  //  0 Low first, 1 High first, 2 Newest

  // TODOs: update after remove un/listed filter

  const getUnListedNFT = () => {
    if (!NFTListFormatted) return [];

    let result = NFTListFormatted;

    if (selectedItem === 0) {
      result = result.sort((a, b) => a.price - b.price);
    }

    if (selectedItem === 1) {
      result = result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

  const unListNFT = getUnListedNFT();

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
  console.log("unListNFT", unListNFT);

  
  return (
    <Flex>
      <LeftPanel totalNftCount={nft_count} rarityTable={rarityTable} />

      <Stack border="1px dotted yellow" flexGrow={1}>
        <Box w="full" mx="auto" textAlign="left" px={["12px", 0]}>
          <Stack direction={{ base: "column", md: "row" }} w="full">
            <HStack pb={[0, "8px"]} justifyContent="space-between">
              <IconButton
                // m={1.5}
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
                setSelectedItem={setSelectedItem}
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
            {unListNFT && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text px={2} color="#888">
                  {totalCollectionsCount || 0} item
                  {totalCollectionsCount > 1 ? "s " : " "}
                  {activeTab === tabList.ALL
                    ? "in total"
                    : activeTab === tabList.LISTED
                    ? "listed"
                    : activeTab === tabList.UNLISTED
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
              dataList={unListNFT}
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
