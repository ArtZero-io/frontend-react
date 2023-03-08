# ArtZero Front-end Repo

## Introduction

The ArtZero platform aims to be a decentralized NFT marketplace on the AlephZero blockchain. It aims to allow the users to list their NFT collections to be tradeable on the platform for a fee and to create their NFT collection via the ArtZero contracts. The users can create the collections as standard NFT collections or in an advanced mode, which also serves as a launchpad for such projects. The platform also comes with its native NFT Collection, which owners can stake for platform fees and other perks.

## Sample `.env` file

Please scroll to bottom for more detail guide about **ipfs** and **emailjs** register, get and config your own key and API.
Or for quick test Front-End you can use ready-to-run `.env` file we prepared [here](.env.example) to replace below sample `.env `.

### Backend API config

URL feed data for client use.

```
REACT_APP_API_BASE_URL=https://127.0.0.1:3410
```

### IPFS config
Use for client upload NFT images, media assets to `ipfs.infura.io` host.

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

# IPFS service
You can register account at this link https://www.infura.io/. And find info about `PROJECT ID` and `API Key Secret` from  https://app.infura.io/dashboard.

![Screenshot 2023-03-07 155404](https://user-images.githubusercontent.com/35419213/223377113-fdce6fb1-5969-44d3-9402-1126e9adf3d3.png)

# Emailjs service
Register new account at https://emailjs.com. And `Add new service` on **Email Services** Tab

![Screenshot 2023-03-07 155910](https://user-images.githubusercontent.com/35419213/223377640-854f7719-a908-4044-bb4d-c365b4b097d6.png)

Config Template on **Email Templates** Tab

<img width="721" alt="Screenshot 2023-03-07 160153" src="https://user-images.githubusercontent.com/35419213/223377926-4ab7c894-fd1f-44d7-9506-29e87878fca0.png">

Email template: `new_collection_project`

![Screenshot 2023-03-07 160306](https://user-images.githubusercontent.com/35419213/223378225-252785ff-2878-420f-a9ee-a754fac8a86f.png)

**Content**:
```
Dear {{collection_name}} team,

We have received and reviewed your {{collection_name}}. May we ask whether you intend to launch a collection in the Mainnet or are you simply testing our platform? In case you intend to launch an NFT collection in our platform, please leave your Telegram ID so we can support you further.

- Your collection: https://alephzero.artzero.io/#/collection/{{collection_address}}
- You can add more NFTs to the Collection here: https://alephzero.artzero.io/#/account

When we receive your reply, we will consider enabling your {{collection_name}}.

You can also find step-by-step instructions for launching a project here: https://docs.artzero.io/creating-a-collection/introduction

Thank you for engaging with our platform.

Best regards,
ArtZero Support Team
```


Email template: `active_collection`

<img width="714" alt="Screenshot 2023-03-07 162047" src="https://user-images.githubusercontent.com/35419213/223378629-28087b89-93a5-4344-9f62-9d0277bf02d2.png">

**Content**:
```
Dear "{{collection_name}}" team,

We are glad to let you know that your collection/project is now active and can be accessed at link below.

https://alephzero.artzero.io/#/collection/{{collection_address}}?is_for_sale=true

Best Regards
ArtZero Support Team
```


More config detail on **Account Tab** for `API Public key`,...

![Screenshot 2023-03-07 162436](https://user-images.githubusercontent.com/35419213/223379671-743f0ee2-3c72-4f33-ac34-b05ca476a0b8.png)


