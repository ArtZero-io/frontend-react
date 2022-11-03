/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import { Buffer } from "buffer";
import toast from "react-hot-toast";
import { formMode } from "@constants";

import { ipfsClient } from "@api/client";
import ImageCloudFlare from "../ImageWrapper/ImageCloudFlare";
import UploadIcon from "@theme/assets/icon/Upload";
import ThumbnailImage from "@theme/assets/icon/ThumbnailImage";
import { getCachedImageShort, getCloudFlareImage } from "../../utils";
import { useMemo } from "react";

const supportedFormat = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const Thumbnail = ({
  id,
  mode,
  index,
  title,
  isBanner = false,
  limitedSize,
  imageIPFSUrl,
  width = "152px",
  height = "152px",
  setImageIPFSUrl,
  isDisabled = false,
  isRequired = false,
  isRounded = false,
}) => {
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
      setImagePreviewUrl("");
      return;
    }

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      const uploadPromise = () =>
        new Promise(function (resolve) {
          const created = ipfsClient.add(Buffer(reader.result));

          if (created) {
            resolve(created);
          }
        });

      toast.promise(
        uploadPromise().then(async (created) => {
          setImageIPFSUrl(created?.path, index);

          // clientAPI("post", "/cacheImage", {
          //   input: created?.path,
          //   is1920: isBanner,
          // });
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

  const xxx = useMemo(() => {
    const result = async () => {
      const xxxxx = await getCachedImageShort(imageIPFSUrl, 500);

      console.log("xxxxx", xxxxx);
      return xxxxx;
    };

    return result;
  }, [imageIPFSUrl]);
  return (
    <VStack fontSize="lg" w="full">
      <Center w="full" justifyContent="start">
        <HStack
          justifyContent="center"
          w={!isRounded && "full"}
          className="thumbnail-image-card"
          borderRadius={isRounded && "full"}
          _hover={{ borderColor: "#7ae7ff" }}
        >
          <label style={{ width: "100%" }} htmlFor={`${id}InputTag`}>
            <Flex
              border="2px dashed #565656"
              _hover={{ borderColor: "#7ae7ff" }}
              borderRadius={isRounded && "full"}
              w={width}
              h={height}
              alignItems="center"
              background="#181818"
              flexDirection="column"
              justifyContent="space-evenly"
              backgroundSize="cover"
              backgroundImage={
                imagePreviewUrl ||
                `https://artzeronft.infura-ipfs.io/ipfs/${imageIPFSUrl}`
                //TODO: update new cloudflare image url
              }
              sx={{
                ".thumbnail-image-card &": {
                  ".thumbnail-children": {
                    color: "#515151",
                    display: imagePreviewUrl || imageIPFSUrl ? "none" : "flex",
                  },
                },
                ".thumbnail-image-card:hover &": {
                  ".thumbnail-children": {
                    display: "flex",
                    color: "#7ae7ff",
                    background: "#18181890",
                  },
                },
              }}
            >
              <Flex
                h="full"
                w="full"
                alignItems="center"
                flexDirection="column"
                justifyContent="space-evenly"
                className="thumbnail-children"
                borderRadius={isRounded && "full"}
                _hover={{ cursor: "pointer" }}
              >
                <ThumbnailImage />

                <Flex alignItems="center">
                  <UploadIcon color="" />

                  <Text
                    px={["8px"]}
                    color="brand.blue"
                    fontFamily="Evogria"
                    fontSize={["sm", "md"]}
                    isDisabled={isDisabled}
                  >
                    {!imagePreviewUrl ? "select image" : "pick another"}
                  </Text>
                </Flex>
              </Flex>

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

        {/* {mode === formMode.EDIT && !imagePreviewUrl && (
          <ImageCloudFlare
            w="64px"
            h="64px"
            size={100}
            ml="10px"
            src={imageIPFSUrl}
            borderRadius="full"
            border="2px solid white"
          />
        )} */}

        {/* {imagePreviewUrl && (
          <HStack justifyContent="center" minH={16}>
            <Avatar
              minH={["52px", "64px", "64px"]}
              minW={["52px", "64px", "64px"]}
              mx={4}
              src={imagePreviewUrl}
            />
          </HStack>
        )} */}
        {/* <Spacer /> */}
      </Center>

      {limitedSize ? (
        <Text ml={2} fontSize={["xs", "sm", "sm"]} color="brand.grayLight">
          Recommended file size is {limitedSize.width}x{limitedSize.height} px
        </Text>
      ) : null}
    </VStack>
  );
};

export default Thumbnail;
