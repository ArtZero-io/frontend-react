import axios from "axios";
import process from "process";
import { IPFS_BASE_URL } from "@constants/index";
import { Buffer } from "buffer";

const { create } = require("ipfs-http-client");
const baseURL = process.env.REACT_APP_API_BASE_URL;
const projectId = process.env.REACT_APP_IPFS_PROJECT_ID;
const projectKey = process.env.REACT_APP_IPFS_PROJECT_KEY;

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
const client = async (
  method,
  url,
  options = {},
  baseURL = process.env.REACT_APP_API_BASE_URL
) => {
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

  if (data?.status === "FAILED") {
    console.log("error FAILED @ xx>>", url, data?.message);
  }

  return data;
};

// new API client call
const clientWithGetParams = async (
  method,
  url,
  options = {},
  baseURL = process.env.REACT_APP_API_BASE_URL
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios({
    baseURL,
    url,
    method,
    headers,
    params: options,
  });

  if (data?.status === "FAILED") {
    console.log("error FAILED @ xx>>", url, data?.message);
  }

  return data;
};

export const APICall = {
  // get list of Bidder by Address
  getBidsByBidderAddress: async ({
    bidder,
    limit = 10000,
    offset = 0,
    sort = -1,
  }) => {
    return await client("POST", "/getBidsByBidderAddress", {
      bidder,
      limit,
      offset,
      sort,
    });
  },

  // get list of Seller by Address
  getBidsBySellerAddress: async ({
    seller,
    limit = 10000,
    offset = 0,
    sort = -1,
  }) => {
    return await client("POST", "/getBidsBySellerAddress", {
      seller,
      limit,
      offset,
      sort,
    });
  },

  // Ask BE Update API Calls
  askBeCacheImage: async ({ input, is1024 = false, is1920 = false }) => {
    return await client("POST", "/cacheImage", {
      input,
      is1024,
      is1920,
    });
  },

  askBeUpdateBidsData: async (options) => {
    return await client("POST", "/updateBids", options);
  },

  askBeUpdateNftData: async (options) => {
    return await client("POST", "/updateNFT", options);
  },

  askBeUpdateCollectionData: async ({ collection_address }) => {
    return await client("POST", "/updateCollection", {
      collection_address,
    });
  },

  updateCollectionEmail: async ({ collection_address, email }) => {
    const ret = await client("POST", "/updateCollectionEmail", {
      collection_address,
      email,
    });

    return ret;
  },
  askBeUpdateProjectData: async ({ project_address }) => {
    const ret = await client("POST", "/updateProject", {
      project_address,
    });

    return ret;
  },

  // top nft trades API Calls
  getRecentTrades: async (options) => {
    return clientWithGetParams("GET", "/getRecentTrades", {
      filter: { ...options },
    });
  },

  // top nft trades API Calls
  getTopNftTrades: async (options) => {
    return clientWithGetParams("GET", "/api/top-nft-trades", {
      filter: { ...options },
    });
  },

  // user-buy-sell-event API Calls
  getUserBuySellEvent: async (options) => {
    return clientWithGetParams("GET", "/api/user-buy-sell-event", {
      filter: { ...options },
    });
  },

  // END top nft trades API Calls

  // USER Event API Calls
  getUserPurchaseEvents: async ({
    limit = 5,
    offset = 0,
    order = ["blockNumber DESC"],
    buyer,
  }) => {
    return clientWithGetParams("GET", "/api/purchase-event-schema", {
      filter: {
        limit,
        offset,
        order,
        where: {
          buyer,
        },
      },
    });
  },

  getUserBidWinEvents: async ({
    limit = 5,
    offset = 0,
    order = ["blockNumber DESC"],
    seller,
  }) => {
    return clientWithGetParams("GET", "/api/bid-win-event-schema", {
      filter: {
        limit,
        offset,
        order,
        where: {
          seller,
        },
      },
    });
  },

  getUserNewListEvents: async ({
    limit = 5,
    offset = 0,
    order = ["blockNumber DESC"],
    trader,
  }) => {
    return clientWithGetParams("GET", "/api/new-list-event-schema", {
      filter: {
        limit,
        offset,
        order,
        where: {
          trader,
        },
      },
    });
  },

  getUserUnlistEvents: async ({
    limit = 5,
    offset = 0,
    order = ["blockNumber DESC"],
    trader,
  }) => {
    return clientWithGetParams("GET", "/api/un-list-event-schema", {
      filter: {
        limit,
        offset,
        order,
        where: {
          trader,
        },
      },
    });
  },

  getNewListEvents: async (options) => {
    return clientWithGetParams("GET", "/api/new-list-event-schema", {
      filter: { ...options },
    });
  },

  getUnlistEvents: async (options) => {
    return clientWithGetParams("GET", "/api/un-list-event-schema", {
      filter: { ...options },
    });
  },
  // END USER Event API Calls

  // Event API Calls
  getPurchaseEvents: async ({
    collection_address,
    limit = 6,
    offset = 0,
    sort = -1,
  }) => {
    let { ret: result } = await client("POST", "/getPurchaseEvents", {
      limit,
      offset,
      sort,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "PURCHASE" };
    });

    return result;
  },

  getBidWinEvents: async ({
    collection_address,
    limit = 6,
    offset = 0,
    sort = -1,
  }) => {
    let { ret: result } = await client("POST", "/getBidWinEvents", {
      limit,
      offset,
      sort,
      collection_address,
    });

    result = result.map((item) => {
      return { ...item, type: "BID ACCEPTED" };
    });

    return result;
  },

  // Collection API Calls

  getAllCollections: async ({
    limit = 6,
    offset = 0,
    sort = -1,
    isActive = true,
    ignoreNoNFT = false,
  }) => {
    const ret = await client("POST", "/getCollections", {
      limit,
      offset,
      sort,
      isActive,
      ignoreNoNFT,
    });

    return ret;
  },

  getFeaturedCollections: async () => {
    return await client("GET", "/getFeaturedCollections", {});
  },

  getCollectionCount: async () => {
    return await client("GET", "/getCollectionCount", {});
  },

  getWithdrawEvent: async ({ limit = 5, offset = 0, nftContractAddress }) => {
    return clientWithGetParams("GET", "/api/withdraw-event-schemas", {
      filter: {
        limit,
        offset,
        where: {
          nftContractAddress: nftContractAddress,
        },
      },
    });
  },

  getLaunchpadEvent: async ({
    limit = 5,
    offset = 0,
    nftContractAddress,
    ...rest
  }) => {
    return await client("POST", `/api/launchpad-minting-event-schemas-v1`, {
      nftContractAddress,
      limit,
      offset,
      ...rest,
    });
  },

  getCollectionByAddress: async ({ collection_address }) => {
    return await client("POST", "/getCollectionByAddress", {
      collection_address,
    });
  },

  getCollectionByID: async ({ id }) => {
    return await client("POST", "/getCollectionByID", { id });
  },

  getCollectionsByVolume: async ({
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

  // get NFTs of collection address by traits
  searchNFTOfCollectionByTraits: async ({
    traitFilters = {},
    collectionAddress,
    limit = 12,
    offset = 0,
    sort = -1,
  }) => {
    let result = await client("POST", "/searchNFTOfCollectionByTraits", {
      traitFilters,
      collectionAddress,
      limit,
      offset,
      sort,
    });

    return result;
  },

  newMintingEvent: async ({
    project,
    mint_amount,
    minter,
    phase_id,
    price,
    project_mint_fee,
  }) => {
    let result = await client("POST", "/newMintingEvent", {
      project,
      mint_amount,
      minter,
      phase_id,
      price,
      project_mint_fee,
    });

    return result;
  },

  // NFT API Calls
  getNftJson: async ({ tokenID = 1, token_uri }) => {
    const url = `/getJSON?input=${token_uri}${tokenID.toString()}.json`;

    return await client("GET", url, {});
  },

  getNFTsByOwner: async ({
    owner,
    limit = 10000,
    offset = 0,
    sort = -1,
    isActive = true,
  }) => {
    return await client("POST", "/getNFTsByOwner", {
      owner,
      limit,
      offset,
      sort,
      isActive,
    });
  },

  getNFTsByOwnerAndCollection: async ({
    collection_address,
    owner,
    limit = 10000,
    offset = 0,
    sort = -1,
  }) => {
    return await client("POST", "/getNFTsByOwnerAndCollection", {
      collection_address,
      owner,
      limit,
      offset,
      sort,
    });
  },

  getTotalLaunchVolume: async () => {
    return await client("GET", "/getTotalVolume", {});
  },

  getAzeroDomainNFTByName: async (options) => {
    let formatTokenId;

    try {
      if (
        typeof options?.azDomainName === "string" &&
        options?.azDomainName?.includes(",")
      ) {
        formatTokenId = options?.azDomainName?.replaceAll(",", "");

        options.azDomainName = formatTokenId;
      }
    } catch (error) {
      console.log("error", error);
    }
    return await client("POST", "/getNFTByID", options);
  },

  getNFTByID: async (options) => {
    let formatTokenId;

    try {
      if (
        typeof options?.token_id === "string" &&
        options?.token_id?.includes(",")
      ) {
        formatTokenId = options?.token_id?.replaceAll(",", "");

        options.token_id = formatTokenId;
      }
    } catch (error) {
      console.log("error", error);
    }
    return await client("POST", "/getNFTByID", options);
  },

  getOwnershipHistoryOfNFT: async (options) => {
    const ret = await client("POST", "/getOwnershipHistory", options);

    return ret;
  },

  // Project API Calls
  getProjectInfoByHash: async ({ projectHash }) => {
    return await client("GET", `/${projectHash}`, {}, IPFS_BASE_URL);
  },

  getAllProjects: async ({
    limit = 100,
    offset = 0,
    sort = -1,
    isActive = true,
  }) => {
    const ret = await client("POST", "/getProjects", {
      limit,
      offset,
      sort,
      isActive,
    });

    return ret;
  },

  getPhaseInfo: async ({ nftContractAddress, phaseId }) => {
    const ret = await client("POST", "/getPhaseInfo", {
      nftContractAddress,
      phaseId,
    });

    return ret;
  },

  // Rewards API Calls
  getAllRewardPayout: async ({ limit = 1000, offset = 0, sort = -1 }) => {
    const ret = await client("POST", "/getAddRewardHistory", {
      limit,
      offset,
      sort,
    });

    return ret;
  },

  // Rewards API Calls
  reportNFT: async (data) => {
    const ret = await client("POST", "/reportNFT", data);

    return ret;
  },

  getAllRewardClaimed: async ({
    staker_address = "",
    limit = 1000,
    offset = 0,
    sort = -1,
  }) => {
    const option = { limit, offset, sort };

    if (staker_address) {
      option.staker_address = staker_address;
    }
    const ret = await client("POST", "/getClaimRewardHistory", option);

    return ret;
  },

  // new API call from loopback have /api/ prefix
  // get all My Collected Nft
  // getMyCollectedNft: async () => {
  //   const filter = {
  //     offset: 0,
  //     limit: 100,
  //     skip: 0,
  //     order: "string",
  //     where: {
  //       owner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
  //     },
  //   };

  //   const filterEncoded = encodeURI(JSON.stringify(filter));

  //   return await client("GET", `/api/nfts-schemas?filter=${filterEncoded}`, {});
  // },

  // get all My Collected Nft
  getCollectionList: async () => {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      // order: "string",
      where: { nft_count: { gt: 0 } },
    };

    const filterEncoded = encodeURI(JSON.stringify(filter));

    return await client(
      "GET",
      `/api/collections-schemas?filter=${filterEncoded}`,
      {}
    );
  },

  // get Project By Address
  getProjectByAddress: async ({ nftContractAddress }) => {
    const filter = {
      where: {
        nftContractAddress,
      },
    };

    const filterEncoded = encodeURI(JSON.stringify(filter));

    const ret = await client(
      "GET",
      `/api/projects-schemas?filter=${filterEncoded}`,
      {}
    );
    // TEMP format to match current return format
    return { ret };
  },

  askBeUpdateAzeroDomainsBidsData: async ({
    collection_address,
    seller,
    azDomainName,
  }) => {
    return await client("POST", "/updateBids", {
      collection_address,
      seller,
      azDomainName,
    });
  },

  askBeUpdateAzeroDomainsNftData: async ({
    collection_address,
    azDomainName,
  }) => {
    return await client("POST", "/updateNFT", {
      collection_address,
      azDomainName,
    });
  },
};

// IPFS API client call
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectKey).toString("base64");

export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization,
  },
});
