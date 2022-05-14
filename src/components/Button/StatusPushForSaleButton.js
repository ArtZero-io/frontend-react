import { Box, Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import toast from "react-hot-toast";

function StatusPushForSaleButton({
  isAllowanceMpContract,
  isLoading,
  loadingText,
  text,
  type,
  stepNo,
  setStepNo,
  listToken,
  approveToken,
  unlistToken,
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

  if (text === "push for sale" && !isAllowanceMpContract) {
    switch (stepNo) {
      case 0:
        return (
          <>
            <Button
              display={stepNo === 0 ? "flex" : "none"}
              variant="solid"
              onClick={() => {
                setStepNo(1);
                toast.success("You will need to approve before list on market");
              }}
              isDisabled={loadingText === "Start"}
              minW="10rem"
            >
              Push for sale
            </Button>
          </>
        );
      case 1:
        return (
          <Fragment>
            <Box>
              <Button
                minW="10rem"
                display={!isLoading ? "block" : "none"}
                variant="solid"
                onClick={() => {
                  approveToken();
                }}
              >
                Approve it
              </Button>
            </Box>
            <Button
              display={isLoading ? "flex" : "none"}
              isDisabled={loadingText !== "Finalized"}
              onClick={() => {
                setStepNo(0);

                dispatch({
                  type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
                });
              }}
              variant="outline"
              minW="10rem"
              fontSize="md"
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
        );

      default:
        break;
    }
  }

  if (text === "push for sale" && isAllowanceMpContract) {
    switch (stepNo) {
      case 1:
        return (
          <Fragment>
            <Button
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
        );

      default:
        break;
    }
  }

  return (
    <>
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
