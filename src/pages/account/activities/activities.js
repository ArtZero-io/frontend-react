import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

import CommonContainer from "@components/Container/CommonContainer";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { SCROLLBAR } from "@constants";
import MyActivitiesTableWrapper from "@components/Table/MyActivitiesTableWrapper";

function ActivitiesPage({ mode }) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  const tabData = [
    {
      label: "BUY",
      content: <MyActivitiesTableWrapper mode={mode} type="BUY" />,
    },
    {
      label: "SELL",
      content: <MyActivitiesTableWrapper mode={mode} type="SELL" />,
    },
    {
      label: "LIST",
      content: <MyActivitiesTableWrapper mode={mode} type="LIST" />,
    },
    {
      label: "UNLIST",
      content: <MyActivitiesTableWrapper mode={mode} type="UNLIST" />,
    },
  ];

  return (
    <CommonContainer>
      <VStack as="section" w="full">
        <Box w="full" textAlign="left" mb={[0, "24px"]}>
          <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>My Activities</Heading>
        </Box>
      </VStack>

      <Tabs
        px="0px"
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
    </CommonContainer>
  );
}

export default ActivitiesPage;

const dropDownMobileOptions = {
  BUY: "buy",
  SELL: "sell",
  LIST: "list",
  UNLIST: "unlist",
};
