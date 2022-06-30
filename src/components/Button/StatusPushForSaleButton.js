import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

function StatusPushForSaleButton({
  isLoading,
  loadingText,
  text,
  type,
  listToken,
  unlistToken,
  isDisabled,
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
      {text === "push for sale" && (
        <Fragment>
          <Button
            isDisabled={isDisabled}
            display={!isLoading ? "block" : "none"}
            variant="solid"
            onClick={() => {
              listToken();
            }}
            minW="10rem"
          >
            Push for sale
          </Button>
          <Button
            display={isLoading ? "flex" : "none"}
            variant="outline"
            onClick={() => onCloseHandler()}
            isDisabled={loadingText !== "Finalized"}
            minW="10rem"
          >
            {loadingText === "Start"
              ? "Please sign"
              : loadingText === "Ready"
              ? "Ready"
              : loadingText === "InBlock"
              ? "In block"
              : loadingText === "Finalized"
              ? `All Done !`
              : ""}
          </Button>
        </Fragment>
      )}

      {text === "remove from sale" && (
        <>
          <Button
            display={isLoading ? "none" : "flex"}
            variant="solid"
            onClick={unlistToken}
            minW="10rem"
            isDisabled={loadingText === "Start"}
          >
            {text === "remove from sale" ? "Remove from sale" : "Submit"}
          </Button>
          <Button
            display={isLoading ? "flex" : "none"}
            isDisabled={loadingText !== "Finalized"}
            onClick={onCloseHandler}
            variant="outline"
            minW="10rem"
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
      )}
    </>
  );
}

export default StatusPushForSaleButton;
