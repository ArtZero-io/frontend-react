import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export function isValidImage(imageUrl) {
  try {
    fetch(imageUrl).then(res => {
      if (res.status === 200) return true
      return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export function isValidAddressPolkadotAddress(address) {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export function delay(timeout:number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export const convertTimeStamp = (time: number) => {
    if (time <= 0) return "";
    var d = new Date(time);
    return twoDigit(d.getDate()) + '/' + twoDigit(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + twoDigit(d.getHours()) + ':' + twoDigit(d.getMinutes()) + ':' + twoDigit(d.getSeconds());
};

export const secondsToTime = (secs:number) =>{
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": twoDigit(hours),
      "m": twoDigit(minutes),
      "s": twoDigit(seconds)
    };
    return obj;
  }

export const convertTimeStampNoTime = (time: number)=> {
    if (time <= 0) return "";
    var d = new Date(time);
    return twoDigit(d.getDate()) + '/' + twoDigit(d.getMonth() + 1) + '/' + d.getFullYear() ;
};

export const twoDigit = (myNumber: number)=> {
    return ("0" + myNumber).slice(-2);
};

export const twoDigitTime = (time: number)=> {
    if (time < 10)
        return "0" + time;
    else return time + "";
};

export const truncateStr = (str: string, n: number)=> {
    if (!str) return '';
    return (str.length > n) ? str.substr(0, n - 1) + '...' + str.substr(str.length - n, str.length - 1) : str;
};

export const numberWithCommas = (x: number)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
