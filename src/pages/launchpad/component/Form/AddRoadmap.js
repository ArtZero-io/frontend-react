/* eslint-disable no-unused-vars */
import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useField } from "formik";

import { formMode } from "@constants";

import Input from "@components/Input/Input";
import Editor from "@components/Editor/Editor";

function AddRoadmap({ name, mode, isDisabled }) {
  const [{ value }, { error }, helpers] = useField(name);

  const handleChange = (v, index) => {
    const newValue = value.map((i, idx) => {
      return idx === index ? { ...i, content: v } : i;
    });

    helpers.setValue(newValue);
  };
  // const hasEmptyProp = value.some((p) => p.type?.trim() === "");

  return (
    <FieldArray
      name="roadmap"
      render={(arrayHelpers) => {
        const roadmapErrors = arrayHelpers?.form?.errors?.roadmap;
        // console.log(arrayHelpers);
        return (
          <Stack>
            {value?.map((_, index) => (
              <Stack
                bg="#222"
                p={["10px", "30px"]}
                gap={["0px", "0px"]}
                key={index}
              >
                <Input
                  width="100%"
                  type="text"
                  mx="0"
                  isRequired={true}
                  autoComplete="off"
                  name={`roadmap[${index}].type`}
                  placeholder="Your milestone here"
                  label={"Milestone name"}
                  isDisabled={isDisabled}
                />

                <Editor
                  mode={mode}
                  index={index}
                  isDisabled={isDisabled}
                  isRequired={true}
                  name={`roadmap[${index}].content`}
                  editorContent={value[index].content}
                  handleChange={handleChange}
                />

                <Stack>
                  {error?.length ? (
                    <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                      {error[index]?.content}
                    </Text>
                  ) : null}
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
                {typeof roadmapErrors === "string" ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    {roadmapErrors}
                  </Text>
                ) : null}
              </Stack>

              <Button
                variant="solid"
                w="140px"
                type="button"
                isDisabled={
                  isDisabled ||
                  (mode === formMode.ADD &&
                    // (hasEmptyProp ||
                    (!arrayHelpers?.form?.dirty ||
                      arrayHelpers.form?.errors?.roadmap))
                }
                onClick={() => arrayHelpers.push({ type: "", content: "" })}
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

export default AddRoadmap;
