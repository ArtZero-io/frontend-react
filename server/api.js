const { default: axios } = require("axios");

const IPFS_BASE_URL = "https://artzeronft.infura-ipfs.io/ipfs";

const clientGet = async (url, baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  }; 

  const { data } = await axios({
    baseURL,
    url,
    method: "GET",
    headers,
  });

  if (data?.status === "FAILED") {
    console.log("error FAILED @ xx>>", url, data?.message);
  }

  return data;
};

const clientPost = async (
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
      method: 'POST',
      headers,
      data: urlencodedOptions,
    });
  
    if (data?.status === "FAILED") {
      console.log("error FAILED @ xx>>", url, data?.message);
    }
  
    return data;
  };

exports.getProjectByAddress = async ({ nftContractAddress }) => {
  const filter = {
    where: {
      nftContractAddress,
    },
  };

  const filterEncoded = encodeURI(JSON.stringify(filter));

  const ret = await clientGet(`/api/projects-schemas?filter=${filterEncoded}`);
  // TEMP format to match current return format
  return ret;
};

exports.getCollectionByAddress = async ({ collection_address }) => {

    const ret = await clientPost(`/getCollectionByAddress`, {collection_address});
    // TEMP format to match current return format
    return ret.ret;
  };
  

exports.getCloudFlareImage = async (imageHash = "", size = 500) => {
  const fallbackURL = `${IPFS_BASE_URL}/${imageHash.replace("ipfs://", "")}`;

  const ret = `${process.env.REACT_APP_API_BASE_URL}/getImage?input=${imageHash}&size=${size}&url=${fallbackURL}`;

  let result;

  try {
    const response = await axios.get(ret);
    result = response?.data || fallbackURL;
  } catch (error) {
    console.error("getCloudFlareImage error", error.message);
    result = fallbackURL;
  }

  return result;
}
