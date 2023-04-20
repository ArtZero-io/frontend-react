import toast from "react-hot-toast";
import { SET_STATUS, CLEAR_STATUS } from "../types/txStatus";
import { READY, FINALIZED } from "@constants";
import launchpad_manager from "../../utils/blockchain/launchpad-manager";
import { Abi } from "@polkadot/api-contract";
import { CREATE_PROJECT_STEP_1 } from "../../constants";

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
  isApprovalTx = false,
}) => {
  const url = `https://test.azero.dev/#/explorer/query/`;
  const statusToHuman = Object.entries(status.toHuman());

  if (dispatchError) {
    dispatch(clearTxStatus());

    if (dispatchError.isModule) {
      toast.error(`There is some error with your request... ..`);
      // return toast.error(`${section}.${name}: ${docs.join(" ")}`);

      // FOR DEV ONLY FALSE CASE
      // if (process.env.NODE_ENV === "development") {
      if (statusToHuman[0][0] === FINALIZED) {
        // const decoded = api.registry.findMetaError(dispatchError.asModule);
        // const { docs, name, section } = decoded;

        // console.table({
        //   txType,
        //   Event: "dispatchError",
        //   section,
        //   name,
        //   docs: docs.join(" "),
        // });

        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        const data = {
          ContractCall: txType,
          Reserved: 0,
          ReserveRepatriated: 0,
          FeePaid: 0,
          TotalCharge: 0,
          TxHash: "",
        };

        // Transfer Event
        allEventsRecords.forEach(({ event }, index) => {
          // if (api.events.balances?.Transfer.is(event)) {
          //   console.table({
          //     Event: "balances.Transfer (-)",
          //     From: event.data[0].toHuman(),
          //     To: event.data[1].toHuman(),
          //     Amount: event.data[2].toHuman(),
          //   });
          // }

          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            data.FeePaid = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "transactionPayment?.TransactionFeePaid (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.Reserved.is(event)) {
            data.Reserved = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.Reserved (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.ReserveRepatriated (+)",
            //   Amount: event.data[2].toHuman(),
            // });
          }
        });

        // const { data: balance } = await api.query.system.account(
        //   caller_account?.address
        // );

        // console.table({
        //   "Balance END":
        //     balance.free.toHuman().slice(0, -16) +
        //     "." +
        //     balance.free.toHuman().slice(-15, -8),
        // });
        data.TxHash = statusToHuman[0][1];

        data.TotalCharge =
          data.FeePaid + data.Reserved + data.ReserveRepatriated;

        console.log("Err tx fee: ", data);

        console.log("Err Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }
      // }
    } else {
      console.log("dispatchError.toString()", dispatchError.toString());
      return toast.error(dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch(
        setTxStatus({
          txType,
          txStatus: READY,
          step: READY,
          type,
        })
      );
    } else {
      if (!isApprovalTx) {
        dispatch(
          setTxStatus({
            type: txType,
            // txType: txType,
            // txStatus: statusToHuman[0][0],
            timeStamp: Date.now(),
            step: statusToHuman[0][0],
          })
        );
      }

      if (isApprovalTx && statusToHuman[0][0] !== FINALIZED) {
        dispatch(
          setTxStatus({
            type: txType,
            // txType: txType,
            timeStamp: Date.now(),
            step: statusToHuman[0][0],
            // txStatus: statusToHuman[0][0],
          })
        );
      }


      // Use for 2-steps process create new project
      if (statusToHuman[0][0] === FINALIZED) {
        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        if (txType === CREATE_PROJECT_STEP_1) {
          allEventsRecords.forEach(({ event }) => {
            if (api.events.contracts?.ContractEmitted.is(event)) {
              const [, dataBytes] = event.data;

              const abiPromise = new Abi(launchpad_manager.CONTRACT_ABI);

              const { args } = abiPromise.decodeEvent(dataBytes);

              const newCollectionAddress = args[1]?.toHuman();

              dispatch(
                setTxStatus({
                  type: txType,
                  step: statusToHuman[0][0],
                  timeStamp: Date.now(),
                  tokenIDArray: [newCollectionAddress],
                })
              );
            }
          });
        }
      }

      // FOR DEV ONLY SUCCESS CASE
      // if (process.env.NODE_ENV === "development") {
      if (statusToHuman[0][0] === FINALIZED) {
        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        const data = {
          ContractCall: txType,
          Reserved: 0,
          ReserveRepatriated: 0,
          FeePaid: 0,
          TotalCharge: 0,
          TxHash: "",
        };

        // Transfer Event
        allEventsRecords.forEach(({ event }, index) => {
          // if (api.events.balances?.Transfer.is(event)) {
          //   console.table({
          //     Event: "balances.Transfer (-)",
          //     From: event.data[0].toHuman(),
          //     To: event.data[1].toHuman(),
          //     Amount: event.data[2].toHuman(),
          //   });
          // }
          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            data.FeePaid = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "transactionPayment?.TransactionFeePaid (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.Reserved.is(event)) {
            data.Reserved = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.Reserved (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.ReserveRepatriated (+)",
            //   Amount: event.data[2].toHuman(),
            // });
          }
        });

        // const { data: balance } = await api.query.system.account(
        //   caller_account?.address
        // );

        // console.table({
        //   "Balance END":
        //     balance.free.toHuman().slice(0, -16) +
        //     "." +
        //     balance.free.toHuman().slice(-15, -8),
        // });

        data.TxHash = statusToHuman[0][1];

        data.TotalCharge =
          data.FeePaid + data.Reserved + data.ReserveRepatriated;

        console.log("Success tx fee: ", data);

        console.log("Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }
      // }
    }
  }
};

// Only use for batch transaction
export const batchTxResponseErrorHandler = async ({
  status,
  dispatchError,
  dispatch,
  txType,
  type,
  api,
  caller_account,
  isApprovalTx = false,
}) => {
  const url = `https://test.azero.dev/#/explorer/query/`;
  const statusToHuman = Object.entries(status.toHuman());

  if (dispatchError) {
    dispatch(clearTxStatus());

    if (dispatchError.isModule) {
      toast.error(`There is some error with your request... ..`);
      // return toast.error(`${section}.${name}: ${docs.join(" ")}`);

      // FOR DEV ONLY FALSE CASE
      // if (process.env.NODE_ENV === "development") {
      if (statusToHuman[0][0] === FINALIZED) {
        // const decoded = api.registry.findMetaError(dispatchError.asModule);
        // const { docs, name, section } = decoded;

        // console.table({
        //   txType,
        //   Event: "dispatchError",
        //   section,
        //   name,
        //   docs: docs.join(" "),
        // });

        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        const data = {
          ContractCall: txType,
          Reserved: 0,
          ReserveRepatriated: 0,
          FeePaid: 0,
          TotalCharge: 0,
          TxHash: "",
        };

        // Transfer Event
        allEventsRecords.forEach(({ event }, index) => {
          // if (api.events.balances?.Transfer.is(event)) {
          //   console.table({
          //     Event: "balances.Transfer (-)",
          //     From: event.data[0].toHuman(),
          //     To: event.data[1].toHuman(),
          //     Amount: event.data[2].toHuman(),
          //   });
          // }

          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            data.FeePaid = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "transactionPayment?.TransactionFeePaid (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.Reserved.is(event)) {
            data.Reserved = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.Reserved (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.ReserveRepatriated (+)",
            //   Amount: event.data[2].toHuman(),
            // });
          }
        });

        // const { data: balance } = await api.query.system.account(
        //   caller_account?.address
        // );

        // console.table({
        //   "Balance END":
        //     balance.free.toHuman().slice(0, -16) +
        //     "." +
        //     balance.free.toHuman().slice(-15, -8),
        // });
        data.TxHash = statusToHuman[0][1];

        data.TotalCharge =
          data.FeePaid + data.Reserved + data.ReserveRepatriated;

        console.log("Err tx fee: ", data);

        console.log("Err Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }
      // }
    } else {
      console.log("dispatchError.toString()", dispatchError.toString());
      return toast.error(dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch(
        setTxStatus({
          txType,
          txStatus: READY,
          step: READY,
          type,
        })
      );
    } else {
      if (!isApprovalTx) {
        dispatch(
          setTxStatus({
            type: txType,
            // txType: txType,
            // txStatus: statusToHuman[0][0],
            timeStamp: Date.now(),
            step: statusToHuman[0][0],
          })
        );
      }

      if (isApprovalTx && statusToHuman[0][0] !== FINALIZED) {
        dispatch(
          setTxStatus({
            type: txType,
            // txType: txType,
            timeStamp: Date.now(),
            step: statusToHuman[0][0],
            // txStatus: statusToHuman[0][0],
          })
        );
      }


      // Use for 2-steps process create new project
      if (statusToHuman[0][0] === FINALIZED) {
        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        if (txType === CREATE_PROJECT_STEP_1) {
          allEventsRecords.forEach(({ event }) => {
            if (api.events.contracts?.ContractEmitted.is(event)) {
              const [, dataBytes] = event.data;

              const abiPromise = new Abi(launchpad_manager.CONTRACT_ABI);

              const { args } = abiPromise.decodeEvent(dataBytes);

              const newCollectionAddress = args[1]?.toHuman();

              dispatch(
                setTxStatus({
                  type: txType,
                  step: statusToHuman[0][0],
                  timeStamp: Date.now(),
                  tokenIDArray: [newCollectionAddress],
                })
              );
            }
          });
        }
      }

      // FOR DEV ONLY SUCCESS CASE
      // if (process.env.NODE_ENV === "development") {
      if (statusToHuman[0][0] === FINALIZED) {
        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        const data = {
          ContractCall: txType,
          Reserved: 0,
          ReserveRepatriated: 0,
          FeePaid: 0,
          TotalCharge: 0,
          TxHash: "",
        };

        // Transfer Event
        allEventsRecords.forEach(({ event }, index) => {
          // if (api.events.balances?.Transfer.is(event)) {
          //   console.table({
          //     Event: "balances.Transfer (-)",
          //     From: event.data[0].toHuman(),
          //     To: event.data[1].toHuman(),
          //     Amount: event.data[2].toHuman(),
          //   });
          // }
          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            data.FeePaid = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "transactionPayment?.TransactionFeePaid (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.Reserved.is(event)) {
            data.Reserved = -event.data[1]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.Reserved (-)",
            //   Amount: event.data[1]?.toHuman(),
            // });
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            data.ReserveRepatriated = event.data[2]?.toString() / 10 ** 12;

            // console.table({
            //   Event: "balances?.ReserveRepatriated (+)",
            //   Amount: event.data[2].toHuman(),
            // });
          }
        });

        // const { data: balance } = await api.query.system.account(
        //   caller_account?.address
        // );

        // console.table({
        //   "Balance END":
        //     balance.free.toHuman().slice(0, -16) +
        //     "." +
        //     balance.free.toHuman().slice(-15, -8),
        // });

        data.TxHash = statusToHuman[0][1];

        data.TotalCharge =
          data.FeePaid + data.Reserved + data.ReserveRepatriated;

        console.log("Success tx fee: ", data);

        console.log("Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }
      // }
    }
  }
};