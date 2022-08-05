import axios from "axios";
import process from "process";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const clientAPI = async (method, url, options) => {
  if (!options) options = {};
  let urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    data: urlencodedOptions,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (method.toLowerCase() === "post") {
    if (data?.status === "OK") {
      return data?.ret;
    } else {
      return data?.message;
    }
  } else if (method.toLowerCase() === "get") {
    if (data?.status === "OK") {
      return data?.ret;
    } else if (data?.status === "FAILED") {
      return data?.message;
    } else return data;
  }
};

// new API client call
const client = async (method, url, options = {}) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    headers,
    data: urlencodedOptions,
  });

  const { status, ret, message } = data;

  if (status === "OK") {
    return ret;
  }

  if (status === "FAILED") {
    return message;
  }

  return data;
};

export const APICall = {
  // Ask BE Update API Calls
  askBeUpdateBidsData: async ({ collection_address, seller, token_id }) => {
    return await client("POST", "/updateBids", {
      collection_address,
      seller,
      token_id,
    });
  },

  askBeUpdateNftData: async ({ collection_address, token_id }) => {
    return await client("POST", "/updateNFT", {
      collection_address,
      token_id,
    });
  },

  askBeUpdateCollectionData: async ({ collection_address }) => {
    return await client("POST", "/updateCollection", {
      collection_address,
    });
  },

  // Event API Calls
  getPurchaseEvents: async ({ collection_address }) => {
    let result = await client("POST", "/getPurchaseEvents", {
      limit: 10,
      offset: 0,
      sort: -1,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "PURCHASE" };
    });

    return result;
  },

  getBidWinEvents: async ({ collection_address }) => {
    let result = await client("POST", "/getBidWinEvents", {
      limit: 10,
      offset: 0,
      sort: -1,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "BID ACCEPTED" };
    });

    return result;
  },

  getUnlistEvents: async ({ collection_address }) => {
    let result = await client("POST", "/getUnlistEvents", {
      limit: 10,
      offset: 0,
      sort: -1,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "UNLIST" };
    });

    return result;
  },

  getNewListEvents: async ({ collection_address }) => {
    let result = await client("POST", "/getNewListEvents", {
      limit: 10,
      offset: 0,
      sort: -1,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "LIST" };
    });

    return result;
  },

  // Collection API Calls
  getCollectionByAddress: async ({ collection_address }) => {
    return await client("POST", "/getCollectionByAddress", {
      collection_address,
    });
  },

  getCollectionByVolume: async ({
    limit = 5,
    offset = 0,
    sort = -1,
    isActive = true,
  }) => {
    const ret = await client("POST", "/getCollectionsByVolume", {
      limit,
      offset,
      sort,
      isActive,
    });

    return ret;
  },

  getCollectionsByOwner: async ({
    owner,
    limit = 1000,
    offset = 0,
    sort = -1,
  }) => {
    const ret = await client("POST", "/getCollectionsByOwner", {
      owner,
      limit,
      offset,
      sort,
    });

    return ret;
  },

  getCollectionsCountByOwner: async ({ owner, noNFT }) => {
    const ret = await client("POST", "/countCollectionsByOwner", {
      owner,
      noNFT,
    });

    return ret;
  },

  getCollectionFloorPrice: async ({ collection_address }) => {
    return await client("POST", "/getFloorPrice", {
      collection_address,
    });
  },

  // NFT API Calls
  getNFTsByOwner: async ({ owner }) => {
    return await client("POST", "/getNFTsByOwner", {
      owner,
    });
  },

  getNFTByID: async ({ collection_address, token_id }) => {
    return await client("POST", "/getNFTByID", {
      collection_address,
      token_id,
    });
  },

  getSearchResult: async ({
    keywords,
    limit = 10,
    ignoreNoNFT = true,
    isActive = true,
  }) => {
    let result = await client("POST", "/searchCollections", {
      keywords,
      limit,
      ignoreNoNFT,
      isActive,
    });

    return result;
  },
};
