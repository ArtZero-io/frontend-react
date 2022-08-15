import React from "react";
import { Button } from "@chakra-ui/react";
import { END, FINALIZED } from "@constants";
import { ClipLoader } from "react-spinners";
import { clearTxStatus } from "@store/actions/txStatus";
import { useDispatch } from "react-redux";

function CommonButton(props) {
  const {
    type,
    px,
    mx,
    text,
    minW,
    step,
    variant,
    onClick,
    isLoading,
    onEndClick,
    isDisabled,
    height,
    onRedirect,
    ...rest
  } = props;
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    if (type === "submit") {
      if (step !== FINALIZED) return;

      if (onRedirect) {
        onRedirect();
        return dispatch(clearTxStatus());
      }

      return onEndClick();
    }

    // type !== 'submit'
    if (!step) return onClick();

    if (step !== FINALIZED) return onClick();

    if (step === END) return;

    onEndClick();
  };

  return (
    <Button
      {...rest}
      type={type}
      mx={mx || "4px"}
      height={height}
      onClick={handleOnClick}
      isDisabled={isDisabled}
      fontSize={["13px", "15px"]}
      px={px || ["8px", "32px"]}
      minW={minW || ["content", "120px"]}
      isLoading={!isDisabled && isLoading ? true : false}
      spinner={<ClipLoader color="#7ae7ff" size={14} loading />}
      variant={variant || step === FINALIZED ? "outline" : "solid"}
    >
      {!isDisabled && step === FINALIZED ? "refresh !" : text}
    </Button>
  );
}

export default CommonButton;
