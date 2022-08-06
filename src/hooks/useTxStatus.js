import { useDispatch, useSelector } from "react-redux";

import { setTxStatus } from "../store/actions/txStatus";
import { END, FINALIZED } from "@constants/index";

const stepInText = {
  Start: "please sign",
  Ready: "ready",
  Broadcast: "broadcast",
  InBlock: "in block",
  Finalized: "all done!",
  End: "all done!",
};

function useTxStatus() {
  const dispatch = useDispatch();
  const { type, step, tokenIDArray } = useSelector((s) => s.txStatus);

  const onEndClick = async () => {
    dispatch(setTxStatus({ type, step: END, endTimeStamp: Date.now() }));
  };

  const actionType = type;
  const loadingText = stepInText[step];
  const isLoading = !!step && step !== FINALIZED;

  return {
    step,
    isLoading,
    loadingText,
    actionType,
    onEndClick,
    tokenIDArray,
  };
}

export default useTxStatus;
