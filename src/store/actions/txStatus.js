import toast from "react-hot-toast";
import { SET_STATUS, CLEAR_STATUS } from "../types/txStatus";
import { READY } from "@constants";

export const setTxStatus = ({ txType, txStatus }) => {
  return (dispatch) => {
    dispatch({
      type: SET_STATUS,
      payload: {
        txType,
        txStatus,
      },
    });
  };
};

export const clearTxStatus = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_STATUS });
  };
};

export const txErrorHandler = ({ error, dispatch }) => {
  dispatch(clearTxStatus());

  let message;

  const errStr = error.toString();

  if (errStr.includes("RpcError")) {
    message = errStr.slice(errStr.indexOf("RpcError") + 16);

    return toast.error(message);
  }

  message = `Transaction is ${error.message.toLowerCase()} by user.`;

  toast.error(message);
};

export const txResponseErrorHandler = ({
  status,
  dispatchError,
  txType,
  api,
  dispatch,
}) => {
  if (dispatchError) {
    dispatch(clearTxStatus());

    if (dispatchError.isModule) {
      const decoded = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      return toast.error(`${section}.${name}: ${docs.join(" ")}`);
    } else {
      return toast.error(dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    const statusToHuman = Object.entries(status.toHuman());

    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch(setTxStatus({ txType: txType, txStatus: READY }));
    } else {
      const finalizedTimeStamp = Date.now();

      dispatch(
        setTxStatus({
          txType: txType,
          txStatus: statusToHuman[0][0],
          timeStamp: finalizedTimeStamp,
        })
      );
    }
  }
};
