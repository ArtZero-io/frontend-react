import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { Card } from "./Card";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
// import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { useSubstrateState } from "@utils/substrate";
import { convertDateToTimeStamp } from "@utils";

export const GroupCard = ({ variant = "live" }) => {
  const [projectName, setProjectName] = useState("");
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [roadmaps, setRoadMaps] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const {
    isOpen: isOpenAddNew,
    onOpen: onOpenAddProject,
    onClose: onCloseAddNewProject,
  } = useDisclosure();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  useEffect(() => {
    addCollectionTnxStatus?.status === "End" && onCloseAddNewProject();
  }, [onCloseAddNewProject, addCollectionTnxStatus?.status]);
  
  const submitForm = async () => {
    
      if (!avatarIPFSUrl) {
        return toast.error("Upload avatar");
      }
      const data = {
        "name": projectName,
        "description": projectDescription,
        "total_supply": totalSupply,
        "roadmaps": roadmaps,
        "team_members": teamMembers,
        "start_time": convertDateToTimeStamp(startTime),
        "end_time": convertDateToTimeStamp(endTime),
        "attributes": [
          "avatar"
        ],
        "attribute_vals": [
          avatarIPFSUrl
        ]
      };
      console.log(data);
      dispatch({
        type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
        payload: {
          status: "Start"
        },
      });
    
      await launchpad_contract_calls.addNewProject(
        currentAccount,
        data,
        dispatch
      );
       
      
      // }
    }
  

  return (
    <>
      <Box
        bg="#171717"
        w="full"
        alignItems="center"
        mx="auto"
        mb="30px"
        maxW="1400px"
        px="77px"
        py="60px"
      >
        <Flex
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          mx="auto"
          mb="40px"
          maxW="1400px"
        >
          <Heading size="h3" mb="10px">
            {variant === "live" && "live projects"}
            {variant === "upcoming" && "upcoming projects"}
            {variant === "ended" && "ended projects"}
          </Heading>

          <Spacer />

          {variant === "live" && 
            <Button 
              variant="solid" 
              onClick={() => onOpenAddProject()}>Add project</Button>}
        </Flex>

        <Flex justifyContent="space-between">
          <Card variant={variant} />
          <Card variant={variant} />
          <Card variant={variant} />
          <Card variant={variant} />
        </Flex>

        <Flex
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mt="60px"
        >
          <Button variant="outline">show more</Button>
        </Flex>
      </Box>

      <Modal isCentered isOpen={isOpenAddNew} onClose={onCloseAddNewProject} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          py={10}
          px={20}
          borderRadius="0"
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader textAlign="center">
            <Heading size="h4" my={3}>
              Add new project
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Flex>
                <form>
                  <label>
                  Project Name
                  <input type="text" value={projectName} onChange={(val) => setProjectName(val.target.value)} />
                  </label>
                  <br/>
                  <label>
                    Project description
                    <textarea value={projectDescription} onChange={(val) => setProjectDescription(val.target.value)} />
                  </label>
                  <br/>
                  <label>
                    Project Avatar
                  <input type="text" value={avatarIPFSUrl} onChange={(val) => setAvatarIPFSUrl(val.target.value)} />
                  </label>
                  <br/>
                  <label>
                    Total Supply
                  <input type="" value={totalSupply} onChange={(val) => setTotalSupply(val.target.value)} />
                  </label>
                  <br/>
                    <label>
                    Road maps
                  <input type="text" value={roadmaps} onChange={(val) => setRoadMaps(val.target.value)} />
                  </label>
                  <label>
                  Team Members
                  <input type="text" value={teamMembers} onChange={(val) => setTeamMembers(val.target.value)} />
                  </label>
                  <br/>
                  <label> Start time
                    <input type="date"  onChange={(val) => setStartTime(val.target.value)}/>
                    </label>
                    <br/>
                    <label> End time
                    <input type="date"  onChange={(val) => setEndTime(val.target.value)}/>
                    </label>
                    <br/>
                    <div
                        w="full"
                        type="submit"
                        mt={6}
                        mb={{ xl: "16px", "2xl": "32px" }}
                        onClick={submitForm}
                      >
                        Add new Project
                      </div>
                </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};
