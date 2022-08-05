import React from "react";
import Layout from "@components/Layout/Layout";
import { Text, Heading, Box, HStack, Spacer } from "@chakra-ui/react";
import AddNewProjectForm from "./component/Form/AddNewProject";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useHistory } from "react-router-dom";

const AddProject = () => {
  const history = useHistory();

  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <HStack
          px="4px"
          py="10px"
          display="flex"
          cursor="pointer"
          maxW="max-content"
          alignItems="center"
          onClick={() => history.goBack()}
          _hover={{ bg: "#7ae7ff", color: "black" }}
        >
          <MdOutlineArrowBackIos />
          <Text fontFamily="Evogria, sans-serif" size="h6" pl="8px">
            GO BACK{" "}
          </Text>
          <Spacer />
        </HStack>
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
