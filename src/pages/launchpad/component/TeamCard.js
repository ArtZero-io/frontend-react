import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { getCachedImageShort } from "@utils/index";

export const TeamCard = ({ team_member }) => {
  console.log("team_member", team_member);
  return (
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      bg="brand.grayDark"
      h="full"
      w="full"
      maxW="250px"
      minH="320px"
      mb="30px"
    >
      <Square h="250px" w="250px">
        <Image
          alt={"nftName"}
          w="full"
          h="full"
          objectFit="cover"
          src={getCachedImageShort(team_member?.avatar, 500)}
          fallback={<Skeleton w="250px" h="250px" />}
        />
      </Square>
      <Box w="full" px="16px" pt="20px">
        <Heading
          fontSize={["15px", "16px", "17px"]}
          textAlign="center"
          mb="5px"
        >
          {team_member.name}{" "}
        </Heading>
        <Text as="span" color="#888">
          {team_member.title}{" "}
        </Text>

        <Stack>
          <Link
            color="brand.blue"
            textTransform="capitalize"
            to={team_member?.socialLink}
          >
            Social link
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
};
