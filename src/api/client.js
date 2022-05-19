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

  getCollectionByAddress: async ({ collection_address }) => {
    return await client("POST", "/getCollectionByAddress", {
      collection_address,
    });
  },
};
