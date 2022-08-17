import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import Layout from "@components/Layout/Layout";

import AdminHeader from "@pages/admin/components/Header";
// import ContractTab from "@pages/admin/components/Tab/Contract";
import CollectionTab from "@pages/admin/components/Tab/Collection";
import CheckCollection from "@pages/admin/components/Tab/CheckCollection";
import RewardDistribution from "@pages/admin/components/Tab/RewardDistribution";
import ProjectTab from "@pages/admin/components/Tab/Project";

const AdminLayout = () => {
  const tabData = [
    // {
    //   label: "AZ NFT Contract",
    //   content: <ContractTab />,
    // },
    {
      label: "Collection Management",
      content: <CollectionTab />,
    },
    {
      label: "Check Advanced Mode Collection",
      content: <CheckCollection />,
    },
    {
      label: "Project Management",
      content: <ProjectTab />,
    },
    {
      label: "Reward Distribution",
      content: <RewardDistribution />,
    },
  ];

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" position="relative">
        <AdminHeader />

        <Tabs isLazy align="center" colorScheme="brand.blue">
          <TabList>
            {tabData.map((tab) => (
              <Tab
                key={tab.label}
                fontFamily="Evogria Italic, san serif"
                color="#fff"
                mx={4}
                fontSize="lg"
                px="0.5px"
                py="20px"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels h="full" minH="xs" bg="#171717">
            {tabData.map((tab, index) => (
              <TabPanel pt={4} px={{ base: 2, "2xl": 24 }} key={index} h="full">
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default AdminLayout;
