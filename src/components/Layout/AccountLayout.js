import { useHistory, useLocation } from "react-router-dom";
import { Box, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";

import * as ROUTES from "@constants/routes";
import Layout from "@components/Layout/Layout";
import ProfileHeader from "@pages/account/components/Header";
import { useEffect } from "react";

const AccountLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const tabData = [
    {
      label: "General",
      value: ROUTES.ACCOUNT,
    },
    {
      label: "My Collections",
      value: ROUTES.ACCOUNT_MY_COLLECTIONS,
    },
    {
      label: "My NFTS",
      value: ROUTES.ACCOUNT_MY_NFTS,
    },
    {
      label: "My Stakes",
      value: ROUTES.ACCOUNT_MY_STAKES,
    },
  ];

  const handleTabsChange = (index) => {
    history.push(tabData[index].value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Box as="section" position="relative" bg="#000" mx="auto">
        <ProfileHeader />

        <Tabs
          index={tabData.map((i) => i.value).indexOf(pathname)}
          onChange={handleTabsChange}
          align="center"
          isLazy
          colorScheme="brand.blue"
        >
          <TabList>
            {tabData.map((tab) => (
              <Tab
                key={tab.label}
                mx={4}
                px="0.5px"
                color="#fff"
                py={["8px", "20px", "20px"]}
                fontSize={["md", "lg", "lg"]}
                fontFamily="Evogria Italic, san serif"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels
            p={0}
            bg="#171717"
            className="TabPanels"
            minH="calc(100vh - 480px)"
          >
            {children}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default AccountLayout;
