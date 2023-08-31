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
  {
    extensionName: "Nightly",
    title: "Nightly",
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAxIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMSAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjM5MDYyNSAxMDBDMC4zOTA2MjUgNDQuNzcxNSA0NS4xNjIyIDAgMTAwLjM5MSAwQzE1NS42MTkgMCAyMDAuMzkxIDQ0Ljc3MTUgMjAwLjM5MSAxMDBDMjAwLjM5MSAxNTUuMjI4IDE1NS42MTkgMjAwIDEwMC4zOTEgMjAwQzQ1LjE2MjIgMjAwIDAuMzkwNjI1IDE1NS4yMjggMC4zOTA2MjUgMTAwWiIgZmlsbD0iIzYwNjdGOSIvPgo8cGF0aCBkPSJNMTQ2LjgzOCA0MEMxMzguMDU0IDUyLjI2MDcgMTI3LjA2MSA2MC43NjM0IDExNC4wNzIgNjYuNDQ3NEMxMDkuNTYzIDY1LjIwMjYgMTA0LjkzNiA2NC41Njg0IDEwMC4zNzkgNjQuNjE1NEM5NS44MjIzIDY0LjU2ODQgOTEuMTk1MSA2NS4yMjYxIDg2LjY4NTUgNjYuNDQ3NEM3My42OTY2IDYwLjczOTkgNjIuNzA0MiA1Mi4yODQyIDUzLjkxOTggNDBDNTEuMjY1NiA0Ni42NzA2IDQxLjA0ODMgNjkuNjg4OCA1My4zMDkxIDEwMS44NjdDNTMuMzA5MSAxMDEuODY3IDQ5LjM4NjYgMTE4LjY2MSA1Ni41OTc0IDEzMy4wODNDNTYuNTk3NCAxMzMuMDgzIDY3LjAyNiAxMjguMzYyIDc1LjMxNzMgMTM1LjAwOUM4My45ODQzIDE0Mi4wMzIgODEuMjEyOCAxNDguNzk2IDg3LjMxOTYgMTU0LjYyMUM5Mi41ODA5IDE2MCAxMDAuNDAyIDE2MCAxMDAuNDAyIDE2MEMxMDAuNDAyIDE2MCAxMDguMjI0IDE2MCAxMTMuNDg1IDE1NC42NDVDMTE5LjU5MiAxNDguODQzIDExNi44NDQgMTQyLjA3OSAxMjUuNDg4IDEzNS4wMzJDMTMzLjc1NSAxMjguMzg1IDE0NC4yMDcgMTMzLjEwNiAxNDQuMjA3IDEzMy4xMDZDMTUxLjM5NSAxMTguNjg1IDE0Ny40OTYgMTAxLjg5MSAxNDcuNDk2IDEwMS44OTFDMTU5LjcxIDY5LjY4ODggMTQ5LjUxNiA0Ni42NzA2IDE0Ni44MzggNDBaTTU5LjgzODcgOTcuNDI4MUM1My4xNjgxIDgzLjczNDYgNTEuMzM2MSA2NC45NDQyIDU1LjU0MDQgNTAuMDk5OEM2MS4xMDcxIDY0LjE5MjYgNjguNjcwMiA3MC41MTA5IDc3LjY2NjEgNzcuMTgxNEM3My44NjEgODUuMDk2OSA2Ni42OTcyIDkyLjU2NjEgNTkuODM4NyA5Ny40MjgxWk03OS4wMjg0IDEyMS41NUM3My43NjcxIDExOS4yMjUgNzIuNjYzMSAxMTQuNjQ1IDcyLjY2MzEgMTE0LjY0NUM3OS44MjcgMTEwLjEzNSA5MC4zNzMxIDExMy41ODggOTAuNzAxOSAxMjQuMjUxQzg1LjE1ODcgMTIwLjg5MyA4My4zMDMyIDEyMy40MDYgNzkuMDI4NCAxMjEuNTVaTTEwMC4zNzkgMTU5LjQxM0M5Ni42MjA5IDE1OS40MTMgOTMuNTY3NCAxNTYuNzEyIDkzLjU2NzQgMTUzLjRDOTMuNTY3NCAxNTAuMDg4IDk2LjYyMDkgMTQ3LjM4NyAxMDAuMzc5IDE0Ny4zODdDMTA0LjEzNyAxNDcuMzg3IDEwNy4xOSAxNTAuMDg4IDEwNy4xOSAxNTMuNEMxMDcuMTkgMTU2LjczNSAxMDQuMTM3IDE1OS40MTMgMTAwLjM3OSAxNTkuNDEzWk0xMjEuNzUzIDEyMS41NUMxMTcuNDc4IDEyMy40MjkgMTE1LjY0NiAxMjAuODkzIDExMC4wNzkgMTI0LjI1MUMxMTAuNDMyIDExMy41ODggMTIwLjkzMSAxMTAuMTM1IDEyOC4xMTggMTE0LjY0NUMxMjguMTE4IDExNC42MjEgMTI2Ljk5MSAxMTkuMjI1IDEyMS43NTMgMTIxLjU1Wk0xNDAuOTE5IDk3LjQyODFDMTM0LjA4NCA5Mi41NjYxIDEyNi44OTcgODUuMTIwNCAxMjMuMDY4IDc3LjE4MTRDMTMyLjA2NCA3MC41MTA5IDEzOS42NTEgNjQuMTY5MSAxNDUuMTk0IDUwLjA5OThDMTQ5LjQ0NSA2NC45NDQyIDE0Ny42MTMgODMuNzU4MSAxNDAuOTE5IDk3LjQyODFaIiBmaWxsPSIjRjdGN0Y3Ii8+Cjwvc3ZnPgo=',
    noExtensionMessage:
      "You can use any Polkadot compatible wallet but we recommend using Polkadot{.js}",
    installUrlChrome:
      "https://chrome.google.com/webstore/detail/nightly/fiikommddbeccaoicoejoniammnalkfa",
    installUrlEdge:
      "https://chrome.google.com/webstore/detail/nightly/fiikommddbeccaoicoejoniammnalkfa",
    installUrlFirefox:
      "https://addons.mozilla.org/pl/firefox/addon/nightly-app/",
  },
];
