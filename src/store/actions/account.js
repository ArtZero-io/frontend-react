import profile_calls from "@utils/blockchain/profile_calls";
import { AccountActionTypes } from "../types/account.types";

export function getProfile(currentAccount) {
  return async function (dispatch) {
    const loadingName = "getProfile";
    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      const res = await profile_calls.getProfileOnChain({
        callerAccount: currentAccount,
      });

      dispatch({
        type: AccountActionTypes.GET_PROFILE,
      });

      return res;
    } catch (error) {
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: loadingName,
      });
    }
  };
}

export function setMultipleAttributes(
  currentAccount,
  attributes,
  values,
  dispatch,
  txType,
  api
) {
  return async function () {
    const loadingName = "setProfileAttribute";

    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      await profile_calls.setMultipleAttributesProfileOnChain(
        currentAccount,
        attributes,
        values,
        dispatch,
        txType,
        api
      );

      dispatch({
        type: AccountActionTypes.SET_PROFILE_ATTRIBUTE,
      });
    } catch (error) {
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: loadingName,
      });
    }
  };
}
