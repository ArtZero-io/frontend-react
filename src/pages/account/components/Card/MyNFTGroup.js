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
import { createObjAttrsNFT } from "@utils/index";
import ResponsivelySizedModal from "@components/Modal/Modal";
import { getCachedImageShort } from "@utils";
import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { ContractPromise } from "@polkadot/api-contract";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function MyNFTGroupCard({
  name,
  avatarImage,
  listNFT,
  contractType,
  showOnChainMetadata,
  showMyListing,
  filterSelected,
  nftContractAddress,
}) {
  const { currentAccount, api } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [listNFTFormatted, setListNFTFormatted] = useState(null);
  const history = useHistory();
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

        if (nftContractAddress) {
          const nft_contract = new ContractPromise(
            api,
            nft721_psp34_standard.CONTRACT_ABI,
            nftContractAddress
          );

          const gasLimit = -1;
          const azero_value = 0;

          const { result, output } = await nft_contract.query[
            "psp34Traits::tokenUri"
          ](currentAccount?.address, { value: azero_value, gasLimit }, 1);

          if (!result.isOk) {
            toast.error("There is an error when loading token_uri!");
            return;
          }

          const tokenUri = output.toHuman()?.replace("1.json", "");

          Promise.all(
            listNFT.map(async (item) => {
              const res = await getMetaDataType1(item.tokenID, tokenUri);

              return { ...item, ...res };
            })
          ).then((result) => {
            setListNFTFormatted(result);
          });
        }
      }
    };

    getAttributesData();

    //console.log(listNFT,'showOnChainMetadata',showOnChainMetadata);
  }, [api, currentAccount, listNFT, nftContractAddress, showOnChainMetadata]);
  return (
    <Box my={10}>
      <ResponsivelySizedModal
        contractType={contractType}
        {...selectedNFT}
        isOpen={isOpen}
        onClose={onClose}
        hasTabs={true}
        filterSelected={filterSelected}
        showOnChainMetadata={showOnChainMetadata}
      />
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
              src={getCachedImageShort(avatarImage, 100)}
            />
            <VStack align="start" ml={3} justifyContent="center">
              <Heading
                size="h6"
                cursor="pointer"
                _hover={{ color: "#7ae7ff" }}
                onClick={() =>
                  history.push(`/collection/${nftContractAddress}`)
                }
              >
                {name}
              </Heading>
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

const getMetaDataType1 = async (tokenID, token_uri) => {
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
};
