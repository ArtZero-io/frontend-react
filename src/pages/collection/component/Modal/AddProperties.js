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
import AddPropertiesInput from "@components/Input/Input";

function AddPropertiesModal({ name, isOpen, onClose, mode }) {
  const [{ value }] = useField(name);

  const hasEmptyProp = value.some((p) => p.type?.trim() === "");

  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"2xl"}
      minH="40rem"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        px={6}
        minH={{ xl: "md" }}
        borderRadius="0"
        textAlign="center"
        bg="brand.grayDark"
      >
        <ModalHeader>
          <Heading size="h4" my={2}>
            {mode === "add" ? "Add properties" : "Edit properties"}
          </Heading>
          <Text fontSize={"sm"}>
            {/* Textural trails that show up as restangles */}
          </Text>
        </ModalHeader>

        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
        />
        <Flex>
          <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
            <Text fontSize={"lg"} color="#fff">
              Type
            </Text>
          </Box>
          <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
            <Text fontSize={"lg"} color="#fff">
              Name
            </Text>
          </Box>
          <Box w={14} />
        </Flex>

        <FieldArray
          name="properties"
          render={(arrayHelpers) => {
            return (
              <div>
                {value?.map((properties, index) => (
                  <div key={index}>
                    <Flex alignItems="start" mb={4}>
                      <AddPropertiesInput
                        mx={5}
                        height={16}
                        autoComplete="off"
                        name={`properties[${index}].type`}
                        type="text"
                        placeholder="Your type here"
                      />
                      <AddPropertiesInput
                        mx={5}
                        height={16}
                        autoComplete="off"
                        name={`properties.${index}.name`}
                        type="text"
                        placeholder="Your name here"
                      />

                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon fontSize="1.5rem" />}
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
                  Temp add mode === "add" for edit mode
                  consider to make a separate form for edit NFT
                   */}
                  <Button
                    variant="outline"
                    type="button"
                    isDisabled={
                      mode === "add" &&
                      (hasEmptyProp ||
                        !arrayHelpers?.form?.dirty ||
                        arrayHelpers.form?.errors?.properties)
                    }
                    onClick={() => arrayHelpers.push({ type: "", name: "" })}
                  >
                    Add more
                  </Button>
                </Flex>
                <Button
                  disabled={
                    !(arrayHelpers?.form?.dirty && arrayHelpers?.form?.isValid)
                  }
                  mb={6}
                  w="full"
                  variant="solid"
                  type="button"
                  onClick={() => {
                    if (
                      !arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.properties
                    ) {
                      return toast.error(arrayHelpers.form?.errors?.properties);
                    }
                    onClose();
                  }}
                >
                  Save now
                </Button>
              </div>
            );
          }}
        />
      </ModalContent>
    </Modal>
  );
}

export default AddPropertiesModal;
