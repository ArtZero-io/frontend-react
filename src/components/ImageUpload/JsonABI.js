import {
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

const client = create(IPFS_CLIENT_URL);

const FileUpload = ({ setFileIPFSUrl, id, title = "File Upload" }) => {
  const [fileURL, setFileURL] = useState(null);

  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const retrieveNewAvatar = (e) => {
    setFileURL(null);

    const data = e.target.files[0];

    setFileName(data?.name);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFileData(Buffer(reader.result));
    };

    e.preventDefault();

    // if (e.target.value !== "") {
    //   const src = URL.createObjectURL(e.target.files[0]);
    //   console.log('src', src)

    //   setImagePreviewUrl(src);
    // }
  };

  const onUploadHandler = async (e) => {
    try {
      if (fileData) {
        const uploadPromise = () =>
          new Promise(function (resolve) {
            const created = client.add(fileData);

            if (created) {
              resolve(created);
            }
          });

        toast.promise(
          uploadPromise().then((created) => {
            setFileIPFSUrl(created?.path);
            setFileURL(created?.path);
            // const options = {
            //   input: created?.path
            // };
            // const cacheJsonAPIRes = clientAPI(
            //   "post",
            //   "/cacheJSON",
            //   options
            // );
            //   console.log(cacheJsonAPIRes)
          }),
          {
            loading: "Uploading...",
            success: () => `Upload successful!`,
            error: "Could not upload !!!",
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
                {!fileName ? "Select File" : "Pick another"}
              </Button>
              <Text hidden minW={28} ml={4} color="brand.grayLight">
                No file chosen
              </Text>
              <input
                style={{ display: "none" }}
                id={`${id}InputTag`}
                onChange={retrieveNewAvatar}
                type="file"
                accept="application/json"
              />
            </Flex>
          </label>
        </HStack>

        {fileName && (
          <HStack justifyContent="center" minH={16}>
            {fileURL ? (
              <Text minW={28} color="brand.blue" ml={2}>
                Ready for submit !
              </Text>
            ) : (
              <Button
                size="xs"
                leftIcon={<HiCloudUpload />}
                onClick={onUploadHandler}
              >
                Upload file {fileName}
              </Button>
            )}
          </HStack>
        )}
        <Spacer />
      </Center>
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file is *.json
      </Text>
    </VStack>
  );
};

export default FileUpload;
