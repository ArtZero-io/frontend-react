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
import ImageUpload from "@components/ImageUpload/Collection";
import AdvancedModeInput from "@components/Input/Input";
import { useEffect, useState } from "react";
import React from "react";
import { Card } from "./Card";
import { isValidAddressPolkadotAddress } from "@utils";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { useSubstrateState } from "@utils/substrate";

export const GroupCard = ({ variant = "live" }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
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
            <Formik
              validationSchema={Yup.object().shape({
                projectName: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
                .required("Required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                if (!avatarIPFSUrl) {
                  return toast.error("Upload avatar");
                }

                // if (avatarIPFSUrl && headerIPFSUrl && headerSquareIPFSUrl) {
                values.avatarIPFSUrl = avatarIPFSUrl;


                if (!isValidAddressPolkadotAddress(values.nftContractAddress)) {
                  toast.error(`The NFT contract address must be an address!`);
                } else {
                  const data = {

                  };

                  dispatch({
                    type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
                    payload: {
                      status: "Start",
                    },
                  });

                  await launchpad_contract_calls.addNewProject(
                    currentAccount,
                    data,
                    dispatch
                  );
                 
                }
                // }
              }}
            >
              {({ values, dirty, isValid }) => (
                <Form>
                  <AdvancedModeInput
                    isRequired={true}
                    label="Project Name"
                    name="projectName"
                    type="projectName"
                    placeholder="Project Name"
                  />
                  <ImageUpload
                      isDisabled={addCollectionTnxStatus}
                      id="project-avatar"
                      imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={setAvatarIPFSUrl}
                      title="Project Avatar Image"
                      limitedSize={{ width: "100", height: "100" }}
                    />
                </Form>
              )}
            </Formik>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};
