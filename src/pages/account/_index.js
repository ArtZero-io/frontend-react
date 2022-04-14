import { Box, Heading, Text } from "@chakra-ui/react";
import { CardContent } from "./components/Card/CardContent";
import { CardWithAvatar } from "./components/Card/CardWithAvatar";
import { UserInfo } from "./components/Card/UserInfo";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "@actions/account";
import Loader from "../../components/Loader/Loader";
import UpdateProfileModal from "./components/Modal/UpdateProfileModal";
import { IPFS_BASE_URL } from "@constants/index";
import { useSubstrateState } from "@utils/substrate";
import MyStaking from "./MyStaking";
import MyCollections from "./MyCollections";
import { Identicon } from "@utils/reactIdenticon/Identicon";

const AccountPage = () => {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const { activeAddress, accountLoaders } = useSelector((s) => s.account);
  const { currentAccount, keyringState, apiState } = useSubstrateState();

  useEffect(() => {
    const loadProfile = async () => {
      if (activeAddress) {
        const profile = await dispatch(getProfile());
        setProfile(profile);
      }
    };

    apiState === "READY" &&
      keyringState === "READY" &&
      activeAddress &&
      loadProfile();
    // eslint-disable-next-line
  }, [activeAddress]);

  useEffect(() => {
    const loadProfile = async () => {
      if (activeAddress) {
        const profile = await dispatch(getProfile());
        setProfile(profile);
      }
    };

    apiState === "READY" &&
      keyringState === "READY" &&
      activeAddress &&
      !profile &&
      loadProfile();
    // eslint-disable-next-line
  }, [
    dispatch,
    currentAccount,
    apiState,
    keyringState,
    activeAddress,
    profile,
  ]);

  return (
    <>
      {accountLoaders?.getProfile ? (
        <Loader />
      ) : (
        <>
          <Box as="section" pt="20" pb="12" position="relative">
            {/* <Box position="absolute" inset="0" height="32" bg="blue.600" /> */}
            <CardWithAvatar
              maxW="xl"
              useIdenticon={!profile?.avatar}
              addressRaw={currentAccount}
              avatarProps={{
                src: `${IPFS_BASE_URL}/${profile?.avatar}`,
                name: profile?.username,
              }}
              action={<UpdateProfileModal profile={profile} />}
            >
              <Identicon value={currentAccount?.addressRaw} size={84} />
              {!profile?.avatar && currentAccount?.addressRaw && (
                <>
                  <Identicon value={currentAccount?.addressRaw} size={84} /> abc
                </>
              )}

              <CardContent>
                <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
                  {profile?.username || "unknown"}
                </Heading>
                <Text color="gray.600">
                  {profile?.bio || "Write your bio here"}
                </Text>
                <UserInfo
                  facebook={profile?.facebook || "facebook"}
                  twitter={profile?.twitter || "twitter"}
                  telegram={profile?.telegram || "telegram"}
                  instagram={profile?.instagram || "instagram"}
                />
              </CardContent>
            </CardWithAvatar>
            <MyStaking />
            <MyCollections />
          </Box>
        </>
      )}
    </>
  );
};
export default AccountPage;
