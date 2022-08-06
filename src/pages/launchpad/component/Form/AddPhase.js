/* eslint-disable no-unused-vars */
import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";
import toast from "react-hot-toast";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import AdvancedModeSwitch from "@components/Switch/Switch";
import NumberInput from "@components/Input/NumberInput";
import { useState } from "react";
import { isPhaseTimeOverlap } from "@utils";
import { useSubstrateState } from "@utils/substrate";

function AddPhase({ name, mode, isDisabled, collection_address = '' }) {
  const [{ value }, , helpers] = useField(name);
  const [isPublic, setIsPublic] = useState(false);
  const { currentAccount, api } = useSubstrateState();
  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const handlePhaseTime = (e, index) => {
    if (e) {
      if (value.length >= 1) {
        const end = e[1].getTime();
        const start = e[0].getTime();

        const newValue = [...value];
        console.log("newValue", newValue);
        newValue.push({ start, end });
        console.log("newValue11", newValue);

        const isOverlap = isPhaseTimeOverlap(newValue);

        if (isOverlap) {
          return toast.error("Phase time is not valid or overlap.");
        }
      }

      const valueAddHash = value.map((item, idx) => {
        if (!e) {
          return { ...item, start: null, end: null };
        }

        const startTime = idx !== index ? item?.start : e[0].getTime();
        const endTime = idx !== index ? item?.end : e[1].getTime();

        return { ...item, start: startTime, end: endTime };
      });

      helpers.setValue(valueAddHash);
    }
  };

  const handleAddPhase = (arrayHelpers) => {
    const allPhases = [...value];
    allPhases.sort((a, b) => a.start - b.start);

    const lastPhase = allPhases[allPhases?.length - 1];
    const firstPhase = allPhases[0];

    const prjEndTime = arrayHelpers?.form?.values?.endTime;
    const prjStartTime = arrayHelpers?.form?.values?.startTime;

    if (prjEndTime < lastPhase?.end || prjStartTime > firstPhase?.start) {
      const newValue = value.map((i, idx) => {
        return idx === value.length - 1 ? { ...i, start: null, end: null } : i;
      });

      helpers.setValue(newValue);

      return toast.error("Phase time can not overlaps project time.");
    }

    arrayHelpers.push({
      name: "",
      start: "",
      end: "",
      isPublic: false,
      publicMintingFee: "",
      publicAmount: "",
    });
  };

  const onUpdatePhase = async (index) => {
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);

    // launchpad_psp34_nft_standard_calls.updateSchedulePhase(
    //   caller_account, 
    //   phaseCode, 
    //   isPublic, 
    //   publicMintingFee, 
    //   publicMintingAmout, 
    //   startTime, 
    //   endTime
    // );
    console.log(index);
    console.log(collection_address);
    const newValue = value.map((i, idx) => {
      return idx === value.length - 1 ? { ...i, start: null, end: null } : i;
    });
    console.log(newValue);
    
  }

  const onAddNewPhase = async (index) => {
    console.log(index);
    const newValue = value.map((i, idx) => {
      return idx === value.length - 1 ? { ...i, start: null, end: null } : i;
    });
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);

    // launchpad_psp34_nft_standard_calls.addNewPhase(caller_account, phaseCode, isPublic, publicMintingFee, publicMintingAmout, startTime, endTime)
  }

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
                      isDisabled={isDisabled}
                    />{" "}
                  </Stack>

                  <Stack w="full">
                    <Stack pb="30px">
                      <Text fontSize="lg" ml={1} mb="10px">
                        Start time - End time
                      </Text>
                      <DateTimeRangePicker
                        disabled={isDisabled}
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
                      label="Set public"
                      isDisabled={isDisabled}
                      isChecked={value[index].isPublic}
                      name={`phases[${index}].isPublic`}
                      onChange={() => {
                        value[index].isPublic = !value[index].isPublic;
                        setIsPublic(!isPublic);
                      }}
                    />
                  </Stack>
                  <NumberInput
                    type="number"
                    // isRequired={true}
                    hasStepper={false}
                    isDisabled={isDisabled}
                    label="Public Minting Fee"
                    isDisplay={value[index].isPublic}
                    name={`phases[${index}].publicMintingFee`}
                  />{" "}
                  <NumberInput
                    type="number"
                    height="52px"
                    precision={0}
                    hasStepper={false}
                    label="Public amount"
                    inputWidth={"260px"}
                    isDisabled={isDisabled}
                    isDisplay={value[index].isPublic}
                    name={`phases[${index}].publicAmount`}
                  />
                </Stack>

                <HStack justifyContent="end" w="full">
                  {(mode != 'EDIT') ? (<Heading
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
                  </Heading>) : ''}
                  
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
                    onClick={() => onUpdatePhase(index)}
                    isDisabled={index === 0 && value.length === 1}
                  >
                    Update
                  </Heading>
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
                    onClick={() => onAddNewPhase(index)}
                    isDisabled={index === 0 && value.length === 1}
                  >
                    Add
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
                  isDisabled ||
                  (mode === formMode.ADD &&
                    // (hasEmptyLevel ||
                    (!arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.levels))
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
