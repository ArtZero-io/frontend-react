import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Progress,
  Spacer,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";

import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { useParams } from "react-router-dom";

function LaunchpadDetailPage() {
  const [formattedCollection] = useState(null);
  const { collection_address } = useParams();

  console.log("collection_address", collection_address);

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="launchpad-detail"
    >
      <LaunchpadDetailHeader />

      <Box
        w="full"
        maxW="870px"
        mx="auto"
        bg="#222"
        px="30px"
        py="26px"
        mb="30px"
      >
        <Flex w="full" mb="15px">
          <Heading size="h6">Public Sale In Progress</Heading>
          <Spacer />
          <Text color="#888">98% (760/777)</Text>
        </Flex>
        <Progress value={98} mb="20px" h="8px" />
        <Flex w="full" justifyContent="center">
          <Button variant="outline">connect your wallet</Button>
        </Flex>
      </Box>

      <Box
        w="full"
        maxW="870px"
        mx="auto"
        bg="#222"
        px="30px"
        py="26px"
        mb="30px"
      >
        <Flex w="full" mb="15px">
          <Heading size="h4">Phases</Heading>
          <Spacer />
        </Flex>
        <Wrap flexWrap={true} w="full" mb="15px">
          <WrapItem>
            <Tag w="full">OG</Tag>
          </WrapItem>
          <Flex
            color="#888"
            w="full"
            minW="500px"
            alignContent="center"
            fontSize={["15px", "18px", "18px"]}
            minH={{ base: "1rem", "2xl": "3.375rem" }}
          >
            <Text mr="30px">
              Whitelist:{" "}
              <Text as="span" color="#fff">
                162
              </Text>
            </Text>
            <Text mr="30px">
              Max:{" "}
              <Text as="span" color="#fff">
                3 Tokens
              </Text>
            </Text>
            <Text>
              Price:{" "}
              <Text as="span" color="#fff">
                1.20 <AzeroIcon mb="5px" />
              </Text>
            </Text>
          </Flex>
        </Wrap>
        <Divider />
        <Wrap flexWrap={true} w="full" mt="30px">
          <WrapItem>
            <Tag w="full">Whitelist</Tag>
          </WrapItem>
          <Flex
            color="#888"
            w="full"
            minW="500px"
            alignContent="center"
            fontSize={["15px", "18px", "18px"]}
            minH={{ base: "1rem", "2xl": "3.375rem" }}
          >
            <Text mr="30px">
              Whitelist:{" "}
              <Text as="span" color="#fff">
                1162
              </Text>
            </Text>
            <Text mr="30px">
              Max:{" "}
              <Text as="span" color="#fff">
                2 Tokens
              </Text>
            </Text>
            <Text>
              Price:{" "}
              <Text as="span" color="#fff">
                1.50 <AzeroIcon mb="5px" />
              </Text>
            </Text>
          </Flex>
        </Wrap>
      </Box>

      <Box
        w="full"
        maxW="870px"
        mx="auto"
        bg="#222"
        px="30px"
        py="26px"
        mb="30px"
      >
        <Flex w="full" mb="30px">
          <Heading size="h4">Roadmap</Heading>
          <Spacer />
        </Flex>

        <Flex w="full" mb="20px">
          <Heading size="h6">
            Phase 1:{" "}
            <Text as="span" color="#7ae7ff">
              Rise from the Ashes
            </Text>
          </Heading>
          <Spacer />
        </Flex>

        <Box fontSize="lg" color="#888" px="20px" mb="30px">
          <List styleType="disc">
            <ListItem mr="30px" mb="10px">
              Whitelist: 162
            </ListItem>

            <ListItem mr="30px" mb="10px">
              Social Media Accounts
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Drawings of Tier 4 (Apartment) - Tier 3 (Duplex) - Tier 2 (Villa)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              NFT Card Design
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Website & Ashes
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Render Photos of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Animation Video of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Preview Demo of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Giveaways
            </ListItem>
            <ListItem mr="30px" mb="10px">
              First Demo Release Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Collab with Partnerships
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Granting Whitelist Roles
            </ListItem>
          </List>
        </Box>

        <Divider />

        <Flex w="full" mb="20px" mt="30px">
          <Heading size="h6">
            Phase 2:{" "}
            <Text as="span" color="#7ae7ff">
              The shaping of the Ashes{" "}
            </Text>
          </Heading>
          <Spacer />
        </Flex>

        <Box fontSize="lg" color="#888" px="20px">
          <List styleType="disc">
            <ListItem mr="30px" mb="10px">
              Whitelist: 162
            </ListItem>

            <ListItem mr="30px" mb="10px">
              Social Media Accounts
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Drawings of Tier 4 (Apartment) - Tier 3 (Duplex) - Tier 2 (Villa)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              NFT Card Design
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Website & Ashes
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Render Photos of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Animation Video of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Preview Demo of Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Giveaways
            </ListItem>
            <ListItem mr="30px" mb="10px">
              First Demo Release Tier 4 (Apartment)
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Collab with Partnerships
            </ListItem>
            <ListItem mr="30px" mb="10px">
              Granting Whitelist Roles
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box
        w="full"
        maxW="870px"
        mx="auto"
        bg="#222"
        px="30px"
        py="26px"
        mb="30px"
      >
        <Flex w="full" mb="30px">
          <Heading size="h4">Team</Heading>
          <Spacer />
        </Flex>
        <Grid
          templateColumns={`repeat(auto-fill, minmax(min(100%, 250px), 1fr))`}
          gap="30px"
        >
          <GridItem>
            <TeamCard />
          </GridItem>
          <GridItem>
            <TeamCard />
          </GridItem>
          <GridItem>
            <TeamCard />
          </GridItem>
          <GridItem>
            <TeamCard />
          </GridItem>
          <GridItem>
            <TeamCard />
          </GridItem>
          <GridItem>
            <TeamCard />
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
}

export default LaunchpadDetailPage;
