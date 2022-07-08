import { SET_STATUS, CLEAR_STATUS } from "../types/txStatus";

const txStatusReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_STATUS:
      return {
        ...state,
        [`${payload.txType}Status`]: payload.txStatus,
        tokenID: state?.tokenID || payload?.tokenID,
      };

    case CLEAR_STATUS:
      return {};

    default:
      return state;
  }
};

export default txStatusReducer;
