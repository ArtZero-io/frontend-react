import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
// import ImageUpload from "@components/ImageUpload/Collection";
import { useState } from "react";
import ImageUploadThumbnail from "@components/ImageUpload/Thumbnail";

function AddMember({ name, mode, isDisabled }) {
  const [{ value }, , helpers] = useField(name);
  // eslint-disable-next-line no-unused-vars
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState(null);
  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const handleAvatarUrl = (hash, index) => {
    const valueAddHash = value.map((i, idx) => {
      const avatarHash = idx !== index ? i.avatar : hash;

      return { ...i, avatar: avatarHash };
    });
    setAvatarIPFSUrl(hash);
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
        const membersErrors = arrayHelpers?.form?.errors?.members;

        return (
          <Stack>
            {value?.map((_, index) => (
              <Stack
                flexDirection={["column", "row"]}
                bg="#222"
                w="full"
                key={index}
                p={["10px", "30px"]}
                alignItems="center"
              >
                <Stack w={["full", "auto"]} alignItems={["center", "start"]}>
                  <Stack w="full">
                    <Text fontSize="lg">Choose avatar image</Text>
                  </Stack>

                  <VStack>
                    <ImageUploadThumbnail
                      isSmallThumbnail={true}
                      width="200px"
                      height="200px"
                      title={"Member Avatar"}
                      isDisabled={isDisabled}
                      index={index}
                      mode={mode}
                      isBanner={false}
                      isRequired={true}
                      id={`memberAvatar${index}`}
                      imageIPFSUrl={value[index].avatar}
                      setImageIPFSUrl={handleAvatarUrl}
                      limitedSize={{ width: "500", height: "500" }}
                    />
                  </VStack>
                </Stack>

                <Stack w="full" pl={[0, "30px"]} gap={["0px"]}>
                  <Stack direction={["column", "row"]} gap={["0px", "30px"]}>
                    <Input
                      isDisabled={isDisabled}
                      mx="0"
                      type="text"
                      width="100%"
                      isRequired={true}
                      autoComplete="off"
                      name={`members[${index}].name`}
                      label={"Name"}
                      placeholder="Your name here"
                    />
                    <Input
                      isDisabled={isDisabled}
                      mx="0"
                      type="text"
                      width="100%"
                      isRequired={true}
                      autoComplete="off"
                      name={`members[${index}].title`}
                      label={"Title"}
                      placeholder="Your title here"
                    />
                  </Stack>

                  <Stack direction={["column", "row"]} gap={["0px", "0px"]}>
                    <Input
                      isDisabled={isDisabled}
                      mx="0"
                      width="100%"
                      type="text"
                      autoComplete="off"
                      name={`members[${index}].socialLink`}
                      label={"Social link"}
                      placeholder="Your link here"
                    />
                  </Stack>

                  <HStack justifyContent="start" w="full">
                    <Button
                      onClick={() => {
                        if (index === 0 && value.length === 1) return;
                        arrayHelpers.remove(index);
                      }}
                      isDisabled={index === 0 && value.length === 1}
                    >
                      delete
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
            ))}
            <Stack w="full" py="30px">
              <Stack>
                {typeof membersErrors === "string" ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    {membersErrors}
                  </Text>
                ) : null}
              </Stack>

              <Button
                w="140px"
                variant="outline"
                type="button"
                isDisabled={
                  isDisabled ||
                  (mode === formMode.ADD &&
                    // (hasEmptyLevel ||
                    (!arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.levels))
                }
                onClick={() => handleAddMore(arrayHelpers)}
              >
                add more
              </Button>
            </Stack>
          </Stack>
        );
      }}
    />
  );
}

export default AddMember;
