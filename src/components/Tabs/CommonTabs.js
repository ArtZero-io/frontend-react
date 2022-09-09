import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

function CommonTabs(props) {
  const { tabsData, ...rest } = props;

  return (
    <Tabs {...rest} isLazy align="center">
      <TabList bg="black" border="none">
        {tabsData.map((tab, index) => (
          <Tab color='#fff'
            mx="25px"
            px="0.5px"
            key={index}
            isDisabled={tab.isDisabled}
            pb={{ base: "12px", xl: "20px" }}
            fontSize={{ base: "md", xl: "lg" }}
            fontFamily="Evogria Italic, san serif"
            _selected={{ color: "#7ae7ff", borderBottom: "2px #7ae7ff solid" }}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels h="full" minH="md" bg="brand.semiBlack">
        {tabsData.map((tab, index) => (
          <TabPanel
            key={index}
            pt={{ base: "14px", xl: "40px" }}
            px={{ base: "12px", "2xl": "100px" }}
          >
            {tab.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default CommonTabs;
