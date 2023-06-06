import {
  Box,
  Flex,
  Text,
  Button,
  TableContainer,
  Stack,
  Input,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { delay } from "@utils";
import toast from "react-hot-toast";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";

import { Link, Link as ReactRouterLink } from "react-router-dom";
import * as ROUTES from "@constants/routes";
import { execContractQuery, execContractTx } from "../../../account/nfts/nfts";
import { launchpad_manager } from "@utils/blockchain/abi";
import { useProjectList } from "@hooks/useProjectList";

import { isValidAddressPolkadotAddress } from "@utils";
import { isPhaseEnd } from "@utils";
import { setTxStatus } from "@store/actions/txStatus";
import { START } from "@constants";
import CommonButton from "@components/Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import moment from "moment/moment";
import AddressCopier from "@components/AddressCopier/AddressCopier";
import { SCROLLBAR } from "@constants";

function ProjectAdmin() {
  const dispatch = useDispatch();

  const { api, currentAccount } = useSubstrateState();

  const [collectionCount, setCollectionCount] = useState(0);

  // const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState("");
  const [isLPAdmin, setIsLPAdmin] = useState(null);
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate(
    ["grantRole"],
    () => {},
    true
  );
  const onGetCollectionContractOwner = async (e) => {
    let res = await launchpad_contract_calls.owner(currentAccount);

    // console.log("res", res);
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
  const onGetCollectionCount = async () => {
    let res = await launchpad_contract_calls.getProjectCount(currentAccount);
    if (res) {
      setCollectionCount(res);
    } else setCollectionCount(0);
  };

  const { projectList } = useProjectList();
  // console.log("projectList", projectList);

  const onRefreshCollection = useCallback(async () => {
    await onGetCollectionContractOwner();
    await onGetCollectionContractAdmin();
    await onGetCollectionCount();
    await delay(1000);
    // await getAllCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount?.address]);
  const onSetStatusCollection = async (collection_contract, isActive) => {
    if (!isLPAdmin) {
      return toast.error("Only admin can set status collection");
    }

    toast.success(`Setting status...`);
    await launchpad_contract_calls.updateIsActiveProject(
      currentAccount,
      isActive,
      collection_contract,
      dispatch,
      "editProject",
      api
    );
    await delay(3000);
    await onGetCollectionCount();
    // await getAllCollections();
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
      dispatch(setTxStatus({ type: "grantRole", step: START }));

      await execContractTx(
        currentAccount,
        dispatch,
        "grantRole",
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
              <AddressCopier address={collectionContractOwner} truncateStr={9} textOnly={true}/>
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
            <CommonButton
              {...rest}
              text="Grant admin"
              ml="8px"
              onClick={grantAdminAddress}
              isDisabled={actionType && actionType !== "grantRole"}
            />
          </Flex>
        </Stack>
        <TableContainer
          maxW="6xl-mid"
          // maxH={{ base: "20rem", "2xl": "30rem" }}
          maxH="480px"
          fontSize="lg"
          h="full"
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
                  Name
                </Th>
                <Th
                  fontFamily="Evogria"
                  fontSize="sm"
                  fontWeight="normal"
                  py={7}
                >
                  Project time
                </Th>
                <Th
                  fontFamily="Evogria"
                  fontSize="sm"
                  fontWeight="normal"
                  py={7}
                >
                  Phase time
                </Th>
                <Th
                  fontFamily="Evogria"
                  fontSize="sm"
                  fontWeight="normal"
                  py={7}
                >
                  (WL) Id - wallet - nft
                </Th>

                <Th
                  fontFamily="Evogria"
                  fontSize="sm"
                  fontWeight="normal"
                  py={7}
                >
                  Active ?
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
                  NFT Count
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
              </Tr>
            </Thead>
            <Tbody>
              {projectList?.length === 0 ? (
                <Tr>
                  <Td py={7}>There is no data.</Td>
                </Tr>
              ) : (
                projectList?.map((collection, index) => (
                  <Tr key={index}>
                    <Td py={7}>{collection.index}</Td>

                    <Td py={7}>
                      <Link
                        cursor="pointer"
                        as={ReactRouterLink}
                        to={`${ROUTES.LAUNCHPAD_BASE}/${collection?.nftContractAddress}`}
                      >
                        <Text _hover={{ color: "#7ae7ff" }} fontSize="15px">
                          {collection?.name}
                        </Text>
                      </Link>
                    </Td>

                    <Td fontSize="16px">
                      <Text mb="4px">
                        S:{" "}
                        {moment(collection.startTime).format("DD/MM/YY, H:mm")}
                      </Text>
                      <Text>
                        E: {moment(collection.endTime).format("DD/MM/YY, H:mm")}
                      </Text>
                    </Td>
                    <Td fontSize="16px">
                      {collection.whiteList.map((item) => {
                        return (
                          <Flex>
                            <Text mb="4px">
                              Id:{item.phaseId}. S:{" "}
                              {moment(item.phaseData?.startTime).format(
                                "DD/MM/YY, H:mm"
                              )}
                              - E:{" "}
                              {moment(item.phaseData?.endTime).format(
                                "DD/MM/YY, H:mm"
                              )}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Td>
                    <Td fontSize="16px">
                      {collection?.whiteList?.map(
                        ({
                          phaseId,
                          phaseData: { totalCountWLAddress, whitelistAmount },
                        }) => (
                          <Text mb="4px">
                            ({phaseId} - {totalCountWLAddress} -{" "}
                            {whitelistAmount})
                          </Text>
                        )
                      )}
                    </Td>

                    <Td py={7}>
                      {collection.isActive ? "Active" : "Inactive"}{" "}
                    </Td>

                    <Td>
                      {!collection.isActive ? (
                        <Button
                          size="sm"
                          color="black"
                          onClick={() =>
                            onSetStatusCollection(
                              collection.nftContractAddress,
                              true
                            )
                          }
                        >
                          Enable
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          color="#7ae7ff"
                          onClick={() =>
                            onSetStatusCollection(
                              collection.nftContractAddress,
                              false
                            )
                          }
                        >
                          Disable
                        </Button>
                      )}
                    </Td>

                    <Td>
                      {!isPhaseEnd(collection.startTime)
                        ? "Coming"
                        : isPhaseEnd(collection.endTime)
                        ? "End"
                        : "Live"}
                    </Td>

                    <Td py={7}>{collection.nft_count}</Td>

                    <Td py={7}>
                      <AddressCopier address={collection.nftContractAddress} />
                    </Td>
                    <Td py={7}>
                      <AddressCopier address={collection.collectionOwner} />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ProjectAdmin;
