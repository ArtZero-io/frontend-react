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
  console.log("useForceUpdate typeArray.................");

  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(null);

  useEffect(() => {
    if (!typeArray.includes(type)) {
      return;
    }
    console.log("useForceUpdate typeArray", typeArray);
    console.log("useForceUpdate type", type);
    console.log("useForceUpdate includes PASS", typeArray.includes(type));

    if (!step || (step && step !== END)) {
      console.log("useForceUpdate step=================================S");
      console.log("useForceUpdate step", step);
      console.log("useForceUpdate !step", !step);
      console.log("useForceUpdate step !== END", step !== END);
      console.log("useForceUpdate step=================================E");
      return;
    }

    if (!timeStamp || !endTimeStamp) {
      return;
    }
    console.log("useForceUpdate timeStamp", timeStamp);
    console.log("useForceUpdate endTimeStamp", endTimeStamp);

    const diffTime = 7000 - Number(endTimeStamp - timeStamp);
    const delayTime = diffTime > 500 ? diffTime : 500;

    console.log("useForceUpdate diffTime", diffTime);
    console.log("useForceUpdate delayTime", delayTime);

    const doDelay = async () => {
      console.log("useForceUpdate doDelay ......................");
      try {
        setLoading(true);

        setLoadingTime(delayTime / 1000);

        await delay(delayTime).then(() => {
          dispatch(clearTxStatus());
          console.log("useForceUpdate doDelay cb cb ......................");

          cb();
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        // setLoadingTime(null);

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
