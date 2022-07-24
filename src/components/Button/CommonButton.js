import React from "react";
import { Button } from "@chakra-ui/react";
import { END, FINALIZED } from "@constants/index";
import { ClipLoader } from "react-spinners";

function CommonButton(props) {
  const {
    onClick,
    onEndClick,
    step,
    text,
    isDisabled,
    variant,
    minW,
    px,
    mx,
    isLoading,
    ...rest
  } = props;

  console.log("step", step);

  const handleOnClick = async () => {
    if (!step) {
      onClick();
      return;
    }

    if (step !== FINALIZED) {
      onClick();
      return;
    }

    if (step === END) {
      return;
    }

    onEndClick();
  };

  return (
    <Button
      {...rest}
      mx={mx || "4px"}
      minW={minW || "120px"}
      onClick={handleOnClick}
      isDisabled={isDisabled}
      px={px || ["16px", "32px"]}
      isLoading={isDisabled ? false : isLoading}
      spinner={<ClipLoader color="#7ae7ff" size={14} loading />}
      variant={variant || step === FINALIZED ? "outline" : "solid"}
    >
      {!isDisabled && step === FINALIZED ? "all done!" : text}
    </Button>
  );
}

export default CommonButton;
