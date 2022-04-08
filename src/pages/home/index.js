import { DownloadIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import AzeroIcon from "@theme/assets/icon/Azero.js";

function HomePage() {
  return (
    <Layout>
      <div>This is a HomePage</div>
      <Flex w="full" justify="start" p={4}>
        <Stack p={10} bg="#464646">
          <Tag>
            <TagLeftIcon as={AzeroIcon} />
            <TagLabel>Volume 1.11m</TagLabel>
          </Tag>
          <Tag>
            <TagLabel>Unlisted</TagLabel>
          </Tag>
          <Tag>
            <TagLabel>12.88</TagLabel>
            <TagRightIcon as={AzeroIcon} />
          </Tag>

          <Tag variant="outline">
            <TagLabel>Fees: 3%</TagLabel>
          </Tag>
          <Tag variant="grayBg" size="2xl">
            <TagLabel>8,999</TagLabel>
            <TagRightIcon as={AzeroIcon} />
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
            size="lg"
            w="3.125rem"
            variant="iconOutline"
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="lg"
            w="3.125rem"
            variant="iconOutline"
            isDisabled
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="lg"
            w="3.125rem"
            variant="iconSolid"
          />
          <br />
          <IconButton
            aria-label="download"
            icon={<DownloadIcon />}
            size="lg"
            w="3.125rem"
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
      </Flex>
    </Layout>
  );
}

export default HomePage;
