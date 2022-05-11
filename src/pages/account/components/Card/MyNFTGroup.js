/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import MyNFTCard from "./MyNFT";
import { IPFS_BASE_URL } from "@constants/index";
import { createObjAttrsNFT } from "@utils/index";
import ResponsivelySizedModal from "@components/Modal/Modal";
import { getCachedImage } from "@utils";
import { clientAPI } from "@api/client";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

function MyNFTGroupCard({
  name,
  avatarImage,
  listNFT,
  contractType,
  showOnChainMetadata,
  showMyListing,
}) {
  const { currentAccount } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [listNFTFormatted, setListNFTFormatted] = useState(null);

  function onClickHandler(item) {
    setSelectedNFT(item);
    item?.stakeStatus === 0 && onOpen();
  }

  useEffect(() => {
    const getAttributesData = async () => {
      if (showOnChainMetadata) {
        //On-Chain Data
        const data = listNFT?.map((item) => {
          const itemData = createObjAttrsNFT(
            item.attributes,
            item.attributesValue
          );

          return { ...item, ...itemData };
        });

        setListNFTFormatted(data);
      } else {
        //Off-chain Data

        let tokenUri = await artzero_nft_calls.tokenUri(
          currentAccount?.address,
          1
        );
        tokenUri = tokenUri?.replace("1.json", "");

        let data = [];
        let listNFT_length = listNFT.length;
        for (var j = 0; j < listNFT_length; j++) {
          let item = listNFT[j];
          //get the off-chain metadata
          const metadata = await clientAPI(
            "get",
            "/getJSON?input=" + tokenUri + item.tokenID?.toString() + ".json",
            {}
          );
          //console.log(tokenUri + item.tokenID + ".json",metadata);
          let attributes = [];
          let attributeValues = [];
          attributes.push("nftName");
          attributes.push("description");
          attributes.push("avatar");

          attributeValues.push(metadata.name);
          attributeValues.push(metadata.description);
          attributeValues.push(metadata.image);

          let length = metadata.attributes.length;
          for (var i = 0; i < length; i++) {
            attributes.push(metadata.attributes[i].trait_type);
            attributeValues.push(metadata.attributes[i].value);
          }
          const itemData = createObjAttrsNFT(attributes, attributeValues);

          data.push({ ...item, ...itemData });
        }
        // console.log(data);
        setListNFTFormatted(data);
      }

      // if (showMyListing === 1){
      //   console.log('showMyListing only')
      //   let mylistNFT = listNFT.filter(
      //
      //     (nft) => nft.is_for_sale
      //
      //   );
      //   setListNFTFormatted(mylistNFT);
      //}
    };

    getAttributesData();

    //console.log(listNFT,'showOnChainMetadata',showOnChainMetadata);
  }, [currentAccount, listNFT, showOnChainMetadata]);

  return (
    <Box my={10}>
      <React.Suspense fallback={<Text>Loading Component...</Text>}>
        <ResponsivelySizedModal
          contractType={contractType}
          {...selectedNFT}
          isOpen={isOpen}
          onClose={onClose}
          hasTabs={true}
        />
      </React.Suspense>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex>
            <Avatar
              size={"lg"}
              border="2px solid white"
              src={
                avatarImage
                  ? getCachedImage(
                      avatarImage,
                      100,
                      IPFS_BASE_URL + "/" + avatarImage.replace("ipfs://", "")
                    )
                  : ""
              }
            />
            <VStack align="start" ml={3} justifyContent="center">
              <Heading size="h6">{name}</Heading>
              <Text textAlign="left" color="brand.grayLight" size="2xs">
                {listNFTFormatted?.length} items
              </Text>
            </VStack>
          </Flex>
        </motion.div>
      </AnimatePresence>

      {!listNFTFormatted?.length ? (
        <VStack
          py={10}
          align="start"
          ml={3}
          justifyContent="center"
          borderBottomWidth={1}
        >
          <Text textAlign="center" color="brand.grayLight" size="2xs">
            No NFT found
          </Text>
        </VStack>
      ) : (
        <Box borderBottomWidth={1}>
          <GridNftA
            listNFTFormatted={listNFTFormatted}
            onClickHandler={onClickHandler}
          />

          {/* <Grid
            borderBottomWidth={1}
            templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
            gap={6}
            py={10}
            px={1}
          >
            {listNFTFormatted?.map((item, idx) => (
              <React.Fragment key={idx}>
                <GridItem
                  shadow="lg"
                  w="full"
                  h="full"
                  cursor="pointer"
                  onClick={() => onClickHandler(item)}
                >
                  <MyNFTCard {...item} />
                </GridItem>
              </React.Fragment>
            ))}
          </Grid> */}
        </Box>
      )}
    </Box>
  );
}

export default MyNFTGroupCard;

function GridNftA({
  listNFTFormatted,
  onClickHandler,
  variant = "my-collection",
}) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

  useEffect(() => {
    controls.start("visible");
  }, [listNFTFormatted, controls]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{}}
      id="grid-item-div"
      style={{
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
        display: "grid",
        // gridGap: "1.875rem",
        // gridAutoRows: "20.625rem",
        gridAutoFlow: "dense",
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, 224px), 1fr))`,
        borderBottom: "0.125rem",
        justifyItems: "center",
      }}
    >
      {listNFTFormatted.length > 0 &&
        listNFTFormatted?.map((c, i) => (
          <GridItemA
            key={i}
            i={i}
            delayPerPixel={delayPerPixel}
            originOffset={originOffset}
            id="grid-item-a"
            onClick={() => onClickHandler(c)}
          >
            <MyNFTCard {...c} />
          </GridItemA>
        ))}
    </motion.div>
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
        marginBottom: "1rem",
      }}
      onClick={() => onClick()}
    >
      {children}
    </motion.div>
  );
}
