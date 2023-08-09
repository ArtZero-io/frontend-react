import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  Slide,
  Square,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import MyNFTCard from "./MyNFT";
import ResponsivelySizedModal from "@components/Modal/Modal";
import { useSubstrateState } from "@utils/substrate";
import { motion, useAnimation } from "framer-motion";
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
import CommonButton from "../Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import ImageCloudFlare from "../ImageWrapper/ImageCloudFlare";
import InActiveIcon from "@theme/assets/icon/InActive.js";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import useBulkListing from "../../hooks/useBulkListing";
import { CloseButton } from "@chakra-ui/react";
import useForceUpdate from "@hooks/useForceUpdate";
import useBulkTransfer from "../../hooks/useBulkTransfer";
import { isMobile } from "react-device-detect";
import useBulkDelist from "../../hooks/useBulkDelist";
import useBulkRemoveBids from "../../hooks/useBulkRemoveBids";
import { formatNumDynamicDecimal } from "../../utils";

function MyNFTGroupCard({
  name,
  avatarImage,
  listNFT,
  contractType,
  showOnChainMetadata,
  filterSelected,
  nftContractAddress,
  hasBottomBorder = false,
  isStakingContractLocked,
  type,
  ...rest
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  const history = useHistory();
  const location = useLocation();

  function onClickHandler(item) {
    if (type === "public") return;

    if (isBigScreen) {
      setSelectedNFT(item);
      item?.stakeStatus === 0 && onOpen();
      return;
    }

    if (location?.pathname === "/account/nfts") {
      history.push(`/nft/${item.nftContractAddress}/${item.tokenID}`);
    }
  }
  const { doBulkRemoveBids } = useBulkRemoveBids({ listNFTFormatted: listNFT });
  const { actionType, tokenIDArray, ...restStatus } = useTxStatus();

  return (
    <Box my={10} position="relative">
      <ResponsivelySizedModal
        contractType={contractType}
        isOpen={isOpen}
        onClose={onClose}
        hasTabs={true}
        filterSelected={filterSelected}
        showOnChainMetadata={showOnChainMetadata}
        {...selectedNFT}
        {...rest}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex w="full" alignItems="center">
          <ImageCloudFlare
            w="64px"
            h="64px"
            size={100}
            src={avatarImage}
            borderRadius="full"
            border="2px solid white"
          />
          <VStack w="full" align="start" ml={3} justifyContent="center">
            <Flex justifyContent="start" alignItems="center">
              <Heading
                size="h6"
                cursor="pointer"
                _hover={{ color: "#7ae7ff" }}
                onClick={() =>
                  history.push(`/collection/${nftContractAddress}`)
                }
              >
                {name}
              </Heading>
              {/* Keep use rest?.isActive - no change */}
              {!rest?.isActive && (
                <Tooltip
                  placeContent="start"
                  hasArrow
                  bg="#333"
                  color="#fff"
                  borderRadius="0"
                  label="This collection is not enabled on the Marketplace yet."
                >
                  <Tag variant="inActive" fontSize={["14px", "16px"]}>
                    <TagLeftIcon as={InActiveIcon} />
                    <TagLabel textTransform="capitalize">Inactive</TagLabel>
                  </Tag>
                </Tooltip>
              )}
            </Flex>

            <Text textAlign="left" color="brand.grayLight" size="2xs">
              {listNFT?.length} item
              {listNFT?.length > 1 ? "s" : ""}
            </Text>
          </VStack>

          {!isMobile && filterSelected === "BIDS" && (
            <CommonButton
              size="sm"
              {...restStatus}
              text={listNFT?.length > 1 ? "Remove All Bids" : "Remove Bid"}
              onClick={() => doBulkRemoveBids()}
            />
          )}
        </Flex>
        {isMobile && filterSelected === "BIDS" && (
          <CommonButton
            size="sm"
            {...restStatus}
            text={listNFT?.length > 1 ? "Remove All Bids" : "Remove Bid"}
            onClick={() => doBulkRemoveBids()}
          />
        )}
      </motion.div>

      {!listNFT?.length ? (
        <VStack
          py={10}
          ml={3}
          align="start"
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
            {...rest}
            isStakingContractLocked={isStakingContractLocked}
            listNFTFormatted={listNFT}
            onClickHandler={onClickHandler}
            collectionName={name}
            nftContractAddress={nftContractAddress}
            filterSelected={filterSelected}
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
  isStakingContractLocked,
  collectionName,
  nftContractAddress,
  variant = "my-collection",
  isActive,
  filterSelected,
}) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

  useEffect(() => {
    controls.start("visible");
  }, [listNFTFormatted, controls]);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();

  const [multiStakeData, setMultiStakeData] = useState({
    action: null,
    list: [],
  });

  const cardSize = useBreakpointValue([156, 224]);

  async function handleStakeAction(action, tokenIDArray) {
    if (isStakingContractLocked) {
      return toast.error("Staking contract is locked!");
    }

    if (action === STAKE) {
      dispatch(setTxStatus({ type: STAKE, step: START, tokenIDArray }));

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
        setTxStatus({ type: REQUEST_UNSTAKE, step: START, tokenIDArray })
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
      dispatch(setTxStatus({ type: UNSTAKE, step: START, tokenIDArray }));

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
        setTxStatus({ type: CANCEL_REQUEST_UNSTAKE, step: START, tokenIDArray })
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

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiStakeData?.list?.filter((item) => item !== tokenID);
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiStakeData(newData);
    }
  }

  const multiStakeButtonText = () => {
    const actionText =
      multiStakeData?.action === REQUEST_UNSTAKE
        ? "request unstake"
        : multiStakeData?.action === CANCEL_REQUEST_UNSTAKE
        ? "cancel unstake"
        : multiStakeData?.action;

    return <Text>{actionText}</Text>;
  };

  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  // =============================================================

  const {
    multiListingData,
    showSlideMultiListing,
    doBulkListing,
    multiListingActionMode,
    handleSelectMultiListing,
    handleInputChangeMultiListing,
    handleCloseButtonForMultiListing,
  } = useBulkListing({
    listNFTFormatted,
    nftContractAddress,
  });

  const {
    multiTransferData,
    showSlideMultiTransfer,
    doBulkTransfer,
    multiTransferActionMode,
    handleSelectMultiTransfer,
    // handleInputChangeMultiTransfer,
    handleInputChangeReceiverAddress,
    handleCloseButtonForMultiTransfer,
  } = useBulkTransfer({
    listNFTFormatted,
  });

  const {
    multiDelistData,
    showSlideMultiDelist,
    doBulkDelist,
    handleSelectMultiDelist,
  } = useBulkDelist({
    listNFTFormatted,
  });

  // eslint-disable-next-line no-unused-vars
  const { loading: _loadingForceUpdate } = useForceUpdate(
    ["MULTI_TRANSFER", "MULTI_LISTING"],
    () => {
      handleCloseButtonForMultiTransfer();
      handleCloseButtonForMultiListing();
    },
    true
  );
  // END =============================================================
  const { bulkTxMode } = useSelector((s) => s?.account?.bulkTxStatus);

  const templateColumnsListing = isMobile
    ? "repeat(1, 1fr)"
    : "repeat(12, 1fr)";

  const templateRowsListing = isMobile ? "repeat(2, 1fr)" : "repeat(1, 1fr)";

  return (
    <>
      {multiStakeData?.action !== null ? (
        <motion.div
          style={{
            width: "100%",
            position: "fixed",
            bottom: "30px",
            right: "0px",
            zIndex: "10",
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
          <CommonButton
            {...rest}
            minH="content"
            text={multiStakeButtonText()}
            onClick={() =>
              handleStakeAction(
                multiStakeData?.action,
                multiStakeData?.list,
                dispatch,
                api,
                currentAccount
              )
            }
          />
        </motion.div>
      ) : null}

      {/* MULTI DE-LISTING */}
      {showSlideMultiDelist ? (
        <motion.div
          style={{
            width: "100%",
            position: "fixed",
            bottom: "30px",
            right: "0px",
            zIndex: "10",
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
          <CommonButton
            {...rest}
            minH="content"
            py="20px"
            text={
              <>
                Delist
                {` ${multiDelistData?.list?.length} NFT${
                  multiDelistData?.listInfo?.length > 1 ? "s" : ""
                }`}
                <br />
                {`${collectionName}`}
              </>
            }
            onClick={() => doBulkDelist()}
          />
        </motion.div>
      ) : null}
      {/*END MULTI DE-LISTING */}

      {/* MULTI LISTING */}
      <Slide
        direction="bottom"
        in={showSlideMultiListing}
        style={{
          zIndex: 10,
          maxHeight: "300px",
          height: "100%",
        }}
      >
        <Box
          position="relative"
          maxW="1920px"
          height="100%"
          p="20px"
          color="white"
          mt="4"
          bg="#222"
          rounded="none"
          shadow="md"
        >
          <CloseButton
            position="absolute"
            top={-6}
            right={1}
            size="sm"
            borderRadius="0"
            onClick={handleCloseButtonForMultiListing}
          />
          <Grid
            h="200px"
            templateColumns={templateColumnsListing}
            templateRows={templateRowsListing}
            gap={2}
          >
            <GridItem colSpan={isMobile ? 5 : 10}>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                {multiListingData?.list?.map((item, idx) => {
                  return (
                    <Flex key={`${item}${idx}`}>
                      {formatSelectedNFT(
                        collectionName,
                        listNFTFormatted,
                        item,
                        multiListingActionMode,
                        multiListingData?.infoList,
                        idx,
                        actionType,
                        handleInputChangeMultiListing
                      )}
                    </Flex>
                  );
                })}
              </Grid>
            </GridItem>

            <GridItem colSpan={isMobile ? 5 : 2}>
              <Box
                fontSize={["14px", "16px"]}
                height="100%"
                p={isMobile ? "10px" : "20px"}
                color="white"
                bg="teal.900"
                rounded="none"
                shadow="md"
              >
                <Heading size="h6" fontSize="14px">
                  Bulk Listing
                </Heading>

                <Flex textAlign="left" my={isMobile ? "10px" : "20px"}>
                  {`Your are listing ${multiListingData?.listInfo?.length} NFT${
                    multiListingData?.listInfo?.length > 1 ? "s" : ""
                  } ${collectionName}.`}{" "}
                  <>
                    {` Total sale:
                    ${formatNumDynamicDecimal(
                      multiListingData?.listInfo?.reduce((a, b) => {
                        return a + parseInt(b?.price || 0);
                      }, 0)
                    )}
                    $AZERO`}
                  </>
                </Flex>

                <Flex pt="10px" w="full" justifyContent="center">
                  <CommonButton
                    {...rest}
                    size="sm"
                    text="List now"
                    onClick={() => {
                      if (!isActive) {
                        toast.error("Collection is disabled!");
                        return;
                      }
                      doBulkListing();
                    }}
                  />
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Slide>
      {/*END MULTI LISTING */}
      {/* MULTI TRANSFER */}
      <Slide
        direction="bottom"
        in={showSlideMultiTransfer}
        style={{
          zIndex: 10,
          maxHeight: "300px",
          height: "100%",
        }}
      >
        <Box
          position="relative"
          maxW="1920px"
          height="100%"
          p="20px"
          color="white"
          mt="4"
          bg="#222"
          rounded="none"
          shadow="md"
        >
          <CloseButton
            position="absolute"
            top={-6}
            right={1}
            size="sm"
            borderRadius="0"
            onClick={handleCloseButtonForMultiTransfer}
          />
          <Grid
            h="200px"
            templateColumns={templateColumnsListing}
            templateRows={templateRowsListing}
            gap={2}
          >
            <GridItem colSpan={isMobile ? 5 : 9}>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                {multiTransferData?.list?.map((item, idx) => {
                  return (
                    <Flex key={`${item}${idx}`}>
                      {formatSelectedNFT(
                        collectionName,
                        listNFTFormatted,
                        item,
                        multiTransferActionMode,
                        multiTransferData?.infoList,
                        idx,
                        actionType
                      )}
                    </Flex>
                  );
                })}
              </Grid>
            </GridItem>

            <GridItem colSpan={isMobile ? 5 : 3}>
              <Box
                fontSize={["14px", "16px"]}
                height="100%"
                p={isMobile ? "10px" : "20px"}
                px="10px"
                color="white"
                bg="teal.900"
                rounded="none"
                shadow="md"
              >
                <Heading size="h6" fontSize="14px">
                  Bulk Transfer
                </Heading>

                <Flex textAlign="left" my={isMobile ? "10px" : "20px"}>
                  {`Your are transfer ${
                    multiTransferData?.listInfo?.length
                  } NFT${
                    multiTransferData?.listInfo?.length > 1 ? "s" : ""
                  } ${collectionName}`}{" "}
                  to address:
                </Flex>
                
                <Flex alignItems="center">
                  <Input
                    h={["25px", "40px"]}
                    w="full"
                    borderRadius={0}
                    type="text"
                    fontSize="14px"
                    size="md"
                    px="5px"
                    value={multiTransferData?.receiverAddress}
                    isDisabled={actionType}
                    placeholder="5ABCD ..."
                    _placeholder={{ fontSize: "14px" }}
                    onChange={({ target }) => {
                      handleInputChangeReceiverAddress(target.value);
                    }}
                  />
                  {isMobile && (
                    <CommonButton
                      h={["25px"]}
                      {...rest}
                      size="sm"
                      text="Transfer now"
                      onClick={doBulkTransfer}
                    />
                  )}
                </Flex>

                {!isMobile && (
                  <Flex pt="10px" w="full" justifyContent="center">
                    <CommonButton
                      {...rest}
                      size="sm"
                      text="Transfer now"
                      onClick={doBulkTransfer}
                    />
                  </Flex>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Slide>
      {/*END MULTI TRANSFER */}

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
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${cardSize}px), 1fr))`,
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
              onClick={() => !bulkTxMode && onClickHandler(c)}
            >
              <MyNFTCard
                {...c}
                handleStakeAction={handleStakeAction}
                handleSelectMultiNfts={handleSelectMultiNfts}
                multiStakeData={multiStakeData}
                multiListingData={multiListingData}
                handleSelectMultiListing={handleSelectMultiListing}
                multiTransferData={multiTransferData}
                handleSelectMultiTransfer={handleSelectMultiTransfer}
                filterSelected={filterSelected}
                multiDelistData={multiDelistData}
                handleSelectMultiDelist={handleSelectMultiDelist}
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

function formatSelectedNFT(
  collectionName,
  listNFT,
  id,
  mode,
  infoList,
  idx,
  actionType,
  onChange
) {
  const selectedNFT = listNFT?.filter((item) => item.tokenID === id);
  const { avatar, nftName, tokenID } = selectedNFT[0];

  return (
    <Flex
      py={[0, 1]}
      px={[0, 2]}
      bg="#343"
      justifyContent="center"
      alignItems="center"
    >
      {!isMobile && (
        <Square h={"40px"} w={"40px"}>
          <ImageCloudFlare
            h={"40px"}
            w={"40px"}
            src={avatar}
            alt={`header-img-${nftName}`}
          />
        </Square>
      )}
      <Box flexShrink={1} w="full" py={1} px={2}>
        <Text mb={1} fontSize={["xs", "md"]} textAlign="left">
          {!isMobile
            ? nftName
            : mode === "MULTI_LISTING"
            ? `#${tokenID}`
            : nftName}
        </Text>
        {!isMobile && (
          <Heading mb={0} fontSize={["xs"]} textAlign="left">
            {collectionName}
          </Heading>
        )}
      </Box>

      {mode === "MULTI_LISTING" && (
        <Box py={[0, 1]} px={[0, 2]}>
          <InputGroup position="relative">
            <Input
              h={["25px", "40px"]}
              inputmode="decimal"
              textAlign="right"
              w="full"
              borderRadius={0}
              type="number"
              fontSize={["12px", "14px"]}
              size="md"
              pr={["16px", "26px"]}
              value={infoList && infoList[idx]?.price}
              isDisabled={actionType}
              placeholder="0"
              _placeholder={{ fontSize: "14px" }}
              onChange={({ target }) => {
                onChange(target.value, idx);
              }}
            />
            <AzeroIcon
              right={["8px", "10px"]}
              top={["3px", "12px"]}
              position="absolute"
              w={["10px", "14px"]}
            />
          </InputGroup>
        </Box>
      )}

      {/* MULTI_TRANSFER */}
      {/* {mode === "MULTI_TRANSFER" && (
        <Box py={1} px={2}>
          <InputGroup position="relative">
            <Input
              textAlign="right"
              w="full"
              borderRadius={0}
              type="text"
              fontSize="14px"
              size="md"
              pr="26px"
              value={infoList && infoList[idx]?.price}
              isDisabled={actionType}
              placeholder="5EFUE..."
              _placeholder={{ fontSize: "14px" }}
              onChange={({ target }) => {
                onChange(target.value, idx);
              }}
            />
          </InputGroup>
        </Box>
      )} */}
    </Flex>
  );
}
