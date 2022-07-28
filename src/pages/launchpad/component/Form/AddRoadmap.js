/* eslint-disable no-unused-vars */
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import CommonTextArea from "@components/TextArea/TextArea";

function AddRoadmap({ name, isOpen, onClose, mode }) {
  const [{ value }] = useField(name);

  // const hasEmptyProp = value.some((p) => p.type?.trim() === "");

  return (
    <>
      <FieldArray
        name="roadmap"
        render={(arrayHelpers) => {
          const roadmapErrors = arrayHelpers?.form?.errors?.roadmap;

          return (
            <div>
              {value?.map((roadmap, index) => (
                <div key={index}>
                  <Stack
                    height={index === 0 ? "112px" : "78px"}
                    mb={4}
                    alignItems="flex-start"
                    direction={{ base: "column", md: "row" }}
                  >
                    <HStack
                      align="center"
                      alignItems="flex-end"
                      w={{ base: "100%", md: "30%" }}
                    >
                      <IconButton
                        size="icon"
                        aria-label="delete"
                        variant="iconOutline"
                        icon={<DeleteIcon fontSize="24px" />}
                        onClick={() => arrayHelpers.remove(index)}
                        isDisabled={index === 0 && value.length === 1}
                      />
                      <Input
                        width="100%"
                        mx={5}
                        type="text"
                        isRequired={true}
                        autoComplete="off"
                        name={`roadmap[${index}].type`}
                        placeholder="Your milestone here"
                        label={index === 0 && "Milestone"}
                        height={index === 0 ? "84px" : "50px"}
                      />
                    </HStack>

                    <CommonTextArea
                      rows={2}
                      height={index === 0 ? "86px" : "50px"}
                      label={index === 0 && "Content"}
                      w="full"
                      type="text"
                      isRequired={true}
                      placeholder="Your content here"
                      name={`roadmap[${index}].content`}
                    />
                  </Stack>
                </div>
              ))}

              <Stack pb={"12px"}>
                {typeof roadmapErrors === "string" ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    {roadmapErrors}
                  </Text>
                ) : null}
              </Stack>

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
                  add more
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
