import {
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import EditIcon from "@theme/assets/icon/Edit.js";

import { useEffect } from "react";
import useTxStatus from "@hooks/useTxStatus";
import AdvancedModeForm from "../Form/AdvancedMode";
import { formMode, SCROLLBAR, FINALIZED } from "@constants";
import * as ROUTES from "@constants/routes";
import { useHistory } from "react-router-dom";
import { CreateButton } from "./CreateButton";
import NFTAdvanIcon from "@theme/assets/icon/NFTAdvanIcon";

function AdvancedModeModal({
  mode = "add",
  id,
  nftContractAddress,
  contractType,
  variant,
}) {
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, onEndClick } = useTxStatus();
  const modalSize = useBreakpointValue(["xs", "5xl", "5xl"]);

  useEffect(() => {
    if (step === FINALIZED) {
      onClose();

      if (variant === "navbar") {
        history.push(ROUTES.ACCOUNT_MY_COLLECTIONS);
      }
    }
  }, [step, onClose, variant, history]);

  return (
    <>
      {mode === formMode.ADD && (
        // <Tooltip
        //   hasArrow
        //   bg="#333"
        //   color="#fff"
        //   label="Advanced mode is designed for those who wants to use customized NFT smart contract for example dedicated 5k or 10k collections with whitelisted options."
        // >
        //   <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        //     Advanced Mode
        //   </Button>
        // </Tooltip>
        <CreateButton icon={<NFTAdvanIcon />} onClick={() => onOpen()} title={'Advanced mode'} data={["Designed for tech-savvy creators", "Ability to customize the NFT smart contract to handle large NFT collections"]}/>
      )}

      {mode === formMode.EDIT && (
        <>
          <IconButton
            h="40px"
            top="2px"
            bg="black"
            size="icon"
            right="2px"
            minW="40px"
            zIndex={"1"}
            borderWidth={0}
            pos="absolute"
            aria-label="edit"
            variant="iconSolid"
            color="#7ae7ff"
            onClick={() => onOpen()}
            _hover={{
              color: "#000",
              bg: "#7ae7ff",
            }}
            icon={
              <EditIcon p="0" width="17px" height="17px" color="currentColor" />
            }
          />
        </>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        size={modalSize}
        onClose={onClose}
        closeOnEsc={false}
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        {/* <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        /> */}
        <ModalContent
          borderRadius="0"
          position="relative"
          bg="brand.grayDark"
          textAlign="center"
          px={["4px", "24px", "24px"]}
          pb={["4px", "32px", "32px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
            _hover="none"
            bg="#171717"
            onClick={() => step === FINALIZED && onEndClick()}
          />
          <ModalHeader>
            <Heading fontSize={["2xl", "3xl", "3xl"]} m={2}>
              {mode === formMode.ADD ? "Advanced Mode" : "Edit Collection"}{" "}
              <Tooltip
                bg="#333"
                color="#fff"
                fontSize="md"
                label="Advanced mode is designed for those who wants to use customized NFT smart contract for example dedicated 5k or 10k collections with whitelisted options."
              >
                <QuestionIcon fontSize="md" />
              </Tooltip>
            </Heading>
          </ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <AdvancedModeForm
              id={id}
              mode={mode}
              onClose={onClose}
              nftContractAddress={nftContractAddress}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdvancedModeModal;
