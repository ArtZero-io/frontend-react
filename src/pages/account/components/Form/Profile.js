import * as Yup from "yup";
import { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { VStack, Stack } from "@chakra-ui/react";

import { setMultipleAttributes } from "@actions/account";

import SimpleModeInput from "@components/Input/Input";
import ImageUpload from "@components/ImageUpload/Avatar";
import SimpleModeTextarea from "@components/TextArea/TextArea";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";

import { UPDATE_PROFILE, START } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { setTxStatus } from "@store/actions/txStatus";

const ProfileForm = ({ profile }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState(null);
  const [, setIsUploadAvatarIPFSUrl] = useState(false);
  const { currentAccount, api } = useSubstrateState();

  const dispatch = useDispatch();

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);

  // eslint-disable-next-line no-unused-vars
  const noImagesChange = currentAvatarIPFSUrl.current === avatarIPFSUrl;

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

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
            .trim()
            .min(3, "Must be at least 3 characters")
            .max(30, "Must be at most 30 characters")
            .required("This field is required"),

          bio: Yup.string()
            .trim()
            .min(3, "Must be at least 3 characters")
            .max(150, "Must be at most 150 characters"),
          twitter: Yup.string()
            .trim()
            .url("URL must start with http:// or https://")
            .matches(/\btwitter.com\b/, "URL must be twitter.com")
            .max(50, "Must be 50 characters or less"),
          facebook: Yup.string()
            .trim()
            .url("URL must start with http:// or https://")
            .matches(/\bfacebook.com\b/, "URL must be facebook.com")
            .max(50, "Must be 50 characters or less"),
          telegram: Yup.string()
            .trim()
            .url("URL must start with http:// or https://")
            .matches(/\btelegram.org\b/, "URL must be telegram.com")
            .max(50, "Must be 50 characters or less"),
          instagram: Yup.string()
            .trim()
            .url("URL must start with http:// or https://")
            .matches(/\binstagram.com\b/, "URL must be instagram.com")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // if (!avatarIPFSUrl && !isUploadAvatarIPFSUrl) {
          //   return toast.error("Please upload new avatar.");
          // }

          avatarIPFSUrl && (values.avatar = avatarIPFSUrl);

          const objArr = Object.entries(values).filter(([, value]) => {
            return value !== "";
          });

          const a = objArr.map((item) => item[0]);
          const v = objArr.map((item) => item[1]);

          // console.log(" a, v", a, v);

          if (!a.length || !v.length) return toast.error("Please check again.");

          dispatch(setTxStatus({ type: UPDATE_PROFILE, step: START }));

          dispatch(
            setMultipleAttributes(
              currentAccount,
              a,
              v,
              dispatch,
              UPDATE_PROFILE,
              api
            )
          );
        }}
      >
        {({ values, dirty, isValid }) => (
          <Form>
            <Stack
              w="full"
              justify="space-between"
              direction={["column", "row"]}
            >
              <VStack px={3}>
                <ImageUpload
                  profile={profile}
                  isDisabled={actionType}
                  imageIPFSUrl={avatarIPFSUrl}
                  setImageIPFSUrl={setAvatarIPFSUrl}
                  limitedSize={{ width: "500", height: "500" }}
                  setIsUploadAvatarIPFSUrl={setIsUploadAvatarIPFSUrl}
                />
              </VStack>

              <VStack flexGrow="1" ml={3}>
                <Stack
                  w="full"
                  align={["center", "start"]}
                  justify="space-between"
                  direction={["column", "row"]}
                >
                  <SimpleModeInput
                    type="text"
                    name="username"
                    label="User Name"
                    width={["250px", "xs"]}
                    placeholder="User Name"
                    isDisabled={actionType}
                  />
                  <SimpleModeTextarea
                    rows={2}
                    name="bio"
                    label="Bio"
                    type="text"
                    placeholder="Bio"
                    width={["250px", "xs"]}
                    isDisabled={actionType}
                  />
                </Stack>

                <Stack
                  w="full"
                  alignItems="center"
                  justify="space-between"
                  direction={["column", "row"]}
                >
                  <SimpleModeInput
                    type="text"
                    name="twitter"
                    label="Twitter URL"
                    width={["250px", "xs"]}
                    placeholder="Twitter URL"
                    isDisabled={actionType}
                  />
                  <SimpleModeInput
                    type="text"
                    name="facebook"
                    label="Facebook URL"
                    width={["250px", "xs"]}
                    placeholder="Facebook URL"
                    isDisabled={actionType}
                  />
                </Stack>

                <Stack
                  w="full"
                  align="center"
                  justify="space-between"
                  direction={["column", "row"]}
                >
                  <SimpleModeInput
                    type="text"
                    name="telegram"
                    label="Telegram URL"
                    width={["250px", "xs"]}
                    placeholder="Telegram URL"
                    isDisabled={actionType}
                  />
                  <SimpleModeInput
                    type="text"
                    name="instagram"
                    label="Instagram URL"
                    width={["250px", "xs"]}
                    placeholder="Instagram URL"
                    isDisabled={actionType}
                  />
                </Stack>
                <CommonButton
                  w="full"
                  my="24px"
                  {...rest}
                  type="submit"
                  text="update profile"
                  // isDisabled={!(dirty && isValid) && noImagesChange}
                />
                
              </VStack>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
