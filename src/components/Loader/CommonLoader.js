import { Heading, Center, Spinner, Stack } from "@chakra-ui/react";

const CommonLoader = ({ addText = "", size = "xl", minH, maxH, ...rest }) => {
  return (
    <Center width="100%" height="100%" maxH={maxH} minH={minH}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="#333"
          color="#7ae7ff"
          size={size}
          {...rest}
        />
        <Heading color="#fff" size="h6">
          {addText}
        </Heading>
      </Stack>
    </Center>
  );
};

export default CommonLoader;
