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
import AddLevelsInput from "@components/Input/Input";
import { formMode } from "@constants";

function AddLevelsModal({ name, isOpen, onClose, mode }) {
  const [{ value }] = useField(name);

  const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

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
            {mode === formMode.ADD ? "Add levels" : "Edit levels    "}
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
          <Box mb={4} flexGrow={10} textAlign="left" pl={3}>
            <Text fontSize={"lg"} color="#fff">
              Name
            </Text>
          </Box>
          <Box mb={4} flexGrow={1} textAlign="left" pl={3} w={16}>
            <Text fontSize={"lg"} color="#fff">
              Level
            </Text>
          </Box>
          <Box mb={4} flexGrow={2} textAlign="left" pl={3} minW={16} w={20}>
            <Text fontSize={"lg"} color="#fff">
              Level Max
            </Text>
          </Box>
        </Flex>

        <FieldArray
          name="levels"
          render={(arrayHelpers) => {
            return (
              <div>
                {value?.map((levels, index) => (
                  <div key={index}>
                    <Flex alignItems="start" mb={4}>
                      <AddLevelsInput
                        isRequired={true}
                        flexGrow={10}
                        mx={5}
                        width="full"
                        height={16}
                        autoComplete="off"
                        name={`levels[${index}].name`}
                        type="text"
                        placeholder="Your level here"
                      />
                      <AddLevelsInput
                        isRequired={true}
                        textAlign="center"
                        flexGrow={0}
                        mx={5}
                        height={16}
                        width={28}
                        autoComplete="off"
                        name={`levels.${index}.level`}
                        type="number"
                        placeholder="1"
                      />
                      <Flex h={"12"} py={"auto"} alignItems="center">
                        <Text fontSize={"xl"} mx={1}>
                          Of
                        </Text>
                      </Flex>
                      <AddLevelsInput
                        isRequired={true}
                        textAlign="center"
                        flexGrow={1}
                        mx={5}
                        height={16}
                        width={36}
                        autoComplete="off"
                        name={`levels.${index}.levelMax`}
                        type="number"
                        placeholder="5"
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
                      (hasEmptyLevel ||
                        !arrayHelpers?.form?.dirty ||
                        arrayHelpers.form?.errors?.levels)
                    }
                    onClick={() =>
                      arrayHelpers.push({ name: "", level: "", levelMax: "" })
                    }
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
                      arrayHelpers.form?.errors?.levels
                    ) {
                      return toast.error(arrayHelpers.form?.errors?.levels);
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

export default AddLevelsModal;
