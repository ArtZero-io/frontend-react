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
  Link,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaTelegram, FaFacebook } from "react-icons/fa";
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
              <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>
                {profile?.username || truncateStr(currentAccount.address)}
              </Heading>
              <IconButton
                pos="relative"
                bottom={["-4px", "-8px", "-8px"]}
                right={["6px", "-8px", "-8px"]}
                aria-label="edit"
                icon={<EditIcon />}
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

            <Text fontSize={["md", "lg", "lg"]} maxW="md">
              {profile?.bio || "Something about yourself ..."}
            </Text>

            <HStack textAlign="center">
              {profile?.instagram ? (
                <Link isexternal="true" href={`${profile?.instagram}`}>
                  <IconButton
                    aria-label="instagram"
                    icon={<FaInstagram size="24px" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
              ) : (
                <IconButton
                  isDisabled
                  aria-label="instagram"
                  icon={<FaInstagram size="24px" />}
                  size="icon"
                  variant="iconOutline"
                />
              )}
              {profile?.twitter ? (
                <Link isexternal="true" href={`${profile?.twitter}`}>
                  <IconButton
                    aria-label="twitter"
                    icon={<FaTwitter size="24px" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
              ) : (
                <IconButton
                  isDisabled
                  aria-label="twitter"
                  icon={<FaTwitter size="24px" />}
                  size="icon"
                  variant="iconOutline"
                />
              )}
              {profile?.telegram ? (
                <Link isexternal="true" href={`${profile?.telegram}`}>
                  <IconButton
                    aria-label="telegram"
                    icon={<FaTelegram size="24px" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
              ) : (
                <IconButton
                  isDisabled
                  aria-label="telegram"
                  icon={<FaTelegram size="24px" />}
                  size="icon"
                  variant="iconOutline"
                />
              )}
              {profile?.facebook ? (
                <Link isexternal="true" href={`${profile?.facebook}`}>
                  <IconButton
                    aria-label="facebook"
                    icon={<FaFacebook size="24px" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
              ) : (
                <IconButton
                  isDisabled
                  aria-label="facebook"
                  icon={<FaFacebook size="24px" />}
                  size="icon"
                  variant="iconOutline"
                />
              )}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProfileHeader;
