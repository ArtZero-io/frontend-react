import {
  Center,
  Heading,
  Button,
  Flex,
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
import { DownloadIcon } from "@chakra-ui/icons";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ActiveIcon from "@theme/assets/icon/Active.js";
import InActiveIcon from "@theme/assets/icon/InActive.js";

function HomePage() {
  return (
    <Layout>
      <Center w="full">
        <Heading size="h1">Artzero Smartnet Demo</Heading>
      </Center>
      <Center w="full">
        <Text fontSize="lg">Welcome to ArtZero - The first NFT Marketplace on Aleph Zero Network!</Text>
        <Text fontSize="lg">We are proud to have the platform live on Smartnet. This is also one of the first dapps on AZero ecosystem.</Text>
      </Center>
      <Heading size="h6">How to Start?</Heading>
      <br/>
      <Text fontSize="lg">This version currently work with <a href="https://subwallet.app/" target="_blank">SubWallet</a>, <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot JS</a> and <a href="https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld" target="_blank">Talisman</a> extensions. Please make sure you installed at least one of these wallets and create an account.</Text>
      <br/>
      <Text fontSize="lg">You will need some Smartnet AZero (SZERO) to start. Get free SZERO from <a href="https://faucet-smartnet.test.azero.dev/" target="_blank">https://faucet-smartnet.test.azero.dev/</a> </Text>
      <br/>
      <Center w="full">
        <Text fontSize="lg">Introduction Video Here!</Text>

      </Center>
      <br/>
      <Heading size="h6">Available Features</Heading>
      <Text fontSize="lg">Support ERC721 (PSP34) Standard NFT</Text>
      <Text fontSize="lg">Support Polkadot JS, SubWallet and Talisman Wallet</Text>
      <Text fontSize="lg">On-chain Profile</Text>
      <Text fontSize="lg">Explore NFT Collections</Text>
      <Text fontSize="lg">Create Collections in Simple mode and Advanced mode</Text>
      <Text fontSize="lg">Create NFT</Text>
      <Text fontSize="lg">List, unlist, buy, bid NFTs</Text>
      <Text fontSize="lg">Mint ArtZero NFTs on Smartnet (only 200 available)</Text>
      <Text fontSize="lg">Stake ArtZero NFTs for trade discount</Text>
      <br/>
      <Heading size="h6">Up-coming Features</Heading>
      <Text fontSize="lg">Support ERC1155 (PSP1155) Standard</Text>
      <Text fontSize="lg">More documentation and tutorials</Text>
      <Text fontSize="lg">Search for NFTs and Collections</Text>
      <Text fontSize="lg">Launch Pad for NFT projects</Text>
      <Text fontSize="lg"></Text>
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
      </Flex>
    </Layout>
  );
}

export default HomePage;
