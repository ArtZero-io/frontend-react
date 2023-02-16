# Test Plan for ArtZero Frontend

- Table of Contents
  - [Introduction](#introduction)
  - [Test Cases](#test-cases)
    - [General](#general)
    - [Accounts](#accounts)
    - [Marketplace](#marketplace)
      - [Add new collection in simple mode](#Add-new-collection-in-simple-mode)
      - [Edit a collection](#Edit-a-collection)
      - [Add new collection in advanced mode](#Add-new-collection-in-advanced-mode)
      - [Add a new NFT](#Add-a-new-NFT)
      - [Edit an NFT](#Edit-an-NFT)
      - [List an NFT](#List-an-NFT)
      - [Cancel listing an NFT](#Cancel-listing-an-NFT)
      - [Buy an NFT](#Buy-an-NFT)
      - [Make an offer](#Make-an-offer)
      - [Remove an offer](#Remove-an-offer)
      - [Accept an offer](#Accept-an-offer)
      - [Transfer an NFT](#Transfer-an-NFT)
      - [Lock Metadata of an NFT](#Lock-metadata-of-an-NFT)
      - [Filter](#Filter)
    - [LaunchPad](#launchpad)

## Introduction
> Add introduction and guide here

## Test Cases

### General

### Accounts
> Test case Template
```
Test case ID: account_001
Test case Name: ....
Pre-requisite: ....
Expectations: write the expected result here.
```

### Marketplace

#### Add new collection in simple mode

```
Test case ID: Add_new_collection_in_simple_mode_001
Test case Name: Add a new collection in simple mode with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for collection fee & gas fee
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. Input all information in correct format
  3. Upload 3 images
  4. Input Royalty fee number
  5. Add email
  6. Tick box to agree Terms of Service
  7. Click button CREATE COLLECTION
  8. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up message from the team
  - Receive email confirming of the success of the collection creation
  - Able to navigate the collection or edit collection in MY ACCOUNT \ MY COLLECTION
  - Balance is deducted collection fee & gas fee
```

```
Test case ID: Add_new_collection_in_simple_mode_002
Test case Name: Add a new collection in simple mode without 1 or more compulsory inputs or images
Pre-requisite: 
  - Connected active account with enough balance for collection fee & gas fee
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. EITHER: Input information in correct format without 1 or more compulsory inputs (NFT Names, NFT symbol, collection name, Collection description, email) OR 
  3. Upload less than 3 images OR
  4. Not add email OR
  5. Not tick box to agree Terms of Service AND
  6. Input Royalty fee number
  7. Click button CREATE COLLECTION
Expectations: 
  - Receive pop-up message or red note requesting to complete missing step
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

```
Test case ID: Add_new_collection_in_simple_mode_003
Test case Name: Add a new collection in simple mode with low balance for collection fee
Pre-requisite: 
  - Connected active account with low balance which is not enough for collection fee
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. Input all information in correct format
  3. Upload 3 images
  4. Input Royalty fee number
  5. Add email
  6. Tick box to agree Terms of Service
  7. Click button CREATE COLLECTION
Expectations: 
  - Receive pop-up message stating Low balance to proceed
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

```
Test case ID: Add_new_collection_in_simple_mode_004
Test case Name: Add a new collection in simple mode with low balance for gas fee
Pre-requisite: 
  - Connected active account with low balance which is enough for collection fee but not enough for gas fee
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. Input all information in correct format
  3. Upload 3 images
  4. Input Royalty fee number
  5. Add email
  6. Tick box to agree Terms of Service
  7. Click button CREATE COLLECTION
  8. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up message stating Low balance for gas fee
  - Impossible to create a collection.
```

```
Test case ID: Add_new_collection_in_simple_mode_005
Test case Name: Add a new collection in simple mode with incorrect format of social link(s)
Pre-requisite: 
  - Connected active account 
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. Input all information in correct format with any of the following social links in the wrong format:
    - Website does not start with https:// or http://
    - Twitter does not start with https://twitter.com/ or http://twitter.com/
    - Telegram does not start with https://t.me/ or http://t.me/
    - Discord does not start with https://discord.com/ or http://discord.com/
  3. Upload 3 images
  4. Input Royalty fee number
  5. Add email
  6. Tick box to agree Terms of Service
  7. Click button CREATE COLLECTION
Expectations: 
  - Receive red note under wrong inputs requesting to fix them 
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

```
Test case ID: Add_new_collection_in_simple_mode_006
Test case Name: Add a new collection in simple mode with incorrect format of image(s)
Pre-requisite: 
  - Connected active account 
Steps: 
  1. Go to MY ACCOUNT \ CREATE COLLECTION \ SIMPLE MODE
  2. Input all information in correct format
  3. Upload 3 images as avatar image, featured image, header image, any of which is of a wrong format including:
    - bigger than 5MB in size
    - format of file is not: .png, .jpeg., .jpg,.
  4. Input Royalty fee number
  5. Add email
  6. Tick box to agree Terms of Service
  7. Click button CREATE COLLECTION
Expectations: 
  - Receive pop-up warning about the size of the file bigger than 5MB or impossible to upload wrong format file
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

#### Add new collection in advanced mode

#### Edit a collection

```
Test case ID: Edit_a_collection_001
Test case Name: Edit a new collection in simple mode with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - A collection in MY COLLECTIONS
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTIONS and navigate to the collection to click EDIT
  2. Edit each of the following information in correct format:
    - Collection Name: within 30 characters
    - Edit any of the 3 images as avatar image, featured image, header image, any of which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - social links in the correct format:
      + Website starts with https:// or http://
      + Twitter starts with https://twitter.com/ or http://twitter.com/
      + Telegram starts with https://t.me/ or http://t.me/
      + Discord starts with https://discord.com/ or http://discord.com/
    - Collection description: within 3000 characters
  3. Click button EDIT COLLECTION
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction with editted information & able to navigate the collection or edit collection in MY ACCOUNT \ MY COLLECTION
  - Balance is deducted gas fee
```

```
Test case ID: Edit_a_collection_002
Test case Name: Edit a new collection in simple mode with 1 or more incorrect data input(s)
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - A collection in MY COLLECTIONS
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTIONS and navigate to the collection to click EDIT
  2. Edit each of the following information in incorrect format including
    - Collection Name: text longer than 30 characters
    - Edit any of the 3 images as avatar image, featured image, header image, any of which is of a correct format including:
      + bigger than 5MB in size
      + format of file is not: .png, .jpeg., .jpg
    - social links in the correct format:
      + Website does not start with https:// or http://
      + Twitter does not start with https://twitter.com/ or http://twitter.com/
      + Telegram does not start with https://t.me/ or http://t.me/
      + Discord does not start with https://discord.com/ or http://discord.com/
    - Collection description: longer than 3000 characters
  3. Click button EDIT COLLECTION
Expectations: 
  - Receive pop-up message or red note requesting to complete missing step
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```


```
Test case ID: Edit_a_collection_003
Test case Name: Edit a new collection but not enough balance for gas fee
Pre-requisite: 
  - Connected active account without enough balance for gas fee
  - A collection in MY COLLECTIONS
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTIONS and navigate to the collection to click EDIT
  2. Edit each of the following information in correct format:
    - Collection Name: within 30 characters
    - Edit any of the 3 images as avatar image, featured image, header image, any of which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - social links in the correct format:
      + Website starts with https:// or http://
      + Twitter starts with https://twitter.com/ or http://twitter.com/
      + Telegram starts with https://t.me/ or http://t.me/
      + Discord starts with https://discord.com/ or http://discord.com/
    - Collection description: within 3000 characters
  3. Click button EDIT COLLECTION
  4. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up message stating Low balance for gas fee
  - Impossible to edit  collection.
```



#### Add a new NFT

#### Edit an NFT

#### List an NFT

#### Cancel listing an NFT

#### Buy an NFT

#### Make an offer

#### Remove an offer

#### Accept an offer

#### Transfer an NFT

#### Lock Metadata of an NFT

#### Filter

```
Test case ID: marketplace_001
Test case Name: ....
Pre-requisite: ....
Expectations: write the expected result here.
```

### LaunchPad


> Add more Categories and Test Cases here
