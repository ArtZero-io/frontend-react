import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  PopoverFooter,
  Tooltip,
  Input,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSubstrateState, useSubstrate } from "@utils/substrate";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { ContractPromise } from "@polkadot/api-contract";

import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { setTxStatus } from "@store/actions/txStatus";
import { stringToU8a } from "@polkadot/util";
import { isValidAddressPolkadotAddress, getEstimatedGas } from "@utils";
import { APICall } from "@api/client";
import { START, FINALIZED, TRANSFER } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import TransferIcon from "../../theme/assets/icon/Transfer";
import azero_domains_nft from "@utils/blockchain/azero-domains-nft";

function TransferAzeroDomainsNFTModal({
  owner,
  nftContractAddress,
  tokenID,
  azDomainName,
  isDisabled = false,
  showOnChainMetadata,
}) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const [receiverAddress, setReceiverAddress] = useState("");
  const iconWidth = useBreakpointValue(["40px", "50px"]);

  const transferNFTsHandler = async () => {
    if (!isValidAddressPolkadotAddress(receiverAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    if (owner !== currentAccount?.address) {
      return toast.error("You are not the owner of this NFT");
    }

    if (nftContractAddress) {
      dispatch(setTxStatus({ type: TRANSFER, step: START }));

      const contract = new ContractPromise(
        api,
        azero_domains_nft.CONTRACT_ABI,
        nftContractAddress
      );

      let unsubscribe;
      let gasLimit;

      const address = currentAccount?.address;

      const value = 0;

      let additionalData = "";

      gasLimit = await getEstimatedGas(
        address,
        contract,
        value,
        "psp34::transfer",
        receiverAddress,
        { bytes: azDomainName },
        stringToU8a(additionalData)
      );

      await contract.tx["psp34::transfer"](
        { value, gasLimit },
        receiverAddress,
        { bytes: azDomainName },
        stringToU8a(additionalData)
      )
        .signAndSend(
          currentAccount?.address,
          { signer: adapter.signer },
          async ({ status, dispatchError }) => {
            txResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: TRANSFER,
              api,
            });

            if (status.isFinalized) {
              await APICall.askBeUpdateAzeroDomainsNftData({
                collection_address: nftContractAddress,
                azDomainName: azDomainName,
              });
            }
          }
        )
        .then((unsub) => (unsubscribe = unsub))
        .catch((error) => txErrorHandler({ error, dispatch }));

      return unsubscribe;
    }
  };

  useEffect(() => {
    rest.step === FINALIZED && onClose();
  }, [onClose, rest.step]);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger mt="0px">
          <Tooltip
            hasArrow
            bg="#333"
            top="-10px"
            color="#fff"
            label="Transfer NFT"
          >
            <span
              onClick={
                isDisabled || actionType
                  ? () => toast.error("This item can not transfer!")
                  : onOpen
              }
              style={{
                width: iconWidth,
                height: iconWidth,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #333333",
              }}
            >
              <TransferIcon
                width={["20px", "25px"]}
                height={["20px", "25px"]}
              />
            </span>
          </Tooltip>
        </PopoverTrigger>

        <PopoverContent bg="#333" borderRadius="0" fontSize="sm">
          <PopoverArrow />

          <PopoverCloseButton
            isDisabled={actionType}
            onClick={rest.step === FINALIZED ? rest.onEndClick : onClose}
          />

          <PopoverHeader textAlign="center">Transfer NFT</PopoverHeader>

          <PopoverBody>
            <VStack w="full">
              <Text>Transfer Azero Domains to address:</Text>
              <Input
                h="32px"
                px="4px"
                isDisabled={actionType}
                placeholder="5ABC..."
                _placeholder={{ fontSize: "12px" }}
                onChange={(val) => setReceiverAddress(val.target.value)}
              />
            </VStack>
          </PopoverBody>

          <PopoverFooter>
            <VStack>
              <Text>Are you sure you want to transfer NFT?</Text>

              <CommonButton
                {...rest}
                h="30px"
                text="submit"
                onClick={transferNFTsHandler}
                isDisabled={
                  !receiverAddress || (actionType && actionType !== TRANSFER)
                }
              />
            </VStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default TransferAzeroDomainsNFTModal;
