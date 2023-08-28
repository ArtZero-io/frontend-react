import {
  Box,
  Flex,
  Text,
  TableContainer,
  Stack,
  Skeleton,
  Input,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import collection_manager from "@utils/blockchain/collection-manager";
import { useEffect, useState } from "react";
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
import { execContractQuery, execContractTx } from "../../../account/nfts/nfts";
import { isValidAddressPolkadotAddress } from "@utils";
import { isEmptyObj } from "@utils";
import { ipfsClient } from "@api/client";

let collection_count = 0;

function CollectionAdmin() {
  const { api, apiState, currentAccount } = useSubstrateState();

  const [collectionCount, setCollectionCount] = useState(null);

  const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState(null);
  const [isCollectionAdmin, setIsCollectionAdmin] = useState(null);
  const [collectionContractBalance, setCollectionContractBalance] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const getCollectionContractBalance = useCallback(async () => {
    if (!api || apiState !== "READY") return;

    const { data: balance } = await api.query.system.account(
      collection_manager.CONTRACT_ADDRESS
    );
    setCollectionContractBalance(
      new BN(balance.free, 10, "le").div(new BN(10 ** 12)).toNumber() /
        10 ** 6 -
        new BN(balance.miscFrozen, 10, "le").div(new BN(10 ** 12)).toNumber() /
          10 ** 6
    );
  }, [api, apiState]);

  const onGetCollectionContractOwner = useCallback(async () => {
    if (!api || apiState !== "READY") return;

    let res = await collection_manager_calls.owner(currentAccount);
    if (res) setCollectionContractOwner(res);
    else setCollectionContractOwner("");
  }, [api, apiState, currentAccount]);

  const isOwner = collectionContractOwner === currentAccount?.address;

  const onGetCollectionContractAdmin = useCallback(async () => {
    const checkIsAdmin = async ({ address }) => {
      if (!api || apiState !== "READY") return;

      const queryResult1 = await execContractQuery(
        currentAccount?.address,
        api,
        collection_manager.CONTRACT_ABI,
        collection_manager.CONTRACT_ADDRESS,
        "accessControl::hasRole",
        3739740293,
        address
      );

      return queryResult1?.toHuman()?.Ok;
    };

    const isCollectionAdmin = await checkIsAdmin({
      address: currentAccount?.address,
    });

    setIsCollectionAdmin(isCollectionAdmin);
    return;
  }, [api, apiState, currentAccount?.address]);

  const onGetCollectionCount = useCallback(async () => {
    if (!api || apiState !== "READY") return;

    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res) {
      collection_count = res;
      setCollectionCount(res);
    } else setCollectionCount(0);
  }, [api, apiState, currentAccount]);

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
    api?.query?.system,
    currentAccount,
    getAllCollections,
    getCollectionContractBalance,
    onGetCollectionContractAdmin,
    onGetCollectionContractOwner,
    onGetCollectionCount,
  ]);

  const onSetStatusCollection = async (collection_contract, isActive) => {
    if (!(isCollectionAdmin || isOwner)) {
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

      const selectedCollection = collections.filter(
        (c) => c.nftContractAddress === collection_contract
      );

      const templateParams = {
        collection_name: selectedCollection[0]?.name,
        collection_address: collection_contract,
        email_owner: selectedCollection[0]?.email,
      };
      // console.log("templateParams", templateParams);
      await collection_manager_calls.updateIsActive(
        currentAccount,
        collection_contract,
        isActive,
        dispatch,
        UPDATE_COLLECTION_STATUS,
        api,
        templateParams
      );
    } catch (error) {
      console.log(error);
      toast.error("There was an error while update collection status.");
      dispatch(clearTxStatus());
    }
  };

  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_COLLECTION_STATUS, "grantRole", "setDoxxed", "setDupChecked"],
    () => getAllCollections()
  );
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const grantAdminAddress = async () => {
    if (!isOwner) {
      return toast.error(`Only owner can grant admin role!`);
    }

    if (!isValidAddressPolkadotAddress(newAdminAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }
    try {
      dispatch(setTxStatus({ type: "grantRole", step: START }));

      await execContractTx(
        currentAccount,
        dispatch,
        "grantRole",
        api,
        collection_manager.CONTRACT_ABI,
        collection_manager.CONTRACT_ADDRESS,
        0, //=>value
        "accessControl::grantRole",
        3739740293,
        newAdminAddress
      );
      setNewAdminAddress("");
    } catch (error) {
      setNewAdminAddress("");
      toast.error(error.message);
      console.log("error.message", error.message);
    }
  };

  async function setDoxxedHandler(address, curDoxxedStatus) {
    if (!(isCollectionAdmin || isOwner)) {
      toast.error(`You are not admin of this contract`);
      return;
    }

    const selectedCollection = collections.find(
      (item) => item.nftContractAddress === address
    );

    if (isEmptyObj(selectedCollection)) {
      return toast.error("There is some wrong !");
    }
    const statusBeSet = curDoxxedStatus ? "0" : "1";

    const {
      name,
      description,
      avatarImage,
      headerImage,
      squareImage,
      website,
      twitter,
      discord,
      telegram,
      isDuplicationChecked,
    } = selectedCollection;

    // console.log("selectedCollection", selectedCollection);

    let { path: metadataHash } = await ipfsClient.add(
      JSON.stringify({
        name,
        description,
        avatarImage,
        headerImage,
        squareImage,
        website,
        twitter,
        discord,
        telegram,
        isDoxxed: statusBeSet,
        isDuplicationChecked: isDuplicationChecked ? "1" : "0",
      })
    );

    // console.log("setDoxxedHandler metadataHash", metadataHash);
    if (!metadataHash) {
      toast.error("There is an error with metadata hash!");
      return;
    }

    try {
      dispatch(setTxStatus({ type: "setDoxxed", step: START }));

      await execContractTx(
        currentAccount,
        dispatch,
        "setDoxxed",
        api,
        collection_manager.CONTRACT_ABI,
        collection_manager.CONTRACT_ADDRESS,
        0, //=>value
        "artZeroCollectionTrait::setMultipleAttributes",
        address,
        ["metadata"],
        [metadataHash]
      );

      await APICall.askBeUpdateCollectionData({
        collection_address: address,
      });
    } catch (error) {
      toast.error(error.message);
      console.log("error.message", error.message);
    }
  }
  async function setDupCheckedHandler(address, currDupStatus) {
    if (!(isCollectionAdmin || isOwner)) {
      toast.error(`You are not admin of this contract`);
      return;
    }

    const statusBeSet = currDupStatus ? "0" : "1";

    const selectedCollection = collections.find(
      (item) => item.nftContractAddress === address
    );

    if (isEmptyObj(selectedCollection)) {
      return toast.error("There is some wrong !");
    }

    const {
      name,
      description,
      avatarImage,
      headerImage,
      squareImage,
      website,
      twitter,
      discord,
      telegram,
      isDoxxed,
    } = selectedCollection;

    // console.log("selectedCollection", selectedCollection);

    let { path: metadataHash } = await ipfsClient.add(
      JSON.stringify({
        name,
        description,
        avatarImage,
        headerImage,
        squareImage,
        website,
        twitter,
        discord,
        telegram,
        isDoxxed: isDoxxed ? "1" : "0",
        isDuplicationChecked: statusBeSet,
      })
    );
    // console.log("setDupCheckedHandler metadataHash", metadataHash);

    if (!metadataHash) {
      toast.error("There is an error with metadata hash!");
      return;
    }

    try {
      dispatch(setTxStatus({ type: "setDupChecked", step: START }));

      await execContractTx(
        currentAccount,
        dispatch,
        "setDupChecked",
        api,
        collection_manager.CONTRACT_ABI,
        collection_manager.CONTRACT_ADDRESS,
        0, //=>value
        "artZeroCollectionTrait::setMultipleAttributes",
        address,
        ["metadata"],
        [metadataHash]
      );

      await APICall.askBeUpdateCollectionData({
        collection_address: address,
      });
    } catch (error) {
      toast.error(error.message);
      console.log("error.message", error.message);
    }
  }

  return (
    <Box
      mx="auto"
      // px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Box
        //  maxW="8xl"
        fontSize="lg"
        minH="50rem"
      >
        <Stack
          direction={{ base: "column", xl: "row" }}
          pb={5}
          borderBottomWidth={1}
        >
          <Stack>
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
              ASTAR
            </Flex>
          </Stack>

          <Stack>
            <Flex alignItems="start" pr={{ base: 0, xl: 20 }}>
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
                <AddressCopier
                  address={collectionContractOwner}
                  truncateStr={9}
                  textOnly={true}
                />
              </Skeleton>
            </Flex>

            <Flex alignItems="start" pr={{ base: 0, xl: 20 }}>
              <Text ml={1} color="brand.grayLight">
                Your role:{" "}
              </Text>{" "}
              <Text> {isCollectionAdmin ? " Admin" : " Not admin"}</Text>
            </Flex>
          </Stack>

          <Flex maxW="500px" w="full">
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
              {...rest}
              text="Grant admin"
              ml="8px"
              onClick={grantAdminAddress}
              isDisabled={actionType && actionType !== "grantRole"}
            />
          </Flex>
        </Stack>

        <Skeleton
          h={loading || loadingForceUpdate ? "160px" : "auto"}
          isLoaded={!(loading || loadingForceUpdate)}
        >
          <TableContainer
            maxH="480px"
            h="full"
            // maxW="8xl"
            fontSize="lg"
            overflowY="scroll"
            sx={SCROLLBAR}
          >
            <Table variant="striped" colorScheme="blackAlpha" overflow="auto">
              <Thead>
                <Tr position="sticky" top={0} zIndex={1} bg="#171717">
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
                    Is Doxxed
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Dup Checked
                  </Th>
                  <Th
                    fontFamily="Evogria"
                    fontSize="sm"
                    fontWeight="normal"
                    py={7}
                  >
                    Action
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
                    NFT count
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
                      <Td py={7} maxW="200px">
                        <Text fontSize="15px">{collection.name}</Text>
                        <Text>
                          Royalty Fee:{" "}
                          {collection.isCollectRoyaltyFee
                            ? collection.royaltyFee / 100 + "%"
                            : "N/A"}{" "}
                        </Text>
                      </Td>

                      <Td py={7}>
                        {collection.isDoxxed ? "YES" : "NO"}{" "}
                        <CommonButton
                          {...rest}
                          size="sm"
                          px="2"
                          minW="60px"
                          variant={collection.isDoxxed ? "outline" : ""}
                          text={!collection.isDoxxed ? "Set Yes" : "Set No"}
                          isDisabled={
                            actionType &&
                            !tokenIDArray?.includes(
                              collection.nftContractAddress
                            )
                          }
                          onClick={() =>
                            setDoxxedHandler(
                              collection.nftContractAddress,
                              collection.isDoxxed
                            )
                          }
                        />
                      </Td>

                      <Td py={7}>
                        {collection.isDuplicationChecked ? "YES" : "NO"}
                        <CommonButton
                          {...rest}
                          size="sm"
                          px="2"
                          minW="60px"
                          variant={
                            collection.isDuplicationChecked ? "outline" : ""
                          }
                          text={
                            !collection.isDuplicationChecked
                              ? "Set Yes"
                              : "Set No"
                          }
                          isDisabled={
                            actionType &&
                            !tokenIDArray?.includes(
                              collection.nftContractAddress
                            )
                          }
                          onClick={() =>
                            setDupCheckedHandler(
                              collection.nftContractAddress,
                              collection.isDuplicationChecked
                            )
                          }
                        />
                      </Td>

                      <Td>
                        <CommonButton
                          {...rest}
                          size="sm"
                          px="2"
                          minW="60px"
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
                      <Td py={7}>
                        {collection.isActive ? "Active" : "Inactive"}{" "}
                      </Td>
                      <Td py={7}>
                        <AddressCopier address={collection.collectionOwner} />
                      </Td>
                      <Td>
                        <Stack>
                          <Stack>
                            <Text>
                              {collection.contractType === "Psp34Auto"
                                ? "Simple Mode"
                                : "Advanced Mode"}
                            </Text>
                          </Stack>
                          <Stack>
                            <Text>
                              {collection.showOnChainMetadata
                                ? "On-chain"
                                : "Off-chain"}{" "}
                              Metadata
                            </Text>
                          </Stack>
                        </Stack>
                      </Td>

                      <Td py={7}>{collection.nft_count}</Td>
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
