import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import NFTChangeSizeCard from "@components/Card/NFTChangeSize";
import NFTDetailModal from "./Modal/NFTDetail";
// eslint-disable-next-line no-unused-vars
import ResponsivelySizedModal from "../../../components/Modal/Modal";

const NFTGrid = ({ bigCard, nftList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNft, setSelectedNft] = useState(null);

  function handleOnClick(item) {
    setSelectedNft(item);
    onOpen();
  }

  return (
    <div>
      <NFTDetailModal {...selectedNft} isOpen={isOpen} onClose={onClose} />

      {/* <ResponsivelySizedModal
        {...selectedNft}
        isOpen={isOpen}
        onClose={onClose}
      /> */}

      <Grid
        templateColumns={`repeat(auto-fill, minmax(min(100%, ${
          bigCard ? "25rem" : "20rem"
        }), 1fr))`}
        gap={6}
      >
        {nftList?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <GridItem
                w="full"
                h="full"
                cursor="pointer"
                onClick={() => handleOnClick(item)}
              >
                <NFTChangeSizeCard {...item} />
              </GridItem>
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
};

export default NFTGrid;
