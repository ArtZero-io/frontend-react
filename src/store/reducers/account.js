import { AccountActionTypes } from "../types/account.types";

const activeAddressLocal = JSON.parse(
  window.localStorage.getItem("activeAddress")
);

const initialState = {
  activeAddress: activeAddressLocal || null,
  accountLoaders: {
    getProfile: false,
    setProfileAttribute: false,
    tnxStatus: null,
    addCollectionTnxStatus: null,
  },
  accountErrors: null,
};

const accountReducer = (state = initialState, action) => {
  console.log("action.type", action.type);
  console.log("action.payload", action.payload);
  switch (action.type) {
    case AccountActionTypes.GET_PROFILE:
      return {
        ...state,
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
    case AccountActionTypes.SET_TNX_STATUS:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          tnxStatus: action.payload,
        },
      };
    case AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          addCollectionTnxStatus: {
            ...state.accountLoaders.addCollectionTnxStatus,
            ...action.payload,
          },
        },
      };
    case AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS:
      return {
        ...state,
        accountLoaders: {
          ...state.accountLoaders,
          addCollectionTnxStatus: null,
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
