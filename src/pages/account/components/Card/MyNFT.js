import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  Square,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
  Spacer
} from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { clientAPI } from "@api/client";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { IPFS_BASE_URL } from "@constants/index";
import {getCachedImage,secondsToTime,delay} from "@utils";
import staking_calls from "@utils/blockchain/staking_calls";
import staking from "@utils/blockchain/staking";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import useInterval from 'use-interval'
import { useDispatch } from "react-redux";
import BN from "bn.js";

function MyNFTCard({
  nftContractAddress,
  is_for_sale,
  price,
  avatar,
  tokenID,
  nftName,
  stakeStatus,  //0 not show, 1 not staked, 2 staked , 3 pending unstake
  isBid,
}){
  const dispatch = useDispatch();
  const {currentAccount } = useSubstrateState();
  const [unstakeRequestTime,setUnstakeRequestTime] = useState(0);
  const [countdownTime,setCountdownTime] = useState(0);
  const [isUnstakeTime,setIsUnstakeTime] = useState(false);
  const [nftImage,setNftImage] = useState(null);
  const getRequestTime = async () =>{
    let time = await staking_calls.getRequestUnstakeTime(currentAccount,currentAccount.address,tokenID);
    console.log(time);
    setUnstakeRequestTime(time);

  }
  const requestUpdateNFT = async () =>{
    console.log('request update',nftContractAddress,tokenID);
    await clientAPI("post", "/updateNFT", {
      collection_address: nftContractAddress,
      token_id: tokenID,
    });
  }
  useInterval(() => {
    if (unstakeRequestTime){
      let now = (new Date()).getTime()/1000;
      let valid_time = unstakeRequestTime/1000 + 5 * 60;
      if (valid_time - now > 0)
        setCountdownTime(secondsToTime(valid_time - now));
      else{
        setIsUnstakeTime(true);
        setCountdownTime({h:0,m:0,s:0});
      }

    }
  }, 1000);

  useEffect(() => {
    setNftImage(avatar ? getCachedImage(avatar,500,IPFS_BASE_URL +"/"+ avatar.replace("ipfs://","")) : "");
    if (stakeStatus == 3)
      getRequestTime();
    //console.log(listNFT,'showOnChainMetadata',showOnChainMetadata);
    requestUpdateNFT();
  }, [stakeStatus]);

  async function stakeAction(stakeStatus){

    if (stakeStatus == 1){
      let allowance = await artzero_nft_calls.allowance(currentAccount,
      currentAccount.address,
      staking.CONTRACT_ADDRESS,
      { u64: tokenID });

      if (!allowance){
        toast('Approve NFT...')
        await artzero_nft_calls.approve(currentAccount,
        staking.CONTRACT_ADDRESS,
        { u64: tokenID },true);
        await delay(3000)
      }

      //Token is unstaked, Stake Now
      toast('Staking NFT...')
      await staking_calls.stake(currentAccount,[tokenID],dispatch);

    }
    else if (stakeStatus == 2){
      //Token is staked, Request Unstake Now
      toast('Request Unstaking NFT...')
      await staking_calls.requestUnstake(currentAccount,[tokenID],dispatch);
    }
    else if (stakeStatus == 3){
      if (isUnstakeTime){
        toast('Unstaking NFT...')
        await staking_calls.unstake(currentAccount,[tokenID],dispatch);
      }
      else {
        toast('Cancel Unstaking Request...')
        await staking_calls.cancelRequestUnstake(currentAccount,[tokenID],dispatch);
      }
    }
 }

  return (
    <Box
      minW="14.25rem"
      borderWidth={"2px"}
      borderColor="transparent"
      _hover={{ borderColor: "brand.blue" }}
      h="full"
    >
      <Flex
        minW={56}
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        h="full"
      >
        <Square minW={56} bg="#372648">
          <Image
            alt={nftName}
            h="full"
            w="full"
            objectFit="cover"
            src={nftImage}
            fallback={<Skeleton w="full" h="full" minH={56} minW={56} />}
          />
        </Square>

        <Box w="full" p={3}>
          <Heading mb={3} size="h6" textAlign="left">
            {nftName}
          </Heading>
          <Flex align="center" justify="start" w="full" mb={3}>
            {stakeStatus == 3 ?
              <Text textAlign="center" color="brand.grayLight" size="2xs">
              Unstake in {countdownTime ? countdownTime.h : 0}h : {countdownTime ? countdownTime.m : 0}m : {countdownTime ? countdownTime.s : 0}s
              </Text>
              :
              null
            }
          </Flex>
          {stakeStatus != 0 ?
            <Flex align="center" justify="start" w="full">
              <Button variant="outline" onClick={() => stakeAction(stakeStatus)}>
              {stakeStatus == 1 ?
                  "Stake"
                :
                stakeStatus == 2 ?
                "Request Unstake"
                :
                !isUnstakeTime ?
                "Cancel Unstake"
                :
                "Unstake"
              }
              </Button>
            </Flex>
            :
            null
          }

          {(is_for_sale || isBid) && (
            <Flex align="center" justify="start" w="full">
              <VStack align="start">
                <Text ml={1} color="brand.grayLight">
                  {is_for_sale && "For sale at"}
                </Text>
                <Tag>
                  <TagLabel>
                    {new BN(price).div(new BN(10**6)).toNumber() / (10 ** 6)}
                  </TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>
              </VStack>
              <Spacer />
              <VStack align="start">
                <Text ml={1} color="brand.grayLight">
                  {isBid?.status && "My offer"}
                </Text>
                <Tag>
                  <TagLabel>
                    {new BN(isBid?.bidPrice).div(new BN(10**6)).toNumber() / (10 ** 6)}
                  </TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>
              </VStack>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
export default MyNFTCard;
