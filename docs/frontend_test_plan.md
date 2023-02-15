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
Test case Name: Add a new collection in simple mode with low balance
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
Test case Name: Add a new collection in simple mode with low balance
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



#### Add new collection in advanced mode

#### Edit a collection

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
