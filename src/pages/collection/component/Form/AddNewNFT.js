import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddNewNFTImageUpload from "@components/ImageUpload/Collection";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { useParams } from "react-router-dom";
// import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
// import { delay } from "@utils";
import AddNewNFTInput from "@components/Input/Input";
import AddNewNFTTextArea from "@components/TextArea/TextArea";
import { useDispatch, useSelector } from "react-redux";
import AddPropertiesModal from "../Modal/AddProperties";
import AddLevelsModal from "../Modal/AddLevels";

const AddNewNFTForm = ({ collectionOwner }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const { currentAccount, api } = useSubstrateState();

  // const { api, currentAccount } = useSubstrateState();
  // const [isLoadedContract, setIsLoadedContract] = useState(false);
  // const [nft721Psp34StandardContract, setNft721Psp34StandardContract] =
  //   useState({});
  const { collection_address } = useParams();
  // const [collection, setCollectionData] = useState({});

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  // useEffect(async () => {
  //   if (isLoadedContract === false) {
  //     const nft721_psp34_standard_contract = new ContractPromise(
  //       api,
  //       nft721_psp34_standard.CONTRACT_ABI,
  //       collection_address
  //     );
  //     nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
  //     setNft721Psp34StandardContract(nft721_psp34_standard_calls);
  //     setIsLoadedContract(true);
  //   }
  // }, [api, isLoadedContract, collection_address]);

  // useEffect(async () => {
  //   await onRefresh();
  // }, [collection_manager_calls.isLoaded()]);

  // const onRefresh = async () => {
  //   await getCollectionData();
  //   await delay(1000);
  // };

  // const getCollectionData = async () => {
  //   let data = await collection_manager_calls.getCollectionByAddress(
  //     currentAccount,
  //     collection_address
  //   );
  //   setCollectionData(data);
  // };
  const [modifierToEdit, setModifierToEdit] = useState(-1);

  return (
    <div>
      <Formik
        initialValues={{
          NFTName: "",
          description: "",
          properties: [{ type: "", name: "" }],
          levels: [{ name: "", level: "", levelMax: "" }],
        }}
        validationSchema={Yup.object({
          NFTName: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(30, "Must be less than 30 characters")
            .required("Required"),
          description: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(150, "Must be 150 characters or less")
            .required("Required"),
          properties: Yup.array(
            Yup.object().shape({
              type: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
                .required("Required"),
              name: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
                .required("Required"),
            })
          )
            .min(1)
            .max(9),
          level: Yup.array(
            Yup.object().shape({
              name: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
                .required("Required"),
              level: Yup.number()
                .min(1, "Must be bigger than 0")
                .max(10, "Must be smaller than 10")
                .required("Required"),
              levelMax: Yup.number()
                .min(1, "Must be bigger than 0")
                .max(10, "Must be smaller than 10")
                .required("Required"),
            })
          )
            .min(1)
            .max(9),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("onSubmit start");
          console.log("onSubmit start values", values);
          console.log("onSubmit start avatarIPFSUrl", avatarIPFSUrl);
          !avatarIPFSUrl && toast.error("Upload images first");

          if (avatarIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;

            console.log("onSubmit start avatarIPFSUrl", values);
            console.log(
              "onSubmit collectionOwner === currentAccount?.address",
              collectionOwner === currentAccount?.address
            );

            if (collectionOwner === currentAccount?.address) {
              let attributes = [
                {
                  name: "nft_name",
                  value: values.NFTName,
                },
                {
                  name: "description",
                  value: values.description,
                },
                {
                  name: "avatar",
                  value: values.avatarIPFSUrl,
                },
              ];

              console.log("onSubmit 1 attributes", attributes);

              if (values?.properties?.name) {
                for (const property of values.properties) {
                  attributes.push({
                    name: property.type,
                    value: property.name,
                  });
                }
              }
              console.log("onSubmit 2 attributes", attributes);
              if (values?.properties?.name) {
                for (const level of values.levels) {
                  attributes.push({
                    name: level.name,
                    value: level.level + "|" + level.levelMax,
                  });
                }
              }
              console.log("onSubmit 3 attributes", attributes);
              const nft721_psp34_standard_contract = new ContractPromise(
                api,
                nft721_psp34_standard.CONTRACT_ABI,
                collection_address
              );
              nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
              await nft721_psp34_standard_calls.mintWithAttributes(
                currentAccount,
                attributes,
                dispatch
              );
              console.log("onSubmit 1 call ct done", attributes);
            } else {
              console.log("You aren't the owner of this collection!");
              toast.error("You aren't the owner of this collection!");
            }
          }
        }}
      >
        {({ values }) => (
          <div>
            {console.log("values", values)}
            <Form>
              <HStack>
                <AddNewNFTInput
                  label="NFT Name"
                  name="NFTName"
                  type="NFTName"
                  placeholder="NFT Name"
                />
              </HStack>

              <AddNewNFTTextArea
                label="Description"
                name="description"
                type="text"
                placeholder="Description"
              />

              <AddNewNFTImageUpload
                setImageIPFSUrl={setAvatarIPFSUrl}
                title="Avatar Image"
                limitedSize={{ width: "64", height: "64" }}
              />

              {/* Add Props  */}
              <Box py={6} borderBottomWidth={1}>
                <Flex w="full" pb={3}>
                  <VStack alignItems="start">
                    <Heading size="h5">properties</Heading>
                    <Text fontSize={"lg"}>
                      Textural trails that show up as restangles
                    </Text>
                  </VStack>
                  <Spacer />
                  <Button
                    variant="outline"
                    color="brand.blue"
                    onClick={() => setModifierToEdit("properties")}
                  >
                    Add properties
                  </Button>
                </Flex>

                {values.properties[0].type ? (
                  <Grid
                    w="full"
                    templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
                    gap={6}
                    overflowY="auto"
                  >
                    {values?.properties.map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <GridItem w="100%" h="100%">
                            <Box
                              w="full"
                              textAlign="left"
                              alignItems="end"
                              bg="brand.semiBlack"
                              px={4}
                              py={3}
                            >
                              <Flex w="full">
                                <Box color="brand.grayLight">
                                  <Text>{item.type}</Text>
                                  <Heading size="h6" mt={1}>
                                    {item.name}
                                  </Heading>
                                </Box>
                                <Spacer />
                              </Flex>
                            </Box>
                          </GridItem>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                ) : null}

                <AddPropertiesModal
                  name="properties"
                  onClose={() => setModifierToEdit(null)}
                  isOpen={modifierToEdit === "properties"}
                />
              </Box>
              {/* End Add Props  */}

              <Box py={6} borderBottomWidth={1}>
                <Flex w="full" pb={3}>
                  <VStack alignItems="start">
                    <Heading size="h5">Levels</Heading>
                    <Text fontSize={"lg"}>
                      Textural trails that show up as restangles
                    </Text>
                  </VStack>
                  <Spacer />
                  <Button
                    variant="outline"
                    color="brand.blue"
                    onClick={() => setModifierToEdit("levels")}
                  >
                    Add levels
                  </Button>
                </Flex>

                {values.levels[0].name
                  ? values?.levels.map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Box
                            w="full"
                            textAlign="left"
                            alignItems="end"
                            bg="brand.semiBlack"
                            p={5}
                            mb={3}
                          >
                            <Flex w="full" mb={3}>
                              <Heading size="h6" mt={1} color="#fff">
                                {item.name}
                              </Heading>
                              <Spacer />
                              <Text color="#fff">
                                {item.level} of {item.levelMax}
                              </Text>
                            </Flex>
                            <Progress
                              colorScheme="telegram"
                              size="sm"
                              value={Number((item.level * 100) / item.levelMax)}
                              height="6px"
                            />
                          </Box>
                        </React.Fragment>
                      );
                    })
                  : null}

                <AddLevelsModal
                  name="levels"
                  onClose={() => setModifierToEdit(null)}
                  isOpen={modifierToEdit === "levels"}
                />
              </Box>

              <Button
                spinnerPlacement="start"
                isLoading={tnxStatus}
                loadingText={`${tnxStatus?.status}`}
                variant="solid"
                w="full"
                type="submit"
                mt={8}
                mb={{ xl: "16px", "2xl": "32px" }}
              >
                Add new NFT
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddNewNFTForm;
