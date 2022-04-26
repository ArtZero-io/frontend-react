import { Heading, Center, Spinner, Stack } from "@chakra-ui/react";

const CommonLoader = ({ addText = "", ...rest }) => {
  return (
    <Center width="100%" height="100%" minH="xl">
      <Stack direction="row" alignItems="center" spacing={2}>
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="#333"
          color="#7ae7ff"
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

export default CommonLoader;
