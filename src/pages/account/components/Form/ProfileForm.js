import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, useField, Field } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { HiCloudUpload } from "react-icons/hi";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import ActiveIcon from "@theme/assets/icon/Active.js";

const client = create(IPFS_CLIENT_URL);

const ProfileForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");

  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          userBio: "",
          userTwitter: "",
          userFacebook: "",
          userTelegram: "",
          userInstagram: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          userBio: Yup.string().max(200, "Must be 200 characters or less"),

          userTwitter: Yup.string()
            .url("This must be a valid URL")
            .max(30, "Must be 30 characters or less"),
          userFacebook: Yup.string().max(30, "Must be 30 characters or less"),
          userTelegram: Yup.string().max(30, "Must be 30 characters or less"),
          userInstagram: Yup.string().max(30, "Must be 30 characters or less"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values first", values);

          !avatarIPFSUrl && toast.error("Upload anh first");

          if (avatarIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            console.log("values later", values);
            alert(JSON.stringify(values));
          }
        }}
      >
        <Form>
          <Flex w="full" justify="space-between">
            <VStack minW={96} px={3}>
              <ImageUpload setImageIPFSUrl={setAvatarIPFSUrl} setAvatarIPFSUrl={setAvatarIPFSUrl}/>
            </VStack>

            <VStack flexGrow="1" ml={3}>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="User Name"
                  name="userName"
                  type="text"
                  placeholder="User Name"
                />
                <SimpleModeTextarea
                  width={"xs"}
                  label="Bio"
                  name="userBio"
                  type="text"
                  rows={2}
                  placeholder="Bio"
                />
              </Flex>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="Twitter URL"
                  name="userTwitter"
                  type="text"
                  placeholder="Twitter URL"
                />
                <SimpleModeInput
                  width={"xs"}
                  label="Facebook URL"
                  name="userFacebook"
                  type="text"
                  placeholder="Facebook URL"
                />
              </Flex>
              <Flex w="full" justify="space-between">
                <SimpleModeInput
                  width={"xs"}
                  label="Telegram URL"
                  name="userTelegram"
                  type="text"
                  placeholder="Telegram URL"
                />
                <SimpleModeInput
                  width={"xs"}
                  label="Instagram URL"
                  name="userInstagram"
                  type="text"
                  placeholder="Instagram URL"
                />
              </Flex>
              <Button
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

const SimpleModeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl h={28}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Field pl={2} as={Input} bg="black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={2}>
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
};

const SimpleModeTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl h={28}>
      <FormLabel ml={2} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field
        pl={2}
        borderRadius="0"
        as={Textarea}
        bg="black"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={2}>
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
};

const ImageUpload = ({ setImageIPFSUrl, setAvatarIPFSUrl }) => {
  const [imgURL, setImgURL] = useState(null);

  const [newAvatarData, setNewAvatarData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const retrieveNewAvatar = (e) => {
    setImgURL(null);
    setAvatarIPFSUrl(null);
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setNewAvatarData(Buffer(reader.result));
    };

    e.preventDefault();

    if (e.target.value !== "") {
      const src = URL.createObjectURL(e.target.files[0]);
      console.log("src", src);
      setImagePreviewUrl(src);
    }
  };

  const onUploadHandler = async (e) => {
    try {
      if (newAvatarData) {
        const uploadPromise = () =>
          new Promise(function (resolve) {
            const created = client.add(newAvatarData);

            if (created) {
              resolve(created);
            }
          });

        toast.promise(
          uploadPromise().then((created) => {
            setImageIPFSUrl(created?.path);
            setImgURL(created?.path);
            console.log("created?.path", created?.path);
          }),
          {
            loading: "Uploading...",
            success: () => `Upload Avatar successful.!`,
            error: "Could not upload Avatar.",
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <VStack h="full" justifyContent="flex-start" alignItems="start">
      <Box>
        <Image
          boxShadow="base"
          boxSize="22.5rem"
          alt=""
          objectFit="cover"
          src={imagePreviewUrl || "https://via.placeholder.com/360x360"}
        />
      </Box>
      <Center w="full" justifyContent="center">
        <VStack>
          <label htmlFor="inputTag" style={{ cursor: "pointer" }}>
            <input
              style={{ display: "none" }}
              id="inputTag"
              onChange={retrieveNewAvatar}
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
            />
            <Button as={Text} fontFamily="Evogria" variant="outline">
              {!imagePreviewUrl ? "Select Image" : "Pick another"}
            </Button>
          </label>
        </VStack>
        <Spacer />
        <HStack justifyContent="center">
          {imgURL ? (
            <Tag variant="active">
              <TagLeftIcon as={ActiveIcon} />
              <TagLabel>Ready for submit</TagLabel>
            </Tag>
          ) : (
            <Button
              variant="solid"
              leftIcon={<HiCloudUpload />}
              onClick={onUploadHandler}
              isDisabled={!imagePreviewUrl}
            >
              Upload Image
            </Button>
          )}
        </HStack>
      </Center>
    </VStack>
  );
};
