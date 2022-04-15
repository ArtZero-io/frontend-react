import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import Loader from "@components/Loader/Loader";
import Layout from "@components/Layout/Layout";
import AdminHeader from "@pages/admin/components/Header";
import { useSubstrateState } from "@utils/substrate";
import ContractTab from "../../pages/admin/components/Tab/Contract";
import CollectionTab from "../../pages/admin/components/Tab/Collection";

const AdminLayout = ({ children }) => {
  const { profileContract } = useSubstrateState();

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" position="relative">
        {profileContract !== "READY" ? (
          <Loader />
        ) : (
          <>
            <AdminHeader />

            <Tabs isLazy align="center">
              <TabList>
                {tabData.map((tab) => (
                  <Tab
                    key={tab.label}
                    fontFamily="Evogria Italic, san serif"
                    color="#fff"
                    pb={5}
                    px={1}
                    mx={4}
                    fontSize="lg"
                  >
                    {tab.label}
                  </Tab>
                ))}
              </TabList>

              <TabPanels bg="#171717">
                {tabData.map((tab, index) => (
                  <TabPanel px={12} py={8} key={index}>
                    {tab.content}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default AdminLayout;
const tabData = [
  {
    label: "Contract",
    content: <ContractTab />,
  },
  {
    label: "Collection",
    content: <CollectionTab />,
  },
];
