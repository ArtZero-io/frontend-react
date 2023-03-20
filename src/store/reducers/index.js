import { combineReducers } from "redux";
import accountReducer from "./account";
import txStatusReducer from "./txStatus";

export const rootReducer = combineReducers({
  account: accountReducer,
  txStatus: txStatusReducer,
});
