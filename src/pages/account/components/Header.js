import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
  IconButton,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";

import EditIcon from "@theme/assets/icon/Edit.js";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getProfile } from "@actions/account";
import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar";
import { useSubstrateState } from "@utils/substrate";
import { getCachedImageShort } from "@utils";
import ProfileModal from "./Modal/Profile";
import toast from "react-hot-toast";
import { truncateStr } from "@utils";
import SocialCard from "@components/Card/Social";
import { UPDATE_PROFILE } from "@constants";
import useForceUpdate from "@hooks/useForceUpdate";

function ProfileHeader() {
  const dispatch = useDispatch();

  const { currentAccount } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState(null);

  const avatarProfileSize = useBreakpointValue([64, 120]);

  const forceUpdate = useCallback(() => {
    setProfile(null);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
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
  }, [currentAccount, dispatch, profile]);

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
            <Image
              alt={profile.avatar}
              w="full"
              h="full"
              rounded="full"
              objectFit="cover"
              src={getCachedImageShort(profile?.avatar, 500)}
              fallback={
                <Skeleton
                  w={["74px", "120px", "120px"]}
                  h={["60px", "118px", "118px"]}
                  rounded="full"
                />
              }
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
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProfileHeader;
