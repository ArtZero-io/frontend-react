/* eslint-disable no-unused-vars */
import { Box, Grid, Heading, useBreakpointValue } from "@chakra-ui/react";
import React, { Fragment } from "react";
import MyNFTCard from "@components/Card/MyNFT";

function NFTMintTab({ myAZNFTs }) {
  const cardSize = useBreakpointValue([156, 224]);
  const gapCardSize = useBreakpointValue([3, 6]);

  return (
    <Box
      mx="auto"
      minH={"xs"}
      px={{ base: "2", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      {myAZNFTs?.length === 0 ? (
        <Heading size="h6" textTransform="uppercase">
          No NFT found!
        </Heading>
      ) : (
        <Grid
          mb={12}
          mx="auto"
          maxW="6xl-mid"
          gap={gapCardSize}
          templateColumns={`repeat(auto-fill, minmax(min(100%, ${cardSize}px), 1fr))`}
        >
          {myAZNFTs?.map((item, idx) => (
            <Fragment key={idx}>
              <MyNFTCard {...item} />
            </Fragment>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default React.memo(NFTMintTab);
