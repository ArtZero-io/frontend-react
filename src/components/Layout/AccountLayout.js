import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";

import * as ROUTES from "@constants/routes";
import Layout from "@components/Layout/Layout";
import ProfileHeader from "@pages/account/components/Header";
import { CREATE_NFT } from "../../constants";
import useForceUpdate from "@hooks/useForceUpdate";

const AccountLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  // TODO refactor tab nav
  // eslint-disable-next-line no-unused-vars
  const [tabsData, setTabsData] = useState(tabsList);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate(
    [CREATE_NFT],
    () => handleForceUpdate()
  );

  const handleForceUpdate = async () => {
    history.push(ROUTES.ACCOUNT_MY_NFTS);
  };

  const handleTabsChange = (index) => {
    history.push(tabsData[index].route);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

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
            {!isBigScreen ? (
              <HStack
                //  sx={SCROLLBAR}
                overflowY="hidden"
                overflowX="scroll"
                py="16px"
              >
                {tabsData.map((tab) => (
                  <Tab
                    minW={["135px", "auto"]}
                    px="2.5px"
                    color="#fff"
                    key={tab.label}
                    isDisabled={tab.isDisabled}
                    py={["8px", "20px"]}
                    fontSize={["md", "lg", "lg"]}
                    fontFamily="Evogria Italic, san serif"
                    _selected={{
                      // color: '#7ae7ff',
                      color: "#000",
                      borderBottom: "2px #7ae7ff solid",
                      bg: "#7ae7ff",
                    }}
                  >
                    {tab.label}
                  </Tab>
                ))}
              </HStack>
            ) : (
              tabsData.map((tab) => (
                <Tab
                  mx="25px"
                  px="0.5px"
                  color="#fff"
                  key={tab.label}
                  isDisabled={tab.isDisabled}
                  py={["8px", "20px"]}
                  fontSize={["md", "lg", "lg"]}
                  fontFamily="Evogria Italic, san serif"
                  _selected={{
                    color: "#7ae7ff",
                    borderBottom: "2px #7ae7ff solid",
                  }}
                >
                  {tab.label}
                </Tab>
              ))
            )}
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

const tabsList = [
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
    label: "My Activities",
    isDisabled: false,
    route: ROUTES.ACCOUNT_MY_ACTIVITIES,
  },
  {
    label: "My Bids",
    isDisabled: false,
    route: ROUTES.ACCOUNT_MY_BIDS,
  },
];
