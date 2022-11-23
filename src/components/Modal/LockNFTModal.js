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
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSubstrateState } from '@utils/substrate';

import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { ContractPromise } from '@polkadot/api-contract';
import nft721_psp34_standard from '@utils/blockchain/nft721-psp34-standard';
import { web3FromSource } from '@utils/wallets/extension-dapp';
import {
  txErrorHandler,
  txResponseErrorHandler,
} from '@store/actions/txStatus';
import { APICall } from '@api/client';
import { setTxStatus } from '@store/actions/txStatus';
import { START, FINALIZED, LOCK } from '@constants';
import useTxStatus from '@hooks/useTxStatus';
import CommonButton from '@components/Button/CommonButton';
import { useEffect } from 'react';
import UnlockIcon from '../../theme/assets/icon/Unlock';
import { getEstimatedGas } from '@utils/';

function LockNFTModal({
  owner,
  nftContractAddress,
  tokenID,
  isDisabled = false,
  showOnChainMetadata,
}) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const lockNFTsHandler = async () => {
    if (owner !== currentAccount?.address) {
      return toast.error('You are not the owner of this NFT');
    }

    if (nftContractAddress) {
      dispatch(setTxStatus({ type: LOCK, step: START }));

      const contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );

      let unsubscribe;
      let gasLimit = -1;

      const address = currentAccount?.address;
      const { signer } = await web3FromSource(currentAccount?.meta?.source);
      const value = 0;

      gasLimit = await getEstimatedGas(address, contract, value, 'lock', {
        u64: tokenID,
      });

      

      await contract.tx
        .lock({ value, gasLimit }, { u64: tokenID })
        .signAndSend(
          currentAccount?.address,
          { signer },
          async ({ status, dispatchError }) => {
            txResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: LOCK,
              api,
            });

            if (status.isFinalized) {
              await APICall.askBeUpdateNftData({
                collection_address: nftContractAddress,
                token_id: tokenID,
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

  const iconWidth = useBreakpointValue(['40px', '50px']);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        {showOnChainMetadata && (
          <PopoverTrigger mt="0px">
            <Tooltip
              hasArrow
              top="-10px"
              bg="#333"
              color="#fff"
              label="Unlocked on-chain metadata"
            >
              <span
                onClick={
                  isDisabled || actionType
                    ? () => toast.error('This item is currently for sale!')
                    : onOpen
                }
                style={{
                  width: iconWidth,
                  height: iconWidth,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #333333',
                }}
              >
                <UnlockIcon
                  width={['20px', '25px']}
                  height={['20px', '25px']}
                />
              </span>
            </Tooltip>
          </PopoverTrigger>
        )}
        <PopoverContent bg="#333" borderRadius="0" fontSize="sm">
          <PopoverArrow />

          <PopoverCloseButton
            borderRadius="0"
            isDisabled={actionType}
            onClick={rest.step === FINALIZED ? rest.onEndClick : onClose}
          />

          <PopoverHeader textAlign="center">
            Lock Metadata Confirmation!
          </PopoverHeader>

          <PopoverBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </PopoverBody>

          <PopoverFooter>
            <HStack justify="center" align="center">
              <Text>Are you sure you want to lock?</Text>

              <CommonButton
                {...rest}
                h="40px"
                px="8px"
                text="submit"
                onClick={lockNFTsHandler}
                isDisabled={actionType && actionType !== LOCK}
              />
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LockNFTModal;
