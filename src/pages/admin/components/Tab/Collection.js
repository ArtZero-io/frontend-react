/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Text,
  Button,
  TableContainer,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import collection_manager from "@utils/blockchain/collection-manager";
import { useEffect, useState } from "react";
import { truncateStr } from "@utils";
import toast from "react-hot-toast";
import BN from "bn.js";
import { SCROLLBAR } from "@constants";
import AddressCopier from "@components/AddressCopier/AddressCopier";
import { APICall } from "@api/client";
import { useDispatch } from "react-redux";
import { setTxStatus } from "@store/actions/txStatus";
import { START, UPDATE_COLLECTION_STATUS } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import useForceUpdate from "@hooks/useForceUpdate";
import { useCallback } from "react";
import { Fragment } from "react";

let collection_count = 0;

function CollectionAdmin() {
  const { api, currentAccount } = useSubstrateState();

  const [collectionCount, setCollectionCount] = useState(null);

  const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState(null);
  const [collectionContractAdmin, setCollectionContractAdmin] = useState(null);
  const [collectionContractBalance, setCollectionContractBalance] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const getCollectionContractBalance = useCallback(async () => {
    const { data: balance } = await api.query.system.account(
      collection_manager.CONTRACT_ADDRESS
    );
    setCollectionContractBalance(
      new BN(balance.free, 10, "le").div(new BN(10 ** 6)).toNumber() / 10 ** 6 -
        new BN(balance.miscFrozen, 10, "le").div(new BN(10 ** 6)).toNumber() /
          10 ** 6
    );
  }, [api.query.system]);

  const onGetCollectionContractOwner = useCallback(async () => {
    let res = await collection_manager_calls.owner(currentAccount);
    if (res) setCollectionContractOwner(res);
    else setCollectionContractOwner("");
  }, [currentAccount]);

  const onGetCollectionContractAdmin = useCallback(async () => {
    // let res = await collection_manager_calls.getAdminAddress(currentAccount);
    // if (res) setCollectionContractAdmin(res);
    // else
    setCollectionContractAdmin(
      "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn"
    );
    return;
  }, []);

  const onGetCollectionCount = useCallback(async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res) {
      collection_count = res;
      setCollectionCount(res);
    } else setCollectionCount(0);
  }, [currentAccount]);

  const getAllCollections = useCallback(async () => {
    const options_active = {
      limit: collection_count,
      offset: 0,
      sort: -1,
      isActive: true,
      ignoreNoNFT: true,
    };

    let { ret: collections_actives } = await APICall.getAllCollections(
      options_active
    );

    const options_inactive = {
      limit: collection_count,
      offset: 0,
      sort: -1,
      isActive: false,
      ignoreNoNFT: true,
    };

    const { ret: collections_inactive } = await APICall.getAllCollections(
      options_inactive
    );

    let collections = collections_actives.concat(collections_inactive);

    setCollections(collections);
  }, []);

  useEffect(() => {
    const doRefresh = async () => {
      setLoading(true);

      await getCollectionContractBalance();
      await onGetCollectionContractOwner();
      await onGetCollectionContractAdmin();
      await onGetCollectionCount();
      await getAllCollections();

      setLoading(false);
    };

    try {
      doRefresh();
    } catch (error) {
      console.log(error);
      toast.error("There are something wrong when fetching collections.");
      setLoading(false);
    }
  }, [
    api.query.system,
    currentAccount,
    getAllCollections,
    getCollectionContractBalance,
    onGetCollectionContractAdmin,
    onGetCollectionContractOwner,
    onGetCollectionCount,
  ]);

  const onSetStatusCollection = async (collection_contract, isActive) => {
    if (collectionContractAdmin !== currentAccount?.address) {
      toast.error(`You are not admin of this contract`);
      return;
    }

    try {
      dispatch(
        setTxStatus({
          type: UPDATE_COLLECTION_STATUS,
          step: START,
          tokenIDArray: Array.of(collection_contract),
        })
      );

      await collection_manager_calls.updateIsActive(
        currentAccount,
        collection_contract,
        isActive,
        dispatch,
        UPDATE_COLLECTION_STATUS,
        api
      );
    } catch (error) {
      console.log(error);
      toast.error("There was an error while update collection status.");
      dispatch(clearTxStatus());
    }
  };

  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_COLLECTION_STATUS],
    () => getAllCollections()
  );

  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Box maxW="8xl" fontSize="lg" minH="50rem">
        <Stack
          direction={{ base: "column", xl: "row" }}
          pb={5}
          borderBottomWidth={1}
        >
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight">
              Total Collection:{" "}
            </Text>
            <Skeleton
              ml={2}
              h="25px"
              w="50px"
              color="#fff"
              isLoaded={collectionCount}
            >
              {collectionCount}{" "}
            </Skeleton>
          </Flex>
          <Flex alignItems="start" pr={{ base: 0, xl: 20 }}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Balance:
            </Text>
            <Skeleton
              ml={2}
              h="25px"
              w="60px"
              color="#fff"
              isLoaded={collectionContractBalance}
            >
              {collectionContractBalance}
            </Skeleton>
            ZERO
          </Flex>

          <Stack alignItems="start" pr={{ base: 0, xl: 20 }}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Owner:{" "}
            </Text>
            <Skeleton
              ml={2}
              h="35px"
              w="150px"
              color="#fff"
              isLoaded={collectionContractOwner}
            >
              {truncateStr(collectionContractOwner, 9)}
            </Skeleton>
          </Stack>

          <Stack alignItems="start" pr={{ base: 0, xl: 20 }}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Admin:{" "}
            </Text>
            <Skeleton
              ml={2}
              h="35px"
              w="150px"
              color="#fff"
              isLoaded={collectionContractAdmin}
            >
              {truncateStr(collectionContractAdmin, 9)}
            </Skeleton>
          </Stack>
        </Stack>

        <Skeleton
          h={loading || loadingForceUpdate ? "160px" : "auto"}
          isLoaded={!(loading || loadingForceUpdate)}
        >
          <TableContainer
            h="full"
            maxW="8xl"
            fontSize="lg"
            overflow="auto"
            sx={SCROLLBAR}
          >
            <Table variant="striped" colorScheme="blackAlpha" overflow="auto">
              <Thead>
                <Tr>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    idx
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Address
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Name
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Owner
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Type
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Status
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    NFT count
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Royalty Fee
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Metadata
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Action
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {collectionCount === 0 ? (
                  <Td py={7}>There is no data.</Td>
                ) : (
                  collections.map((collection, index) => (
                    <Tr key={index}>
                      <Td py={7}>{collection.index}</Td>
                      <Td py={7}>
                        <AddressCopier
                          address={collection.nftContractAddress}
                        />
                      </Td>
                      <Td py={7}>{collection.name}</Td>
                      <Td py={7}>
                        {truncateStr(collection.collectionOwner, 5)}
                      </Td>
                      <Td>
                        {collection.contractType === "Psp34Auto"
                          ? "Auto"
                          : "Manual"}{" "}
                      </Td>
                      <Td py={7}>
                        {collection.isActive ? "Active" : "Inactive"}{" "}
                      </Td>
                      <Td py={7}>{collection.nft_count}</Td>
                      <Td py={7}>
                        {collection.isCollectRoyaltyFee
                          ? collection.royaltyFee / 100 + "%"
                          : "N/A"}{" "}
                      </Td>
                      <Td py={7}>
                        {collection.showOnChainMetadata
                          ? "On-chain"
                          : "Off-chain"}{" "}
                      </Td>
                      <Td>
                        <CommonButton
                          {...rest}
                          size="sm"
                          maxW="120px"
                          variant={collection.isActive ? "outline" : ""}
                          text={!collection.isActive ? "Enable" : "Disable"}
                          isDisabled={
                            actionType &&
                            !tokenIDArray?.includes(
                              collection.nftContractAddress
                            )
                          }
                          onClick={() =>
                            onSetStatusCollection(
                              collection.nftContractAddress,
                              !collection.isActive
                            )
                          }
                        />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Skeleton>
      </Box>
    </Box>
  );
}

export default CollectionAdmin;
