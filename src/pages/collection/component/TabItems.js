import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";

import AddNewNFTModal from "./Modal/AddNewNFT";

import Dropdown from "@components/Dropdown/Dropdown";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import NFTDetailModal from "./Modal/NFTDetail";
import NFTChangeSizeCard from "@components/Card/NFTChangeSize";
import AnimationLoader from "@components/Loader/AnimationLoader";

const CollectionItems = ({
  NFTListFormatted,
  collectionOwner,
  contractType,
  loading,
  forceUpdate,
  loadingTime,
}) => {
  const { currentAccount } = useSubstrateState();

  const [bigCard, setBigCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const [isShowUnlisted, setIsShowUnlisted] = useState(3);

  const options = [
    // "Price: Newest",
    "Price: Low to High",
    "Price: High to Low",
  ];
  //  0 Low first, 1 High first, 2 Newest

  const getUnListedNFT = () => {

    if (!NFTListFormatted) return [];

    let result = NFTListFormatted;

    if (selectedItem === 0) {
      result = result.sort((a, b) => a.price - b.price);
    }

    if (selectedItem === 1) {
      result = result.sort((a, b) => b.price - a.price);
    }

    // if (!isShowUnlisted) result = NFTListFormatted;

    if (isShowUnlisted % 3 === 0) {
      return result;
    }
    if (isShowUnlisted % 3 === 1) {
      result = result.filter((i) => i.is_for_sale === true);
    }
    if (isShowUnlisted % 3 === 2) {
      result = result.filter((i) => i.is_for_sale === false);
    }

    return result;
  };

  const unListNFT = getUnListedNFT();

  return (
    <Box w="full" textAlign="left" minH={"54rem"}>
      <Stack direction={{ base: "column", xl: "row" }} w="full">
        <IconButton
          display={{ base: "none", xl: "block" }}
          aria-label="refresh"
          icon={<RefreshIcon fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
          onClick={() => forceUpdate()}
        />
        <Flex justifyContent="space-between">
          <IconButton
            display={{ base: "block", xl: "none" }}
            aria-label="refresh"
            icon={<RefreshIcon fontSize="1.5rem" />}
            size="icon"
            variant="iconSolid"
            mx={1.5}
            onClick={() => forceUpdate()}
          />

          <Button
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
          </Button>
        </Flex>
        {/* 
        <Input
          ml={1.5}
          mr={3}
          placeholder="Search items, collections, and accounts"
        /> */}
        <Spacer />
        <Flex justifyContent="space-between" align="center" pr="2">
          <Text px={2} display={{ base: "block", xl: "none" }}>
            {unListNFT.length || 0} items{" "}
            {isShowUnlisted % 3 === 0
              ? "in total"
              : isShowUnlisted % 3 === 1
              ? "listed"
              : isShowUnlisted % 3 === 2
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
          display={{ base: "none", xl: "flex" }}
          bg={bigCard ? "#7ae7ff" : "#222"}
          color={bigCard ? "#000" : "#fff"}
          aria-label="big-card"
          icon={<RiLayoutGridLine fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mr={1.5}
          ml={3}
          onClick={() => setBigCard(true)}
        />

        <IconButton
          display={{ base: "none", xl: "flex" }}
          bg={!bigCard ? "#7ae7ff" : "#222"}
          color={!bigCard ? "#000" : "#fff"}
          aria-label="small-card"
          icon={<BsGrid3X3 fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
          onClick={() => setBigCard(false)}
        />
      </Stack>

      <Flex
        align="center"
        py={{ base: 2, xl: "1.25rem", "2xl": 4 }}
        minH={{ base: 14, "2xl": 24 }}
        w="full"
      >
        <AnimatePresence>
          {unListNFT?.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text px={2} display={{ base: "none", xl: "block" }}>
                {unListNFT?.length || 0} items{" "}
                {isShowUnlisted % 3 === 0
                  ? "in total"
                  : isShowUnlisted % 3 === 1
                  ? "listed"
                  : isShowUnlisted % 3 === 2
                  ? "unlisted"
                  : ""}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>

        <Spacer />

        {currentAccount?.address === collectionOwner && contractType === 2 ? (
          <AddNewNFTModal collectionOwner={collectionOwner} />
        ) : null}
      </Flex>

      {loading ? (
        <AnimationLoader loadingTime={loadingTime} />
      ) : (
        <GridNftA bigCard={bigCard} listNFTFormatted={unListNFT} />
      )}
    </Box>
  );
};

export default CollectionItems;

function GridNftA({ listNFTFormatted, bigCard }) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0004;

  useEffect(() => {
    controls.start("visible");
  }, [listNFTFormatted, controls]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNft, setSelectedNft] = useState(null);

  function handleOnClick(item) {
    setSelectedNft(item);
    onOpen();
  }

  return (
    <>
      {/* <ResponsivelySizedModal
        // {...selectedNft}
        isOpen={isOpen}
        onClose={onClose}
        hasTabs={true}
      /> */}
      <NFTDetailModal {...selectedNft} isOpen={isOpen} onClose={onClose} />

      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{}}
          id="grid-item-div"
          style={{
            display: "grid",
            gridGap: "1.875rem",
            // gridAutoRows: "20.625rem",
            gridAutoFlow: "dense",
            gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${
              bigCard ? "25rem" : "20rem"
            }), 1fr))`,
            borderBottom: "0.125rem",
            justifyItems: "center",
          }}
        >
          {listNFTFormatted?.map((c, i) => (
            <GridItemA
              key={i}
              i={i}
              delayPerPixel={delayPerPixel}
              originOffset={originOffset}
              id="grid-item-a"
              onClick={() => handleOnClick(c)}
            >
              <NFTChangeSizeCard {...c} bigCard={bigCard} />
            </GridItemA>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function GridItemA({
  delayPerPixel,
  i,
  originIndex,
  originOffset,
  children,
  onClick,
  tokenID,
}) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
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
          exit={{ opacity: 0, scale: 0 }}
          ref={ref}
          variants={itemVariants}
          custom={delayRef}
          style={{
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => onClick()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
