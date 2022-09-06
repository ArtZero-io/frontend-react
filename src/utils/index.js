import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { AccountActionTypes } from "../store/types/account.types";
import Keyring from "@polkadot/keyring";
import { IPFS_BASE_URL } from "@constants/index";
import numeral from "numeral";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export function getCachedImage(imageHash, size, url) {
  // console.log('getImage',imageHash, size, url)
  return (
    baseURL + "/getImage?input=" + imageHash + "&size=" + size + "&url=" + url
  );
}

export function getCachedImageShort(imageHash = "", size = 100) {
  const fallbackURL = `${IPFS_BASE_URL}/${imageHash.replace("ipfs://", "")}`;

  const ret = `${baseURL}/getImage?input=${imageHash}&size=${size}&url=${fallbackURL}`;

  // console.log("ret", ret);
  return ret;
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
  /* eslint-disable no-useless-escape */
  const a = stringTimeStamp.replace(/\,/g, "");
  const dateObject = new Date(parseInt(a));
  return dateObject.toLocaleString(); //2019-12-9 10:30:15
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

    // console.log("createObjAttrsNFT formatList", result.formatList);
    return result;
  }
  // console.log("createObjAttrsNFT attrsArr", attrsArr);
  // console.log("createObjAttrsNFT attrsValArr", attrsValArr);
  return console.log("Can not create attributes Object");
};

export const createLevelAttribute = (levelString) => {
  const location = Number(levelString.indexOf("|"));
  const level = levelString.slice(0, location);
  const levelMax = levelString.slice(location + 1, levelString.length);

  return { level, levelMax };
};

export const getPublicCurrentAccount = () => {
  const keyring = new Keyring({ type: "sr25519" });
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
        console.log("Tx finalized at ", `${url}${statusToHuman[0][1]}`);
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
