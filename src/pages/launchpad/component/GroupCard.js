/* eslint-disable no-unused-vars */
import {
  Button,
  Flex,
  Heading,
  Spacer,
  // useDisclosure,
  Box,
  HStack,
  Stack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
// import { useState } from "react";
// import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { AccountActionTypes } from "@store/types/account.types";
// import { useSubstrateState } from "@utils/substrate";
// import { convertDateToTimeStamp } from "@utils";
import { Link as ReachLink, useHistory } from "react-router-dom";
import AnimationLoader from "@components/Loader/AnimationLoader";

import * as ROUTES from "@constants/routes";

export const GroupCard = ({ variant = "live", projectsList, loading }) => {
  // const [projectName, setProjectName] = useState("");
  // const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  // const [totalSupply, setTotalSupply] = useState(0);
  // const [projectDescription, setProjectDescription] = useState("");
  // const [roadmap, setRoadmap] = useState("");
  // const [teamMembers, setTeamMembers] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  // const dispatch = useDispatch();
  const history = useHistory();
  // const { cu, {formMode:'ADD'}rrentAccount , {formMode:'ADD'}} = useSubstrateState();
  // const {
  //   isOpen: isOpenAddNew,
  //   onOpen: onOpenAddProject,
  //   onClose: onCloseAddNewProject,
  // } = useDisclosure();
  // const { addCollectionTnxStatus } = useSelector(
  //   (state) => state.account.accountLoaders
  // );

  // useEffect(async () => {
  //   addCollectionTnxStatus?.status === "End" && onCloseAddNewProject();
  //   if (!isLoadedProject) {

  //   }
  // }, [isLoadedProject, onCloseAddNewProject, addCollectionTnxStatus?.status]);

  // const submitForm = async () => {
  //   if (!avatarIPFSUrl) {
  //     return toast.error("Upload avatar");
  //   }

  //   const data = {
  //     name: projectName,
  //     description: projectDescription,
  //     total_supply: totalSupply,
  //     roadmap: roadmap,
  //     team_members: teamMembers,
  //     start_time: convertDateToTimeStamp(startTime),
  //     end_time: convertDateToTimeStamp(endTime),
  //     attributes: ["avatar"],
  //     attribute_vals: [avatarIPFSUrl],
  //   };
  //   console.log(data);
  //   dispatch({
  //     type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
  //     payload: {
  //       status: "Start",
  //     },
  //   });

  //   await launchpad_contract_calls.addNewProject(
  //     currentAccount,
  //     data,
  //     dispatch
  //   );

  //   // }
  // };

  return (
    <>
      <Box
        w="full"
        mx="auto"
        mb="30px"
        py="60px"
        bg="#171717"
        maxW="1426px"
        alignItems="center"
        px={{ base: "25px", "2xl": "77px" }}
      >
        <Flex
          px="15px"
          w="full"
          mx="auto"
          mb="40px"
          maxW="1426px"
          alignItems="center"
          direction={{ base: "column", xl: "row" }}
        >
          <Heading size="h3" mb="10px">
            {variant} projects
          </Heading>

          <Spacer />

          {variant === "live" && (
            <Button
              variant="solid"
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
        </Flex>

        {loading ? (
          <AnimationLoader />
        ) : (
          <Stack>
            {projectsList.length ? (
              <Flex
                flexWrap="wrap"
                justifyContent="center"
                direction={["column", "row"]}
              >
                {projectsList.map((p) => (
                  <Card key={p.name} project={p} variant={variant} />
                ))}
              </Flex>
            ) : (
              <HStack justify="center" w="full">
                <Heading size="h6">No project found.</Heading>
              </HStack>
            )}
            {projectsList.length > 4 ? (
              <Stack
                w="full"
                mx="auto"
                pt="60px"
                alignItems="center"
                justifyContent="center"
                direction={{ base: "column", xl: "row" }}
              >
                <Button variant="outline">show more</Button>
              </Stack>
            ) : null}
          </Stack>
        )}
      </Box>
    </>
  );
};
