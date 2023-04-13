import {
  CircularProgress,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import CommonButton from "@components/Button/CommonButton";
import { UPDATE_ADMIN_ADDRESS, START, FINALIZED } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { isValidAddressPolkadotAddress } from "@utils";
import toast from "react-hot-toast";
import { execContractQuery, execContractTx } from "../../../account/nfts/nfts";
import { useCallback } from "react";
// import { execContractTx } from "../../../account/nfts/nfts";
import useForceUpdate from "@hooks/useForceUpdate";
import { REVOKE_ADMIN_ADDRESS } from "../../../../constants";
import AddressCopier from "@components/AddressCopier/AddressCopier";

export default function UpdateAdminAddressModal({
  collectionOwner,
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const [newAdminAddress, setNewAdminAddress] = useState("");
  const { currentAccount, api } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_ADMIN_ADDRESS, REVOKE_ADMIN_ADDRESS],
    () => fetchMyAdminList()
  );
  useEffect(() => {
    if (rest.step === FINALIZED) {
      dispatch(clearTxStatus());
      // onClose();
    }
  }, [dispatch, onClose, rest.step]);

  const updateAdminAddress = async () => {
    if (!currentAccount) return;

    if (!isValidAddressPolkadotAddress(newAdminAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    if (adminList.includes(newAdminAddress)) {
      return toast.error(`This wallet is already have admin role!`);
    }

    try {
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      dispatch(setTxStatus({ type: UPDATE_ADMIN_ADDRESS, step: START }));

      await launchpad_psp34_nft_standard_calls.grantAdminRoleToAddress(
        currentAccount,
        newAdminAddress,
        dispatch,
        UPDATE_ADMIN_ADDRESS,
        api,
        collection_address
      );

      setNewAdminAddress("");
      // await execContractTx(
      //   currentAccount,dispatch,
      // UPDATE_ADMIN_ADDRESS,
      //   api,
      //   launchpad_psp34_nft_standard.CONTRACT_ABI,
      //   collection_address,
      //   0, //=>value
      //   "accessControl::grantRole",
      //   3739740293,
      //   newAdminAddress
      // );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyAdminList = useCallback(async () => {
    if (!api || !currentAccount) return;

    try {
      setLoading(true);

      const queryResult = await execContractQuery(
        currentAccount?.address,
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address,
        "accessControlEnumerable::getRoleMemberCount",
        3739740293
      );

      const amount = parseInt(queryResult.toHuman().Ok);

      const list = await Promise.all(
        [...Array(amount)].map(async (_, idx) => {
          const queryResult = await execContractQuery(
            currentAccount?.address,
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            collection_address,
            "accessControlEnumerable::getRoleMember",
            3739740293,
            idx
          );

          return queryResult.toHuman().Ok;
        })
      );
      setAdminList(list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [api, collection_address, currentAccount]);

  useEffect(() => {
    fetchMyAdminList();
  }, [fetchMyAdminList]);

  const onRemoveHandler = async (adminAddress) => {
    if (!api || !currentAccount) return;

    try {
      dispatch(
        setTxStatus({
          type: REVOKE_ADMIN_ADDRESS,
          step: START,
          tokenIDArray: [adminAddress],
        })
      );

      await execContractTx(
        currentAccount,
        dispatch,
        REVOKE_ADMIN_ADDRESS,
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address,
        0, //=>value
        "accessControl::revokeRole",
        3739740293,
        adminAddress
      );
      setNewAdminAddress("");
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={["xs", "xl"]}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        pt="20px"
        pb="30px"
        px={[0, "10px"]}
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={["340px", "600px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top="4"
          right="4"
          onClick={() => {
            setNewAdminAddress("");
            rest?.step === FINALIZED && rest?.onEndClick();
          }}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            update admin address
          </Heading>
          <Text fontSize="sm" fontWeight="400">
            Only owner of project can change admin address.
          </Text>
        </ModalHeader>

        <ModalBody>
          <VStack>
            <Input
              bg="black"
              mb="15px"
              px={2}
              isDisabled={actionType}
              value={newAdminAddress}
              placeholder="Your new address here"
              onChange={({ target }) => setNewAdminAddress(target.value)}
            />
            <CommonButton
              isDisabled={actionType && actionType !== UPDATE_ADMIN_ADDRESS}
              {...rest}
              w="full"
              onClick={updateAdminAddress}
              text="submit"
            />
            <Heading mt="8px" size="h6" textAlign="center">
              Admin Address List
            </Heading>
            {loading || loadingForceUpdate ? (
              <CircularProgress isIndeterminate color="green.300" />
            ) : (
              <AdminList
                collectionOwner={collectionOwner}
                adminList={adminList}
                onRemoveHandler={onRemoveHandler}
              />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const AdminList = ({ collectionOwner, adminList, onRemoveHandler }) => {
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  return (
    <TableContainer w="full">
      {adminList?.length === 0 ? (
        <Text textAlign="center">Not found</Text>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Address</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adminList?.map((item, idx) => (
              <Tr key={item}>
                <Td>{idx + 1}</Td>
                <Td>
                  <AddressCopier address={item} truncateStrNum={12} />
                </Td>
                <Td w={"10px"}>
                  {collectionOwner === item ? (
                    "Project Owner"
                  ) : (
                    <CommonButton
                      isDisabled={
                        (actionType && actionType !== REVOKE_ADMIN_ADDRESS) ||
                        (actionType === REVOKE_ADMIN_ADDRESS &&
                          !tokenIDArray?.includes(item))
                      }
                      {...rest}
                      minW="160px"
                      onClick={() => onRemoveHandler(item)}
                      size="xs"
                      text="Remove role"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
};
