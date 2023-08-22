import {
  Button,
  Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spacer,
  Stack,
  useBreakpointValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import AdvancedMode from "./AdvancedMode";
import SimpleMode from "./SimpleMode";
import * as ROUTES from "@constants/routes";

// import AddCollectionIcon from "@theme/assets/icon/AddCollection";
import { useEffect } from "react";
import { formMode, FINALIZED } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import { CreateButton } from "./CreateButton";
import ProjectNFTIcon from "@theme/assets/icon/ProjectNFTIcon";
import { useHistory } from "react-router-dom";
import { SCROLLBAR } from "@constants";
import MenuCreatorIcon from "@theme/assets/icon/MenuCreator.js";

function AddNewCollection({
  variant = "",
  mode = formMode.ADD,
  id,
  hasCollection,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { step } = useTxStatus();

  const history = useHistory();

  useEffect(() => {
    step === FINALIZED && onClose();
  }, [step, onClose]);

  const modalSize = useBreakpointValue(["xs", "5xl", "5xl"]);

  return (
    <>
      {variant !== "navbar" && mode === formMode.ADD && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          {hasCollection ? "add a collection" : "become a creator"}
        </Button>
      )}

      {variant === "navbar" && mode === formMode.ADD && (
        <MenuItem
          onClick={() => onOpen()}
          to="#"
          ml={["20px", "auto"]}
          py={["4px", "12px"]}
          px={["4px", "10px"]}
          _hover={{ color: "brand.blue", bg: "black" }}
          fontFamily="Evogria, sans-serif"
          fontSize={{ base: "18px", md: "15px" }}
        >
          <MenuCreatorIcon />
          <Text ml="10px">become a creator</Text>
        </MenuItem>
      )}

      <Modal
        isCentered
        size={modalSize}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
      >
        {/* <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        /> */}
        <ModalContent
          borderRadius="0"
          position="relative"
          bg="brand.grayDark"
          px={["4px", "24px", "24px"]}
          py={["4px", "32px", "32px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            _hover="none"
            bg="#171717"
            top="4"
            right="4"
          />

          <ModalHeader textAlign="center">
            <Heading fontSize={["xl", "3xl", "3xl"]} my={3}>
              Setting up a new NFT Collection:
            </Heading>
          </ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <Stack
              mx="auto"
              gap={["10px", "20px"]}
              direction={{ base: "column", md: "row" }}
            >
              <SimpleMode variant={variant} mode={mode} id={id} />

              <Spacer />

              <AdvancedMode variant={variant} mode={mode} id={id} />
              <Spacer />
              <CreateButton
                onClick={() =>
                  history.push({
                    state: { formMode: "ADD" },
                    pathname: ROUTES.LAUNCHPAD_ADD_PROJECT,
                  })
                }
                icon={<ProjectNFTIcon />}
                title={"Launchpad"}
                data={[
                  "Intended for non-technical creators",
                  "Comprehensive platform to launch NFT projects that allow creators to easily sell their NFTs to the public",
                  "Provides whitelist options and offers a variety of price strategies",
                ]}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
