import React, { useState } from "react";

import { Heading, Stack } from "@chakra-ui/react";
import StatsTable from "@components/Table/StatsTable";

function PayoutHistoryTab() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingTime, setLoadingTime] = useState(null);

  return (
    <>
      <Stack
        direction={{ base: "column", xl: "row" }}
        w="full"
        alignItems="center"
        mb="30px"
      >
        <Heading size="h3" mb="10px">
          payout history
        </Heading>
      </Stack>

      <StatsTable tableHeaders={headers} tableData={payoutList} />
    </>
  );
}

export default PayoutHistoryTab;

const headers = {
  index: "#",
  date: "date",
  totalAmount: "Total Amount",
  totalStakers: "Total Stakers",
};

const payoutList = [
  {
    totalStakers: 26,
    date: "06/06/2022",
    totalAmount: 2500,
    royalFee: 2500,
  },
  {
    totalStakers: 26,
    date: "06/06/2022",
    price: 25000,
    totalAmount: 875,
    royalFee: 1250,
  },
  {
    totalStakers: 22,
    date: "06/06/2022",
    price: 15000,
    totalAmount: 525,
    royalFee: 750,
  },
];
