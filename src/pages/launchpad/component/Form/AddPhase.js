import { useState } from "react";
import toast from "react-hot-toast";
import { FieldArray, useField } from "formik";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";
import { formMode } from "@constants";

import useTxStatus from "@hooks/useTxStatus";

import Input from "@components/Input/Input";
import NumberInput from "@components/Input/NumberInput";
import AdvancedModeSwitch from "@components/Switch/Switch";
import CommonButton from "@components/Button/CommonButton";

function AddPhase({
  name,
  mode,
  isDisabled,
  collection_address = "",
  startTime,
  endTime,
}) {
  const [{ value }, , helpers] = useField(name);
  const [isPublic, setIsPublic] = useState(false);
  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const handlePhaseTime = (e, index) => {
    if (e) {
      const valueAddHash = value.map((item, idx) => {
        if (!e) {
          return { ...item, start: null, end: null };
        }

        const startTime = idx !== index ? item?.start : e[0]?.getTime();
        const endTime = idx !== index ? item?.end : e[1]?.getTime();

        return { ...item, start: startTime, end: endTime, new: true };
      });

      helpers.setValue(valueAddHash);
    }
  };

  const handleAddPhase = (arrayHelpers) => {
    if (!value[value.length - 1].start || !value[value.length - 1].end) {
      toast.error("Please pick Start - End time phase.");
      return;
    }

    const allPhases = [...value];
    allPhases.sort((a, b) => a.start - b.start);

    // const lastPhase = allPhases[allPhases?.length - 1];
    // const firstPhase = allPhases[0];

    // const prjEndTime = arrayHelpers?.form?.values?.endTime;
    // const prjStartTime = arrayHelpers?.form?.values?.startTime;

    // if (prjEndTime < lastPhase?.end || prjStartTime > firstPhase?.start) {
    //   const newValue = value.map((i, idx) => {
    //     return idx === value.length - 1 ? { ...i, start: null, end: null } : i;
    //   });

    //   helpers.setValue(newValue);

    //   return toast.error("Phase time can not overlaps project time.");
    // }

    arrayHelpers.push({
      name: "",
      start: "",
      end: "",
      isPublic: false,
      publicMintingFee: "",
      publicAmount: "",
      publicMaxMintingAmount: "",
      new: true,
    });
  };

  const handleOnChangeSwitch = (index) => {
    if (value[index].isPublic) {
      value[index].publicAmount = "";
      value[index].publicMaxMintingAmount = "";
      value[index].publicMintingFee = "";
      value[index].isPublic = false;
      setIsPublic(!isPublic);
      return;
    }

    value[index].isPublic = true;
    setIsPublic(!isPublic);
  };

  return (
    <FieldArray
      name="phases"
      render={(arrayHelpers) => {
        const phasesErrors = arrayHelpers?.form?.errors?.members;
        return (
          <Stack>
            {value?.map((phaseItem, index) => (
              <Stack
                key={index}
                p={["10px", "30px"]}
                gap={["0px", "0px"]}
                bg="#222"
              >
                <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                  <Stack w={["100%", "31%"]}>
                    <Input
                      mx="0"
                      type="text"
                      name={`phases[${index}].name`}
                      isRequired={true}
                      label="Phase name"
                      placeholder="Phase name here"
                      isDisabled={actionType}
                    />{" "}
                  </Stack>

                  <Stack w={["100%", "66%"]}>
                    <Stack pb="30px">
                      <Text fontSize="lg" ml={1}>
                        Start time - End time{" "}
                        <Text as="span" fontSize="lg" color="#fc8181">
                          *
                        </Text>
                      </Text>
                      <DateTimeRangePicker
                        disableClock
                        disabled={!!actionType}
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
                  minW="260px"
                  alignItems="end"
                  direction={{ base: "column", "2xl": "row" }}
                >
                  <AdvancedModeSwitch
                    hasTooltipPublicMint={true}
                    label="Allow public mint"
                    isDisabled={actionType}
                    isChecked={value[index].isPublic}
                    name={`phases[${index}].isPublic`}
                    onChange={() => handleOnChangeSwitch(index)}
                  />
                </Stack>

                {value[index].isPublic && (
                  <Stack
                    minH="86px"
                    alignItems="start"
                    gap={["10px", "30px"]}
                    direction={["column", "row"]}
                    pb="4px"
                  >
                    <NumberInput
                      type="number"
                      isRequired={value[index].isPublic}
                      height="50px"
                      min="0"
                      hasStepper={false}
                      isDisabled={actionType}
                      label="Public minting fee"
                      isDisplay={value[index].isPublic}
                      name={`phases[${index}].publicMintingFee`}
                    />{" "}
                    <NumberInput
                      isRequired={value[index].isPublic}
                      type="number"
                      height="50px"
                      precision={0}
                      min={1}
                      hasStepper={false}
                      isDisabled={actionType}
                      label="Total Mint Amount"
                      // inputWidth={"100%"}
                      isDisplay={value[index].isPublic}
                      name={`phases[${index}].publicAmount`}
                    />
                    <NumberInput
                      isRequired={value[index].isPublic}
                      max={100}
                      type="number"
                      height="50px"
                      precision={0}
                      hasStepper={false}
                      isDisabled={actionType}
                      label="Max per mint"
                      min={1}
                      isDisplay={value[index].isPublic}
                      name={`phases[${index}].publicMaxMintingAmount`}
                    />
                  </Stack>
                )}

                <HStack justifyContent="start" w="full">
                  {mode === formMode.ADD ? (
                    <Button
                      onClick={() => {
                        if (index === 0 && value.length === 1) return;
                        arrayHelpers.remove(index);
                      }}
                      isDisabled={index === 0 && value.length === 1}
                    >
                      delete
                    </Button>
                  ) : null}
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
              <CommonButton
                variant="outline"
                w="140px"
                my="24px"
                {...rest}
                onClick={() => handleAddPhase(arrayHelpers)}
                text="add more"
                isDisabled={
                  mode === formMode.ADD ? isDisabled || actionType : false
                }
              />
            </Stack>
          </Stack>
        );
      }}
    />
  );
}

export default AddPhase;

// Logic add phase + update phase:
// - Không update được những phase đã end hoặc đang chạy (Những phase không thẻ update sẽ không hiện button update)
// - Update sẽ cho update từng phase một
// - Add new sẽ add new từng phase một
// Button delete sẽ không hiển thị ở những phase đã có sẵn
// end > Date.now()
//
