import { Heading, Center, Spinner, Stack } from "@chakra-ui/react";

const Loader = ({ addText = "", ...rest }) => {
  return (
    <Center width="100%" height="100%" minH="xl">
      <Stack direction="row" alignItems="center" spacing={2}>
        <Spinner
          thickness="8px"
          speed="0.85s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          {...rest}
        />
        <Heading as="h4" size="md">
          {addText}
        </Heading>
      </Stack>
    </Center>
  );
};

export default Loader;
