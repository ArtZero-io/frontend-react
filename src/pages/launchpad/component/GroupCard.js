import {
  Button,
  Flex,
  Heading,
  Spacer,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

import { useHistory } from "react-router-dom";
import AnimationLoader from "@components/Loader/AnimationLoader";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

export const GroupCard = ({ variant = "live", projectsList, loading }) => {
  const { currentAccount } = useSubstrateState();

  const history = useHistory();

  return (
    <>
      <Box
        w="full"
        mx="auto"
        mb="30px"
        py="60px"
        bg="#171717"
        maxW="1426px"
        alignItems="center"
        px={{ base: "15px", "2xl": "77px" }}
      >
        <Flex
          px="15px"
          w="full"
          mx="auto"
          mb="40px"
          maxW="1426px"
          alignItems="center"
          direction={{ base: "column", xl: "row" }}
        >
          <Heading size="h3" mb="10px">
            {variant} projects
          </Heading>

          <Spacer />
          {currentAccount && variant === "live" && (
            <Button
              variant="solid"
              onClick={() =>
                history.push({
                  state: { formMode: "ADD" },
                  pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                })
              }
            >
              create project
            </Button>
          )}
        </Flex>

        {loading ? (
          <AnimationLoader />
        ) : (
          <Stack>
            {projectsList.length ? (
              <Flex
                flexWrap="wrap"
                justifyContent="center"
                direction={["column", "row"]}
              >
                {projectsList.map((p) => (
                  <Card key={p.name} project={p} variant={variant} />
                ))}
              </Flex>
            ) : (
              <HStack justify="center" w="full">
                <Heading size="h6">No project found.</Heading>
              </HStack>
            )}
            {projectsList.length > 4 ? (
              <Stack
                w="full"
                mx="auto"
                pt="60px"
                alignItems="center"
                justifyContent="center"
                direction={{ base: "column", xl: "row" }}
              >
                <Button variant="outline">show more</Button>
              </Stack>
            ) : null}
          </Stack>
        )}
      </Box>
    </>
  );
};
