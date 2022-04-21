import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, VStack } from "@chakra-ui/react";

import { setMultipleAttributes } from "@actions/account";

import SimpleModeInput from "@components/Input/Input";
import ImageUpload from "@components/ImageUpload/Avatar";
import SimpleModeTextarea from "@components/TextArea/TextArea";

const ProfileForm = ({ profile }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState(null);

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          bio: "",
          twitter: "",
          facebook: "",
          telegram: "",
          instagram: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(30, "Must be less than 30 characters"),
          bio: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(150, "Must be less than 150 characters"),
          twitter: Yup.string()
            .url("This must be a valid URL")
            .max(30, "Must be 30 characters or less"),
          facebook: Yup.string()
            .url("This must be a valid URL")
            .max(30, "Must be 30 characters or less"),
          telegram: Yup.string()
            .url("This must be a valid URL")
            .max(30, "Must be 30 characters or less"),
          instagram: Yup.string()
            .url("This must be a valid URL")
            .max(30, "Must be 30 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          avatarIPFSUrl && (values.avatar = avatarIPFSUrl);

          const objArr = Object.entries(values).filter(([, value]) => {
            return value !== "";
          });

          const a = objArr.map((item) => item[0]);
          const v = objArr.map((item) => item[1]);

          dispatch(setMultipleAttributes(a, v));
        }}
      >
        <Form>
          <Flex w="full" justify="space-between">
            <VStack minW={96} px={3}>
              <ImageUpload
                setImageIPFSUrl={setAvatarIPFSUrl}
                profile={profile}
              />
            </VStack>

            <VStack flexGrow="1" ml={3}>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="User Name"
                  name="username"
                  type="text"
                  placeholder={profile?.username || "User Name"}
                />
                <SimpleModeTextarea
                  width={"xs"}
                  label="Bio"
                  name="bio"
                  type="text"
                  rows={2}
                  placeholder={profile?.bio || "Bio"}
                />
              </Flex>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="Twitter URL"
                  name="twitter"
                  type="text"
                  placeholder={profile?.twitter || "Twitter URL"}
                />
                <SimpleModeInput
                  width={"xs"}
                  label="Facebook URL"
                  name="facebook"
                  type="text"
                  placeholder={profile?.facebook || "Facebook URL"}
                />
              </Flex>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="Telegram URL"
                  name="telegram"
                  type="text"
                  placeholder={profile?.telegram || "Telegram URL"}
                />
                <SimpleModeInput
                  width={"xs"}
                  label="Instagram URL"
                  name="instagram"
                  type="text"
                  placeholder={profile?.instagram || "Instagram URL"}
                />
              </Flex>
              <Button
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
              </Button>
            </VStack>
          </Flex>
        </Form>
      </Formik>
    </>
  );
};

export default ProfileForm;
