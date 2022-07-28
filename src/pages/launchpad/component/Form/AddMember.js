import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, IconButton, Stack } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import ImageUpload from "@components/ImageUpload/Collection";
// import { useState } from "react";

function AddMember({ name, mode }) {
  const [{ value }, , helpers] = useField(name);
  // const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");


  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const handleAvatarUrl = (hash, index) => {
    const valueAddHash = value.map((i, idx) => {
      const avatarHash = idx !== index ? i.avatar : hash;

      return { ...i, avatar: avatarHash };
    });

    helpers.setValue(valueAddHash);
  };

  const handleAddMore = (arrayHelpers) => {
    const avatarArray = value.map((i) => i.avatar);

    const isAllAvatarUpload = avatarArray.every((e) => e);

    if (!isAllAvatarUpload) {
      return toast.error("Please upload avatar!");
    }

    arrayHelpers.push({
      name: "",
      title: "",
      socialLink: "",
      avatar: "",
    });
  };

  return (
    <FieldArray
      name="members"
      render={(arrayHelpers) => {
        return (
          <div>
            {value?.map((members, index) => (
              <div key={index}>
                <Stack
                  mb={4}
                  alignItems="flex-start"
                  direction={{ base: "column", md: "row" }}
                >
                  <HStack w="full" alignItems="center">
                    <IconButton
                      size="icon"
                      aria-label="delete"
                      variant="iconOutline"
                      mt={index === 0 ? "8px" : "-28px"}
                      icon={<DeleteIcon fontSize="24px" />}
                      onClick={() => arrayHelpers.remove(index)}
                      isDisabled={index === 0 && value.length === 1}
                    />
                    <Input
                      mx={5}
                      type="text"
                      width="45%"
                      height={index === 0 ? "112px" : "78px"}
                      isRequired={true}
                      autoComplete="off"
                      name={`members[${index}].name`}
                      label={index === 0 && "Name"}
                      placeholder="Your name here"
                    />
                    <Input
                      mx={5}
                      type="text"
                      width="45%"
                      height={index === 0 ? "112px" : "78px"}
                      isRequired={true}
                      autoComplete="off"
                      name={`members[${index}].title`}
                      label={index === 0 && "Title"}
                      placeholder="Your title here"
                    />
                  </HStack>
                  <HStack w="full" justifyContent="start" alignItems="center">
                    <Input
                      mx={5}
                      width="30%"
                      height={16}
                      type="text"
                      autoComplete="off"
                      name={`members[${index}].socialLink`}
                      label={index === 0 && "Social link"}
                      placeholder="Your link here"
                    />
                    <ImageUpload
                      // minH="50px"
                      // title={index === 0 && "Avatar"}
                      // isDisabled={addCollectionTnxStatus}
                      index={index}
                      mode={mode}
                      isBanner={false}
                      isRequired={true}
                      id={`memberAvatar${index}`}
                      // imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={handleAvatarUrl}
                    />
                  </HStack>
                </Stack>
              </div>
            ))}
            <Flex pb={6}>
              <Button
                variant="outline"
                type="button"
                isDisabled={
                  mode === formMode.ADD &&
                  // (hasEmptyLevel ||
                  (!arrayHelpers?.form?.dirty ||
                    arrayHelpers.form?.errors?.levels)
                }
                onClick={() => handleAddMore(arrayHelpers)}
              >
                add more
              </Button>
            </Flex>
          </div>
        );
      }}
    />
  );
}

export default AddMember;
