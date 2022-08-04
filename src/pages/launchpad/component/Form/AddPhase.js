/* eslint-disable no-unused-vars */
import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";
import toast from "react-hot-toast";

import AdvancedModeSwitch from "@components/Switch/Switch";
import NumberInput from "@components/Input/NumberInput";
import { useState } from "react";

function AddPhase({ name, mode }) {
  const [{ value }, , helpers] = useField(name);
  const [isPublic, setIsPublic] = useState(false);

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
    if (value?.length === 1) {
      const prjStartTime = arrayHelpers?.form?.values?.startTime;

      const prjEndTime = arrayHelpers?.form?.values?.endTime;

      const phaseStart = value[value?.length - 1]?.start;
      const phaseEnd = value[value?.length - 1]?.end;

      // TEMP COMMENT DUE TO USE FOR UPDATE PHASES SEPARATELY

      // if (phaseStart < Date.now()) {
      //   toast.error("Start time of phase must be greater than current time!");
      //   return;
      // }

      // if (
      //   prjStartTime <= phaseStart &&
      //   phaseStart <= phaseEnd &&
      //   phaseEnd <= prjEndTime
      // ) {
      arrayHelpers.push({
        name: "",
        start: "",
        end: "",
        isPublic: false,
        publicMintingFee: "",
        publicAmount: "",
      });
      // } else {
      //   toast.error("Phase time is not valid.");
      // }
    }

    if (value?.length > 1) {
      const allPhases = [...value];
      const lastPhase = allPhases.pop();
      const phaseBefore = allPhases.pop();

      if (
        phaseBefore?.start <= phaseBefore?.end &&
        phaseBefore?.end <= lastPhase?.start &&
        lastPhase?.start <= lastPhase?.end
      ) {
        arrayHelpers.push({ name: "", start: "", end: "" });
      } else {
        toast.error("Phase time is not valid or overlap.");
      }
    }
  };

  return (
    <FieldArray
      name="phases"
      render={(arrayHelpers) => {
        const phasesErrors = arrayHelpers?.form?.errors?.members;

        return (
          <Stack>
            {value?.map((_, index) => (
              <Stack
                key={index}
                p={["10px", "30px"]}
                gap={["0px", "0px"]}
                border="2px solid #333"
              >
                <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                  <Stack w={["100%", "50%"]}>
                    <Input
                      type="text"
                      name={`phases[${index}].name`}
                      isRequired={true}
                      label="Phase name"
                      placeholder="Phase name here"
                      // isDisabled={addCollectionTnxStatus}
                    />{" "}
                  </Stack>

                  <Stack w="full">
                    <Stack pb="30px">
                      <Text fontSize="lg" ml={1} mb="10px">
                        Start time - End time
                      </Text>
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
                      {/* TEMP FIX with parseInt */}
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  minH="80px"
                  alignItems={["start", "end"]}
                  gap={["10px", "30px"]}
                  direction={["column", "row"]}
                >
                  <Stack
                    minW={52}
                    alignItems="end"
                    direction={{ base: "column", "2xl": "row" }}
                  >
                    <AdvancedModeSwitch
                      name={`phases[${index}].isPublic`}
                      label="Set public"
                      // isDisabled={addCollectionTnxStatus}
                      onChange={() => {
                        value[index].isPublic = !value[index].isPublic;
                        setIsPublic(!isPublic);
                      }}
                    />
                  </Stack>
                  <NumberInput
                    isDisplay={value[index].isPublic}
                    type="number"
                    name={`phases[${index}].publicMintingFee`}
                    // isRequired={true}
                    label="Public Minting Fee"
                    // isDisabled={addCollectionTnxStatus}
                  />{" "}
                  <NumberInput
                    // isDisabled={!isPublic || addCollectionTnxStatus}
                    isDisplay={value[index].isPublic}
                    label="Public amount"
                    name={`phases[${index}].publicAmount`}
                    type="number"
                    height="52px"
                    precision={0}
                    hasStepper={false}
                    inputWidth={"260px"}
                  />
                </Stack>

                <HStack justifyContent="end" w="full">
                  <Heading
                    _hover={{
                      color: !(index === 0 && value.length === 1) && "#7ae7ff",
                    }}
                    fontSize="sm"
                    color="#555"
                    fontStyle="unset"
                    cursor="pointer"
                    fontFamily="Evogria"
                    textDecoration="underline"
                    onClick={() => {
                      if (index === 0 && value.length === 1) return;
                      arrayHelpers.remove(index);
                    }}
                    isDisabled={index === 0 && value.length === 1}
                  >
                    delete
                  </Heading>
                </HStack>
              </Stack>
            ))}

            <Stack w="full" py="30px">
              <Stack>
                {typeof phasesErrors === "string" ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    {phasesErrors}
                  </Text>
                ) : null}
              </Stack>

              <Button
                w="140px"
                variant="solid"
                type="button"
                isDisabled={
                  mode === formMode.ADD &&
                  // (hasEmptyLevel ||
                  (!arrayHelpers?.form?.dirty ||
                    arrayHelpers.form?.errors?.levels)
                }
                onClick={() => handleAddPhase(arrayHelpers)}
              >
                add more
              </Button>
            </Stack>
          </Stack>
        );
      }}
    />
  );
}

export default AddPhase;
