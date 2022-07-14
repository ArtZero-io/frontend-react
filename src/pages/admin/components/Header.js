import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/react";

function AdminHeader() {
  return (
    <>
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "8", "2xl": "14" }}
      >
        <VStack>
          <HStack w="full" justifyContent="space-around" py={4}>
            <VStack textAlign="center" justifyContent="space-between">
              <Center w="full" pos="relative">
                <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>
                  ArtZero Administration
                </Heading>
              </Center>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}

export default AdminHeader;
