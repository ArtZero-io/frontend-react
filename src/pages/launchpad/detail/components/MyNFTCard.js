import {
    Box,
    Flex,
    Heading,
    Image,
    Skeleton,
    Square,
  } from "@chakra-ui/react";
  import React from "react";
  import {
    getCachedImageShort,
  } from "@utils";
  import { motion } from "framer-motion";
  
  
function MyLaunchPadNFTCard({
avatar,
nftName,
}) {

return (
    <motion.div
    className="my-collection-card"
    whileHover={{
        borderColor: "#7ae7ff",
    }}
    >
    <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        h="full"
        shadow="lg"
    >
        <Square h="13.75rem" w="13.75rem">
        <Image
            alt={nftName}
            w="full"
            h="full"
            objectFit="cover"
            src={getCachedImageShort(avatar, 500)}
            fallback={<Skeleton w="13.75rem" h="13.75rem" />}
        />
        </Square>

        <Box w="full" p={3}>
        <Heading mb={3} fontSize={["15px", "16px", "17px"]} textAlign="left">
            {nftName}
        </Heading>
        </Box>
    </Flex>
    </motion.div>
);
}
export default MyLaunchPadNFTCard;

  