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

### Dashboard
```
Test case ID: dashboard_001
Test case Name: Verify Dashboard Page Information Display
Pre-requisite: User must be logged in and have access to the Dashboard page.
Expectations:
  The user's address should be displayed on the Dashboard page.
  The number of NFTs for sale should be displayed on the Dashboard page.
  The number of Staked NFTs should be displayed on the Dashboard page.
  The number of Pending Staked NFTs should be displayed on the Dashboard page.
  The total number of owned NFTs should be displayed on the Dashboard page.
  The recent reward history should be displayed on the Dashboard page.
  The Info staking NFT should be displayed on the Dashboard page.
Test Steps:
  Login to the NFT marketplace as a registered user.
  Navigate to the Dashboard page.
  Verify that the user's address is displayed on the page.
  Verify that the number of NFTs for sale is displayed on the page.
  Verify that the number of Staked NFTs is displayed on the page.
  Verify that the number of Pending Staked NFTs is displayed on the page.
  Verify that the total number of owned NFTs is displayed on the page.
  Verify that the recent reward history is displayed on the page.
  Verify that the Info staking NFT is displayed on the page.
```

```Test case ID: dashboard_002
Test case Name: Verify Functionality of Trade Discount Modal for PMP NFT Staked
Pre-requisite: User must be logged in and have access to the Dashboard page.
Expectations:
  The user should be able to access the Trade Discount Modal on the Dashboard page.
  The modal should display a table with three columns: Stakers, Trade Fee, and Trade Discount by Percent.
  The user should be able to view the stakers who are eligible for the trade discount.
  The user should be able to view the trade fee and trade discount for each stake NFT quantity.
Test Steps:
  Login to the NFT marketplace as a registered user.
  Navigate to the Dashboard page.
  Locate and access the Trade Discount Modal.
  Verify that the modal displays a table with the columns Stakers, Trade Fee, and Trade Discount by Percent.
  Verify that the table displays the stakers who are eligible for the trade discount.
  Verify that the table displays the trade fee and trade discount for each stake NFT quantity.
```
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
