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
  minW = "",
  maxW = "7rem",
  variant = "solid",
  height = 10,
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
          variant={variant}
          onClick={onClick}
          h={height}
          maxW={maxW}
          w={minW}
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
            : text === "whitelist"
            ? "Whitelist mint (free)"
            : text === "public"
            ? "Mint now"
            : "Submit"}
        </Button>

        <Button
          display={isDo && isLoading ? "flex" : "none"}
          isDisabled={loadingText !== "Finalized" || shouldDisabled}
          onClick={onCloseHandler}
          variant="outline"
          h={height}
          maxW={maxW}
          fontSize="md"
          width={minW}
        >
          {loadingText === "Start"
            ? "Please Sign"
            : loadingText === "Ready"
            ? "Ready"
            : loadingText === "InBlock"
            ? "In block"
            : loadingText === "Finalized"
            ? `All Done !`
            : loadingText === "End"
            ? `All Done !`
            : ""}
        </Button>
      </>
    </>
  );
}

export default StatusBuyButton;
