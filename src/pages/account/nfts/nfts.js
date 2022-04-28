import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import MyNFTGroupCard from "../components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { clientAPI } from "@api/client";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../components/Loader/CommonLoader";
import { delay } from "../../../utils";
import { AccountActionTypes } from "../../../store/types/account.types";
import toast from "react-hot-toast";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();

  const [myCollections, setMyCollections] = useState(null);

  const [filterSelected, setFilterSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  function onClickHandler(v) {
    if (filterSelected !== v) {
      setFilterSelected(v);
      setMyCollections(null);
    }
  }

  useEffect(() => {
    const fetchMyCollections = async () => {
      const allCollectionsOwned = await clientAPI(
        "post",
        "/getCollectionsByOwner",
        {
          owner: currentAccount.address,
        }
      );

      const data = await Promise.all(
        allCollectionsOwned.map(async (collection) => {
          const options = {
            collection_address: collection.nftContractAddress,
            limit: 100,
            offset: 0,
            sort: -1,
          };

          let dataList = await clientAPI("post", "/getNFTs", options);

          if (Number(filterSelected) === 0) {
            dataList = dataList.filter((item) => item.is_for_sale !== true);
          }

          if (Number(filterSelected) === 1) {
            dataList = dataList.filter((item) => item.is_for_sale === true);
          }

          collection.listNFT = dataList;

          return collection;
        })
      );
      data.length ? setMyCollections(data) : setMyCollections(null);
    };

    if (!myCollections) {
      fetchMyCollections();
      setLoading(false);
    }
  }, [
    currentAccount.address,
    filterSelected,
    myCollections,
    tnxStatus?.status,
  ]);

  useEffect(() => {
    const forceUpdateAfterMint = async () => {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });

        setLoading(true);
        toast.promise(
          delay(9000).then(() => {
            setMyCollections(null);
            setLoading(false);
          }),
          {
            loading: "Loading new data...",
            success: `Done!`,
            error: "Could not load data.",
          }
        );
      }
    };

    forceUpdateAfterMint();
  }, [tnxStatus, dispatch]);

  console.log("myCollections", myCollections);
  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My NFTs</Heading>

          <Spacer />

          <Button
            isActive={filterSelected === 0}
            variant="outline"
            mx={1}
            id="collected"
            onClick={() => onClickHandler(0)}
          >
            Collected
          </Button>

          <Button
            isActive={filterSelected === 1}
            variant="outline"
            mx={1}
            id="listed"
            onClick={() => onClickHandler(1)}
          >
            My Listing
          </Button>

          <Button
            isActive={filterSelected === 2}
            variant="outline"
            mx={1}
            id="bid"
            onClick={() => onClickHandler(2)}
          >
            My Bids
          </Button>

          <IconButton
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
            onClick={() => setMyCollections(null)}
          />
        </Flex>

        {loading ? (
          <CommonLoader
            addText={`Please wait a moment...`}
            size="md"
            maxH={"4.125rem"}
          />
        ) : (
          <>
            {myCollections?.length === 0 ? (
              <VStack py={10} align="start" ml={3} justifyContent="center">
                <Text textAlign="center" color="brand.grayLight" size="2xs">
                  You don't have any NFT yet.
                </Text>
              </VStack>
            ) : (
              myCollections?.map((item) => {
                return <MyNFTGroupCard {...item} />;
              })
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyNFTsPage;
