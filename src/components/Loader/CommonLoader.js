import { Heading, Center, Spinner, Stack } from "@chakra-ui/react";

const CommonLoader = ({ addText = "", size = "xl", minH, maxH, ...rest }) => {
  return (
    <Center width="full" height="full" maxH={maxH} minH={minH}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Spinner
          p={5}
          size={size}
          speed="0.5s"
          thickness="4px"
          color="#7ae7ff"
          emptyColor="#333"
          {...rest}
        />
        <Heading color="#fff" size="h6" px={5}>
          {addText}
        </Heading>
      </Stack>
    </Center>
  );
};

export default CommonLoader;
