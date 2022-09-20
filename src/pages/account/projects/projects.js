import React, { useEffect, useState } from "react";
import { Heading, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import { getProjectListDetails } from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";
import WhitelistManagerModal from "./components/WhitelistManagerModal";
import OwnerMintModal from "./components/OwnerMintModal";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";

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
        setProjects([]);
        const projectListDetails = await getProjectListDetails({
          currentAccount,
          api,
        });
        console.log("projectListDetails", projectListDetails);
        const myProjectListDetails = projectListDetails.filter(
          (i) => i.projectOwner === currentAccount?.address
        );

        // get projects admin data
        const adminProjList = await Promise.all(
          myProjectListDetails.map(async (p) => {
            const launchpad_psp34_nft_standard_contract = new ContractPromise(
              api,
              launchpad_psp34_nft_standard.CONTRACT_ABI,
              p.nftContractAddress
            );

            launchpad_psp34_nft_standard_calls.setContract(
              launchpad_psp34_nft_standard_contract
            );

            const contractAdminAddress =
              await launchpad_psp34_nft_standard_calls.getAdminAddress(
                currentAccount
              );

            if (contractAdminAddress === currentAccount.address) {
              return p;
            }
          })
        );

        console.log("adminProjList", adminProjList);

        if (isUnmounted) return;
        setAdminProjQty(adminProjList.length);
        setProjects(myProjectListDetails);
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
  // console.log("projects", projects);

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
          <WhitelistManagerModal isDisabled={projects?.length === 0} />
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
