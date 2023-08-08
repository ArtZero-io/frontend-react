import { useDispatch, useSelector } from "react-redux";

import { clearTxStatus } from "../store/actions/txStatus";
import { FINALIZED } from "@constants/index";
import { useEffect, useState } from "react";
import { delay } from "../utils";

function useForceUpdate(typeArray, cb, noDelay = false) {
  const dispatch = useDispatch();
  const { type, step } = useSelector((s) => s.txStatus);

  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(null);

  useEffect(() => {
    if (!typeArray.includes(type)) {
      return;
    }

    if (!step || (step && step !== FINALIZED)) {
      return;
    }

    const delayTime = noDelay ? 100 : 5000;

    const doDelay = async () => {
      try {
        setLoading(true);

        setLoadingTime(delayTime / 1000);

        await delay(delayTime).then(() => {
          dispatch(clearTxStatus());
          cb();
          setLoading(false);
        });
      } catch (error) {
        dispatch(clearTxStatus());
        setLoading(false);

        console.log(error);
      }
    };

    doDelay();
  }, [cb, dispatch, noDelay, step, type, typeArray]);

  return {
    loading,
    loadingTime,
  };
}

export default useForceUpdate;
