import React, { useState, useRef } from "react";
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
import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar/";
import { clientAPI } from "@api/client";
import { getCachedImageShort } from "@utils";

const client = create(IPFS_CLIENT_URL);
const supportedFormat = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export default function ImageUploadAvatar({
  setImageIPFSUrl,
  profile,
  limitedSize = { width: "500", height: "500" },
}) {
  const [imgURL, setImgURL] = useState(null);

  const [newAvatarData, setNewAvatarData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const ref = useRef();

  const retrieveNewAvatar = (e) => {
    let data;
    if (e) data = e.target.files[0];

    if (!supportedFormat.includes(data?.type)) {
      console.log("includes Date.now()", Date.now());

      toast.error(
        `Please use .png .jpeg .jpeg, .gif format, the ${
          e.target?.files[0] && e.target.files[0].type.split("/")[1]
        } format is not supported.`
      );
      ref.current.value = null;
      setNewAvatarData(null);
      setImagePreviewUrl("");
      return;
    }

    if (data?.size >= 5242880) {
      toast.error(
        `Maximum size support is 5MB, your image size is ${(
          data?.size / 1000000
        ).toFixed(2)}MB.`
      );
      ref.current.value = null;
      setNewAvatarData(null);
      setImagePreviewUrl("");
      return;
    }

    setImgURL(null);

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
          uploadPromise().then(async (created) => {
            setImageIPFSUrl(created?.path);
            setImgURL(created?.path);
            await clientAPI("post", "/cacheImage", {
              input: created?.path,
              is1024: true,
            });
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
            src={getCachedImageShort(profile?.avatar, 500)}
          />
        )}
        {!imagePreviewUrl && !profile?.avatar && <IdenticonAvatar size={360} />}
      </Box>

      <Center w="full" justifyContent="center">
        <VStack>
          <label htmlFor="inputTag" style={{ cursor: "pointer" }}>
            <input
              ref={ref}
              style={{ display: "none" }}
              id="inputTag"
              onChange={retrieveNewAvatar}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
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
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file size is {limitedSize.width}x{limitedSize.height} px
      </Text>
    </VStack>
  );
}
