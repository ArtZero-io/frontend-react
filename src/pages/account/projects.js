import React, { useEffect, useState } from "react";
import { Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import { getProjectListDetails } from "../../utils/blockchain/launchpad-psp34-nft-standard-calls";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";

const MyProjectsPage = () => {
  const { api, currentAccount } = useSubstrateState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyProjectListDetails = async () => {
      try {
        setLoading(true);

        const projectListDetails = await getProjectListDetails({
          currentAccount,
          api,
        });
        console.log("projectListDetails", projectListDetails);
        const myProjectListDetails = projectListDetails.filter(
          (i) => i.projectOwner === currentAccount?.address
        );

        setProjects(myProjectListDetails);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchMyProjectListDetails();
  }, [api, currentAccount]);
  console.log("projects", projects);
  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="start"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my projects</Heading>

        <Spacer mt={{ base: "20px", xl: "0px" }} />

      </Flex>

      {loading ? (
        <AnimationLoader />
      ) : (
        <Stack>
          <Text textAlign="left" color="brand.grayLight">
            There are {projects?.length || 0} projects
          </Text>

          {projects?.length ? (
            <GridA collections={projects} variant="my-projects" />
          ) : null}
        </Stack>
      )}
    </CommonContainer>
  );
};

export default MyProjectsPage;
