import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Center,
  Image,
  Spacer,
  Square,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import { Buffer } from "buffer";
import IdenticonAvatar from "@components/IdenticonAvatar/IdenticonAvatar/";
import { clientAPI } from "@api/client";
import { getCachedImageShort } from "@utils";
import { ipfsClient } from "@api/client";

const supportedFormat = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export default function ImageUploadAvatar({
  setImageIPFSUrl,
  isDisabled = false,
  profile,
  limitedSize = { width: "500", height: "500" },
  setIsUploadAvatarIPFSUrl,
}) {
  const [imgURL, setImgURL] = useState(null);

  // const [newAvatarData, setNewAvatarData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const avatarProfileSize = useBreakpointValue([260, 360]);
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
          const created = ipfsClient.add(Buffer(reader.result));
          console.log("created", created);
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
          success: `Upload Avatar successful!`,
          error: "Could not upload Avatar.",
        }
      );
    };

    e.preventDefault();

    if (e.target.value !== "") {
      const src = URL.createObjectURL(e.target.files[0]);

      setImagePreviewUrl(src);
    }
  };

  // const onUploadHandler = async (e) => {
  //   try {
  //     if (newAvatarData) {
  //       const uploadPromise = () =>
  //         new Promise(function (resolve) {
  //           const created = client.add(newAvatarData);

  //           if (created) {
  //             resolve(created);
  //           }
  //         });

  //       toast.promise(
  //         uploadPromise().then(async (created) => {
  //           setImageIPFSUrl(created?.path);
  //           setImgURL(created?.path);
  //           await clientAPI("post", "/cacheImage", {
  //             input: created?.path,
  //             is1024: true,
  //           });
  //         }),
  //         {
  //           loading: "Uploading...",
  //           success: `Upload Avatar successful!`,
  //           error: "Could not upload Avatar.",
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    if (imgURL && imagePreviewUrl) {
      setIsUploadAvatarIPFSUrl(true);
    } else {
      setIsUploadAvatarIPFSUrl(false);
    }
  }, [imagePreviewUrl, imgURL, setIsUploadAvatarIPFSUrl]);

  return (
    <VStack h="full" justifyContent="flex-start" alignItems="start">
      <Box>
        {imagePreviewUrl && (
          <Square size={["260px", "360px"]}>
            <Image
              h="full"
              w="full"
              alt="avatar"
              boxShadow="base"
              objectFit="cover"
              objectPosition="center"
              src={imagePreviewUrl}
            />
          </Square>
        )}

        {!imagePreviewUrl && profile?.avatar && (
          <Square size={["260px", "360px"]}>
            <Image
              h="full"
              w="full"
              alt="avatar"
              boxShadow="lg"
              objectFit="cover"
              objectPosition="center"
              src={getCachedImageShort(profile?.avatar, 500)}
            />
          </Square>
        )}

        {!imagePreviewUrl && !profile?.avatar && (
          <IdenticonAvatar size={avatarProfileSize} />
        )}
      </Box>

      <Center w="full" justifyContent="center">
        <VStack>
          <label htmlFor="inputTag" style={{ cursor: "pointer" }}>
            <input
              disabled={isDisabled}
              ref={ref}
              style={{ display: "none" }}
              id="inputTag"
              onChange={retrieveNewAvatar}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
            />
            <Button
              as={Text}
              isDisabled={isDisabled}
              fontFamily="Evogria"
              variant="outline"
              fontSize={["sm", "md"]}
              px={["16px", "32px"]}
            >
              {!imagePreviewUrl ? "select image" : "pick another"}
            </Button>
          </label>
        </VStack>
        <Spacer />

        {/* <HStack justifyContent="center">
          {imgURL ? (
            <Tag variant="active">
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
          )}
        </HStack> */}
      </Center>
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file size is {limitedSize.width}x{limitedSize.height} px
      </Text>
    </VStack>
  );
}
