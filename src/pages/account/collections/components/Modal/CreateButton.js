import { Box, Flex, Heading, List, ListIcon, ListItem } from "@chakra-ui/react";
import AddCollectionIcon from "@theme/assets/icon/AddCollection";
import { MdCheck } from "react-icons/md";

export const CreateButton = ({ icon, title, data, onClick }) => {
  return (
    <Box
      maxW="xs"
      width={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.700"
      _hover={{ borderColor: "#7ae7ff" }}
      onClick={onClick}
      cursor="pointer"
    >
      <Flex justifyContent={"center"} pt="15px">
        {icon || (
          <AddCollectionIcon
            width={["36px", "48px"]}
            height={["36px", "48px"]}
          />
        )}
      </Flex>

      <Heading textAlign={"center"} fontSize={["sm", "md"]} my={3}>
        {title}
      </Heading>
      <Box p={1}>
        <List minHeight={"150px"} p={2} spacing={1} bg="brand.grayDark">
          {data?.map((el) => (
            <ListItem>
              <Flex>
                <ListIcon as={MdCheck} />
                <Box fontSize={"14px"}>{el}</Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
