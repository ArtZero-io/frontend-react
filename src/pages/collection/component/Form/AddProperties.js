const AddNewNFTPropertiesList = ({ values }) => {
  return (
    <>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size="h4" >
            properties
          </Heading>
          <Text>Textural trails that show up as restangles</Text>{" "}
        </VStack>
        <Spacer />
        <Button variant="outline" color="brand.blue">
          Add properties
        </Button>
      </Flex>
      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Type</Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Name</Text>
        </Box>
        <Box w={14} />
      </Flex>
      <FieldArray
        name="properties"
        render={(arrayHelpers) => (
          <div>
            {values.properties.map((property, index) => (
              <div key={index}>
                {/** both these conventions do the same */}
                <Flex alignItems="center" mb={4}>
                  <Field
                    as={Input}
                    bg="black"
                    name={`properties[${index}].type`}
                  />
                  <Field
                    as={Input}
                    bg="black"
                    name={`properties.${index}.name`}
                  />

                  <Button
                    variant="icon"
                    borderWidth={2}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <Circle size="3.125rem">
                      <DeleteIcon fontSize="1.5rem" />
                    </Circle>
                  </Button>
                </Flex>
              </div>
            ))}

            <Button
              variant="icon"
              borderWidth={2}
              onClick={() => arrayHelpers.push({ type: "", name: "" })}
            >
              <Circle size="3.125rem">
                <AddIcon fontSize="1.5rem" />
              </Circle>
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default AddNewNFTPropertiesList;
