export const CHROME_EXT_URL =
  "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd";

export const FIREFOX_ADDON_URL =
  "https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/";

export const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";
export const IPFS_CLIENT_URL = "https://ipfs.infura.io:5001/api/v0";

export const MENU_LIST = [
  { label: "Home", href: "/" },
  { label: "My Account", href: "/account" },
  { label: "My Collection", href: "/collections/5gjksdfgksdkaf" },
];

export const SUPPORTED_WALLET_LIST = [
  {
    extensionName: "subwallet-js",
    title: "SubWallet",
    logo: "SubWalletLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Subwallet",
    installUrl:
      "https://docs.subwallet.app/user-guide/how-to-install-subwallet/alpha-version",
  },
  {
    extensionName: "polkadot-js",
    title: "Polkadot{.js}",
    logo: "PolkadotjsLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Polkadot{.js}",
    installUrl:
      "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related",
  },
  {
    extensionName: "talisman",
    title: "Talisman",
    logo: "TalismanLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Talisman",
    installUrl:
      "https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
  },
];
 