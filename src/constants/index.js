export const formMode = {
  ADD: "ADD",
  EDIT: "EDIT",
};

// TX STATUS
export const START = "Start";
export const READY = "Ready";
export const BROADCAST = "Broadcast";
export const IN_BLOCK = "InBlock";
export const FINALIZED = "Finalized";
export const END = "End";

// MY STAKING ACTIONS
export const STAKE = "stake";
export const UNSTAKE = "unstake";
export const REQUEST_UNSTAKE = "requestUnstake";
export const CANCEL_REQUEST_UNSTAKE = "cancelRequestUnstake";

// NFT ACTIONS
export const EDIT_NFT = "editNFT";
export const CREATE_NFT = "createNFT";

export const LOCK = "lock";
export const TRANSFER = "transfer";

export const BUY = "buy";
export const BID = "bid";
export const REMOVE_BID = "removeBid";
export const ACCEPT_BID = "acceptBid";

export const LIST_TOKEN = "listToken";
export const UNLIST_TOKEN = "unlistToken";

export const PUBLIC_MINT = "publicMint";
export const WHITELIST_MINT = "whitelistMint";

//COLLECTION ACTIONS
export const CREATE_COLLECTION = "createCollection";
export const EDIT_COLLECTION = "editCollection";

// PROJECT STATUS
export const LIVE = "live";
export const UPCOMING = "upcoming";
export const ENDED = "ended";

// PROJECT ACTIONS
export const EDIT_PROJECT = "editProject";
export const CREATE_PROJECT = "createProject";
export const UPDATE_BASE_URI = "updateBaseUri";
export const UPDATE_PHASE = "updatePhase";
export const ADD_PHASE = "addPhase";
export const DELETE_PHASE = "deletePhase";

// OTHERS
export const NUMBER_PER_PAGE = 6;

export const SCROLLBAR = {
  "&::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
    borderRadius: "0px",
    backgroundColor: `transparent`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `#7ae7ff`,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: `#7ae7ff`,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: `transparent`,
  },
};

export const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs";
export const IPFS_CLIENT_URL = "https://ipfs.infura.io:5001/api/v0";

export const SUPPORTED_WALLET_LIST = [
  {
    extensionName: "subwallet-js",
    title: "SubWallet",
    logo: "SubWalletLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Subwallet",
    installUrlChrome:
      "https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn",
    installUrlEdge:
      "https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn",
    installUrlFirefox: "https://addons.mozilla.org/vi/firefox/addon/subwallet/",
  },
  {
    extensionName: "polkadot-js",
    title: "Polkadot{.js}",
    logo: "PolkadotjsLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Polkadot{.js}",
    installUrlChrome:
      "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related",
    installUrlEdge:
      "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related",
    installUrlFirefox:
      "https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/",
  },
  {
    extensionName: "talisman",
    title: "Talisman",
    logo: "TalismanLogo.svg",
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Talisman",
    installUrlChrome:
      "https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
    installUrlEdge:
      "https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
    installUrlFirefox:
      "https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/",
  },
];
