import React, { useState } from "react";
import toast from "react-hot-toast";
import { create } from "ipfs-http-client";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiCloudUpload } from "react-icons/hi";
import ActiveIcon from "@theme/assets/icon/Active.js";
import { IPFS_CLIENT_URL } from "@constants/index";
import { Buffer } from "buffer";
import { IPFS_BASE_URL } from "@constants/index";
import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar/";

const client = create(IPFS_CLIENT_URL);

export default function ImageUploadAvatar({ setImageIPFSUrl, profile }) {
  const [imgURL, setImgURL] = useState(null);

  const [newAvatarData, setNewAvatarData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const retrieveNewAvatar = (e) => {
    setImgURL(null);
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setNewAvatarData(Buffer(reader.result));
    };

    e.preventDefault();

    if (e.target.value !== "") {
      const src = URL.createObjectURL(e.target.files[0]);

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
        {imagePreviewUrl && (
          <Image
            boxShadow="base"
            boxSize="22.5rem"
            alt=""
            objectFit="cover"
            src={imagePreviewUrl}
          />
        )}
        {!imagePreviewUrl && profile?.avatar && (
          <Image
            boxShadow="base"
            boxSize="22.5rem"
            alt=""
            objectFit="cover"
            src={`${IPFS_BASE_URL}/${profile?.avatar}`}
          />
        )}
        {!imagePreviewUrl && !profile?.avatar && <IdenticonAvatar size={360}/>}
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
}
