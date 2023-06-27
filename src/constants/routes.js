export const HOME = "/";
export const HELP = "/help";
export const STATS = "/stats";
export const LEGAL = "/legal";

// MY ACCOUNT
export const ACCOUNT = "/account/general";
export const ACCOUNT_MY_COLLECTIONS = "/account/collections";
export const ACCOUNT_MY_NFTS = "/account/nfts";
export const ACCOUNT_MY_STAKES = "/account/stakes";
export const ACCOUNT_ADMIN = "/admin";
export const ACCOUNT_MY_PROJECTS = "/account/projects";
export const ACCOUNT_MY_ACTIVITIES = "/account/activites";
export const ACCOUNT_WHITELIST_PROJECTS = "/account/projects/whitelist";
export const ACCOUNT_MINTING_PROJECTS = "/account/projects/minting";

//PUBLIC ACCOUNT
export const PUBLIC_ACCOUNT = "/public-account/collections/:address";
export const PUBLIC_ACCOUNT_MY_COLLECTIONS =
  "/public-account/collections/:address";
export const PUBLIC_ACCOUNT_MY_NFTS = "/public-account/nfts/:address";
export const PUBLIC_ACCOUNT_MY_STAKES = "/public-account/stakes/:address";
export const PUBLIC_ACCOUNT_MY_PROJECTS = "/public-account/projects/:address";

// COLLECTION

export const DETAIL_COLLECTION = "/collection/:collection_address";
export const DETAIL_COLLECTION_BASE = "/collection";
export const LAUNCHPAD_BASE = "/launchpad";
export const LAUNCHPAD_ADD_PROJECT = "/launchpad/add";
export const LAUNCHPAD_DETAIL = "/launchpad/:collection_address";

// NFT TOKEN
export const NFT_DETAIL = "/nft/:collection_address/:token_id";

// MINTING EVENT
export const MINTING_EVENT = "/mint";

export const MARKETPLACE = "/marketplace";
export const DOCS = process.env.REACT_APP_DOCS;
export const STAKE2EARN = "https://a0.inkwhale.net/";
