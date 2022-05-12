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
          isDisabled={loadingText === "Start"}
        >
          {text === "buy"
            ? "Buy now"
            : text === "offer"
            ? "Make offer"
            : text === "remove bid"
            ? "Remove bid"
            : "Submit"}
        </Button>
        <Button
          display={isDo && isLoading ? "flex" : "none"}
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
    </>
  );
}

export default StatusBuyButton;
