import { Button, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import CommonContainer from "@components/Container/CommonContainer";
import AnimationLoader from "@components/Loader/AnimationLoader";
import GridA from "@components/Grid/GridA";

import { launchpad_psp34_nft_standard } from "@utils/blockchain/abi";
import { useMyProjectAdmin } from "@hooks/useMyProjectAdmin";
import { useHistory } from "react-router-dom";
import * as ROUTES from "@constants/routes";

const MyProjectsPage = () => {
  const history = useHistory();
  const { api, currentAccount } = useSubstrateState();

  const { myProjectAdmin, isLoading } = useMyProjectAdmin(
    api,
    launchpad_psp34_nft_standard.CONTRACT_ABI,
    currentAccount?.address
  );

  return (
    <CommonContainer>
      <Stack
        w="full"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my projects</Heading>

        <>
          <Spacer mt={{ base: "20px", xl: "0px" }} />
          {currentAccount && (
            <Button
              my="20px"
              variant="outline"
              onClick={() =>
                history.push({
                  state: { formMode: "ADD" },
                  pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                })
              }
            >
              create project
            </Button>
          )}
        </>
      </Stack>

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
