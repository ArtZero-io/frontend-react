import { AccountActionTypes } from "../types/account.types";

const initialState = {
  profile: null,
  activeAddress: null,
  accountLoaders: {
    getProfile: true,
    setProfileAttribute: true,
  },
  accountErrors: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountActionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        accountLoaders: {
          ...state.accountLoaders,
          getProfile: false,
        },
      };
    case AccountActionTypes.SET_ACTIVE_ADDRESS:
      return {
        ...state,
        activeAddress: action.payload,
      };
    case AccountActionTypes.SET_PROFILE_ATTRIBUTE:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          setProfileAttribute: false,
        },
      };
    case AccountActionTypes.ACCOUNT_LOADING:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          [action.payload]: true,
        },
      };
    case AccountActionTypes.ACCOUNT_ERROR:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          [action.payload]: false,
        },
      };
    default:
      return state;
  }
};

export default accountReducer;
