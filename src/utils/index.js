import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { AccountActionTypes } from "../store/types/account.types";
import BN from "bn.js";

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

export function convertStringToPrice(stringPrice) {
  try {
     /* eslint-disable no-useless-escape */
     const a = stringPrice.replace(/\,/g,'');
     let price = new BN(a, 10).toNumber();
     return price / (10 ** 12);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function convertStringToDateTime(stringTimeStamp) {
  /* eslint-disable no-useless-escape */
  const a = stringTimeStamp.replace(/\,/g,'');
  const dateObject = new Date(a)
  return dateObject.toLocaleString() //2019-12-9 10:30:15
}

export function isValidAddressPolkadotAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const convertTimeStamp = (time) => {
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

export const convertTimeStampNoTime = (time) => {
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

export const truncateStr = (str, n) => {
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
          value: truncateStr(statusToHuman[0][1], 6),
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
    const attrsValList = attrsValArr.slice(2, attrsArr.length);
    
    const formatList = Object.assign(
      [...attrsList].map((v, i) => ({ [v]: attrsValList[i] }))
    );

    result.attrsList = formatList;

    return result;
  }

  return console.log("Can not create attributes Object");
};
