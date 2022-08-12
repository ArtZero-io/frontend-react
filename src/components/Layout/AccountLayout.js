import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";

import * as ROUTES from "@constants/routes";
import Layout from "@components/Layout/Layout";
import ProfileHeader from "@pages/account/components/Header";

const AccountLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const tabsData = [
    {
      label: "General",
      isDisabled: false,
      route: ROUTES.ACCOUNT,
    },
    {
      label: "My Collections",
      isDisabled: false,
      route: ROUTES.ACCOUNT_MY_COLLECTIONS,
    },
    {
      label: "My NFTS",
      isDisabled: false,
      route: ROUTES.ACCOUNT_MY_NFTS,
    },
    {
      label: "My Stakes",
      isDisabled: false,
      route: ROUTES.ACCOUNT_MY_STAKES,
    },
    {
      label: "My Projects",
      isDisabled: false,
      route: ROUTES.ACCOUNT_MY_PROJECTS,
    },
    {
      label: "WhiteList Manager",
      isDisabled: false,
      route: ROUTES.ACCOUNT_WHITELIST_PROJECTS,
    },
  ];

  const handleTabsChange = (index) => {
    history.push(tabsData[index].route);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Box as="section" position="relative" bg="#000" mx="auto">
        <ProfileHeader />

        <Tabs
          isLazy
          mx="auto"
          align="center"
          colorScheme="brand.blue"
          onChange={handleTabsChange}
          index={tabsData.map((i) => i.route).indexOf(pathname)}
        >
          <TabList>
            {tabsData.map((tab) => (
              <Tab
                mx={4}
                px="0.5px"
                color="#fff"
                key={tab.label}
                py={["8px", "20px", "20px"]}
                fontSize={["md", "lg", "lg"]}
                fontFamily="Evogria Italic, san serif"
                _selected={{
                  color: "#7ae7ff",
                  borderBottom: "2px #7ae7ff solid",
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels
            p={0}
            bg="#171717"
            className="TabPanels"
            minH="calc(100vh - 48px)"
          >
            {children}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default AccountLayout;
