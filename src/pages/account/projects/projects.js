import React, { useEffect, useState } from "react";
import { Heading, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";
import WhitelistManagerModal from "./components/WhitelistManagerModal";
import OwnerMintModal from "./components/OwnerMintModal";
import { APICall } from "@api/client";

const MyProjectsPage = () => {
  const { api, currentAccount } = useSubstrateState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [adminProjQty, setAdminProjQty] = useState(0);

  useEffect(() => {
    let isUnmounted = false;
    const fetchMyProjectListDetails = async () => {
      try {
        setLoading(true);

        const { ret: projList1 } = await APICall.getAllProjects({});
        const { ret: projList2 } = await APICall.getAllProjects({
          isActive: false,
        });

        const projList = projList1.concat(projList2);

        const myProjList = projList.filter(
          ({ collectionAdmin, collectionOwner }) =>
            collectionAdmin === currentAccount.address ||
            collectionOwner === currentAccount.address
        );

        if (isUnmounted) return;
        setAdminProjQty(myProjList?.length);
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
  }, [api, currentAccount]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <CommonContainer>
      <Stack
        w="full"
        // alignItems="start"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my projects</Heading>

        {isBigScreen && (
          <>
            <Spacer mt={{ base: "20px", xl: "0px" }} />

            <OwnerMintModal isDisabled={projects?.length === 0} />
            <WhitelistManagerModal isDisabled={adminProjQty === 0} />
          </>
        )}
      </Stack>

      {!isBigScreen && (
        <Stack spacing="20px" alignItems="center" mb="20px">
          <OwnerMintModal isDisabled={projects?.length === 0} />
          <WhitelistManagerModal isDisabled={adminProjQty === 0} />
        </Stack>
      )}

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
