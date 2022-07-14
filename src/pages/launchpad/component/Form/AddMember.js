/* eslint-disable no-unused-vars */
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import ImageUpload from "@components/ImageUpload/Collection";
import { useState } from "react";

function AddMember({ name, isOpen, onClose, mode }) {
  const [{ value }, , helpers] = useField(name);
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");

  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");
  const handleAvatarUrl = (hash, index) => {
    const valueAddHash = value.map((item, idx) => {
      const avatarHash = idx !== index ? item.avatar : hash;
      return { ...item, avatar: avatarHash };
    });

    helpers.setValue(valueAddHash);
  };
  return (
    <>
      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text fontSize={"lg"} color="#fff">
            Name
          </Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3} w={16}>
          <Text fontSize={"lg"} color="#fff">
            Title
          </Text>
        </Box>
        <Box mb={4} flexGrow={2} textAlign="left" pl={3} minW={16} w={20}>
          <Text fontSize={"lg"} color="#fff">
            Avatar
          </Text>
        </Box>
      </Flex>

      <FieldArray
        name="members"
        render={(arrayHelpers) => {
          return (
            <div>
              {value?.map((members, index) => (
                <div key={index}>
                  <Flex alignItems="flex-start" mb={4}>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon fontSize="24px" />}
                      size="icon"
                      variant="iconOutline"
                      isDisabled={index === 0 && value.length === 1}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                    <Input
                      isRequired={true}
                      flexGrow={10}
                      mx={5}
                      width="15%"
                      height={16}
                      autoComplete="off"
                      name={`members[${index}].name`}
                      type="text"
                      placeholder="Your name here"
                    />
                    <Input
                      isRequired={true}
                      textAlign="center"
                      flexGrow={0}
                      mx={5}
                      height={16}
                      width={"20%"}
                      autoComplete="off"
                      name={`members.${index}.title`}
                      type="text"
                      placeholder="Your title here"
                    />

                    <ImageUpload
                      minH="20px"
                      // isDisabled={addCollectionTnxStatus}
                      id={`memberAvatar${index}`}
                      index={index}
                      mode={mode}
                      isBanner={false}
                      imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={handleAvatarUrl}
                    />
                  </Flex>
                </div>
              ))}
              <Flex pb={6}>
                <Button
                  variant="outline"
                  type="button"
                  isDisabled={
                    mode === formMode.ADD &&
                    // (hasEmptyLevel ||
                    (!arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.levels)
                  }
                  onClick={() => {
                    arrayHelpers.push({ name: "", title: "", avatar: "" });
                  }}
                >
                  Add more
                </Button>
              </Flex>
            </div>
          );
        }}
      />
    </>
  );
}

export default AddMember;
