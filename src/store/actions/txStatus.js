import toast from "react-hot-toast";
import { SET_STATUS, CLEAR_STATUS } from "../types/txStatus";
import { READY, FINALIZED } from "@constants";
import { fetchUserBalance } from "../../pages/launchpad/component/Form/AddNewProject";

export const setTxStatus = (props) => {
  return (dispatch) => {
    dispatch({
      type: SET_STATUS,
      payload: { ...props },
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

export const txResponseErrorHandler = async ({
  status,
  dispatchError,
  dispatch,
  txType,
  type,
  api,
  caller_account,
}) => {
  if (dispatchError) {
    dispatch(clearTxStatus());

    if (dispatchError.isModule) {
      const decoded = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;
      console.log("section", `${section}.${name}: ${docs.join(" ")}`);
      toast.error(`There is some error with your request..`);
      // return toast.error(`${section}.${name}: ${docs.join(" ")}`);
    } else {
      // console.log("dispatchError.toString()", dispatchError.toString());
      return toast.error(dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    const statusToHuman = Object.entries(status.toHuman());

    const url = `https://test.azero.dev/#/explorer/query/`;

    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch(setTxStatus({ txType, txStatus: READY, step: READY, type }));

      await fetchUserBalance({ currentAccount: caller_account, api }).then(
        ({ balance }) => console.log(txType, " bal ready: ", balance)
      );
    } else {
      dispatch(
        setTxStatus({
          type,
          txType: txType,
          timeStamp: Date.now(),
          step: statusToHuman[0][0],
          txStatus: statusToHuman[0][0],
        })
      );

      if (statusToHuman[0][0] === FINALIZED) {
        await fetchUserBalance({ currentAccount: caller_account, api }).then(
          ({ balance }) => console.log(txType, " bal final: ", balance)
        );

        console.log("Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }
    }
  }
};
