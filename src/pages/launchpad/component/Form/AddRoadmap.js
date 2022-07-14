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

function AddRoadmap({ name, isOpen, onClose, mode }) {
  const [{ value }] = useField(name);

  // const hasEmptyProp = value.some((p) => p.type?.trim() === "");

  return (
    <>
      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text fontSize={"lg"} color="#fff">
            Type
          </Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text fontSize={"lg"} color="#fff">
            Content
          </Text>
        </Box>
        <Box w={14} />
      </Flex>

      <FieldArray
        name="roadmap"
        render={(arrayHelpers) => {
          return (
            <div>
              {value?.map((roadmap, index) => (
                <div key={index}>
                  <Flex alignItems="start" mb={4}>
                    <Input
                      width="20%"
                      mx={5}
                      height={16}
                      autoComplete="off"
                      name={`roadmap[${index}].type`}
                      type="text"
                      placeholder="Your type here"
                    />
                    <Input
                      mx={5}
                      height={16}
                      autoComplete="off"
                      name={`roadmap.${index}.content`}
                      type="text"
                      placeholder="Your content here"
                    />

                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon fontSize="24px" />}
                      size="icon"
                      variant="iconOutline"
                      isDisabled={index === 0 && value.length === 1}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                  </Flex>
                </div>
              ))}
              <Flex pb={6}>
                {/* TODO:
                  Temp add mode === formMode.ADD for edit mode
                  consider to make a separate form for edit NFT
                   */}
                <Button
                  variant="outline"
                  type="button"
                  isDisabled={
                    mode === formMode.ADD &&
                    // (hasEmptyProp ||
                    (!arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.roadmap)
                  }
                  onClick={() => arrayHelpers.push({ type: "", content: "" })}
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

export default AddRoadmap;
