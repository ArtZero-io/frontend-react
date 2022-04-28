import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { HiCloudUpload } from "react-icons/hi";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";
import { clientAPI } from "@api/client";
import { IPFS_BASE_URL } from "@constants/index";

const client = create(IPFS_CLIENT_URL);

const ImageUploadCollection = ({
  id,
  mode,
  imageIPFSUrl,
  setImageIPFSUrl,
  title = "Upload Image",
  limitedSize = { width: "430", height: "430" },
}) => {
  const [imgURL, setImgURL] = useState("");

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
            const update_nft_api_res = clientAPI("post", "/cacheImage", {
              input: created?.path,
            });
            console.log("update_nft_api_res", update_nft_api_res);
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
    <VStack minW={52} alignItems="start" pt={6} fontSize="lg">
      <Text color="#fff" ml={0}>
        {title}
      </Text>

      <Center w="full" justifyContent="center">
        <HStack py="1" justifyContent="center" minH={16}>
          <label htmlFor={`${id}InputTag`} style={{ cursor: "pointer" }}>
            <Flex alignItems="center">
              <Button
                as={Text}
                variant="outline"
                color="brand.blue"
                fontFamily="Evogria"
                fontSize="md"
              >
                {!imagePreviewUrl ? "Select Image" : "Pick another"}
              </Button>
              <Text hidden minW={28} ml={4} color="brand.grayLight">
                No file chosen
              </Text>
              <input
                style={{ display: "none" }}
                id={`${id}InputTag`}
                onChange={retrieveNewAvatar}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg, image/webp"
              />
            </Flex>
          </label>
        </HStack>

        {mode === "edit" && !imagePreviewUrl && (
          <Avatar
            minH={16}
            minW={16}
            ml={2}
            src={`${IPFS_BASE_URL}/${imageIPFSUrl}`}
          />
        )}

        {imagePreviewUrl && (
          <HStack justifyContent="center" minH={16}>
            <Avatar minH={16} minW={16} ml={2} src={imagePreviewUrl} />

            {imgURL ? (
              <Text minW={28} color="brand.blue">
                Ready for submit !
              </Text>
            ) : (
              <Button
                size="xs"
                leftIcon={<HiCloudUpload />}
                onClick={onUploadHandler}
              >
                Upload Image
              </Button>
            )}
          </HStack>
        )}
        <Spacer />
      </Center>
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file size is {limitedSize.width}x{limitedSize.height} px
      </Text>
    </VStack>
  );
};

export default ImageUploadCollection;
