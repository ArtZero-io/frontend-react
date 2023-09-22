import React, { useEffect } from "react";
import EventTable from "@components/Table/EventTable";
import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { APICall } from "@api/client";
import { SCROLLBAR } from "@constants";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { BeatLoader } from "react-spinners";
import { useSubstrateState } from "@utils/substrate";
import azero_domains_nft from "../../../utils/blockchain/azero-domains-nft";
import { resolveDomain, getTimestamp } from "@utils";
import SortTableWrapper from "@components/Table/SortTableWrapper";

const NUMBER_NFT_PER_PAGE = 5;

function TabActivity({ collectionOwner, nftContractAddress }) {
  const tabData = [
    {
      label: "SALE",
      content: (
        <SortTableWrapper type="SALE" collection_address={nftContractAddress} />
      ),
    },
    {
      label: "LIST",
      content: (
        <SortTableWrapper type="LIST" collection_address={nftContractAddress} />
      ),
    },
    {
      label: "UNLIST",
      content: (
        <SortTableWrapper
          type="UNLIST"
          collection_address={nftContractAddress}
        />
      ),
    },
  ];

  const [tabIndex, setTabIndex] = React.useState(0);
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <>
      <Tabs
        px="12px"
        isLazy
        index={tabIndex}
        align="center"
        colorScheme="brand.blue"
        onChange={(i) => setTabIndex(i)}
      >
        {!isBigScreen ? (
          <DropdownMobile
            minW="325px"
            my="20px"
            border="1px solid #343333"
            fontSize="15px"
            fontFamily="Evogria, san serif"
            options={dropDownMobileOptions}
            selectedItem={Object.keys(dropDownMobileOptions)[tabIndex]}
            setSelectedItem={(i) =>
              setTabIndex(Object.keys(dropDownMobileOptions).indexOf(i))
            }
          />
        ) : (
          <TabList
            pt="11px"
            pr="5px"
            pb="8px"
            sx={SCROLLBAR}
            overflowX="scroll"
            borderColor="#171717"
            justifyContent="center"
          >
            {tabData.map((tab, index) => (
              <Tab
                color="#888"
                border="1px solid #343333"
                minW="180px"
                minH="50px"
                key={index}
                alignItems="center"
                justifyContent="center"
                py={{ base: "4px", xl: "12px" }}
                fontSize={{ base: "sm", xl: "15px" }}
                fontFamily="Evogria , san serif"
                _selected={{ border: "2px solid #7ae7ff", color: "#7ae7ff" }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        )}

        <TabPanels h="full" minH="md">
          {tabData.map((tab, index) => (
            <TabPanel p="0px" key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default TabActivity;

const dropDownMobileOptions = {
  SALE: "sale",
  LIST: "list",
  UNLIST: "unlist",
};
