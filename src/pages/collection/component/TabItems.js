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

  // const elementRef = useRef();
  // const dimensions = useDimensions(elementRef, true);

  // const nftCardWidthB = useBreakpointValue({ base: 150, xl: 300 });

  // const nftCardWidth = bigCard ? nftCardWidthB : 240;

  // const nftCardHeightR = bigCard ? 450 : 395;
  // const nftCardHeight = useBreakpointValue({
  //   base: 280,
  //   xl: nftCardHeightR,
  // });

  // const gridWidth = dimensions?.borderBox?.width;
  // const gridCol = Math.floor(gridWidth / nftCardWidth);
  // const gapB = useBreakpointValue({ base: 15, xl: 30 });
  // const gap = gapB;

  // const realNftCardWidth =
  //   (gridWidth - gridCol * nftCardWidth - gap * (gridCol - 1)) / gridCol +
  //   nftCardWidth;
  // const realGridHeight =
  //   Math.ceil(unListNFT?.length / gridCol) * (nftCardHeight + gap);

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
    <>
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

          {currentAccount?.address === collectionOwner && contractType === 2 ? (
            <AddNewNFTModal
              collectionOwner={collectionOwner}
              mode={formMode.ADD}
            />
          ) : null}
        </Flex>
      </Box>

      {/* <Box
        w="100%"
        mx="auto"
        px={["12px", "0"]}
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
      </Box> */}

      <Box ref={newGridWrapperRef} maxW="1722px" mx="auto" px={["12px", "0px"]}>
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
          />
        )}

        {/* <SimpleGrid columns={columns} gap={stackSpacing}>
          {unListNFT.map((token) => (
            <Fragment key={token.id}>
              <CommonCard {...token} cardWidth={nftCardWidthNew} />
            </Fragment>
          ))}{" "}
        </SimpleGrid> */}
      </Box>
    </>
  );
};

export default CollectionItems;

// function GridNftA({
//   listNFTFormatted,
//   bigCard,
//   realNftCardWidth,
//   realGridCardHeight,
//   gridCol,
//   gap,
//   collectionOwner,
//   showOnChainMetadata,
// }) {
//   const originOffset = useRef({ top: 0, left: 0 });
//   const controls = useAnimation();
//   const history = useHistory();
//   const delayPerPixel = 0.0004;

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedNft, setSelectedNft] = useState(null);

//   const [isBigScreen] = useMediaQuery("(min-width: 480px)");

//   function handleOnClick(item) {
//     console.log("GridNftA item", item);
//     if (isBigScreen) {
//       setSelectedNft(item);
//       onOpen();
//     } else {
//       history.push(`/nft/${item.nftContractAddress}/${item.tokenID}`);
//     }
//   }

//   useEffect(() => {
//     controls.start("visible");
//   }, [listNFTFormatted, controls]);

//   return (
//     <>
//       {isBigScreen && (
//         <NFTDetailModal
//           {...selectedNft}
//           isOpen={isOpen}
//           onClose={onClose}
//           collectionOwner={collectionOwner}
//           showOnChainMetadata={showOnChainMetadata}
//         />
//       )}

//       <motion.div
//         initial="hidden"
//         animate={controls}
//         variants={{}}
//         id="grid-item-div"
//         style={{
//           height: "100%",
//         }}
//       >
//         {listNFTFormatted?.map((c, i) => (
//           <GridItemA
//             i={i}
//             key={i}
//             id="grid-item-a"
//             gap={gap}
//             gridCol={gridCol}
//             originOffset={originOffset}
//             delayPerPixel={delayPerPixel}
//             onClick={() => handleOnClick(c)}
//             realNftCardWidth={realNftCardWidth}
//             realGridCardHeight={realGridCardHeight}
//           >
//             <NFTChangeSizeCard
//               {...c}
//               bigCard={bigCard}
//               width={realNftCardWidth}
//               height={realGridCardHeight}
//             />
//           </GridItemA>
//         ))}
//       </motion.div>
//     </>
//   );
// }

// function GridItemA({
//   i,
//   gap,
//   gridCol,
//   delayPerPixel,
//   originIndex,
//   originOffset,
//   children,
//   onClick,
//   tokenID,
//   realNftCardWidth,
//   realGridCardHeight,
// }) {
//   const delayRef = useRef(0);
//   const offset = useRef({ top: 0, left: 0 });
//   const ref = useRef();

//   const left = (i % gridCol) * (realNftCardWidth + gap);
//   const top = Math.floor(i / gridCol) * (realGridCardHeight + gap);

//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//     },
//     visible: (delayRef) => ({
//       opacity: 1,
//       scale: 1,
//       transition: { delay: delayRef.current },
//     }),
//   };

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     offset.current = {
//       top: element.offsetTop,
//       left: element.offsetLeft,
//     };

//     if (i === originIndex) {
//       originOffset.current = offset.current;
//     }
//   }, [i, originIndex, originOffset]);

//   useEffect(() => {
//     const dx = Math.abs(offset.current.left - originOffset.current.left);
//     const dy = Math.abs(offset.current.top - originOffset.current.top);
//     const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
//     delayRef.current = d * delayPerPixel;
//   }, [children, delayPerPixel, originOffset]);

//   return (
//     <AnimatePresence>
//       {!tokenID && (
//         <motion.div
//           ref={ref}
//           custom={delayRef}
//           variants={itemVariants}
//           exit={{ opacity: 0, scale: 0 }}
//           style={{
//             top: top || 0,
//             left: left || 0,
//             cursor: "pointer",
//             position: "absolute",
//             transitionDuration: "0.45s",
//             transitionProperty: "top bottom right left",
//             transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
//           }}
//           onClick={() => onClick()}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

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
