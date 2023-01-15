/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import { SET_STATUS, CLEAR_STATUS } from '../types/txStatus';
import { READY, FINALIZED } from '@constants';
// import { fetchUserBalance } from "../../pages/launchpad/component/Form/AddNewProject";

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

  if (errStr.includes('RpcError')) {
    message = errStr.slice(errStr.indexOf('RpcError') + 16);

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
  if (dispatchError) {
    dispatch(clearTxStatus());

    if (dispatchError.isModule) {
      const decoded = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      const statusToHuman = Object.entries(status.toHuman());

      const url = `https://test.azero.dev/#/explorer/query/`;

      console.log('^^ Error\t\t\t\t:', `${section}.${name}: ${docs.join(' ')}`);

      const apiAt = await api.at(statusToHuman[0][1]);
      const allEventsRecords = await apiAt.query.system.events();

      allEventsRecords.forEach(({ event }, index) => {
        if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
          console.log(
            '^^ Txn Fee Paid\t\t\t:   -',
            (
              parseInt(event.data[1].toHuman().replaceAll(',', '')) /
              10 ** 12
            ).toFixed(6)
          );
        }

        if (api.events.balances?.Reserved.is(event)) {
          console.log(
            '^^ Reserved\t\t\t\t:   -',
            (
              parseInt(event.data[1].toHuman().replaceAll(',', '')) /
              10 ** 12
            ).toFixed(6)
          );
        }

        if (api.events.balances?.ReserveRepatriated.is(event)) {
          console.log(
            '^^ Reserve Repatriated\t:   +',
            (
              parseInt(event.data[2].toHuman().replaceAll(',', '')) /
              10 ** 12
            ).toFixed(6)
          );
        }
      });

      // const { data: balance } = await api.query.system.account(
      //   caller_account?.address
      // );

      // console.log(
      //   '^^ Balance END\t\t\t:',
      //   balance.free.toHuman().slice(0, -16) +
      //     '.' +
      //     balance.free.toHuman().slice(-15, -8)
      // );

      console.log('^^ Tx finalized at ', `${url}${statusToHuman[0][1]}`);
      console.log(`^^==================Log end==================`);

      toast.error(`There is some error with your request..`);
      console.log('section', `${section}.${name}: ${docs.join(' ')}`);
      return toast.error(`${section}.${name}: ${docs.join(" ")}`);
    } else {
      console.log("dispatchError.toString()", dispatchError.toString());
      return toast.error(dispatchError.toString());
    }
  }

  if (!dispatchError && status) {
    const statusToHuman = Object.entries(status.toHuman());

    const url = `https://test.azero.dev/#/explorer/query/`;

    if (Object.keys(status.toHuman())[0] === '0') {
      dispatch(setTxStatus({ txType, txStatus: READY, step: READY, type }));

      // await fetchUserBalance({ currentAccount: caller_account, api }).then(
      //   ({ balance }) =>
      //     console.log("===ActionType:", txType, ". Balance START: ", balance)
      // );

      const now = await api.query.timestamp.now();
      console.log(`^^\n`);
      console.log(`^^================Log start==================`);

      console.log(`^^ Log time\t\t\t\t: ${new Date(Number(now))}`);
      console.log(`^^ ActionType\t\t\t: ${txType}`);
      // const { data: balance } = await api.query.system.account(
      //   caller_account?.address
      // );
      // console.log(
      //   "^^ Balance START\t\t:",
      //   balance.free.toHuman().slice(0, -16) +
      //     "." +
      //     balance.free.toHuman().slice(-15, -8)
      // );
    } else {
      if (!isApprovalTx) {
        dispatch(
          setTxStatus({
            type,
            txType: txType,
            timeStamp: Date.now(),
            step: statusToHuman[0][0],
            txStatus: statusToHuman[0][0],
          })
        );
      }

      if (isApprovalTx && statusToHuman[0][0] !== FINALIZED) {
        setTxStatus({
          type,
          txType: txType,
          timeStamp: Date.now(),
          step: statusToHuman[0][0],
          txStatus: statusToHuman[0][0],
        });
      }

      if (statusToHuman[0][0] === FINALIZED) {
        // await fetchUserBalance({ currentAccount: caller_account, api }).then(
        //   ({ balance }) =>
        //     console.log("===ActionType:", txType, "Balance END: ", balance)
        // );

        const apiAt = await api.at(statusToHuman[0][1]);
        const allEventsRecords = await apiAt.query.system.events();

        allEventsRecords.forEach(({ event }, index) => {
          if (api.events.balances?.Transfer.is(event)) {
            console.log("===0Transfer From\t\t\t\t: -", event.data[0].toHuman());
            console.log("===1Transfer To\t\t\t\t: -", event.data[1].toHuman());
            console.log("===2Transfer Amount\t\t\t\t: -", event.data[2].toHuman());
          }

          if (api.events.transactionPayment?.TransactionFeePaid.is(event)) {
            console.log(
              '^^ Txn Fee Paid\t\t\t:   -',
              (
                parseInt(event.data[1].toHuman().replaceAll(',', '')) /
                10 ** 12
              ).toFixed(6)
            );
          }

          if (api.events.balances?.Reserved.is(event)) {
            console.log(
              '^^ Reserved\t\t\t\t:   -',
              (
                parseInt(event.data[1].toHuman().replaceAll(',', '')) /
                10 ** 12
              ).toFixed(6)
            );
          }

          if (api.events.balances?.ReserveRepatriated.is(event)) {
            console.log(
              '^^ Reserve Repatriated\t:   +',
              (
                parseInt(event.data[2].toHuman().replaceAll(',', '')) /
                10 ** 12
              ).toFixed(6)
            );
          }
        });
        // const { data: balance } = await api.query.system.account(
        //   caller_account?.address
        // );

        // console.log(
        //   '^^ Balance END\t\t\t:',
        //   balance.free.toHuman().slice(0, -16) +
        //     '.' +
        //     balance.free.toHuman().slice(-15, -8)
        // );
        console.log('^^ Tx finalized at ', `${url}${statusToHuman[0][1]}`);
        console.log(`^^==================Log end==================`);
      }
    }
  }
};
