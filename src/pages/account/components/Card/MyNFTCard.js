import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
// import { MdHighlightOff, MdCheckCircle } from "react-icons/md";

const MyNFTCard = (props) => {
  const { name = "test name", backdrop, isListing, isBids = true } = props;
  return (
    <Box minW="234px" _hover={{ bg: "brand.blue" }} p={1}>
      <Flex
        minW={56}
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
      >
        <Square minW={56}>
          <Image
            alt={backdrop}
            h="full"
            w="full"
            objectFit="cover"
            src={backdrop}
            fallbackSrc="https://via.placeholder.com/400x400"
          />
        </Square>

        <Box w="full" p={3}>
          <Heading as="h4" mb={3} size="sm" textAlign="left">
            {name}
          </Heading>
          {isListing && (
            <Flex align="center" justify="start" w="full">
              <VStack>
                <Text color="brand.grayLight">For sale at</Text>
                <Flex alignItems="center" justifyContent="start">
                  <Text mt={-2}>72.00</Text>
                  <Avatar
                    mt={-2}
                    src={AzeroIcon}
                    h={4}
                    w={4}
                    mx={1}
                    name="AzeroLogo"
                    bg="transparent"
                  />
                </Flex>
              </VStack>
            </Flex>
          )}
          {isBids && (
            <Flex align="center" justify="start" w="full">
              <VStack align="start">
                <Text color="brand.grayLight">My offer</Text>
                <Flex alignItems="center" justifyContent="start">
                  <Text mt={-2}>72.00</Text>
                  <Avatar
                    mt={-2}
                    src={AzeroIcon}
                    h={4}
                    w={4}
                    mx={1}
                    name="AzeroLogo"
                    bg="transparent"
                  />
                </Flex>
              </VStack>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
export default MyNFTCard;
