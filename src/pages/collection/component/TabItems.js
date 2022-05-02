import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";

import AddNewNFTModal from "./Modal/AddNewNFT";

import Dropdown from "@components/Dropdown/Dropdown";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import { motion, useAnimation } from "framer-motion";
import NFTDetailModal from "./Modal/NFTDetail";
import NFTChangeSizeCard from "@components/Card/NFTChangeSize";

const CollectionItems = ({
  nftTotalCount,
  NFTListFormatted,
  collectionOwner,
  contractType,
  isShowUnlisted,
  handleShowUnlisted,
  forceUpdate,
}) => {
  const { currentAccount } = useSubstrateState();

  const [bigCard, setBigCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];

  return (
    <Box w="full" textAlign="left" minH={"54rem"}>
      <Flex w="full">
        <IconButton
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
          onClick={() => handleShowUnlisted()}
        >
          {isShowUnlisted ? "Show all" : "Show unlisted"}
        </Button>
        {/* 
        <Input
          ml={1.5}
          mr={3}
          placeholder="Search items, collections, and accounts"
        /> */}
        <Spacer />
        <Dropdown
          mx={1.5}
          options={options}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        <IconButton
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
          bg={!bigCard ? "#7ae7ff" : "#222"}
          color={!bigCard ? "#000" : "#fff"}
          aria-label="small-card"
          icon={<BsGrid3X3 fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
          onClick={() => setBigCard(false)}
        />
      </Flex>

      <Flex align="center" py={4} minH={24}>
        <Text px={2}>{nftTotalCount || 0} items</Text>

        <Spacer />

        {currentAccount?.address === collectionOwner && contractType === 2 ? (
          <AddNewNFTModal
            collectionOwner={collectionOwner}
            forceUpdate={forceUpdate}
          />
        ) : null}
      </Flex>

      <GridNftA bigCard={bigCard} listNFTFormatted={NFTListFormatted} />

      {/* <CollectionNFTGrid bigCard={bigCard} nftList={NFTListFormatted} /> */}
    </Box>
  );
};

export default CollectionItems;

function GridNftA({ listNFTFormatted, bigCard }) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

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
            <NFTChangeSizeCard {...c} />
          </GridItemA>
        ))}
      </motion.div>
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
    <motion.div
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
  );
}
