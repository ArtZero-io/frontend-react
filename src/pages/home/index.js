import {
  Center,
  Heading,
  // Button,
  // Flex,
  // IconButton,
  // Stack,
  // Tag,
  // TagLabel,
  // TagLeftIcon,
  // TagRightIcon,
  // Text,
} from "@chakra-ui/react";
import React from "react";
import Layout from "@components/Layout/Layout";
// import { DownloadIcon } from "@chakra-ui/icons";
// import AzeroIcon from "@theme/assets/icon/Azero.js";
// import ActiveIcon from "@theme/assets/icon/Active.js";
// import InActiveIcon from "@theme/assets/icon/InActive.js";

function HomePage() {
  return (
    <Layout>
      <Center h="80vh" w="full">
        <Heading size="h1">Welcome to Artzero Demo</Heading>
      </Center>

      {/* <Flex w="full" justify="start" p={4}>
        <Stack p={10} bg="#464646">
          <Tag>
            <TagLeftIcon as={AzeroIcon} />
            <TagLabel>Volume 1.11m</TagLabel>
          </Tag>
          <Tag>
            <TagLabel>Unlisted</TagLabel>
          </Tag>
          <Tag>
            <TagLabel>82.00</TagLabel>
            <TagRightIcon as={AzeroIcon} />
          </Tag>

          <Tag variant="outline">
            <TagLabel>Fees: 3%</TagLabel>
          </Tag>

          <Tag variant="grayBg" size="2xl">
            <TagLabel>8,999</TagLabel>
            <TagRightIcon as={AzeroIcon} />
          </Tag>

          <Tag variant="active">
            <TagLeftIcon as={ActiveIcon} />
            <TagLabel>Active</TagLabel>
          </Tag>

          <Tag variant="inActive">
            <TagLeftIcon as={InActiveIcon} />
            <TagLabel>Inactive</TagLabel>
          </Tag>
        </Stack>

        <Flex direction="column" mx={20} justify="space-between">
          <Button variant="outline">Outline</Button>
          <br />
          <Button variant="outline" isDisabled>
            isDisabled
          </Button>
          <br />
          <Button variant="solid">Default - Solid</Button>
          <br />
          <Button variant="solid" isDisabled>
            isDisabled
          </Button>
          <br />

          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="icon"
            variant="iconOutline"
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="icon"
            variant="iconOutline"
            isDisabled
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="icon"
            variant="iconSolid"
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="icon"
            variant="iconSolid"
            isDisabled
          />
        </Flex>

        <Stack spacing={6}>
          <Text>Body text</Text>
          <Text fontSize="lg">Body text</Text>
          <Heading size="h1" isTruncated>
            heading 1 56/70
          </Heading>
          <Heading size="h2">heading 2 48/60</Heading>
          <Heading size="h3">heading 3 40/50</Heading>
          <Heading size="h4">heading 4 32/40</Heading>
          <Heading size="h5">heading 5 24/30</Heading>
          <Heading size="h6">heading 6 18/22.5</Heading>
        </Stack>
      </Flex> */}
    </Layout>
  );
}

export default HomePage;
