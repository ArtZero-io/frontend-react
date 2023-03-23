import {
  Box,
  Flex,
  Text,
  Button,
  TableContainer,
  Stack,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { truncateStr } from "@utils";
import toast from "react-hot-toast";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";

import { Link, Link as ReactRouterLink } from "react-router-dom";
import * as ROUTES from "@constants/routes";
import { APICall } from "../../../../api/client";
import { execContractQuery, execContractTx } from "../../../account/nfts/nfts";
import launchpad_manager from "../../../../utils/blockchain/launchpad-manager";

import { isValidAddressPolkadotAddress } from "@utils";
import { getProjectStatus } from "../../../launchpad";
import { setTxStatus } from "@store/actions/txStatus";
import { EDIT_PROJECT, START } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import useForceUpdate from "@hooks/useForceUpdate";

function ProjectAdmin() {
  const dispatch = useDispatch();

  const { api, currentAccount } = useSubstrateState();

  const [collectionCount, setCollectionCount] = useState(0);

  const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState("");
  const [isLPAdmin, setIsLPAdmin] = useState(null);
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate([EDIT_PROJECT], () =>
    getAllCollections()
  );

  const onGetCollectionContractOwner = async (e) => {
    let res = await launchpad_contract_calls.owner(currentAccount);

    console.log("res", res);
    if (res) setCollectionContractOwner(res);
    else setCollectionContractOwner("");
  };

  const isOwner = collectionContractOwner === currentAccount?.address;

  const onGetCollectionContractAdmin = async (e) => {
    const checkIsAdmin = async ({ address }) => {
      if (!api) return;

      const queryResult1 = await execContractQuery(
        currentAccount?.address,
        api,
        launchpad_manager.CONTRACT_ABI,
        launchpad_manager.CONTRACT_ADDRESS,
        "accessControl::hasRole",
        3739740293,
        address
      );

      return queryResult1.toHuman().Ok;
    };
    const isLPAdmin = await checkIsAdmin({
      address: currentAccount?.address,
    });

    setIsLPAdmin(isLPAdmin);
    return;
  };

  const [loading, setLoading] = useState(true);

  const getAllCollections = async (e) => {
    try {
      setLoading(true);
      let allProjectList = [];
      const { ret: projList } = await APICall.getAllProjects({ sort: 1 });
      const { ret: projList2 } = await APICall.getAllProjects({
        sort: 1,
        isActive: false,
      });

      allProjectList = projList.concat(projList2);

      const projectCount = await launchpad_contract_calls.getProjectCount(
        currentAccount
      );

      setCollectionCount(projectCount || 0);
      setCollections(allProjectList);
      setLoading(false);
    } catch (error) {
      toast.error("There is something wrong when get all collections");
      setLoading(false);
    }
  };

  const onRefreshCollection = useCallback(async () => {
    await onGetCollectionContractOwner();
    await onGetCollectionContractAdmin();
    await getAllCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount?.address]);
  const onSetStatusCollection = async (collection_contract, isActive) => {
    if (!isLPAdmin) {
      return toast.error("Only admin can set status collection");
    }

    dispatch(
      setTxStatus({
        step: START,
        type: EDIT_PROJECT,
        tokenIDArray: [collection_contract],
      })
    );

    toast.success(`Setting status...`);
    await launchpad_contract_calls.updateIsActiveProject(
      currentAccount,
      isActive,
      collection_contract,
      dispatch,
      EDIT_PROJECT,
      api
    );
  };
  useEffect(() => {
    const doRefresh = async () => {
      await onRefreshCollection();
    };
    doRefresh();
  }, [currentAccount, onRefreshCollection]);

  const [newAdminAddress, setNewAdminAddress] = useState("");

  const grantAdminAddress = async () => {
    if (!isOwner) {
      return toast.error(`Only owner can grant admin role!`);
    }

    if (!isValidAddressPolkadotAddress(newAdminAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }
    try {
      await execContractTx(
        currentAccount,
        api,
        launchpad_manager.CONTRACT_ABI,
        launchpad_manager.CONTRACT_ADDRESS,
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

  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Box maxW="6xl-mid" fontSize="lg" minH="50rem">
        <Stack
          direction={{ base: "column", xl: "row" }}
          pb={5}
          borderBottomWidth={1}
        >
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight">
              Total Collection:
            </Text>
            <Text color="#fff" ml={2}>
              {collectionCount}{" "}
            </Text>
          </Flex>
        </Stack>

        <Stack
          direction={{ base: "column", xl: "row" }}
          py={5}
          borderBottomWidth={1}
        >
          <Stack alignItems="start" pr={{ base: 0, xl: 20 }}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Owner:{" "}
            </Text>
            <Text color="#fff" ml={2}>
              {truncateStr(collectionContractOwner, 9)}
            </Text>
          </Stack>
          <Stack alignItems="start" pr={{ base: 0, xl: 20 }}>
            <Text ml={1} color="brand.grayLight">
              Your role:{" "}
            </Text>
            <Text> {isLPAdmin ? "Admin" : "Not admin"}</Text>
          </Stack>
          <Flex>
            <Input
              bg="black"
              mb="15px"
              px={2}
              value={newAdminAddress}
              placeholder="Your new address here"
              onChange={({ target }) => setNewAdminAddress(target.value)}
            />
            <Button onClick={grantAdminAddress}>Grant admin</Button>
          </Flex>
        </Stack>

        <TableContainer
          maxW="6xl-mid"
          fontSize="lg"
          h="full"
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              borderRadius: "0px",
              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: `transparent`,
            },
          }}
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
                  Name
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
                  Action
                </Th>
              </Tr>
            </Thead>

            {loading || loadingForceUpdate ? (
              <Tbody w="full">
                <Tr>
                  <Td textAlign="center" colSpan="6" py={7}>
                    <CircularProgress isIndeterminate color="#7ae7ff" />{" "}
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {collectionCount === 0 ? (
                  <Tr>
                    <Td py={7}>There is no data.</Td>
                  </Tr>
                ) : (
                  collections.map((collection, index) => (
                    <Tr key={index}>
                      <Td py={7}>
                        <Link
                          cursor="pointer"
                          as={ReactRouterLink}
                          to={`${ROUTES.LAUNCHPAD_BASE}/${collection?.nftContractAddress}`}
                        >
                          <Text _hover={{ color: "#7ae7ff" }}>
                            {collection?.name}
                          </Text>
                        </Link>
                      </Td>
                      <Td py={7}>
                        {truncateStr(collection.nftContractAddress, 5)}
                      </Td>
                      <Td py={7}>
                        {truncateStr(collection.collectionOwner, 5)}
                      </Td>
                      <Td>
                        {getProjectStatus({
                          startTime: collection?.startTime,
                          endTime: collection?.endTime,
                        })?.toUpperCase()}
                      </Td>
                      <Td py={7}>
                        {collection.isActive ? "Active" : "Inactive"}{" "}
                      </Td>

                      <Td>
                        {!collection.isActive ? (
                          <CommonButton
                            minW="180px"
                            isDisabled={
                              (actionType && actionType !== EDIT_PROJECT) ||
                              (actionType === EDIT_PROJECT &&
                                !tokenIDArray?.includes(
                                  collection.nftContractAddress
                                ))
                            }
                            {...rest}
                            size="sm"
                            text="Enable"
                            color="black"
                            onClick={() =>
                              onSetStatusCollection(
                                collection.nftContractAddress,
                                true
                              )
                            }
                          >
                            Enable
                          </CommonButton>
                        ) : (
                          <CommonButton
                            minW="180px"
                            isDisabled={
                              (actionType && actionType !== EDIT_PROJECT) ||
                              (actionType === EDIT_PROJECT &&
                                !tokenIDArray?.includes(
                                  collection.nftContractAddress
                                ))
                            }
                            {...rest}
                            variant="outline"
                            size="sm"
                            text="Disable"
                            color="#7ae7ff"
                            onClick={() =>
                              onSetStatusCollection(
                                collection.nftContractAddress,
                                false
                              )
                            }
                          >
                            Disable
                          </CommonButton>
                        )}
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ProjectAdmin;
