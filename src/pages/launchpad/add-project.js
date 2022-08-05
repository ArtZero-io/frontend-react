import React from "react";
import Layout from "@components/Layout/Layout";
import { Text, Heading, Box } from "@chakra-ui/react";
import AddNewProjectForm from "./component/Form/AddNewProject";

const AddProject = () => {
  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading size="h2" mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          The premier destination to launch your NFT Collection on Aleph Zero
          Network.
        </Text>
      </Box>

      <AddNewProjectForm />
    </Layout>
  );
};

export default AddProject;
