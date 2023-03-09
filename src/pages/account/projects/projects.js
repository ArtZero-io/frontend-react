import { Heading, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";

import OwnerMintModal from "./components/OwnerMintModal";
import WhitelistManagerModal from "./components/WhitelistManagerModal";

import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import { useMyProjectAdmin } from "@hooks/useMyProjectAdmin";

const MyProjectsPage = () => {
  const { api, currentAccount } = useSubstrateState();

  const { myProjectAdmin, isLoading } = useMyProjectAdmin(
    api,
    launchpad_psp34_nft_standard.CONTRACT_ABI,
    currentAccount?.address
  );

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <CommonContainer>
      <Stack
        w="full"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my projects</Heading>

        {isBigScreen && (
          <>
            <Spacer mt={{ base: "20px", xl: "0px" }} />

            <OwnerMintModal isDisabled={myProjectAdmin?.length === 0} />
            <WhitelistManagerModal isDisabled={myProjectAdmin?.length === 0} />
          </>
        )}
      </Stack>

      {!isBigScreen && (
        <Stack spacing="20px" alignItems="center" mb="20px">
          <OwnerMintModal isDisabled={myProjectAdmin?.length === 0} />
          <WhitelistManagerModal isDisabled={myProjectAdmin?.length === 0} />
        </Stack>
      )}

      {isLoading ? (
        <AnimationLoader />
      ) : (
        <>
          <Text textAlign="left" color="brand.grayLight">
            There are {myProjectAdmin?.length || 0} project
            {myProjectAdmin?.length > 1 ? "s" : ""}
          </Text>

          {myProjectAdmin?.length ? (
            <GridA collections={myProjectAdmin} variant="my-projects" />
          ) : null}
        </>
      )}
    </CommonContainer>
  );
};

export default MyProjectsPage;
