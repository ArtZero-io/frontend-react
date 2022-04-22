import { useHistory, useLocation } from "react-router-dom";
import { Box, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";

import * as ROUTES from "@constants/routes";
import Layout from "@components/Layout/Layout";
import ProfileHeader from "@pages/account/components/Header";

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

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" position="relative">
        <ProfileHeader />

        <Tabs
          index={tabData.map((i) => i.value).indexOf(pathname)}
          onChange={handleTabsChange}
          align="center"
          isLazy
        >
          <TabList>
            {tabData.map((tab) => (
              <Tab
                key={tab.label}
                fontFamily="Evogria Italic, san serif"
                color="#fff"
                fontSize="lg"
                pb={5}
                px={1}
                mx={4}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="TabPanels" bg="#171717" p={0}>
            {children}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default AccountLayout;
