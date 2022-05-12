import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

function StatusPushForSaleButton({
  isAllowanceMpContract,
  isLoading,
  loadingText,
  text,
  type,
  onClick,
  isDo,
  stepNo,
  setStepNo,
  step1Function,
  listToken,
  approveToken,
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

  console.log("stepNo", stepNo);
  console.log("isAllowanceMpContract", isAllowanceMpContract);
  if (!isAllowanceMpContract) {
    switch (stepNo) {
      case 0:
        return (
          <Button
            display={stepNo === 0 ? "flex" : "none"}
            variant="solid"
            onClick={() =>
              !isAllowanceMpContract ? setStepNo(1) : setStepNo(2)
            }
            h={10}
            maxW={"7rem"}
            isDisabled={loadingText === "Start"}
          >
            Push for sale
          </Button>
        );
      case 1:
        return (
          <Fragment>
            <Button
              display={!isLoading ? "block" : "none"}
              variant="solid"
              onClick={() => {
                console.log("step 1func...");
                approveToken();
              }}
              h={10}
              maxW={"7rem"}
            >
              Approve it
            </Button>
            <Button
              display={isLoading ? "flex" : "none"}
              isDisabled={loadingText !== "Finalized"}
              onClick={() => {
                console.log("step 1func...");
                setStepNo(0);
              }}
              variant="outline"
              h={10}
              maxW={"7rem"}
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

  if (isAllowanceMpContract) {
    switch (stepNo) {
      case 0:
        return (
          <Fragment>
            <Button
              display={!isLoading ? "block" : "none"}
              variant="solid"
              onClick={() => {
                listToken();
              }}
              h={10}
              maxW={"7rem"}
            >
              Push for sale
            </Button>
            <Button
              display={isLoading ? "flex" : "none"}
              variant="outline"
              onClick={() => onCloseHandler()}
              h={10}
              maxW={"7rem"}
              isDisabled={loadingText === "Start"}
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
    text === "push for sale" &&
    !isAllowanceMpContract && (
      <>
        {}
        <>
          <Button
            hidden
            display={isDo && isLoading ? "none" : "flex"}
            variant="solid"
            onClick={onClick}
            h={10}
            maxW={"7rem"}
            isDisabled={loadingText === "Start"}
          >
            {isLoading ? "Approve it" : text}
          </Button>
          <Button
            hidden
            display={isDo && isLoading ? "flex" : "none"}
            isDisabled={loadingText !== "Finalized"}
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
    )
  );
}

export default StatusPushForSaleButton;
