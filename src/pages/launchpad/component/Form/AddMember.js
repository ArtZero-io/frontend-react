import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import toast from "react-hot-toast";
import Input from "@components/Input/Input";
import { formMode } from "@constants";
import ImageUpload from "@components/ImageUpload/Collection";

function AddMember({ name, mode }) {
  const [{ value }, , helpers] = useField(name);

  // const hasEmptyLevel = value.some((p) => p.name?.trim() === "");

  const handleAvatarUrl = (hash, index) => {
    const valueAddHash = value.map((i, idx) => {
      const avatarHash = idx !== index ? i.avatar : hash;
      console.log("handleAvatarUrl", avatarHash);
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
        const membersErrors = arrayHelpers?.form?.errors?.members;

        return (
          <Stack>
            {value?.map((_, index) => (
              <Stack
                key={index}
                p={["10px", "30px"]}
                gap={["0px", "0px"]}
                border="2px solid #333"
              >
                <Stack direction={["column", "row"]} gap={["0px", "30px"]}>
                  <Input
                    type="text"
                    width="100%"
                    isRequired={true}
                    autoComplete="off"
                    name={`members[${index}].name`}
                    label={"Name"}
                    placeholder="Your name here"
                  />
                  <Input
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
                    width="100%"
                    type="text"
                    autoComplete="off"
                    name={`members[${index}].socialLink`}
                    label={"Social link"}
                    placeholder="Your link here"
                  />
                </Stack>
                <Stack direction={["column", "row"]} gap="30px">
                  <ImageUpload
                    title={"Member Avatar"}
                    // isDisabled={addCollectionTnxStatus}
                    index={index}
                    mode={mode}
                    isBanner={false}
                    isRequired={true}
                    id={`memberAvatar${index}`}
                    // imageIPFSUrl={avatarIPFSUrl}
                    setImageIPFSUrl={handleAvatarUrl}
                    limitedSize={{ width: "500", height: "500" }}
                  />
                </Stack>
                <HStack justifyContent="end" w="full">
                  <Heading
                    _hover={{
                      color: !(index === 0 && value.length === 1) && "#7ae7ff",
                    }}
                    fontSize="sm"
                    color="#555"
                    fontStyle="unset"
                    cursor="pointer"
                    fontFamily="Evogria"
                    textDecoration="underline"
                    onClick={() => {
                      if (index === 0 && value.length === 1) return;
                      arrayHelpers.remove(index);
                    }}
                    isDisabled={index === 0 && value.length === 1}
                  >
                    delete
                  </Heading>
                </HStack>
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
                variant="solid"
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
            </Stack>
          </Stack>
        );
      }}
    />
  );
}

export default AddMember;
