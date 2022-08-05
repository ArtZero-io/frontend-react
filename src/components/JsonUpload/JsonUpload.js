/* eslint-disable no-unused-vars */
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
import React, { useState, useRef } from "react";

import { HiCloudUpload } from "react-icons/hi";

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";
// import { clientAPI } from "@api/client";
// import { getCachedImageShort } from "@utils/index";
// import { formMode } from "@constants";

const client = create(IPFS_CLIENT_URL);
const supportedFormat = ["application/json"];

const JsonUpload = ({
  id,
  isDisabled = false,
  mode,
  jsonIPFSUrl,
  setJsonIPFSUrl,
  title = "Upload Json",
}) => {
  const [jsonURL, setJsonURL] = useState("");

  const [newJsonData, setNewJsonData] = useState(null);
  const [JsonPreviewUrl, setJsonPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const ref = useRef();

  const retrieveNewJson = (e) => {
    e.preventDefault();

    let data;
    if (e) data = e.target.files[0];

    if (!supportedFormat.includes(data?.type)) {
      toast.error(
        `Please upload .json format only, the ${
          e.target?.files[0] && e.target.files[0].type.split("/")[1]
        } format is not supported.`
      );
      ref.current.value = null;
      setNewJsonData(null);
      setJsonPreviewUrl("");
      return;
    }

    if (data?.size >= 5242880) {
      toast.error(
        `Maximum size support is 5MB, your file size is ${(
          data?.size / 1000000
        ).toFixed(2)}MB.`
      );
      ref.current.value = null;
      setNewJsonData(null);
      setJsonPreviewUrl("");
      return;
    }

    setJsonURL(null);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      console.log("Buffer(reader.result)", Buffer(reader.result));
      setNewJsonData(Buffer(reader.result));
    };
    console.log("reader", reader);
    e.preventDefault();

    if (e.target.value !== "") {
      const src = URL.createObjectURL(e.target.files[0]);
      console.log("src", src);
      console.log("e.target.files[0]", e.target.files[0].name);
      setJsonPreviewUrl(src);

      const fileName = e.target.files[0].name;
      console.log("fileName", fileName);
      setFileName(fileName);
    }
  };

  const onUploadHandler = async (e) => {
    e.preventDefault();

    try {
      if (newJsonData) {
        const uploadPromise = () =>
          new Promise(function (resolve) {
            const created = client.add(newJsonData);

            if (created) {
              resolve(created);
            }
          });

        toast.promise(
          uploadPromise().then((created) => {
            setJsonIPFSUrl(created?.path);
            setJsonURL(created?.path);

            // eslint-disable-next-line no-unused-vars
            // const update_nft_api_res = clientAPI("post", "/cacheImage", {
            //   input: created?.path,
            //   is1920: isBanner,
            // });
            // console.log("update_nft_api_res", update_nft_api_res);
          }),
          {
            loading: "Uploading...",
            success: "Upload successful!",
            error: (error) =>
              console.log("Could not upload your file!!!.", error),
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
                isDisabled={isDisabled}
                as={Text}
                variant="outline"
                color="brand.blue"
                fontFamily="Evogria"
                fontSize="md"
              >
                {!JsonPreviewUrl ? "Select File" : "Pick another"}
              </Button>
              {!JsonPreviewUrl && (
                <Text minW={28} ml={4} color="brand.grayLight">
                  No file chosen
                </Text>
              )}
              <input
                disabled={isDisabled}
                ref={ref}
                style={{ display: "none" }}
                id={`${id}InputTag`}
                onChange={retrieveNewJson}
                type="file"
                accept="application/json"
              />
            </Flex>
          </label>
        </HStack>

        {/* {mode === formMode.EDIT && !JsonPreviewUrl && (
          <Avatar
            minH={16}
            minW={16}
            ml={2}
            src={getCachedImageShort(imageIPFSUrl, 100)}
          />
        )} */}

        {JsonPreviewUrl && (
          <HStack justifyContent="center" minH={16}>
            <Text mx="20px" minW={28} color="brand.blue">
              {fileName}
            </Text>
            {jsonURL ? (
              <Text minW={28} color="brand.blue">
                Ready for submit !
              </Text>
            ) : (
              <Button
                size="xs"
                leftIcon={<HiCloudUpload />}
                onClick={onUploadHandler}
              >
                Upload File
              </Button>
            )}
          </HStack>
        )}
        <Spacer />
      </Center>
      <Text ml={2} fontSize="14px" color="brand.grayLight">
        Recommended file format is <code>.json</code>
      </Text>
    </VStack>
  );
};

export default JsonUpload;
