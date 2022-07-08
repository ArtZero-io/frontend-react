import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { FaTelegram } from "react-icons/fa";
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
  isOfferBtnFocus = false,
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

  return (
    <>
      <>
        <Button
          display={isDo && isLoading ? "none" : "flex"}
          variant={variant}
          onClick={onClick}
          h={height}
          maxW={!isOfferBtnFocus ? maxW : "155px"}
          px={!isOfferBtnFocus ? "32px" : "8px"}
          w={minW}
          isDisabled={loadingText === "Start" || shouldDisabled}
        >
          {text === "buy" ? (
            "Buy now"
          ) : text === "offer" && !isOfferBtnFocus ? (
            "Make offer"
          ) : text === "offer" && isOfferBtnFocus ? (
            <FaTelegram size="24px" />
          ) : text === "remove bid" ? (
            "Remove bid"
          ) : text === "accept bid" ? (
            "Accept bid"
          ) : text === "whitelist" ? (
            "Whitelist mint (free)"
          ) : text === "public" ? (
            "Mint now"
          ) : (
            "Submit"
          )}
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
            : loadingText === "Broadcast"
            ? "Broadcast"
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
