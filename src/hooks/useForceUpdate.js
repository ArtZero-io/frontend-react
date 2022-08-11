import { useDispatch, useSelector } from "react-redux";

import { clearTxStatus } from "../store/actions/txStatus";
import { END } from "@constants/index";
import { useEffect, useState } from "react";
import { delay } from "../utils";

function useForceUpdate(typeArray, cb) {
  const dispatch = useDispatch();
  const { type, step, timeStamp, endTimeStamp } = useSelector(
    (s) => s.txStatus
  );

  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(null);

  useEffect(() => {
    if (!typeArray.includes(type)) {
      return;
    }

    if (!step || (step && step !== END)) {
      return;
    }

    if (!timeStamp || !endTimeStamp) {
      return;
    }

    const diffTime = 7500 - Number(endTimeStamp - timeStamp);
    const delayTime = diffTime > 500 ? diffTime : 500;

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
        setLoading(false);

        console.log(error);
      }
    };

    doDelay();
  }, [cb, dispatch, endTimeStamp, step, timeStamp, type, typeArray]);

  return {
    loading,
    loadingTime,
  };
}

export default useForceUpdate;
