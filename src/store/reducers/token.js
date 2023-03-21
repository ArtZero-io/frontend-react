const initialState = {
  tokenDetails: null,
  userTradingDetails: null,
  collection: null,
  tokenErrors: null,
  tokenLoaders: {
    getTokenDetails: true,
    getCollection: true,
  },
  bids: null,
  highestBidAmount: {
    azero: null,
    usd: null,
  },
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    // case TokenActionTypes.SET_EVENTS:
    //   return {
    //     ...state,
    //     platformEvents: action.payload,
    // };
    default:
      return state;
  }
};

export default tokenReducer;
