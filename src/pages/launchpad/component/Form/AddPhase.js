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
  Stack,
  Text,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import ImageUpload from "@components/ImageUpload/Collection";
import { useState } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";

function AddPhase({ name, isOpen, onClose, mode }) {
  const [{ value }, , helpers] = useField(name);
  const [phaseTime, setPhaseTime] = useState([new Date(), new Date()]);

  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");
  const handlePhaseTime = (e, index) => {
    const valueAddHash = value.map((item, idx) => {
      const startTime = idx !== index ? item.start : e[0].getTime();
      const endTime = idx !== index ? item.end : e[1].getTime();

      return { ...item, start: startTime, end: endTime };
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
            Start time
          </Text>
        </Box>
        <Box mb={4} flexGrow={2} textAlign="left" pl={3} minW={16} w={20}>
          <Text fontSize={"lg"} color="#fff">
            End time
          </Text>
        </Box>
      </Flex>

      <FieldArray
        name="phases"
        render={(arrayHelpers) => {
          return (
            <div>
              {value?.map((phases, index) => (
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
                      name={`phases[${index}].name`}
                      type="text"
                      placeholder="Your name here"
                    />
                    <Stack w={{ base: "315px", xl: "775px" }} pb="30px">
                      <DateTimeRangePicker
                        onChange={(e) => handlePhaseTime(e, index)}
                        value={[
                          value[index].start
                            ? new Date(value[index].start)
                            : new Date(),
                          value[index].end
                            ? new Date(value[index].end)
                            : new Date(),
                        ]}
                        locale="en-EN"
                        name={`phase-time-${index}`}
                      />
                    </Stack>
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
                    arrayHelpers.push({ name: "", start: "", end: "" });
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

export default AddPhase;
