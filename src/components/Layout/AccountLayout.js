/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Skeleton, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";

import * as ROUTES from "@constants/routes";
import Layout from "@components/Layout/Layout";
import ProfileHeader from "@pages/account/components/Header";
import { getProjectListDetails } from "../../utils/blockchain/launchpad-psp34-nft-standard-calls";
import { useSubstrateState } from "@utils/substrate";
// import AnimationLoader from "@components/Loader/AnimationLoader";

const AccountLayout = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { api, currentAccount } = useSubstrateState();
  const [tabsData, setTabsData] = useState(tabsList);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchMyProjectListDetails = async () => {
  //     try {
  //       setLoading(true);

  //       const projectListDetails = await getProjectListDetails({
  //         currentAccount,
  //         api,
  //       });
  //       // console.log("projectListDetails", projectListDetails);
  //       const myProjectListDetails = projectListDetails.filter(
  //         (i) => i.projectOwner === currentAccount?.address
  //       );
  //       if (myProjectListDetails?.length >= 1) {
  //         setTabsData((prev) => {
  //           return tabsListFull;
  //         });
  //       } else {
  //         setTabsData((prev) => {
  //           return tabsList;
  //         });
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   };

  //   fetchMyProjectListDetails();
  // }, [api, currentAccount]);

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
          <Skeleton isLoaded={!loading}>
            <TabList>
              {tabsData.map((tab) => (
                <Tab
                  mx={4}
                  px="0.5px"
                  color="#fff"
                  key={tab.label}
                  isDisabled={tab.isDisabled}
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
          </Skeleton>

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
];

// eslint-disable-next-line no-unused-vars
const tabsListFull = [
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
  {
    label: "Owner Mint",
    isDisabled: false,
    route: ROUTES.ACCOUNT_MINTING_PROJECTS,
  },
];
