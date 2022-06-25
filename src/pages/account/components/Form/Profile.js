import * as Yup from "yup";
import { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Flex, VStack } from "@chakra-ui/react";

import { setMultipleAttributes } from "@actions/account";

import SimpleModeInput from "@components/Input/Input";
import ImageUpload from "@components/ImageUpload/Avatar";
import SimpleModeTextarea from "@components/TextArea/TextArea";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import { AccountActionTypes } from "@store/types/account.types";
import StatusButton from "@components/Button/StatusButton";
// eslint-disable-next-line no-unused-vars
import { truncateStr } from "@utils";

const ProfileForm = ({ profile }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState(null);
  const { currentAccount } = useSubstrateState();

  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);

  const noImagesChange = currentAvatarIPFSUrl.current === avatarIPFSUrl;

  return (
    <>
      <Formik
        initialValues={{
          username: profile?.username,
          bio: profile?.bio,
          twitter: profile?.twitter,
          facebook: profile?.facebook,
          telegram: profile?.telegram,
          instagram: profile?.instagram,
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(30, "Must be less than 30 characters")
            .required("Required"),

          bio: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(150, "Must be less than 150 characters"),
          twitter: Yup.string()
            .url("This must be a valid URL")
            .matches(/\btwitter.com\b/, "Not a Twitter URL")
            .max(50, "Must be 50 characters or less"),
          facebook: Yup.string()
            .url("This must be a valid URL")
            .matches(/\bfacebook.com\b/, "Not a Facebook URL")
            .max(50, "Must be 50 characters or less"),
          telegram: Yup.string()
            .url("This must be a valid URL")
            .matches(/\btelegram.org\b/, "Not a Telegram URL")
            .max(50, "Must be 50 characters or less"),
          instagram: Yup.string()
            .url("This must be a valid URL")
            .matches(/\binstagram.com\b/, "Not an Instagram URL")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          avatarIPFSUrl && (values.avatar = avatarIPFSUrl);

          const objArr = Object.entries(values).filter(([, value]) => {
            return value !== "";
          });

          const a = objArr.map((item) => item[0]);
          const v = objArr.map((item) => item[1]);

          // console.log(" a, v", a, v);

          if (!a.length || !v.length) return toast.error("Please check again.");
          dispatch({
            type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
            payload: {
              status: "Start",
            },
          });
          dispatch(setMultipleAttributes(currentAccount, a, v));
        }}
      >
        {({ values, dirty, isValid }) => (
          <Form>
            <Flex w="full" justify="space-between">
              <VStack minW={96} px={3}>
                <ImageUpload
                  setImageIPFSUrl={setAvatarIPFSUrl}
                  profile={profile}
                  limitedSize={{ width: "500", height: "500" }}
                />
                asd
              </VStack>

              <VStack flexGrow="1" ml={3}>
                <Flex w="full" justify="space-between">
                  <SimpleModeInput
                    width={"xs"}
                    label="User Name"
                    name="username"
                    type="text"
                    placeholder="User Name"
                  />
                  <SimpleModeTextarea
                    width={"xs"}
                    label="Bio"
                    name="bio"
                    type="text"
                    rows={2}
                    placeholder="Bio"
                  />
                </Flex>
                <Flex w="full" justify="space-between">
                  <SimpleModeInput
                    width={"xs"}
                    label="Twitter URL"
                    name="twitter"
                    type="text"
                    placeholder="Twitter URL"
                  />
                  <SimpleModeInput
                    width={"xs"}
                    label="Facebook URL"
                    name="facebook"
                    type="text"
                    placeholder="Facebook URL"
                  />
                </Flex>
                <Flex w="full" justify="space-between">
                  <SimpleModeInput
                    width={"xs"}
                    label="Telegram URL"
                    name="telegram"
                    type="text"
                    placeholder="Telegram URL"
                  />
                  <SimpleModeInput
                    width={"xs"}
                    label="Instagram URL"
                    name="instagram"
                    type="text"
                    placeholder="Instagram URL"
                  />
                </Flex>
                <StatusButton
                  type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
                  text="profile"
                  disabled={!(dirty && isValid) && noImagesChange}
                  isLoading={addCollectionTnxStatus}
                  loadingText={`${addCollectionTnxStatus?.status}`}
                />
                {/* <Button
                  spinnerPlacement="start"
                  isLoading={tnxStatus}
                  loadingText={`${tnxStatus?.status}`}
                  // spinner={<BeatLoader size={8} />}
                  variant="solid"
                  w="full"
                  type="submit"
                  mt={8}
                  mb={{ xl: "16px", "2xl": "32px" }}
                >
                  Save profile
                </Button> */}
              </VStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
