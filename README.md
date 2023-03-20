# ArtZero Front-end Repo

## Introduction

The ArtZero platform aims to be a decentralized NFT marketplace on the AlephZero blockchain. It aims to allow the users to list their NFT collections to be tradeable on the platform for a fee and to create their NFT collection via the ArtZero contracts. The users can create the collections as standard NFT collections or in an advanced mode, which also serves as a launchpad for such projects. The platform also comes with its native NFT Collection, which owners can stake for platform fees and other perks.

## Sample `.env` file

### Backend API config

After cloning the frontend repository, please run the command below to set up the automation .env file
```shell
cd frontend-react
chmod +x setup_env_fe.sh.x
./setup_env_fe.sh.x
```
URL feed data for client use.

```
REACT_APP_API_BASE_URL=https://127.0.0.1:3410
```

### IPFS config

Use for client upload NFT images, media assets to [ipfs.infura](ipfs.infura.io) host.

```
REACT_APP_IPFS_PROJECT_ID=2DEt23644RzswJNwtdabcabcabc
REACT_APP_IPFS_PROJECT_KEY=b352ba9d861d026ea80f608abcabcabc
```

### Email config for [emailjs](https://www.emailjs.com/) service.

Use to inform creator about collection/project is created or active.

```
REACT_APP_EMAILJS_SERVICE_ID=DEt23644Rzabcabc
REACT_APP_EMAILJS_NEW_COLLECTION_PROJ_TEMPLATE_ID=DEt23644Rzabcabc
REACT_APP_EMAILJS_ACTIVE_COLLECTION_TEMPLATE_ID=DEt23644Rzabcabc
REACT_APP_EMAILJS_PUBLIC_KEY=DEt23644Rzabcabc
```

## Run the app locally

Install dependencies

```bash
yarn install
```

Run dev server

```bash
yarn start
```

## Support

If you need further support from us, please contact us using:

- Telegram: https://t.me/artzero_io
- Discord: https://discord.gg/wzkZ2JTvN4
- Twitter: https://twitter.com/ArtZero_io
- Email: support@artzero.io
- or read our articles at https://medium.com/@artzero_io
