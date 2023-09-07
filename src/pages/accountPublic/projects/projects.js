import React, { useEffect, useState } from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";
import { APICall } from "@api/client";
import { execContractQuery } from "@utils/blockchain/profile_calls";
import launchpad_psp34_nft_standard from "../../../utils/blockchain/launchpad-psp34-nft-standard";
import { useParams } from "react-router-dom";

const MyProjectsPage = () => {
  const { api } = useSubstrateState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const {address} = useParams()

  useEffect(() => {
    const checkIsAdmin = async ({ nftContractAddress, address }) => {
      if (!api) return;

      const queryResult1 = await execContractQuery(
        address,
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        nftContractAddress,
        "accessControl::hasRole",
        3739740293,
        address
      );

      return queryResult1.toHuman().Ok;
    };
    let isUnmounted = false;
    const fetchMyProjectListDetails = async () => {
      try {
        setLoading(true);

        const { ret: projList1 } = await APICall.getAllProjects({});
        const { ret: projList2 } = await APICall.getAllProjects({
          isActive: false,
        });

        const projList = projList1.concat(projList2);
        const projAddCheckAdmin = await Promise.all(
          projList.map(async (proj) => {
            const isAdmin = await checkIsAdmin({
              nftContractAddress: proj?.nftContractAddress,
              address: address,
            });

            return { ...proj, isAdmin };
          })
        );
        const myProjList = projAddCheckAdmin.filter(
          ({ collectionOwner, isAdmin }) =>
            collectionOwner === address || isAdmin
        );

        if (isUnmounted) return;
        setProjects(myProjList);
        setLoading(false);
      } catch (error) {
        if (isUnmounted) return;

        setLoading(false);
        console.log(error);
      }
    };

    fetchMyProjectListDetails();

    return () => (isUnmounted = true);
  }, [api, address]);

  return (
    <CommonContainer>
      <Stack
        w="full"
        // alignItems="start"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my projects</Heading>

      </Stack>

      {loading ? (
        <AnimationLoader />
      ) : (
        <>
          <Text textAlign="left" color="brand.grayLight">
            There are {projects?.length || 0} project
            {projects?.length > 1 ? "s" : ""}
          </Text>

          {projects?.length ? (
            <GridA collections={projects} variant="my-projects" />
          ) : null}
        </>
      )}
    </CommonContainer>
  );
};

export default MyProjectsPage;
