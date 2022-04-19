import axios from "axios";
import process from "process";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const clientAPI = async (method, url, options) => {
  const { data } = await axios({
    baseURL,
    url,
    method,
    data: options,
  });

  if (data?.status === "OK") {
    return data?.ret;
  } else {
    return data?.message;
  }
};
