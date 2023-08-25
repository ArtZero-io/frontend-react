import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import { truncateStr } from "@utils";
import SocialCard from "@components/Card/Social";
import ImageCloudFlare from "../../../components/ImageWrapper/ImageCloudFlare";
import { getProfileOnChain } from "../../../utils/blockchain/profile_calls";
import { getPublicCurrentAccount } from "../../../utils";
import { useHistory } from "react-router-dom";

function ProfileHeader({ address }) {
  const dispatch = useDispatch();

  const { currentAccount, api, apiState } = useSubstrateState();

  const [profile, setProfile] = useState(null);
  const history = useHistory();

  const avatarProfileSize = useBreakpointValue([64, 120]);

  useEffect(() => {
    if (address && address === currentAccount?.address) {
      history.replace("/account/general");
    }
  }, [currentAccount, address, history]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!api || apiState !== "READY") return;

      const res = await getProfileOnChain({
        callerAccount: getPublicCurrentAccount(),
        accountAddress: address,
      });
      if (res?.status === "OK") {
        if (!res.data.username) {
          res.data.username = truncateStr(address);
        }

        setProfile((prev) => {
          return {
            ...res.data,
            address: address,
          };
        });
      } else {
        toast.error(res?.message);
      }
    };

    if (!profile?.address || profile?.address !== address) {
      fetchProfile();
    }
  }, [api, apiState, dispatch, profile, address]);

  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "14" }}
    >
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
              <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>
                {profile?.username || truncateStr(currentAccount?.address)}
              </Heading>
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
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProfileHeader;
