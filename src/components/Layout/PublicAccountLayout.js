/* eslint-disable no-unused-vars */
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
import ProfileHeader from "@pages/accountPublic/components/Header";
import { SCROLLBAR } from "@constants";

const PublicAccountLayout = ({ children, match }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  // TODO refactor tab nav
  // eslint-disable-next-line no-unused-vars
  const [tabsData, setTabsData] = useState(tabsList);
  const [dataUrl, setDataUrl] = useState({});

  const handleTabsChange = (index) => {
    history.push(tabsData[index].route + `/${dataUrl.address}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const arr = pathname.split("/");
    setDataUrl({ address: arr[arr.length - 1], route: arr[arr.length - 2] });
  }, [pathname]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <Layout>
      <Box as="section" position="relative" bg="#000" mx="auto">
        <ProfileHeader address={dataUrl.address} />

        <Tabs
          isLazy
          mx="auto"
          align="center"
          colorScheme="brand.blue"
          onChange={handleTabsChange}
          index={tabsData.findIndex((i) => i.route.includes(dataUrl.route))}
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

export default PublicAccountLayout;

const tabsList = [
  {
    label: "Collections",
    isDisabled: false,
    route: "/public-account/collections",
  },
  {
    label: "NFTS",
    isDisabled: false,
    route: "/public-account/nfts",
  },
  // {
  //   label: 'My Stakes',
  //   isDisabled: false,
  //   route: '/public-account/stakes',
  // },
  {
    label: "Projects",
    isDisabled: false,
    route: "/public-account/projects",
  },
];
