import { Avatar, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { HiCloudUpload } from "react-icons/hi";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";

const client = create(IPFS_CLIENT_URL);

const ImageUploadCollection = ({
  title = "Upload Image",
  setImageIPFSUrl,
  limitedSize = { width: "430", height: "430" },
}) => {
  const [imgURL, setImgURL] = useState("");

  const [newAvatarData, setNewAvatarData] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const retrieveNewAvatar = (e) => {
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
    <VStack alignItems="start" py={6} borderBottomWidth={2}>
      <Text ml={2}>{title}</Text>
      {!imagePreviewUrl && (
        <HStack py="1" justifyContent="center">
          <label htmlFor="inputTag" style={{ cursor: "pointer" }}>
            <Flex alignItems="center">
              <Button as={Text} variant="outline" color="brand.blue">
                Select Image
              </Button>
              <Text ml={4} color="brand.grayLight">
                No file chosen
              </Text>
              <input
                style={{ display: "none" }}
                id="inputTag"
                onChange={retrieveNewAvatar}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
              />
            </Flex>
          </label>
        </HStack>
      )}

      {imagePreviewUrl && (
        <HStack justifyContent="center">
          <Avatar ml={2} src={imagePreviewUrl} />

          {imgURL ? (
            <div>Ready for submit</div>
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
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file size is {limitedSize.width}x{limitedSize.height} px
      </Text>
    </VStack>
  );
};

export default ImageUploadCollection;
