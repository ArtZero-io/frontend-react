import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
  Stack,
  useDimensions,
  useBreakpointValue,
  // Input,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

import AddNewNFTModal from "./Modal/AddNewNFT";

import Dropdown from "@components/Dropdown/Dropdown";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import NFTDetailModal from "./Modal/NFTDetail";
import AnimationLoader from "@components/Loader/AnimationLoader";
import NFTChangeSizeCard from "@components/Card/NFTChangeSize";
import { formMode } from "@constants";

const CollectionItems = ({
  NFTListFormatted,
  collectionOwner,
  contractType,
  loading,
  forceUpdate,
  loadingTime,
  setIsShowUnlisted,
  isShowUnlisted,
  totalCollectionsCount,
  offset,
  activeTab,
  setActiveTab,
  showOnChainMetadata,
}) => {
  const { currentAccount } = useSubstrateState();

  const [bigCard, setBigCard] = useState(true);
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

  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  const nftCardWidthB = useBreakpointValue({ base: 150, xl: 300 });

  const nftCardWidth = bigCard ? nftCardWidthB : 240;
  const nftCardHeight = bigCard ? 450 : 395;

  const gridWidth = dimensions?.borderBox?.width;
  const gridCol = Math.floor(gridWidth / nftCardWidth);
  const gapB = useBreakpointValue({ base: 15, xl: 30 });
  const gap = gapB;

  const realNftCardWidth =
    (gridWidth - gridCol * nftCardWidth - gap * (gridCol - 1)) / gridCol +
    nftCardWidth;
  const realGridHeight =
    Math.ceil(unListNFT?.length / gridCol) * (nftCardHeight + gap);

  return (
    <>
      <Box w="full" mx="auto" px="0" textAlign="left">
        <Stack direction={{ base: "column", xl: "row" }} w="full">
          <IconButton
            display={{ base: "none", xl: "flex" }}
            aria-label="refresh"
            icon={<MdRefresh fontSize="1.5rem" />}
            size="icon"
            variant="iconSolid"
            mx={1.5}
            _hover={{ color: "black", bg: "#7ae7ff" }}
            onClick={() => forceUpdate()}
          />
          <Flex justifyContent="space-between">
            <IconButton
              display={{ base: "flex", xl: "none" }}
              aria-label="refresh"
              icon={<MdRefresh fontSize="1.5rem" />}
              size="icon"
              variant="iconSolid"
              mx={1.5}
              onClick={() => forceUpdate()}
            />

            {/* <Button
              mx={1.5}
              variant="outline"
              minW={"11rem"}
              onClick={() =>
                setIsShowUnlisted((isShowUnlisted) => isShowUnlisted + 1)
              }
            >
              {isShowUnlisted % 3 === 0
                ? "Show all"
                : isShowUnlisted % 3 === 1
                ? "Show listed"
                : isShowUnlisted % 3 === 2
                ? "Show unlisted"
                : ""}
            </Button> */}
            {Object.keys(tabList).map((item) => (
              <Button
                key={item}
                _active={{ bg: "#7ae7ff", color: "#000" }}
                isActive={item === activeTab}
                id={item}
                variant="outline"
                mx={1}
                onClick={() => setActiveTab(item)}
              >
                {item.replace("_", " ")}
              </Button>
            ))}
          </Flex>
          {/* 
          <Input
            ml={1.5}
            mr={3}
            placeholder="Search items, collections, and accounts"
          /> 
          */}
          <Spacer />

          <Flex justifyContent="space-between" align="center" pr="2">
            <Text px={2} display={{ base: "block", xl: "none" }}>
              {totalCollectionsCount || 0} items{" "}
              {activeTab === tabList.ALL
                ? "in total"
                : activeTab === tabList.LISTED
                ? "listed"
                : activeTab === tabList.UNLISTED
                ? "unlisted"
                : ""}
            </Text>

            <Dropdown
              mx={1.5}
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
            bg={bigCard ? "#7ae7ff" : "#222"}
            color={bigCard ? "#000" : "#fff"}
            display={{ base: "none", xl: "flex" }}
            icon={<RiLayoutGridLine fontSize="1.5rem" />}
            onClick={() => setBigCard(true)}
          />

          <IconButton
            mx={1.5}
            size="icon"
            variant="iconSolid"
            aria-label="small-card"
            bg={!bigCard ? "#7ae7ff" : "#222"}
            color={!bigCard ? "#000" : "#fff"}
            display={{ base: "none", xl: "flex" }}
            icon={<BsGrid3X3 fontSize="1.5rem" />}
            onClick={() => setBigCard(false)}
          />
        </Stack>

        <Flex
          align="center"
          // py={{ base: 2, xl: "1.25rem", "2xl": 4 }}
          pt="64px"
          pb="16px"
          minH={{ base: 14, "2xl": 24 }}
          w="full"
        >
          <AnimatePresence>
            {unListNFT && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text
                  px={2}
                  display={{ base: "none", xl: "block" }}
                  color="#888"
                >
                  {totalCollectionsCount || 0} items{" "}
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
          </AnimatePresence>

          <Spacer />

          {currentAccount?.address === collectionOwner && contractType === 2 ? (
            <AddNewNFTModal
              collectionOwner={collectionOwner}
              mode={formMode.ADD}
            />
          ) : null}
        </Flex>
      </Box>

      <Box
        w="100%"
        mx="auto"
        px="0"
        textAlign="left"
        h={realGridHeight || 600}
        ref={elementRef}
        pos="relative"
      >
        {loading ? (
          <AnimationLoader loadingTime={loadingTime} />
        ) : (
          <GridNftA
            gap={gap}
            gridCol={gridCol}
            bigCard={bigCard}
            listNFTFormatted={unListNFT}
            realNftCardWidth={realNftCardWidth}
            realGridCardHeight={nftCardHeight}
            collectionOwner={collectionOwner}
            showOnChainMetadata={showOnChainMetadata}
          />
        )}
      </Box>
    </>
  );
};

export default CollectionItems;

function GridNftA({
  listNFTFormatted,
  bigCard,
  realNftCardWidth,
  realGridCardHeight,
  gridCol,
  gap,
  collectionOwner,
  showOnChainMetadata,
}) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();

  const delayPerPixel = 0.0004;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  function handleOnClick(item) {
    setSelectedNft(item);
    onOpen();
  }

  useEffect(() => {
    controls.start("visible");
  }, [listNFTFormatted, controls]);

  return (
    <>
      <NFTDetailModal
        {...selectedNft}
        isOpen={isOpen}
        onClose={onClose}
        collectionOwner={collectionOwner}
        showOnChainMetadata={showOnChainMetadata}
      />

      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{}}
          id="grid-item-div"
          style={{
            height: "100%",
          }}
        >
          {listNFTFormatted?.map((c, i) => (
            <GridItemA
              i={i}
              key={i}
              id="grid-item-a"
              gap={gap}
              gridCol={gridCol}
              originOffset={originOffset}
              delayPerPixel={delayPerPixel}
              onClick={() => handleOnClick(c)}
              realNftCardWidth={realNftCardWidth}
              realGridCardHeight={realGridCardHeight}
            >
              <NFTChangeSizeCard
                {...c}
                bigCard={bigCard}
                width={realNftCardWidth}
                height={realGridCardHeight}
              />
            </GridItemA>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function GridItemA({
  i,
  gap,
  gridCol,
  delayPerPixel,
  originIndex,
  originOffset,
  children,
  onClick,
  tokenID,
  realNftCardWidth,
  realGridCardHeight,
}) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  const left = (i % gridCol) * (realNftCardWidth + gap);
  const top = Math.floor(i / gridCol) * (realGridCardHeight + gap);

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: (delayRef) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delayRef.current },
    }),
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [i, originIndex, originOffset]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [children, delayPerPixel, originOffset]);

  return (
    <AnimatePresence>
      {!tokenID && (
        <motion.div
          ref={ref}
          custom={delayRef}
          variants={itemVariants}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            top: top || 0,
            left: left || 0,
            cursor: "pointer",
            position: "absolute",
            transitionDuration: "0.45s",
            transitionProperty: "top bottom right left",
            transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
          }}
          onClick={() => onClick()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export const tabList = {
  ALL: "ALL",
  LISTED: "LISTED",
  UNLISTED: "UNLISTED",
};
