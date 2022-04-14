import { Avatar, Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { HiCloudUpload } from "react-icons/hi";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";

const client = create(IPFS_CLIENT_URL);

const AdvancedModeUpload = ({ profile }) => {
  const [, setAvatar] = useState("");

  const [newAvatarData, setNewAvatarData] = useState(null);
  const [newAvatarPreviewUrl, setNewAvatarPreviewUrl] = useState("");

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
      
      setNewAvatarPreviewUrl(src);
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
          uploadPromise().then((created) => setAvatar(created?.path)),
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
    <VStack alignItems="start" mb={6}>
      <Text ml={2}>Collection Avatar Image</Text>
      {!newAvatarPreviewUrl && (
        <HStack py="1" justifyContent="center">
          <label htmlFor="inputTag" style={{ cursor: "pointer" }}>
            <Flex alignItems="center">
              <Button as={Heading} variant="outline" color="brand.blue">
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

      {newAvatarPreviewUrl && (
        <HStack justifyContent="center">
          <Avatar ml={2} src={newAvatarPreviewUrl} />
          <Button
            size="xs"
            leftIcon={<HiCloudUpload />}
            onClick={onUploadHandler}
          >
            Upload Image
          </Button>
        </HStack>
      )}
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        {" "}
        Recommended file size is 430x430px
      </Text>
    </VStack>
  );
};

export default AdvancedModeUpload;
