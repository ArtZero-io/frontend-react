import {
  Container,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
import Dropdown from "@components/Dropdown/Dropdown";
import { useState } from "react";
import CommonButton from "@components/Button/CommonButton";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import { stringToHex } from "@polkadot/util";
import { APICall } from "@api/client";
import { MESSAGE_SIGN } from "@constants";
import toast from "react-hot-toast";

const options = [
  "Fake collection or possible scam",
  "Explicit and sensitive content",
  "Spam",
  "Other",
];

function NFTReportModal({ isOpen, onClose, name, nftName, ...rest }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const { step, onEndClick } = useTxStatus();
  const { currentAccount } = useSubstrateState();
  const [value, setValue] = useState("");
  const { adapter } = useSubstrate();

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  useEffect(() => {
    step === FINALIZED && onClose();
  }, [step, onClose]);

  const onClickSubmit = async () => {
    if (!currentAccount) {
      toast.error("Please connect wallet for full-function using!");
    }
    const { signature } = await adapter.signer.signRaw({
      address: currentAccount.address,
      data: stringToHex(MESSAGE_SIGN),
      type: "bytes",
    });
    const data = {
      collection_name: name,
      nft_name: nftName,
      message: `${options[selectedItem]}: ${value}`,
      address: currentAccount.address,
      signature,
      nft_link: window.location.href,
    };
    const res = await APICall.reportNFT(data);

    if (res.status === "OK") {
      toast.success("Thank you. Submit successful!");
      onClose();
    } else {
      toast.error("Submit failed!");
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        p={0}
        w="full"
        maxW="38rem"
        minH="255px"
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
      >
        <ModalCloseButton
          borderRadius="0"
          position="absolute"
          borderWidth={[0, "2px"]}
          top="4"
          right="4"
          onClick={() => step === FINALIZED && onEndClick()}
        />
        <Container p={"20px"}>
          <Heading
            color="#fff"
            size="h5"
            fontSize={{ base: "24px", "2xl": "28px" }}
            textAlign="center"
          >
            Report this item
          </Heading>
          <Flex
            justifyContent="center"
            mt="10px"
            mb="15px"
            align="center"
            pr={[0, "8px"]}
          >
            <Dropdown
              width={["full"]}
              minW="full"
              options={options}
              bg="brand.semiBlack"
              selectedItem={selectedItem}
              setSelectedItem={(i) => {
                setSelectedItem(i);
              }}
            />
          </Flex>
          <Textarea
            placeholder="Your message"
            value={value}
            onChange={handleInputChange}
          />
          <CommonButton
            w="full"
            my="24px"
            text={"Submit"}
            onClick={onClickSubmit}
          />
        </Container>
      </ModalContent>
    </Modal>
  );
}

export default NFTReportModal;
