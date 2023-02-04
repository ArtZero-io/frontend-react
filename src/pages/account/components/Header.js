import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react";

import EditIcon from "@theme/assets/icon/Edit.js";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getProfile } from "@actions/account";
import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar";
import { useSubstrateState } from "@utils/substrate";
import ProfileModal from "./Modal/Profile";
import toast from "react-hot-toast";
import { truncateStr } from "@utils";
import SocialCard from "@components/Card/Social";
import { UPDATE_PROFILE } from "@constants";
import useForceUpdate from "@hooks/useForceUpdate";
import ImageCloudFlare from "../../../components/ImageWrapper/ImageCloudFlare";

import CommonButton from "@components/Button/CommonButton";

import marketplace from "../../../utils/blockchain/marketplace";
import { delay } from "@utils";
import {
  execContractQuery,
  execContractTx,
  formatQueryResultToNumber,
} from "../nfts/nfts";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

function ProfileHeader() {
  const dispatch = useDispatch();

  const { currentAccount, api } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState(null);

  const avatarProfileSize = useBreakpointValue([64, 120]);

  const forceUpdate = useCallback(() => {
    setProfile(null);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!api) return;

      const res = await dispatch(getProfile(currentAccount));
      if (res.status === "OK") {
        if (!res.data.username) {
          res.data.username = truncateStr(currentAccount?.address);
        }

        setProfile((prev) => {
          return {
            ...res.data,
            address: currentAccount?.address,
          };
        });
      } else {
        toast.error(res.message);
      }
    };

    if (!profile?.address || profile?.address !== currentAccount?.address) {
      fetchProfile();
    }
  }, [api, currentAccount, dispatch, profile]);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_PROFILE],
    () => async () => {
      const res = await dispatch(getProfile(currentAccount));
      if (res.status === "OK") {
        if (!res.data.username) {
          res.data.username = truncateStr(currentAccount?.address);
        }

        setProfile((prev) => {
          return {
            ...res.data,
            address: currentAccount?.address,
          };
        });
      } else {
        toast.error(res.message);
      }
    }
  );

  const [claimAmount, setClaimAmount] = useState(0);

  const fetchMyBidHoldInfo = useCallback(async () => {
    if (!api) return;

    const queryResult = await execContractQuery(
      currentAccount?.address,
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS,
      "getHoldAmountOfBidder",
      currentAccount?.address
    );

    const amount = formatQueryResultToNumber(queryResult);

    setClaimAmount(amount);
  }, [api, currentAccount?.address]);

  useEffect(() => {
    fetchMyBidHoldInfo();
  }, [fetchMyBidHoldInfo]);

  const onClaimHandler = async () => {
    await execContractTx(
      currentAccount,
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS,
      0, //=>value
      "receiveHoldAmount",
      currentAccount?.address
    );

    await delay(2000).then(() => {
      toast.success("You have unsuccessful Bids to claim!");
      fetchMyBidHoldInfo();
    });
  };

  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "14" }}
    >
      <ProfileModal
        profile={profile}
        isOpen={isOpen}
        onClose={onClose}
        forceUpdate={forceUpdate}
      />
      <VStack>
        <Center
          rounded="full"
          p="-px"
          border="4px solid"
          borderColor="white"
          w={["68px", "128px", "128px"]}
          h={["68px", "128px", "128px"]}
        >
          {profile?.avatar && (
            <ImageCloudFlare
              size="500"
              borderRadius="full"
              h={["68px", "120px", "120px"]}
              w={["68px", "120px", "120px"]}
              src={profile?.avatar}
            />
          )}
          {!profile?.avatar && <IdenticonAvatar size={avatarProfileSize} />}
        </Center>

        <HStack w="full" justifyContent="space-around" py={4}>
          <VStack textAlign="center" justifyContent="space-between">
            <Center w="full" pos="relative">
              <Heading fontSize={["3xl-mid", "5xl", "5xl"]} ml="40px">
                {profile?.username || truncateStr(currentAccount.address)}
              </Heading>
              <IconButton
                pos="relative"
                bottom={["-4px", "-8px", "-8px"]}
                right={["6px", "-8px", "-8px"]}
                aria-label="edit"
                icon={
                  <EditIcon
                    width={["20px", "28px"]}
                    height={["20px", "28px"]}
                  />
                }
                size="icon"
                borderWidth={0}
                variant="iconOutline"
                onClick={() => onOpen()}
                h={0}
                _hover={{
                  h: 0,
                }}
                _focus={{
                  h: 0,
                }}
              />
            </Center>

            <Text fontSize={["md", "lg", "lg"]} maxW="md" px="30px">
              {profile?.bio || "Something about yourself ..."}
            </Text>

            {profile && (
              <SocialCard
                profile={Object.entries(profile)
                  .splice(3, 4)
                  .map(([k, v]) => {
                    return { [k]: v };
                  })}
              />
            )}

            <Flex alignItems="center" w="full" justifyContent="center">
              <CommonButton
                isDisabled={claimAmount <= 0}
                text={`Claim unsuccessful Bids: ${claimAmount} AZERO`}
                onClick={() => onClaimHandler()}
              />{" "}
              <Tooltip
                mx="4px"
                hasArrow
                bg="#333"
                color="#fff"
                cursor="pointer"
                borderRadius="0"
                label={`Claim back your bids when NFT is unlisted or sold to a different user`}
              >
                <QuestionOutlineIcon />
              </Tooltip>
            </Flex>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProfileHeader;
