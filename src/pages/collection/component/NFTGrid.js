import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import NFTChangeSize from "@components/Card/NFTChangeSize";
import NFTDetailModal from "./Modal/NFTDetail";

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
                w="100%"
                h="100%"
                cursor="pointer"
                _hover={{ bg: "brand.blue" }}
                onClick={() => handleOnClick(item)}
              >
                <NFTChangeSize {...item} />
              </GridItem>
            </React.Fragment>
          );
        })}
      </Grid>
    </div>
  );
};

export default NFTGrid;
