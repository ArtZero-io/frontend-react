import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "@components/Layout/Layout";
import { GroupCard } from "./component/GroupCard";

export const LaunchpadPage = () => {
  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading size="h2" mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          The Degenerate Ape Academy is an NFT brand housed on the blockchain.
        </Text>
      </Box>

      <GroupCard variant="live" />
      <GroupCard variant="upcoming" />
      <GroupCard variant="ended" />
    </Layout>
  );
};
