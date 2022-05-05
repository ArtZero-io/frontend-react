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
      const profile = await profile_calls.getProfileOnChain(currentAccount);

      dispatch({
        type: AccountActionTypes.GET_PROFILE,
      });
      return profile;
    } catch (error) {
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: loadingName,
      });
    }
  };
}

export function setProfileAttribute(data) {
  return async function (dispatch) {
    const loadingName = "setProfileAttribute";

    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      await profile_calls.setSingleAttributeProfileOnChain(data);
    } catch (error) {
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: loadingName,
      });
    }
  };
}

export function setMultipleAttributes(currentAccount, attributes, values) {
  return async function (dispatch) {
    const loadingName = "setProfileAttribute";

    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      await profile_calls.setMultipleAttributesProfileOnChain(currentAccount,
        attributes,
        values,
        dispatch
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
