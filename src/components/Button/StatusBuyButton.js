import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

function StatusBuyButton({
  isLoading,
  loadingText,
  disabled,
  text,
  type,
  onClick,
  isDo,
}) {
  const dispatch = useDispatch();

  if (!isDo) return;

  const onCloseHandler = async () => {
    const endTimeStamp = Date.now();

    dispatch({
      type: type,
      payload: {
        status: "End",
        endTimeStamp,
      },
    });
  };

  //isLoading
  // is "START" => Pls sign tnx
  // is "READY" => Ready to go
  // inBlock INBLOCK
  // finalized FINALIZED

  return (
    <>
      <Button
        disabled={disabled}
        display={!isLoading ? "flex" : "none"}
        variant="solid"
        spinnerPlacement="start"
        isLoading={isLoading}
        loadingText={loadingText}
        onClick={onClick}
        h={10}
        maxW={"7rem"}
        // w="full"
        // mt={6}
        // mb={{ xl: "16px", "2xl": "32px" }}
      >
        {text === "buy" ? "Buy now" : "change"}
      </Button>

      <Button
        display={isLoading ? "flex" : "none"}
        isDisabled={loadingText !== "Finalized"}
        onClick={onCloseHandler}
        variant="outline"
        h={10}
        maxW={"7rem"}
        fontSize="md"
        // w="full"
        // mt={6}
        // mb={{ xl: "1rem", "2xl": "2rem" }}
      >
        {loadingText === "Start"
          ? "Please Sign"
          : loadingText === "Ready"
          ? "Ready"
          : loadingText === "InBlock"
          ? "In block"
          : loadingText === "Finalized"
          ? `All Done !`
          : ""}
      </Button>
    </>
  );
}

export default StatusBuyButton;
