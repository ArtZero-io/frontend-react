import React from "react";
import Layout from "@components/Layout/Layout";
import { Text, Heading, Stack, Box } from "@chakra-ui/react";
import AddNewProjectForm from "./component/Form/AddNewProject";

const AddProject = () => {
  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading size="h2" mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          Dolore sint in sit enim proident ullamco quis eu veniam. Dolore sintin proident ullamco quis.
        </Text>
      </Box>
      <Stack
        w="full"
        maxW="870px"
        mx="auto"
        bg="#222"
        px="30px"
        py="26px"
        mb="30px"
      >
        <AddNewProjectForm />
      </Stack>
    </Layout>
  );
};

export default AddProject;
