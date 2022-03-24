import { Box, Heading, Text } from "@chakra-ui/react";
import { CardContent } from "./components/Card/CardContent";
import { CardWithAvatar } from "./components/Card/CardWithAvatar";
import { UserInfo } from "./components/Card/UserInfo";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "@actions/account";
import Loader from "../../components/Loader/Loader";
import UpdateProfileModal from "./components/Modal/UpdateProfileModal";
import { IPFS_BASE_URL } from "@constants/index";
import { useSubstrateState } from "@utils/substrate";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { profile, activeAddress, accountLoaders } = useSelector(
    (s) => s.account
  );
  const { currentAccount } = useSubstrateState();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, activeAddress]);

  return (
    <>
      {!accountLoaders?.getProfile ? (
        <Loader />
      ) : (
        <>
          <Box as="section" pt="20" pb="12" position="relative">
            {/* <Box position="absolute" inset="0" height="32" bg="blue.600" /> */}
            <CardWithAvatar
              maxW="xl"
              useIdenticon={!profile?.avatar}
              addressRaw={currentAccount?.addressRaw}
              avatarProps={{
                src: `${IPFS_BASE_URL}${profile?.avatar}`,
                name: profile?.username,
              }}
              action={<UpdateProfileModal />}
            >
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
          </Box>
        </>
      )}
    </>
  );
};
export default AccountPage;
