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
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { ErrorMessage, FieldArray, useField } from "formik";
import AddPropertiesInput from "@components/Input/Input";
import { formMode, SCROLLBAR } from "@constants";
import DeleteIcon from "@theme/assets/icon/Delete";
import { useRef } from "react";

function AddPropertiesModal({ name, isOpen, onClose, mode }) {
  const [field, , helpers] = useField(name);

  const { value } = field;
  const { setValue } = helpers;

  const valueRef = useRef(value);
  const hasEmptyProp = value?.some((p) => p.type?.trim() === "");

  const modalSize = useBreakpointValue(["xs", "5xl"]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  const onCloseModalHandler = () => {
    setValue(valueRef.current);

    onClose();
  };

  const onSaveModalHandler = () => {
    let filterValue = value.filter(
      (p) => p.type?.trim() !== "" && p.name?.trim() !== ""
    );

    if (filterValue.length === 0) {
      filterValue = [{ type: "", name: "" }];
    }

    valueRef.current = filterValue;
    setValue(filterValue);

    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={modalSize}
      minH="40rem"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        px={["4px", "26px"]}
        pt={["4px", "32px"]}
        pb={["4px", "42px"]}
        minH={{ xl: "md" }}
        borderRadius="0"
        textAlign="center"
        bg="brand.grayDark"
        maxWidth={["340px", "940px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          _hover="none"
            bg="#171717"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
          onClick={onCloseModalHandler}
        />

        <ModalHeader>
          <Heading fontSize={["2xl", "3xl", "3xl"]} my={2}>
            {mode === formMode.ADD ? "Add properties" : "Edit properties"}
          </Heading>
          <Text fontSize={"sm"} fontWeight={400}>
            Properties show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.{" "}
          </Text>
        </ModalHeader>

        <ModalBody overflowY="auto" sx={SCROLLBAR}>
          {isBigScreen && (
            <Flex>
              <Box mb={4} flexGrow={1} textAlign="left">
                <Text ml={1} fontSize={["md", "lg", "lg"]} color="#fff">
                  Type
                </Text>
              </Box>
              <Box mb={4} flexGrow={1} textAlign="left">
                <Text ml={2} fontSize={["md", "lg", "lg"]} color="#fff">
                  Name
                </Text>
              </Box>
              <Box w={14} />
            </Flex>
          )}

          <FieldArray
            name="properties"
            render={(arrayHelpers) => {

              return (
                <div>
                  {value?.map((properties, index) => (
                    <div key={index}>
                      <Flex
                        mb={4}
                        alignItems="start"
                        direction={["column", "row"]}
                      >
                        <AddPropertiesInput
                          mx={0}
                          px={0}
                          type="text"
                          // autoComplete="off"
                          height={["108px", "64px"]}
                          placeholder="Your type here"
                          name={`properties[${index}].type`}
                          label={isBigScreen ? "" : "Type"}
                        />

                        <AddPropertiesInput
                          mx={0}
                          type="text"
                          autoComplete="off"
                          height={["108px", "64px"]}
                          placeholder="Your name here"
                          label={isBigScreen ? "" : "Name"}
                          name={`properties.${index}.name`}
                        />

                        <IconButton
                          mx={1}
                          size="icon"
                          bg="transparent"
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          variant="iconOutline"
                          isDisabled={index === 0 && value.length === 1}
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </Flex>
                    </div>
                  ))}

                  <Flex pb="40px">
                    <Button
                      type="button"
                      variant="outline"
                      fontSize={["sm", "15px"]}
                      px={["12px", "32px", "32px"]}
                      isDisabled={
                        mode === formMode.ADD &&
                        (hasEmptyProp ||
                          !arrayHelpers?.form?.dirty ||
                          arrayHelpers.form?.errors?.properties)
                      }
                      onClick={() => arrayHelpers.push({ type: "", name: "" })}
                    >
                      Add Property
                    </Button>
                  </Flex>

                  {typeof arrayHelpers.form?.errors?.properties ===
                    "string" && (
                    <HStack color="#ff8c8c" py="10px">
                      <ErrorMessage name="properties" />
                    </HStack>
                  )}

                  <Button
                    w="full"
                    variant="solid"
                    type="button"
                    onClick={onSaveModalHandler}
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

export default AddPropertiesModal;
