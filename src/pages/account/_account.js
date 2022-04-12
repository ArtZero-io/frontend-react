import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
// import AccountTab from "./components/AccountTab";
import ProfileForm from "./components/Form/Profile";
import AccountLayout from "../../components/Layout/AccountLayout";

function Account() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile] = useState(accountData);

  const { avatar, name, description } = profile;

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" px={5} position="relative">
        <ProfileModal address="{address}" isOpen={isOpen} onClose={onClose} />
        <Box
          mx="auto"
          px={{ base: "6", md: "8" }}
          pt={{ base: "12", md: "28" }}
          pb={{ base: "12", md: "20" }}
        >
          <VStack>
            <Center
              rounded="full"
              w={32}
              h={32}
              p="-px"
              border="4px solid"
              borderColor="whiteAlpha.900"
            >
              <Image
                alt={avatar}
                w="full"
                h="full"
                rounded="full"
                objectFit="cover"
                src={avatar}
                fallbackSrc="https://via.placeholder.com/64"
              />
            </Center>

            <HStack w="full" justifyContent="space-around" py={4}>
              <VStack textAlign="center" justifyContent="space-between">
                <Heading size="h2" letterSpacing="wider" fontWeight="normal">
                  {name}
                  <IconButton
                    aria-label="edit-profile"
                    icon={<EditIcon size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                    onClick={() => onOpen()}
                    ml={5}
                  />
                </Heading>

                <Text fontSize="lg" maxW="md">
                  {description}
                </Text>

                <HStack textAlign="center">
                  <IconButton
                    aria-label="download"
                    icon={<FaInstagram size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                  <IconButton
                    aria-label="download"
                    icon={<FaTwitter size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                  <IconButton
                    aria-label="download"
                    icon={<FaDiscord size="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                  />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <AccountLayout />
    </Layout>
  );
}

export default Account;

const accountData = {
  id: "18",
  avatar:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fsolpunkspreview.webp&w=256&q=75",
  backdrop:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
  description:
    "The Degenerate Ape Academy is an NFT brand housed on the Solana blockchain. The academy consists of 10,000 degenerate ape NFTs.",
  volume: "11.1b",
  name: "Degenerate Trash Pandas",
};

function ProfileModal({ address, isOpen, onClose, isSale = true }) {
  return (
    <Modal onClose={onClose} isCentered isOpen={isOpen} size={"6xl"}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        p={12}
        borderRadius="0"
        minH={{ xl: "md" }}
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
        />

        <ProfileForm />
      </ModalContent>
    </Modal>
  );
}
