import blockchain from "../../utils/blockchain";
import { AccountActionTypes } from "../types/account.types";

export function getProfile() {
  return async function (dispatch) {
    const loadingName = "getProfile";
    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      const profile = await blockchain.getProfileOnChain();
      dispatch({
        type: AccountActionTypes.GET_PROFILE,
        payload: profile,
      });
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
      await blockchain.setSingleAttributeProfileOnChain(data);
    } catch (error) {
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: loadingName,
      });
    }
  };
}

export function setMultipleAttributes(attributes, values) {
  return async function (dispatch) {
    const loadingName = "setProfileAttribute";

    dispatch({
      type: AccountActionTypes.ACCOUNT_LOADING,
      payload: loadingName,
    });

    try {
      await blockchain.setMultipleAttributesProfileOnChain(attributes, values);
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
