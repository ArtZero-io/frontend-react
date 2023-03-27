import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { AccountActionTypes } from "../store/types/account.types";
import Keyring from "@polkadot/keyring";
import { IPFS_BASE_URL } from "@constants/index";
import numeral from "numeral";
import axios from "axios";
import toast from "react-hot-toast";
import { APICall } from "../api/client";
import { BN, BN_ONE } from "@polkadot/util";
import getGasLimit from "../utils/blockchain/dryRun";
import { execContractQuery } from "../pages/account/nfts/nfts";
import { ADMIN_ROLE_CODE } from "../constants";
import moment from "moment/moment";

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

const baseURL = process.env.REACT_APP_API_BASE_URL;

export function getCachedImage(imageHash, size, url) {
  return (
    baseURL + "/getImage?input=" + imageHash + "&size=" + size + "&url=" + url
  );
}

export function getCachedImageShort(imageHash = "", size = 100) {
  const fallbackURL = `${IPFS_BASE_URL}/${imageHash.replace("ipfs://", "")}`;

  const ret = `${baseURL}/getImage?input=${imageHash}&size=${size}&url=${fallbackURL}`;

  return ret;
}

// new func to getImage source from CloudFlare
export async function getCloudFlareImage(imageHash = "", size = 500) {
  const fallbackURL = `${IPFS_BASE_URL}/${imageHash.replace("ipfs://", "")}`;

  const ret = `${baseURL}/getImage?input=${imageHash}&size=${size}&url=${fallbackURL}`;

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

export async function getMetaDataOffChain(tokenID, token_uri) {
  const metadata = await APICall.getNftJson({ tokenID, token_uri });

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
}

export function shortenNumber(number) {
  return nFormatter(number, 1);
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
export function isValidImage(imageUrl) {
  try {
    fetch(imageUrl).then((res) => {
      if (res.status === 200) return true;
      return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function timestampWithoutCommas(input) {
  return input.replace(/,/g, "");
}

export function convertDateToTimeStamp(dateStr) {
  const date = new Date(dateStr);
  return date.getTime();
}

export function convertStringToPrice(stringPrice) {
  try {
    /* eslint-disable no-useless-escape */
    const a = stringPrice.replace(/\,/g, "");
    // let price = new BN(a, 10).div(new BN(10 ** 6)).toNumber();
    return a / 10 ** 12;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function convertNumberWithoutCommas(input) {
  return input.replace(/,/g, "");
}

export function convertStringToDateTime(stringTimeStamp) {
  let timeStamp = stringTimeStamp;

  if (typeof stringTimeStamp === "string") {
    /* eslint-disable no-useless-escape */
    timeStamp = stringTimeStamp.replace(/\,/g, "");
  }

  return moment(parseInt(timeStamp)).format("MMM D YYYY, H:mm");
}

export function isValidAddressPolkadotAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}

export function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const convertTimeStamp = (input) => {
  let time = input.replace(/\,/g, "");
  if (time <= 0) return "";
  var d = new Date(time);
  return (
    twoDigit(d.getDate()) +
    "/" +
    twoDigit(d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    twoDigit(d.getHours()) +
    ":" +
    twoDigit(d.getMinutes()) +
    ":" +
    twoDigit(d.getSeconds())
  );
};

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: twoDigit(hours),
    m: twoDigit(minutes),
    s: twoDigit(seconds),
  };
  return obj;
};

export const convertTimeStampNoTime = (input) => {
  let time = input.replace(/\,/g, "");
  if (time <= 0) return "";
  var d = new Date(time);
  return (
    twoDigit(d.getDate()) +
    "/" +
    twoDigit(d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
};

export const twoDigit = (myNumber) => {
  return ("0" + myNumber).slice(-2);
};

export const twoDigitTime = (time) => {
  if (time < 10) return "0" + time;
  else return time + "";
};

export const truncateStr = (str, n = 6) => {
  if (!str) return "";
  return str.length > n
    ? str.substr(0, n - 1) + "..." + str.substr(str.length - n, str.length - 1)
    : str;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function handleContractCall(status, dispatchError, dispatch, contract) {
  if (dispatchError) {
    if (dispatchError.isModule) {
      const decoded = contract.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
    } else {
      console.log(dispatchError.toString());
    }
  }

  if (status) {
    const statusToHuman = Object.entries(status.toHuman());

    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch({
        type: AccountActionTypes.SET_TNX_STATUS,
        payload: { status: "Ready" },
      });
    } else {
      dispatch({
        type: AccountActionTypes.SET_TNX_STATUS,
        payload: {
          status: statusToHuman[0][0],
          // value: truncateStr(statusToHuman[0][1], 6),
        },
      });
    }
  }
}

export const createObjAttrsNFT = function (attrsArr, attrsValArr) {
  if (attrsArr.length !== 0 && attrsArr.length === attrsValArr.length) {
    let result = {};

    result.nftName = attrsValArr[0];
    result.description = attrsValArr[1];
    result.avatar = attrsValArr[2];

    const attrsList = attrsArr.slice(3, attrsArr.length);
    const attrsValList = attrsValArr.slice(3, attrsArr.length);

    const formatList = Object.assign(
      [...attrsList].map((v, i) => ({ [v]: attrsValList[i] }))
    );

    result.attrsList = formatList.filter((obj) => !!Object.values(obj)[0]);

    return result;
  }

  return console.log("error Can not create attributes Object");
};

export const createLevelAttribute = (levelString) => {
  if (!levelString) return { level: "", levelMax: "" };

  const location = Number(levelString.indexOf("|"));
  const level = levelString.slice(0, location);
  const levelMax = levelString.slice(location + 1, levelString.length);

  return { level, levelMax };
};

export const getPublicCurrentAccount = () => {
  const keyring = new Keyring();
  const PHRASE =
    "entire material egg meadow latin bargain dutch coral blood melt acoustic thought";

  keyring.addFromUri(PHRASE, { name: "Nobody" });

  const keyringOptions = keyring
    .getPairs()
    .map(({ address, meta: { name } }) => ({
      key: address,
      address,
      name,
    }));

  return keyringOptions[0];
};

export function handleContractCallAnimation(status, dispatchError, dispatch) {
  if (dispatchError) {
    return dispatch({
      type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
    });
  }

  if (!dispatchError && status) {
    const statusToHuman = Object.entries(status.toHuman());

    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch({
        type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
        payload: { status: "Ready" },
      });
    } else {
      const finalizedTimeStamp = Date.now();

      dispatch({
        type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
        payload: {
          status: statusToHuman[0][0],
          // value: truncateStr(statusToHuman[0][1], 6),
          timeStamp: finalizedTimeStamp,
        },
      });
    }
  }
}

export function handleContractCallAddNftAnimation(
  status,
  dispatchError,
  dispatch
) {
  if (dispatchError) {
    return dispatch({
      type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
    });
  }

  if (!dispatchError && status) {
    const statusToHuman = Object.entries(status.toHuman());
    const url = `https://test.azero.dev/#/explorer/query/`;

    if (Object.keys(status.toHuman())[0] === "0") {
      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: { status: "Ready" },
      });
    } else {
      const finalizedTimeStamp = Date.now();

      if (statusToHuman[0][0] === "Finalized") {
        console.log("^^Tx finalized at ", `${url}${statusToHuman[0][1]}`);
      }

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: statusToHuman[0][0],
          // value: truncateStr(statusToHuman[0][1], 6),
          timeStamp: finalizedTimeStamp,
        },
      });
    }
  }
}

export function onCloseButtonModal({ status, dispatch, type }) {
  const endTimeStamp = Date.now();

  status === "Finalized" &&
    dispatch({
      type: type,
      payload: {
        status: "End",
        endTimeStamp,
      },
    });
}

export const formatNumDynamicDecimal = (num = 0, dec = 6) => {
  const number = parseInt(num * 10 ** dec) / 10 ** dec;
  const numStr = number.toString();
  const dotIdx = numStr.indexOf(".");

  if (dotIdx === -1) {
    return numeral(numStr).format("0,0");
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format("0,0");
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return intPart + `${dotIdx === -1 ? "" : `.${decPart}`}`;
};

export const isPhaseTimeOverlap = (phaseArr) => {
  phaseArr.sort((a, b) => a.start - b.start);

  for (let i = 1; i < phaseArr?.length; i++) {
    if (phaseArr[i - 1].end > phaseArr[i].start) return true;
  }

  return false;
};

export default function isNotEmptyStr(data) {
  if (!data) return false;

  if (typeof data === "string") {
    return data.trim().length > 0;
  }

  return false;
}

export function isEmptyObj(value) {
  if (!value) return true;

  return Object.keys(value).length === 0 && value.constructor === Object;
}

export function getTraitCount(rarityTable, item) {
  const [[key, value]] = Object.entries(item);

  if (!rarityTable || !rarityTable[key]) return 0;

  const idx = rarityTable[key].findIndex((i) => i.name === value);

  if (idx === -1) return 0;

  return rarityTable[key][idx].count;
}

export async function getEstimatedGas(
  address,
  contract,
  value,
  queryName,
  ...args
) {
  const fetchGas = async () => {
    let ret;

    try {
      const gasLimitResult = await getGasLimit(
        contract?.api,
        address,
        queryName,
        contract,
        { value },
        args
      );

      if (!gasLimitResult.ok) {
        console.log(queryName, "getEstimatedGas err ", gasLimitResult.error);
        return;
      }

      ret = gasLimitResult?.value;
    } catch (error) {
      console.log("error fetchGas xx>>", error.message);
    }

    return ret;
  };

  let result;

  await toast.promise(
    fetchGas().then((data) => (result = data)),
    {
      success: `Estimated transaction fee...`,
      error: "Could not fetching gas!",
    },
    {
      success: {
        icon: "🔥",
      },
    }
  );

  return result;
}

// For read-only queries we don't need the exact gas limit
// as the account will not be charged for making the call.
export function readOnlyGasLimit(contract) {
  if (!contract) {
    console.log("contract invalid...");
    return;
  }
  try {
    const ret = contract?.api?.registry?.createType("WeightV2", {
      refTime: new BN(1_000_000_000_000),
      proofSize: MAX_CALL_WEIGHT,
    });

    return ret;
  } catch (error) {
    console.log("error", error);
  }
}

export const strToNumber = (str = "") => {
  if (typeof str !== "string") return str;

  const number = str.replace(/,/g, "");
  return parseFloat(number);
};

export const isPhaseEnd = (endTime = "") => {
  let timeStamp = endTime;

  if (typeof endTime === "string") {
    /* eslint-disable no-useless-escape */
    timeStamp = endTime.replace(/\,/g, "");
  }

  const now = Date.now();

  if (timeStamp <= now) return true;

  return false;
};

export function formatOutput(o) {
  const frmtRet = o.toHuman().Ok;

  return frmtRet?.replaceAll(",", "");
}

export function formatNumberOutput(o) {
  const frmtRet = o.toHuman().Ok;

  return parseInt(frmtRet?.replaceAll(",", ""));
}

export function isValidAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
}

export const formatNumToBN = (number = 0, decimal = 12) => {
  return new BN(number * 10 ** 6).mul(new BN(10 ** (decimal - 6))).toString();
};

export const checkHasRoleAdmin = async ({
  api,
  contractAbi,
  contractAddress,
  address,
}) => {
  if (!api) return;

  const publicAccount = getPublicCurrentAccount();

  const queryResult = await execContractQuery(
    publicAccount?.address,
    api,
    contractAbi,
    contractAddress,
    "accessControl::hasRole",
    ADMIN_ROLE_CODE,
    address
  );

  return queryResult.toHuman().Ok;
};
