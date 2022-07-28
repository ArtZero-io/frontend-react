import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";
import toast from "react-hot-toast";

function AddPhase({ name, mode }) {
  const [{ value }, , helpers] = useField(name);
  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const handlePhaseTime = (e, index) => {
    const valueAddHash = value.map((item, idx) => {
      if (!e) {

        return { ...item, start: null, end: null };
      }

      const startTime = idx !== index ? item?.start : e[0].getTime();
      const endTime = idx !== index ? item?.end : e[1].getTime();

      return { ...item, start: startTime, end: endTime };
    });

    helpers.setValue(valueAddHash);
  };

  const handleAddPhase = (arrayHelpers) => {
    if (value?.length >= 1) {
      const prjStartTime = arrayHelpers?.form?.values?.startTime;

      const prjEndTime = arrayHelpers?.form?.values?.endTime;

      const phaseStart = value[value?.length - 1]?.start;
      const phaseEnd = value[value?.length - 1]?.end;

      if (phaseStart < Date.now()) {
        toast.error("Start time must be greater than current time!");
        return;
      }

      if (
        prjStartTime <= phaseStart &&
        phaseStart <= phaseEnd &&
        phaseEnd <= prjEndTime
      ) {
        arrayHelpers.push({ name: "", start: "", end: "" });
      } else {
        toast.error("Phase time is not valid.");
      }
    }
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
                      size="icon"
                      aria-label="delete"
                      variant="iconOutline"
                      icon={<DeleteIcon fontSize="24px" />}
                      isDisabled={index === 0 && value.length === 1}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                    <Input
                      mx={5}
                      type="text"
                      width="25%"
                      height={16}
                      flexGrow={10}
                      isRequired={true}
                      autoComplete="off"
                      name={`phases[${index}].name`}
                      placeholder="Phase name here"
                    />
                    <Stack w={{ base: "315px", xl: "775px" }} pb="30px">
                      <DateTimeRangePicker
                        onChange={(e) => handlePhaseTime(e, index)}
                        value={
                          !value[index].start
                            ? null
                            : [
                                new Date(value[index].start),
                                new Date(value[index].end),
                              ]
                        }
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
                  onClick={() => handleAddPhase(arrayHelpers)}
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
