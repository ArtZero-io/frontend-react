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

export const OWNER_MINT = "ownerMint";
export const PUBLIC_MINT = "publicMint";
export const WHITELIST_MINT = "whitelistMint";

//COLLECTION ACTIONS
export const CREATE_COLLECTION = "createCollection";
export const EDIT_COLLECTION = "editCollection";
export const UPDATE_COLLECTION_STATUS = "updateCollectionStatus";

// PROJECT STATUS
export const LIVE = "live";
export const UPCOMING = "upcoming";
export const ENDED = "ended";

// PROJECT ACTIONS
export const EDIT_PROJECT = "editProject";
export const CREATE_PROJECT = "createProject";
export const UPDATE_BASE_URI = "updateBaseUri";
export const UPDATE_ADMIN_ADDRESS = "updateAdminAddress";
export const UPDATE_PHASE = "updatePhase";
export const ADD_PHASE = "addPhase";
export const DELETE_PHASE = "deletePhase";

export const UPDATE_WHITELIST = "updateWhitelist";
export const ADD_WHITELIST = "addWhitelist";

// PROFILE ACTIONS
export const UPDATE_PROFILE = "updateProfile";

// REWARD ACTIONS
export const CLAIM_REWARDS = "claimRewards";
export const ENABLE_CLAIM = "enableClaim";

// ADMIN ACTIONS
export const WITHDRAW_COLLECTION = "withdrawCollection";
export const WITHDRAW_LAUNCHPAD = "withdrawLaunchpad";
export const WITHDRAW_MARKETPLACE = "withdrawMarketplace";

// OTHERS
export const NUMBER_PER_PAGE = 6;
export const MAX_ITEM_STAKE = 5;
export const MAX_BID_COUNT = 30;
export const ADMIN_ROLE_CODE = 3739740293;

export const ArtZero_TOS="https://alephzero.artzero.io/assets/ArtZero_Terms_Of_Service.pdf";
export const ArtZero_Cookies="https://alephzero.artzero.io/assets/ArtZero_Cookies_Policy.pdf";
export const ArtZero_Privacy="https://alephzero.artzero.io/assets/ArtZero_Privacy_Policy.pdf";
export const ArtZero_Assets="https://drive.google.com/drive/folders/1EXuGDmYVypszJUq4yr9dNTOZCuP96e3i"

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

export const IPFS_BASE_URL = "https://artzeronft.infura-ipfs.io/ipfs";

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
];

export const MESSAGE_SIGN = "Sign message to report"
