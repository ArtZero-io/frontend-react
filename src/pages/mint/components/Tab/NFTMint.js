import { Box, Grid, Heading } from "@chakra-ui/react";
import React, { Fragment } from "react";
import MyNFTCard from "../../../account/components/Card/MyNFT";

function NFTMintTab({ myAZNFTs }) {
  return (
    <Box
      minH={"xs"}
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      {myAZNFTs?.length === 0 ? (
        <Heading size="h6" textTransform="uppercase">
          No NFT found!
        </Heading>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
          gap={6}
          maxW="6xl-mid"
          mx="auto"
          mb={12}
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
