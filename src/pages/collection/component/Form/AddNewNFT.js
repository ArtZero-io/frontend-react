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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddNewNFTImageUpload from "@components/ImageUpload/Collection";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { useParams } from "react-router-dom";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { delay } from "@utils";
import AddNewNFTInput from "@components/Input/Input";
import AddNewNFTTextArea from "@components/TextArea/TextArea";
import { useDispatch, useSelector } from "react-redux";
import AddPropertiesModal from "../Modal/AddProperties";
import AddLevelsModal from "../Modal/AddLevels";

const AddNewNFTForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");

  const { api, currentAccount } = useSubstrateState();
  const [isLoadedContract, setIsLoadedContract] = useState(false);
  const [nft721Psp34StandardContract, setNft721Psp34StandardContract] =
    useState({});
  const param = useParams();
  const [collection, setCollectionData] = useState({});

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(async () => {
    if (isLoadedContract === false) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.address
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      setNft721Psp34StandardContract(nft721_psp34_standard_calls);
      setIsLoadedContract(true);
    }
  }, [api, isLoadedContract, param.address]);

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {
    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.address
    );
    setCollectionData(data);
  };
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
          !avatarIPFSUrl && toast.error("Upload images first");

          if (avatarIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            if (collection.collectionOwner === currentAccount?.address) {
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

              for (const property of values.properties) {
                attributes.push({
                  name: property.type,
                  value: property.name,
                });
              }

              for (const level of values.levels) {
                attributes.push({
                  name: level.name,
                  value: level.level + "|" + level.maxLevel,
                });
              }

              await nft721Psp34StandardContract.mintWithAttributes(
                currentAccount,
                attributes,
                dispatch
              );
            } else {
              console.log("You aren't the owner of this collection!");
              toast.error("You aren't the owner of this collection!");
            }
          }
        }}
      >
        {({ values }) => (
          <div>
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
                    {values?.properties.map((item) => {
                      return (
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
                              <Text color="brand.grayLight">
                                <Text>{item.type}</Text>
                                <Heading size="h6" mt={1}>
                                  {item.name}
                                </Heading>
                              </Text>
                              <Spacer />
                            </Flex>
                          </Box>
                        </GridItem>
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
                  ? values?.levels.map((item) => {
                      return (
                        <Box
                          w="full"
                          textAlign="left"
                          alignItems="end"
                          bg="brand.semiBlack"
                          p={5}
                          mb={3}
                        >
                          <Flex w="full" mb={3}>
                            <Text color="#fff">
                              <Heading size="h6" mt={1} color="#fff">
                                {item.name}
                              </Heading>
                            </Text>
                            <Spacer />{" "}
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

// const AddNewNFTPropertiesList = ({ values }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box pt={6}>
//       <Flex w="full" pb={3} borderBottomWidth={1}>
//         <VStack alignItems="start">
//           <Heading size="h5">properties</Heading>
//           <Text fontSize={"lg"}>
//             Textural trails that show up as restangles
//           </Text>
//         </VStack>
//         <Spacer />
//         <Button variant="outline" color="brand.blue" onClick={onOpen}>
//           Add properties
//         </Button>
//       </Flex>

//       <AddPropertiesModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
//     </Box>
//   );
// };

// const AddNewNFTLevelsList = ({ values }) => {
//   return (
//     <Box pt={6}>
//       <Flex w="full" pb={3} borderBottomWidth={1}>
//         <VStack alignItems="start">
//           <Heading size="h5">Levels</Heading>
//           <Text fontSize={"lg"}>
//             Textural trails that show up as restangles
//           </Text>
//         </VStack>
//         <Spacer />
//         <Button variant="outline" color="brand.blue">
//           Add Levels
//         </Button>
//       </Flex>

//       <Flex>
//         <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
//           <Text>Name</Text>
//         </Box>
//         <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
//           <Text>Level</Text>
//         </Box>
//         <Box w={14} />
//       </Flex>
//       <FieldArray
//         name="levels"
//         render={(arrayHelpers) => (
//           <div>
//             {values.levels.map((level, index) => (
//               <div key={index}>
//                 {/** both these conventions do the same */}
//                 <Flex alignItems="center" mb={4}>
//                   <Field as={Input} bg="black" name={`levels[${index}].name`} />
//                   <Field as={Input} bg="black" name={`levels.${index}.level`} />
//                   <Field
//                     as={Input}
//                     bg="black"
//                     name={`levels.${index}.maxLevel`}
//                   />
//                   <IconButton
//                     aria-label="Delete"
//                     icon={<DeleteIcon fontSize="1.5rem" />}
//                     size="icon"
//                     variant="iconOutline"
//                     onClick={() => arrayHelpers.remove(index)}
//                   />
//                 </Flex>
//               </div>
//             ))}
//             <IconButton
//               aria-label="Add"
//               icon={<AddIcon fontSize="1.5rem" />}
//               size="icon"
//               variant="iconOutline"
//               onClick={() =>
//                 arrayHelpers.push({ name: "", level: "", maxLevel: "" })
//               }
//             />
//           </div>
//         )}
//       />
//     </Box>
//   );
// };
