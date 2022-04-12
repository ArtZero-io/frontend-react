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
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaTelegram, FaFacebook } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@actions/account";
import ProfileModal from "./Modal/Profile";
import { Link } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import IdenticonAvatar from "./IdenticonAvatar";
import { IPFS_BASE_URL } from "@constants/index";

function ProfileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profileContract } = useSubstrateState();

  const { activeAddress } = useSelector((s) => s.account);
  const [, setLoading] = useState();
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();

  const forceUpdate = useCallback(() => {
    setProfile(null);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      const profile = await dispatch(getProfile());
      if (profile.username) {
        setProfile((prev) => {
          return {
            ...prev,
            ...profile,
            address: activeAddress,
          };
        });
        setLoading(false);
      }
    };
    (!profile?.address || profile?.address !== activeAddress) && fetchProfile();
  }, [activeAddress, dispatch, profile]);

  const [isProfileContractReady, setIsProfileContractReady] = useState(false);

  useEffect(() => {
    if (profileContract === "READY") setIsProfileContractReady(true);
  }, [profileContract, isProfileContractReady]);

  return (
    <>
      <ProfileModal
        profile={profile}
        isOpen={isOpen}
        onClose={onClose}
        forceUpdate={forceUpdate}
      />
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        pt={{ base: "12", "2xl": "28" }}
        pb={{ base: "12", "2xl": "20" }}
      >
        <VStack>
          <Center
            rounded="full"
            w={32}
            h={32}
            p="-px"
            border="4px solid"
            borderColor="white"
          >
            {profile?.avatar && (
              <Image
                alt={profile.avatar}
                w="full"
                h="full"
                rounded="full"
                objectFit="cover"
                src={`${IPFS_BASE_URL}/${profile?.avatar}`}
              />
            )}
            {!profile?.avatar && <IdenticonAvatar size={120} />}
          </Center>

          <HStack w="full" justifyContent="space-around" py={4}>
            <VStack textAlign="center" justifyContent="space-between">
              <Heading size="h2" letterSpacing="wider" fontWeight="normal">
                {profile?.username || "Unknown"}

                <IconButton
                  aria-label="edit-profile"
                  icon={<EditIcon size="1.5rem" />}
                  size="icon"
                  variant="iconOutline"
                  onClick={() => onOpen()}
                  ml={5}
                  borderWidth={0}
                />
              </Heading>

              <Text fontSize="lg" maxW="md">
                {profile?.bio || "Something about yourself ..."}
              </Text>

              <HStack textAlign="center">
                <Link
                  isExternal
                  href={`${profile?.instagram}` || `https://instagram.com`}
                >
                  <IconButton
                    aria-label="instagram"
                    icon={<FaInstagram size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
                <Link
                  isExternal
                  href={`${profile?.twitter}` || `https://twitter.com`}
                >
                  <IconButton
                    aria-label="twitter"
                    icon={<FaTwitter size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
                <Link
                  isExternal
                  href={`${profile?.telegram}` || `https://t.me/artzero_io`}
                >
                  <IconButton
                    aria-label="telegram"
                    icon={<FaTelegram size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
                <Link
                  isExternal
                  href={`${profile?.facebook}` || `https://www.facebook.com`}
                >
                  <IconButton
                    aria-label="facebook"
                    icon={<FaFacebook size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </Link>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}

export default ProfileHeader;
