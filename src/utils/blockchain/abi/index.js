/* eslint-disable import/first */
const network = process.env.REACT_APP_NETWORK;

const artzero_nft = require(`./${network}/artzero-nft`).default;
const azero_domains_nft = require(`./${network}/azero-domains-nft`).default;
const collection_manager = require(`./${network}/collection-manager`).default;
const launchpad_manager = require(`./${network}/launchpad-manager`).default;
const launchpad_psp34_nft_standard =
  require(`./${network}/launchpad-psp34-nft-standard`).default;
const marketplace = require(`./${network}/marketplace`).default;
const nft721_psp34_standard =
  require(`./${network}/nft721-psp34-standard`).default;
const profile = require(`./${network}/profile`).default;
const staking = require(`./${network}/staking`).default;

const psp22_contract = require(`./${network}/psp22_contract`).default;

export {
  artzero_nft,
  azero_domains_nft,
  collection_manager,
  launchpad_manager,
  launchpad_psp34_nft_standard,
  marketplace,
  nft721_psp34_standard,
  profile,
  staking,
  psp22_contract,
};
