import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Square,
  Stack,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { ErrorMessage, FieldArray, useField } from "formik";
import AddLevelsInput from "@components/Input/Input";
import { formMode, SCROLLBAR } from "@constants";
import DeleteIcon from "@theme/assets/icon/Delete";
import NumberInput from "@components/Input/NumberInput";

function AddLevelsModal({ name, isOpen, onClose, mode }) {
  const [{ value }] = useField(name);

  const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const modalSize = useBreakpointValue(["xs", "5xl"]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={modalSize}
      minH="40rem"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        maxWidth={["340px", "940px"]}
        position="relative"
        px={["0px", "26px"]}
        pt={["6px", "32px"]}
        pb={["16px", "42px"]}
        minH={{ xl: "md" }}
        borderRadius="0"
        textAlign="center"
        bg="brand.grayDark"
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
        />

        <ModalHeader>
          <Heading fontSize={["2xl", "3xl-mid"]} my={2}>
            {mode === formMode.ADD ? "Add levels" : "Edit levels"}
          </Heading>
          <Text fontSize={"sm"}>
            {/* Textural trails that show up as restangles */}
          </Text>
        </ModalHeader>

        <ModalBody overflowY="auto" sx={SCROLLBAR}>
          {isBigScreen && (
            <Flex>
              <Box maxW="500px" minW="500px" mb={4} textAlign="left" ml={1}>
                <Text fontSize={["md", "lg", "lg"]} color="#fff">
                  Name
                </Text>
              </Box>
              <Box mb={4} textAlign="left" ml={2}>
                <Text fontSize={["md", "lg", "lg"]} color="#fff">
                  Level
                </Text>
              </Box>
            </Flex>
          )}

          <FieldArray
            name="levels"
            render={(arrayHelpers) => {
              return (
                <div>
                  {value?.map((levels, index) => {
                    return (
                      <Stack
                        key={index}
                        mb={4}
                        spacing="0px"
                        alignItems="flex-start"
                        direction={["column", "row"]}
                      >
                        <HStack width="full">
                          <AddLevelsInput
                            // isRequired={true}
                            width="full"
                            height={["90px", "64px"]}
                            mx="0"
                            // autoComplete="off"
                            name={`levels[${index}].name`}
                            type="text"
                            placeholder="Speed"
                            label={isBigScreen ? "" : "Name"}
                          />
                        </HStack>

                        <HStack
                          spacing="0px"
                          alignItems="end"
                          pl={["0px", "10px"]}
                          height={["90px", "50px"]}
                        >
                          <NumberInput
                            h={"50px"}
                            min={0}
                            step={1}
                            type="number"
                            precision={0}
                            max={levels.levelMax}
                            inputWidth={["full", "110px"]}
                            name={`levels.${index}.level`}
                            label={isBigScreen ? "" : "Level"}
                          />

                          <Square
                            mx={0}
                            h="50px"
                            w="50px"
                            color="#888"
                            bg="#171717"
                            alignItems="center"
                          >
                            <Text fontSize={["md", "lg"]}>Of</Text>
                          </Square>

                          <NumberInput
                            mr="10px"
                            fontSize="lg"
                            h={"50px"}
                            step={1}
                            max={10}
                            type="number"
                            precision={0}
                            min={levels.level}
                            inputWidth={["full", "110px"]}
                            name={`levels.${index}.levelMax`}
                          />

                          <Box pl="10px">
                            <IconButton
                              size="icon"
                              bg="transparent"
                              aria-label="Delete"
                              icon={<DeleteIcon />}
                              variant="iconOutline"
                              isDisabled={index === 0 && value.length === 1}
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </Box>
                        </HStack>
                      </Stack>
                    );
                  })}

                  <Flex pb="40px">
                    <Button
                      type="button"
                      variant="outline"
                      fontSize={["sm", "15px"]}
                      px={["12px", "32px"]}
                      isDisabled={
                        mode === formMode.ADD &&
                        (hasEmptyLevel ||
                          !arrayHelpers?.form?.dirty ||
                          arrayHelpers.form?.errors?.levels)
                      }
                      onClick={() =>
                        arrayHelpers.push({ name: "", level: 3, levelMax: 5 })
                      }
                    >
                      Add Level
                    </Button>
                  </Flex>

                  {typeof arrayHelpers.form?.errors?.levels === "string" && (
                    <HStack color="#ff8c8c" py="10px">
                      <ErrorMessage name="levels" />
                    </HStack>
                  )}

                  <Button
                    w="full"
                    variant="solid"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Save now
                  </Button>
                </div>
              );
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddLevelsModal;
