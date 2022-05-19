import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

function StatusBuyButton({
  isLoading,
  loadingText,
  text,
  type,
  onClick,
  isDo,
  shouldDisabled,
}) {
  const dispatch = useDispatch();

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
      <>
        <Button
          display={isDo && isLoading ? "none" : "flex"}
          variant="solid"
          onClick={onClick}
          h={10}
          maxW={"7rem"}
          isDisabled={loadingText === "Start" || shouldDisabled}
        >
          {text === "buy"
            ? "Buy now"
            : text === "offer"
            ? "Make offer"
            : text === "remove bid"
            ? "Remove bid"
            : text === "accept bid"
            ? "Accept bid"
            : "Submit"}
        </Button>
        <Button
          display={isDo && isLoading ? "flex" : "none"}
          isDisabled={loadingText !== "Finalized" || shouldDisabled}
          onClick={onCloseHandler}
          variant="outline"
          h={10}
          maxW={"7rem"}
          fontSize="md"
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
    </>
  );
}

export default StatusBuyButton;
