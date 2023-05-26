import React, { useState, useEffect } from "react";

import { Box, Heading, Stack } from "@chakra-ui/react";
import StatsTable from "@components/Table/StatsTable";
import { APICall } from "@api/client";

function PayoutHistoryTab() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingTime, setLoadingTime] = useState(null);
  const [payoutList, setPayoutList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { ret: data } = await APICall.getAllRewardClaimed({
        // staker_address: "5C8DzedQ9N7zmukvTKeFnciutbhfk1gU3tBctwwbitu9ot4A",
        limit: 1000,
        offset: 0,
        sort: -1,
      });
      console.log("getAllRewardClaimed data", data);

      const summary = data.reduce(
        ({ stakerCount, accRewardAmount, nftStakedCount }, e) => {
          stakerCount = stakerCount + 1;
          accRewardAmount = accRewardAmount + e.rewardAmount;
          nftStakedCount = nftStakedCount + e.stakedAmount;

          return { stakerCount, accRewardAmount, nftStakedCount };
        },
        {
          stakerCount: 0,
          accRewardAmount: 0,
          nftStakedCount: 0,
        }
      );

      console.log("summary", summary);

      data = data.map((item, idx) => {
        return { ...item, order: idx + 1 };
      });

      setPayoutList(data);
    };

    fetchData();
  }, []);

  return (
    <Box as="section" maxW="container.3xl">
      <Box mx="auto" py={["4", "12", "20"]}>
        <Stack
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          mb="30px"
        >
          <Heading mb="10px" minW="400px" fontSize={["3xl-mid", "5xl", "5xl"]}>
            payout history
          </Heading>
        </Stack>

        <StatsTable tableHeaders={headers} tableData={payoutList} />
      </Box>
    </Box>
  );
}

export default PayoutHistoryTab;

const headers = {
  order: "#",
  blockNumber: "block Number",
  staker: "staker",
  stakedAmount: "staked Amount",
  rewardAmount: "reward Amount",
};
