import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FieldArray, useField } from "formik";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";

import { launchpad_psp34_nft_standard } from "@utils/blockchain/abi";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";

import { isPhaseTimeOverlap } from "@utils";
import { useSubstrateState } from "@utils/substrate";
import {
  formMode,
  UPDATE_PHASE,
  ADD_PHASE,
  DELETE_PHASE,
  START,
} from "@constants";

import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";

import Input from "@components/Input/Input";
import NumberInput from "@components/Input/NumberInput";
import AdvancedModeSwitch from "@components/Switch/Switch";
import CommonButton from "@components/Button/CommonButton";
import { isPhaseTimeOverlapOnAddNewPhase } from "@utils";
import { clearTxStatus } from "@store/actions/txStatus";

function UpdatePhase({
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
      if (!canEditPhase(e[0]?.getTime())) {
        toast.error("New phase time can not in the past.");
      }

      const valueAddHash = value.map((item, idx) => {
        if (!e) {
          return { ...item, start: null, end: null };
        }

        const startTime = idx !== index ? item?.start : e[0]?.getTime();
        const endTime = idx !== index ? item?.end : e[1]?.getTime();

        return { ...item, start: startTime, end: endTime };
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

    arrayHelpers.push({
      name: "",
      start: "",
      end: "",
      isPublic: false,
      publicMintingFee: 0,
      publicAmount: 1,
      publicMaxMintingAmount: 1,
      new: true,
    });
  };

  const onUpdatePhase = async (index) => {
    // Check each phase edit is overlap?
    const isOverlap = isPhaseTimeOverlap(value);
    if (isOverlap) {
      return;
    }

    const phasesArray = [...value];

    // check public mint amount max
    if (phasesArray?.length) {
      const { availableTokenAmount, currPublicAmount, publicAmount } =
        phasesArray[index];

      if (availableTokenAmount + currPublicAmount - publicAmount < 0) {
        return toast.error(
          `Public amount can not excess ${
            availableTokenAmount + currPublicAmount
          }`
        );
      }
    }

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

    // check phase is add Whitelist address?
    const numberWLofPhase =
      await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
        currentAccount,
        id
      );

    if (1 * numberWLofPhase !== 0) {
      toast.error(
        `This phase has ${numberWLofPhase} wallet added, cannot edit!`
      );
      return;
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    try {
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
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const onAddNewPhase = async (index) => {
    if (!value[value.length - 1].start || !value[value.length - 1].end) {
      toast.error("Please check Start - End time phase.");
      return;
    }

    const isOverlap = isPhaseTimeOverlapOnAddNewPhase(value);

    if (isOverlap) {
      return;
    }

    const phasesArray = [...value];

    if (phasesArray?.length) {
      const { publicAmount } = phasesArray[index];
      const { availableTokenAmount } = phasesArray[index - 1];

      if (availableTokenAmount - publicAmount < 0) {
        return toast.error(
          `Public amount can not excess ${availableTokenAmount}`
        );
      }
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

    try {
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
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const onDeletePhase = async (index) => {
    const { id } = value[index];
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    try {
      dispatch(
        setTxStatus({ type: DELETE_PHASE, step: START, tokenIDArray: [index] })
      );

      await launchpad_psp34_nft_standard_calls.deactivePhase(
        currentAccount,
        id,
        dispatch,
        DELETE_PHASE,
        api
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
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
                <Stack gap={["10px", "15px"]} direction={["column", "row"]}>
                  <Stack w={["100%", "31%"]}>
                    <Input
                      mx="0"
                      type="text"
                      name={`phases[${index}].name`}
                      isRequired={true}
                      label="Phase name"
                      placeholder="Phase name here"
                      isDisabled={
                        actionType ||
                        // isPhaseEnd(endTime) ||
                        (!canEditPhase(value[index].start) && !value[index].new)
                      }
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
                        disabled={
                          !!actionType ||
                          // isPhaseEnd(endTime) ||
                          (!canEditPhase(value[index].start) &&
                            !value[index].new)
                        }
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
                    label="Set public mint"
                    isDisabled={
                      actionType ||
                      // isPhaseEnd(endTime) ||
                      (!canEditPhase(value[index].start) && !value[index].new)
                    }
                    isChecked={value[index].isPublic}
                    name={`phases[${index}].isPublic`}
                    onChange={() => {
                      value[index].isPublic = !value[index].isPublic;
                      setIsPublic(!isPublic);
                    }}
                  />
                </Stack>
                {value[index].isPublic && (
                  <Stack
                    minH="86px"
                    alignItems={["start", "start"]}
                    gap={["10px", "15px"]}
                    direction={["column", "row"]}
                  >
                    <NumberInput
                      type="number"
                      isRequired={value[index].isPublic}
                      height="50px"
                      min="0"
                      hasStepper={false}
                      isDisabled={
                        actionType ||
                        // isPhaseEnd(endTime) ||
                        (!value[index].new && !canEditPhase(value[index].start))
                      }
                      label="Public minting fee"
                      isDisplay={value[index].isPublic}
                      name={`phases[${index}].publicMintingFee`}
                    />{" "}
                    <NumberInput
                      isRequired={value[index].isPublic}
                      type="number"
                      height="50px"
                      precision={0}
                      hasStepper={false}
                      isDisabled={
                        actionType ||
                        // isPhaseEnd(endTime) ||
                        (!value[index].new && !canEditPhase(value[index].start))
                      }
                      label="Total Mint Amount"
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
                      isDisabled={
                        actionType ||
                        // isPhaseEnd(endTime) ||
                        (!value[index].new && !canEditPhase(value[index].start))
                      }
                      label="Max per mint"
                      isDisplay={value[index].isPublic}
                      name={`phases[${index}].publicMaxMintingAmount`}
                    />
                  </Stack>
                )}

                <HStack justifyContent="start" w="full">
                  {!value[index].new && !canEditPhase(value[index].start) && (
                    <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                      You can not edit this phase!{" "}
                    </Text>
                  )}

                  {!value[index].new &&
                  mode === formMode.EDIT &&
                  canEditPhase(value[index].start) ? (
                    <Button size="sm" onClick={() => onUpdatePhase(index)}>
                      update
                    </Button>
                  ) : null}

                  {!value[index].new &&
                  mode === formMode.EDIT &&
                  canEditPhase(value[index].start) ? (
                    <Button
                      size="sm"
                      onClick={() => onDeletePhase(index)}
                      isDisabled={index === 0 && value.length === 1}
                    >
                      Delete
                    </Button>
                  ) : null}

                  {value[index].new && mode === formMode.EDIT && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => onAddNewPhase(index)}
                        isDisabled={index === 0 && value.length === 1}
                      >
                        add
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (index === 0 && value.length === 1) return;
                          arrayHelpers.remove(index);
                        }}
                        isDisabled={index === 0 && value.length === 1}
                      >
                        delete
                      </Button>
                    </>
                  )}
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
                {...rest}
                w="140px"
                my="24px"
                variant="outline"
                text="add new phase"
                // isDisabled={isPhaseEnd(endTime)}
                onClick={() => handleAddPhase(arrayHelpers)}
              />
            </Stack>
          </Stack>
        );
      }}
    />
  );
}

export default UpdatePhase;

// Logic add phase + update phase:
// - Không update được những phase đã end hoặc đang chạy (Những phase không thẻ update sẽ không hiện button update)
// - Update sẽ cho update từng phase một
// - Add new sẽ add new từng phase một
// Button delete sẽ không hiển thị ở những phase đã có sẵn
// end > Date.now()
//

export const canEditPhase = (startTime) => {
  const now = new Date();

  if (startTime > now) return true;

  return false;
};
