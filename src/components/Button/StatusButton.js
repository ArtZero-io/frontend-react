import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

function StatusButton({ isLoading, loadingText, mode, disabled, text, type }) {
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
      <Button
        disabled={disabled}
        display={!isLoading ? "flex" : "none"}
        variant="solid"
        spinnerPlacement="start"
        isLoading={isLoading}
        loadingText={loadingText}
        w="full"
        type="submit"
        mt={6}
        mb={{ xl: "16px", "2xl": "32px" }}
      >
        {mode && (mode === "add" ? "Add new collection" : "Submit change")}
        {text && "Submit"}
      </Button>

      <Button
        display={isLoading ? "flex" : "none"}
        variant="outline"
        w="full"
        onClick={onCloseHandler}
        mt={6}
        mb={{ xl: "1rem", "2xl": "2rem" }}
        isDisabled={loadingText !== "Finalized"}
      >
        {loadingText === "Start"
          ? "Please sign Tnx in your wallet"
          : loadingText === "Ready"
          ? "Your Tnx is ready"
          : loadingText === "InBlock"
          ? "Your Tnx is inblock"
          : loadingText === "Finalized"
          ? `Your Tnx is finalized! Check new ${text}`
          : ""}
      </Button>
    </>
  );
}

export default StatusButton;
