/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import ActiveIcon from "@theme/assets/icon/Active.js";

// import { HiCloudUpload } from "react-icons/hi";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";
import { clientAPI } from "@api/client";
import { getCachedImageShort } from "@utils/index";
import { formMode } from "@constants";

const client = create(IPFS_CLIENT_URL);
const supportedFormat = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const ImageUploadCollection = ({
  id,
  mode,
  index,
  title,
  isBanner,
  limitedSize,
  imageIPFSUrl,
  minH = "64px",
  setImageIPFSUrl,
  isDisabled = false,
  isRequired = false,
}) => {
  const [imgURL, setImgURL] = useState("");

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const ref = useRef();

  const retrieveNewAvatar = (e) => {
    let data;
    if (e) data = e.target.files[0];

    if (!supportedFormat.includes(data?.type)) {
      // console.log("includes Date.now()", Date.now());

      toast.error(
        `Please use .png .jpeg .jpeg .gif format, the ${
          e.target?.files[0] && e.target.files[0].type.split("/")[1]
        } format is not supported.`
      );
      ref.current.value = null;
      // setNewAvatarData(null);
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
      // setNewAvatarData(null);
      setImagePreviewUrl("");
      return;
    }

    setImgURL(null);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      // setNewAvatarData(Buffer(reader.result));

      const uploadPromise = () =>
        new Promise(function (resolve) {
          const created = client.add(Buffer(reader.result));

          if (created) {
            resolve(created);
          }
        });

      toast.promise(
        uploadPromise().then((created) => {
          setImageIPFSUrl(created?.path, index);
          setImgURL(created?.path);

          clientAPI("post", "/cacheImage", {
            input: created?.path,
            is1920: isBanner,
          });
        }),
        {
          loading: "Uploading...",
          success: "Upload successful!",
          error: "Could not upload your image!!!.",
        }
      );
    };

    e.preventDefault();

    if (e.target.value !== "") {
      const src = URL.createObjectURL(e.target.files[0]);

      setImagePreviewUrl(src);
    }
  };

  return (
    <VStack
      minW={52}
      alignItems="start"
      //  pt={6}
      fontSize="lg"
    >
      {title ? (
        <Text color="#fff" ml={0}>
          {title}{" "}
          {isRequired ? (
            <Text as="span" color="#ff8c8c">
              *
            </Text>
          ) : null}
        </Text>
      ) : null}

      <Center w="full" justifyContent="center">
        <HStack py="1" justifyContent="center" minH={minH}>
          <label htmlFor={`${id}InputTag`} style={{ cursor: "pointer" }}>
            <Flex alignItems="center">
              <Button
                isDisabled={isDisabled}
                as={Text}
                variant="outline"
                color="brand.blue"
                fontFamily="Evogria"
                fontSize={["sm", "md", "md"]}
                px={["12px", "32px", "32px"]}
              >
                {!imagePreviewUrl ? "select image" : "pick another"}
              </Button>
              <Text hidden minW={28} ml={4} color="brand.grayLight">
                No file chosen
              </Text>
              <input
                disabled={isDisabled}
                ref={ref}
                style={{ display: "none" }}
                id={`${id}InputTag`}
                onChange={retrieveNewAvatar}
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
              />
            </Flex>
          </label>
        </HStack>

        {mode === formMode.EDIT && !imagePreviewUrl && (
          <Avatar
            minH={minH}
            minW={16}
            ml={2}
            src={getCachedImageShort(imageIPFSUrl, 100)}
          />
        )}

        {imagePreviewUrl && (
          <HStack justifyContent="center" minH={16}>
            <Avatar
              minH={["52px", "64px", "64px"]}
              minW={["52px", "64px", "64px"]}
              mx={4}
              src={imagePreviewUrl}
            />

            {/* {imgURL ? (
              <Tag variant="active" minW={[4, 16, 16]} color="brand.blue">
                <TagLeftIcon as={ActiveIcon} />
                <TagLabel>Ready !</TagLabel>
              </Tag>
            ) : (
              <Spinner
                mx="14px"
                p={"8px"}
                speed="0.5s"
                thickness="2px"
                color="#7ae7ff"
                emptyColor="#333"
              />
            )} */}
          </HStack>
        )}
        <Spacer />
      </Center>
      {limitedSize ? (
        <Text ml={2} fontSize={["xs", "sm", "sm"]} color="brand.grayLight">
          Recommended file size is {limitedSize.width}x{limitedSize.height} px
        </Text>
      ) : null}
    </VStack>
  );
};

export default ImageUploadCollection;
