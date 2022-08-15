import {
  Button,
  Flex,
  Heading,
  Spacer,
  Box,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "./Card";

import { useHistory } from "react-router-dom";
import AnimationLoader from "@components/Loader/AnimationLoader";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

const NO_OF_PROJ_TO_DISPLAY = 4;

export const GroupCard = ({ variant = "live", projectsList, loading }) => {
  const { currentAccount } = useSubstrateState();

  const history = useHistory();

  const [noOfLoad, setNoOfLoad] = useState(0);

  return (
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
        <Heading fontSize={["xl", "3xl-mid"]} mb="10px">
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
              {projectsList
                .slice(0, NO_OF_PROJ_TO_DISPLAY * (noOfLoad + 1))
                .map((p, idx) => (
                  <Card key={idx} project={p} variant={variant} />
                ))}
            </Flex>
          ) : (
            <HStack justify="start" w="full">
              <Text fontSize="lg" px="15px" color="#888">
                No project found
              </Text>
            </HStack>
          )}
          {console.log("projectsList.length", projectsList)}
          {projectsList.length > NO_OF_PROJ_TO_DISPLAY ? (
            <Stack
              w="full"
              mx="auto"
              pt="60px"
              alignItems="center"
              justifyContent="center"
              direction={{ base: "column", xl: "row" }}
            >
              <Button
                isDisabled={
                  projectsList.length <= NO_OF_PROJ_TO_DISPLAY * (noOfLoad + 1)
                }
                variant="outline"
                onClick={() => setNoOfLoad((noOfLoad) => noOfLoad + 1)}
              >
                show more
              </Button>
            </Stack>
          ) : null}
        </Stack>
      )}
    </Box>
  );
};
