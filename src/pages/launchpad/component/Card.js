import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Progress,
  Skeleton,
  Square,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

export const Card = ({ variant, project, collection_address = "abc" }) => {
  const history = useHistory();

  return (
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      bg="brand.grayDark"
      shadow="lg"
      h="full"
      w="full"
      maxW="288px"
      minH="450px"
      position="relative"
    >
      {variant === "live" && (
        <Flex
          alignItems="start"
          justifyContent="flex-start"
          position="absolute"
          top="0"
          right="0"
          h="30px"
          minW="60px"
          bg="#34B979"
        >
          <Box position="relative" h="30px" w="30px">
            <motion.div
              animate={{
                scale: [0.3, 0.5, 0.7, 1, 0.7],
                opacity: [0.1, 0.3, 0.5, 0.25, 0.1],
              }}
              transition={{
                loop: Infinity,
                delay: 0,
                duration: 1,
              }}
              style={{
                top: "7px",
                left: "7px",
                position: "absolute",
                overflow: "visible",
              }}
            >
              <Circle bg="white" h="16px" w="16px" />
            </motion.div>

            <Circle
              top="10px"
              left="10px"
              position="absolute"
              bg="white"
              h="10.5px"
              w="10.5px"
            />
          </Box>
          <Text mt="2px">Live</Text>
        </Flex>
      )}
      {variant === "upcoming" && (
        <Flex
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top="0"
          right="0"
          h="30px"
          minW="55px"
          bg="#D72D2D"
        >
          <Text mx="10px">Upcoming</Text>
        </Flex>
      )}
      {variant === "ended" && (
        <Flex
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top="0"
          right="0"
          h="30px"
          minW="55px"
          bg="#434343"
        >
          <Text mx="10px">Ended</Text>
        </Flex>
      )}

      <Square h="288px" w="288px">
        <Image
          alt={"nftName"}
          w="full"
          h="full"
          objectFit="cover"
          src="https://api.artzero.io/getImage?input=ipfs://QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png&size=500&url=https://ipfs.infura.io/ipfs/QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png"
          fallback={<Skeleton w="288px" h="288px" />}
        />
      </Square>
      <Box w="full" px="16px" py="20px">
        {variant === "live" && (
          <Progress w="258px" h="8px" value={80} mb="12px" />
        )}
        <Heading
          mt={variant === "live" ? "20px" : 0}
          mb="14px"
          fontSize={["15px", "16px", "17px"]}
          textAlign="center"
        >
          {project.name}{" "}
        </Heading>

        {variant === "upcoming" && (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            minH="30px"
            w="full"
            my="15px"
          >
            <Text mx="10px">01 day</Text>
            <Text>:</Text>
            <Text mx="10px">23 hrs</Text>
            <Text>:</Text>
            <Text mx="10px">23 min</Text>
            <Text>:</Text>
            <Text mx="10px">23 sec</Text>
          </Flex>
        )}

        <Button
          border="none"
          bg="black"
          variant="outline"
          w="full"
          onClick={() =>
            history.push(
              "/launchpad/5FoLoL5mYXpBwxJUMDo3tcwh5VTrzaz3LvbA4B7LiivjXV7C"
            )
          }
        >
          view project
        </Button>
        {variant === "ended" && (
          <Button mt="10px" variant="outline" w="full">
            secondary market{" "}
          </Button>
        )}
      </Box>
    </Flex>
  );
};
