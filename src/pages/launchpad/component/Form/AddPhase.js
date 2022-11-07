/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FieldArray, useField } from "formik";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";

import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";

import { isPhaseTimeOverlap } from "@utils";
import { useSubstrateState } from "@utils/substrate";
import { formMode, UPDATE_PHASE, ADD_PHASE, START } from "@constants";

import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";

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
  const { currentAccount, api } = useSubstrateState();
  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");
  const dispatch = useDispatch();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const handlePhaseTime = (e, index) => {
    if (e) {
      // if (value.length >= 1) {
      //   const end = e[1].getTime();
      //   const start = e[0].getTime();

      //   const newValue = [...value];
      //   console.log("newValue", newValue);
      //   newValue.push({ start, end });
      //   console.log("newValue11", newValue);

      //   const isOverlap = isPhaseTimeOverlap(newValue);

      //   if (isOverlap) {
      //     return toast.error("Phase time is not valid or overlap.");
      //   }
      // }
      const valueAddHash = value.map((item, idx) => {
        if (!e) {
          return { ...item, start: null, end: null };
        }

        const startTime = idx !== index ? item?.start : e[0].getTime();
        const endTime = idx !== index ? item?.end : e[1].getTime();

        return { ...item, start: startTime, end: endTime, new: true };
      });

      helpers.setValue(valueAddHash);
    }
  };

  const handleAddPhase = (arrayHelpers) => {
    if (!value[value.length - 1].start || !value[value.length - 1].end) {
      toast.error("Please check Start - End time phase.");
      return;
    }

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
      publicMaxMintingAmount: "",
      new: true,
    });
  };

  const onUpdatePhase = async (index) => {
    console.log("onUpdatePhase startTime", startTime);
    console.log("onUpdatePhase endTime", endTime);
    console.log("onUpdatePhase value", value);
    const isOverlap = isPhaseTimeOverlap(value);

    if (isOverlap) {
      return toast.error("Sub phase time is not valid or overlap.");
    }
    //TODOs: check with proj phase time

    // const phasesArray = [...value];
    // if (phasesArray?.length) {
    //   const startFirstPhase = phasesArray[0]?.start;
    //   const endLastPhase = [...phasesArray].pop().end;
    //   const prjStartTime = parseInt(startTime.replaceAll(",", ""));
    //   const prjEndTime = parseInt(endTime.replaceAll(",", ""));

    //   if (
    //     !(
    //       prjStartTime <= startFirstPhase &&
    //       startFirstPhase <= endLastPhase &&
    //       endLastPhase <= prjEndTime
    //     )
    //   ) {
    //     toast.error(
    //       "Sub phase time is not valid or overlap project phase time."
    //     );
    //     return;
    //   }
    // }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    const {
      name,
      id,
      isPublic,
      publicMintingFee,
      publicAmount,
      publicMaxMintingAmount,
      start,
      end,
    } = value[index];

    console.log("value[index]", value[index]);

    dispatch(
      setTxStatus({ type: UPDATE_PHASE, step: START, tokenIDArray: [index] })
    );

    await launchpad_psp34_nft_standard_calls.updateSchedulePhase(
      currentAccount,
      id,
      name,
      isPublic,
      publicMintingFee,
      publicAmount,
      publicMaxMintingAmount,
      start,
      end,
      dispatch,
      UPDATE_PHASE,
      api
    );
  };

  const onAddNewPhase = async (index) => {
    const isOverlap = isPhaseTimeOverlap(value);

    if (isOverlap) {
      return toast.error("Sub phase time is not valid or overlap.");
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    const {
      name,
      isPublic,
      publicMintingFee,
      publicAmount,
      publicMaxMintingAmount,
      start,
      end,
    } = value[index];

    console.log("value[index]", value[index]);

    dispatch(
      setTxStatus({ type: ADD_PHASE, step: START, tokenIDArray: [index] })
    );

    await launchpad_psp34_nft_standard_calls.addNewPhase(
      currentAccount,
      name,
      isPublic,
      publicMintingFee,
      publicAmount,
      publicMaxMintingAmount,
      start,
      end,
      dispatch,
      ADD_PHASE,
      api
    );
  };

  const handleOnChangeSwitch = (index) => {
    console.log("value[index].isPublic", value[index].isPublic);

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
                  <Stack w={["100%", "50%"]}>
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

                  <Stack w="full">
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
                  minH="86px"
                  alignItems="start"
                  gap={["10px", "30px"]}
                  direction={["column", "row"]}
                >
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
                    max={50}
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

                <HStack justifyContent="end" w="full">
                  {mode === formMode.ADD ? (
                    <Heading
                      _hover={{
                        color:
                          !(index === 0 && value.length === 1) && "#7ae7ff",
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
                w="140px"
                // w={{ base: "full", lg: "140px" }}
                my="24px"
                {...rest}
                onClick={() => handleAddPhase(arrayHelpers)}
                text={`${mode === formMode.ADD ? "add more" : "add new phase"}`}
                // isDisabled={!(dirty && isValid) && noImagesChange}
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

const canEditPhase = (startTime) => {
  const now = new Date();

  if (startTime > now) return true;

  return false;
};
