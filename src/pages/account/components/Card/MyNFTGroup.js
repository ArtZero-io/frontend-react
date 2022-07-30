import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import MyNFTCard from "./MyNFT";
import { createObjAttrsNFT } from "@utils/index";
import ResponsivelySizedModal from "@components/Modal/Modal";
import { getCachedImageShort } from "@utils";
import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";
import { motion, useAnimation } from "framer-motion";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { ContractPromise } from "@polkadot/api-contract";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { setTxStatus } from "@store/actions/txStatus";
import {
  START,
  STAKE,
  REQUEST_UNSTAKE,
  CANCEL_REQUEST_UNSTAKE,
  UNSTAKE,
} from "@constants";
import { useDispatch, useSelector } from "react-redux";
import staking_calls from "@utils/blockchain/staking_calls";
import staking from "@utils/blockchain/staking";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { delay } from "@utils";

function MyNFTGroupCard({
  name,
  avatarImage,
  listNFT,
  contractType,
  showOnChainMetadata,
  filterSelected,
  nftContractAddress,
  hasBottomBorder = false,
  ...rest
}) {
  const { currentAccount, api } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [listNFTFormatted, setListNFTFormatted] = useState(null);
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  const history = useHistory();
  const location = useLocation();

  function onClickHandler(item) {
    if (isBigScreen) {
      setSelectedNFT(item);
      item?.stakeStatus === 0 && onOpen();
      return;
    }

    if (location?.pathname === "/account/nfts") {
      history.push(`/nft/${item.nftContractAddress}/${item.tokenID}`);
    }
  }

  useEffect(() => {
    let isSubscribed = true;

    const getAttributesData = async () => {
      if (showOnChainMetadata) {
        //On-Chain Data
        const data = listNFT?.map((item) => {
          const itemData = createObjAttrsNFT(
            item.attributes,
            item.attributesValue
          );

          return { ...item, ...itemData };
        });

        setListNFTFormatted(data);
      } else {
        //Off-chain Data

        if (nftContractAddress) {
          const nft_contract = new ContractPromise(
            api,
            nft721_psp34_standard.CONTRACT_ABI,
            nftContractAddress
          );

          const gasLimit = -1;
          const azero_value = 0;

          const { result, output } = await nft_contract.query[
            "psp34Traits::tokenUri"
          ](currentAccount?.address, { value: azero_value, gasLimit }, 1);

          if (!result.isOk) {
            toast.error("There is an error when loading token_uri!");
            return;
          }

          const tokenUri = output.toHuman()?.replace("1.json", "");

          Promise.all(
            listNFT.map(async (item) => {
              const res = await getMetaDataType1(item.tokenID, tokenUri);

              return { ...item, ...res };
            })
          ).then((result) => {
            isSubscribed && setListNFTFormatted(result);
          });
        }
      }
    };

    getAttributesData();
    return () => (isSubscribed = false);

    //console.log(listNFT,'showOnChainMetadata',showOnChainMetadata);
  }, [api, currentAccount, listNFT, nftContractAddress, showOnChainMetadata]);

  return (
    <Box my={10} position="relative">
      <ResponsivelySizedModal
        contractType={contractType}
        {...selectedNFT}
        isOpen={isOpen}
        onClose={onClose}
        hasTabs={true}
        filterSelected={filterSelected}
        showOnChainMetadata={showOnChainMetadata}
        {...rest}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex w="full">
          <Avatar
            size={"lg"}
            border="2px solid white"
            src={getCachedImageShort(avatarImage, 100)}
          />
          <VStack align="start" ml={3} justifyContent="center">
            <Heading
              size="h6"
              cursor="pointer"
              _hover={{ color: "#7ae7ff" }}
              onClick={() => history.push(`/collection/${nftContractAddress}`)}
            >
              {name}
            </Heading>
            <Text textAlign="left" color="brand.grayLight" size="2xs">
              {listNFTFormatted?.length} items
            </Text>
          </VStack>
        </Flex>
      </motion.div>

      {!listNFTFormatted?.length ? (
        <VStack
          py={10}
          align="start"
          ml={3}
          justifyContent="center"
          borderBottomWidth={hasBottomBorder ? "1px" : "0px"}
        >
          <Text textAlign="center" color="brand.grayLight" size="2xs">
            No NFT found
          </Text>
        </VStack>
      ) : (
        <Box borderBottomWidth={hasBottomBorder ? "1px" : "0px"}>
          <GridNftA
            listNFTFormatted={listNFTFormatted}
            onClickHandler={onClickHandler}
          />
        </Box>
      )}
    </Box>
  );
}

export default MyNFTGroupCard;

function GridNftA({
  listNFTFormatted,
  onClickHandler,
  variant = "my-collection",
}) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

  useEffect(() => {
    controls.start("visible");
  }, [listNFTFormatted, controls]);

  const txStatus = useSelector((state) => state.txStatus);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();

  const [multiStakeData, setMultiStakeData] = useState({
    action: null,
    list: [],
  });

  // const multiStakeDataRef = useRef(multiStakeData);

  async function handleStakeAction(action, tokenIDArray) {
    if (action === STAKE) {
      dispatch(
        setTxStatus({ txType: STAKE, txStatus: START, tokenID: tokenIDArray })
      );

      let res;
      let allowance;

      if (tokenIDArray?.length === 1) {
        allowance = await artzero_nft_calls.allowance(
          currentAccount,
          currentAccount.address,
          staking.CONTRACT_ADDRESS,
          { u64: tokenIDArray[0] }
        );

        if (!allowance) {
          toast.success("Step 1: Approving NFT for staking...");
          res = await artzero_nft_calls.approve(
            currentAccount,
            staking.CONTRACT_ADDRESS,
            { u64: tokenIDArray[0] },
            true,
            dispatch
          );
        }
      }

      if (tokenIDArray?.length > 1) {
        allowance = await artzero_nft_calls.allowance(
          currentAccount,
          currentAccount.address,
          staking.CONTRACT_ADDRESS,
          null
        );

        if (!allowance) {
          toast.success("Step 1: Approving NFT for staking...");

          res = await artzero_nft_calls.approve(
            currentAccount,
            staking.CONTRACT_ADDRESS,
            null,
            true,
            dispatch
          );
        }
      }

      if (res || allowance) {
        //Token is unstaked, Stake Now

        toast.success(res ? "Step 2: Staking..." : "Staking...");

        await delay(3000).then(async () => {
          await staking_calls.stake(
            currentAccount,
            tokenIDArray,
            dispatch,
            STAKE,
            api
          );
        });
        return;
      }
    }

    if (action === REQUEST_UNSTAKE) {
      dispatch(
        setTxStatus({
          txType: REQUEST_UNSTAKE,
          txStatus: START,
          tokenID: tokenIDArray,
        })
      );
      //Token is staked, Request Unstake Now

      toast.success("Request Unstaking NFT...");

      await staking_calls.requestUnstake(
        currentAccount,
        tokenIDArray,
        dispatch,
        REQUEST_UNSTAKE,
        api
      );
    }

    if (action === UNSTAKE) {
      dispatch(
        setTxStatus({ txType: UNSTAKE, txStatus: START, tokenID: tokenIDArray })
      );

      toast.success("Unstaking NFT...");

      await staking_calls.unstake(
        currentAccount,
        tokenIDArray,
        dispatch,
        UNSTAKE,
        api
      );
    }

    if (action === CANCEL_REQUEST_UNSTAKE) {
      dispatch(
        setTxStatus({
          txType: CANCEL_REQUEST_UNSTAKE,
          txStatus: START,
          tokenID: tokenIDArray,
        })
      );

      toast("Cancel Unstaking Request...");

      await staking_calls.cancelRequestUnstake(
        currentAccount,
        tokenIDArray,
        dispatch,
        CANCEL_REQUEST_UNSTAKE,
        api
      );
    }
  }

  function handleSelectMultiNfts(tokenID, action, isChecked) {
    let newData = { ...multiStakeData };

    // Initial data is empty
    if (multiStakeData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.list = [tokenID];
      setMultiStakeData(newData);
      // multiStakeDataRef.current = newData;
      return;
    }

    if (multiStakeData?.action !== action) {
      return toast.error("Please select same action!");
    }
    const isExisted = multiStakeData?.list.includes(tokenID);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");
      const newList = multiStakeData?.list;
      newData.list = [...newList, tokenID];

      setMultiStakeData(newData);
      // multiStakeDataRef.current = newData;

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiStakeData?.list?.filter((item) => item !== tokenID);
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiStakeData(newData);
      // multiStakeDataRef.current = newData;
    }
  }

  return (
    <>
      {multiStakeData?.action !== null ? (
        <motion.div
          id="image-ufo-2"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: "9999",
          }}
          animate={{
            y: [0, 1.5, 0],
            rotate: 0,
            scale: [1, 1, 1],
          }}
          transition={{
            duration: 1.5,
            curve: [0.42, 0, 0.58, 1],
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Button
            isDisabled={
              txStatus?.stakeStatus ||
              txStatus?.unstakeStatus ||
              txStatus?.cancelRequestUnstakeStatus ||
              txStatus?.requestUnstakeStatus
            }
            // position="fixed"
            // bottom={["30px", "60px"]}
            // right={["30px", "60px"]}
            // size="sm"
            // zIndex="modal"
            onClick={() =>
              handleStakeAction(
                multiStakeData?.action,
                multiStakeData?.list,
                dispatch,
                api,
                currentAccount
              )
            }
          >
            {multiStakeData?.action === REQUEST_UNSTAKE
              ? "request unstake"
              : multiStakeData?.action === CANCEL_REQUEST_UNSTAKE
              ? "cancel request unstake"
              : multiStakeData?.action}{" "}
            tokens:
            {multiStakeData?.list?.map((i, idx) => (
              <Fragment key={idx}>
                {idx === 0 ? "" : ","} #{i}
              </Fragment>
            ))}
          </Button>
        </motion.div>
      ) : null}

      <motion.div
        initial="hidden"
        animate={controls}
        variants={{}}
        id="grid-item-div"
        style={{
          display: "grid",
          marginTop: "2.5rem",
          gridAutoFlow: "dense",
          justifyItems: "center",
          marginBottom: "2.5rem",
          // gridGap: "1.875rem",
          // borderBottom: "0.125rem",
          // gridAutoRows: "20.625rem",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, 224px), 1fr))`,
        }}
      >
        {listNFTFormatted.length > 0 &&
          listNFTFormatted?.map((c, i) => (
            <GridItemA
              key={i}
              i={i}
              delayPerPixel={delayPerPixel}
              originOffset={originOffset}
              id="grid-item-a"
              onClick={() => onClickHandler(c)}
            >
              <MyNFTCard
                {...c}
                handleStakeAction={handleStakeAction}
                handleSelectMultiNfts={handleSelectMultiNfts}
                multiStakeData={multiStakeData}
              />
            </GridItemA>
          ))}
      </motion.div>
    </>
  );
}

function GridItemA({
  delayPerPixel,
  i,
  originIndex,
  originOffset,
  children,
  onClick,
}) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: (delayRef) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delayRef.current },
    }),
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [i, originIndex, originOffset]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [children, delayPerPixel, originOffset]);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      custom={delayRef}
      style={{
        position: "relative",
        cursor: "pointer",
        marginBottom: "1rem",
      }}
      onClick={() => onClick()}
    >
      {children}
    </motion.div>
  );
}

const getMetaDataType1 = async (tokenID, token_uri) => {
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
};
