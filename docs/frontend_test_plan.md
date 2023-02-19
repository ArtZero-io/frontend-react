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
      - [Claim unsuccessful bids](#Claim-unsuccessful-bids)
      - [Lock Metadata of an NFT](#Lock-metadata-of-an-NFT)
      - [Stake a PMP NFT](#Stake-a-PMP_NFT)
      - [Multi-stake a PMP NFT](#Multi-stake-a-PMP_NFT)
      - [Unstake a PMP NFT](#Unstake-a-PMP_NFT)
      - [Cancel stake of a PMP NFT](#Cancel-stake-of-a-PMP-NFT)
      - [Multi-Unstake a PMP NFT](#Multi-Unstake-a-PMP_NFT)
      - [Multi-cancel unstake of a PMP NFT](#Multi-cancel-unstake-of-a-PMP-NFT)
      - [Claim earnings from staking](#Claim-earnings-from-staking)
    - [LaunchPad](#launchpad)
      - [Create a project](#Create-a-project)
      - [Update art location](#Update-art-location)
      - [Grant admin role](#Grant-admin-role)
      - [Update project info](#Update-project-info)
      - [Update project phases](#Update-project-phases)
      - [Add a whitelist](#Add-a-whitelist)
      - [Owner mint](#Owner-mint)
      - [Withdraw balance](#Withdraw-balance)
      - [Mint an NFT](#Mint-an-NFT)
    - [Admin](#Admin)
      - [Set doxxed badge](#Set-doxxed-badge)
      - [Remove doxxed badge](#Remove-doxxed-badge)
      - [Set verified badge](#Set-verified-badge)
      - [Remove verified badge](#Remove-verified-badge)
      - [Enable a collection](#Enable-a-collection)
      - [Disable a collection](#Disable-a-collection)
      - [Grant admin to mange the platform](#Grant-admin-to-mange-the-platform)
      - [Check advanced mode collection](#Check-advanced-mode-collection)
      - [Enable a project](#Enable-a-project)
      - [Disable a project](#Disable-a-project)
      - [Lock staking](#Lock-staking)
      - [Add rewards](#Add-rewards)
      - [Start reward distribution](#Start-reward-distribution)
      - [Stop reward distribution](#Stop-reward-distribution)
      - [Unlock staking](#Unlock-staking)
      - [Claim balance](#Claim-balance)

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
### My Collection

```
Test case ID: collection_001
Test case Name: Verify Functionality of My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:

The user should be able to access the My Collection page.
The page should display all collections created by the user.
The collections should be displayed with pagination.
The page should have a Create Collection button.
Each collection should display information including an avatar, volume, royalty percent, and image.
Test Steps:

Login to the NFT marketplace as a registered user.
Navigate to the My Collection page.
Verify that all collections created by the user are displayed on the page.
Verify that the collections are displayed with pagination.
Verify that the page has a Create Collection button.
Select a collection and verify that it displays the collection's information including an avatar, volume, royalty percent, and image.
```
```
Test case ID: collection_002
Test case Name: Verify Pagination Functionality on My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:
  The user should be able to access the My Collection page.
  The page should display all collections created by the user.
  The collections should be displayed with pagination.
  The user should be able to navigate to other pages using the pagination buttons.
Test Steps:

  Login to the NFT marketplace as a registered user.
  Navigate to the My Collection page.
  Verify that all collections created by the user are displayed on the page.
  Verify that the collections are displayed with pagination.
  Select the pagination button to navigate to the next page.
  Verify that the next set of collections is displayed on the page.
```
```
Test case ID: collection_003
Test case Name: Verify Functionality of Collection Royalty on My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:

The user should be able to access the My Collection page.
Each collection should display a royalty percent.
The user should be able to edit the royalty percent for the collection.
Test Steps:

Login to the NFT marketplace as a registered user.
Navigate to the My Collection page.
Select a collection from the list.
Verify that the collection displays a royalty percent.
Select the Edit button for the collection.
Edit the royalty percent for the collection and save the changes.
Verify that the new royalty percent is displayed for the collection.

```
### My Collection
```
Test case ID: mynft_001
Test case Name: Verify Functionality of My NFTs Page with All NFTs
Pre-requisite: User must be logged in and have at least one NFT in their collection.
Expectations:

  The user should be able to access the My NFTs page.
  All NFTs in the user's collection should be displayed.
  The user should be able to view detailed information for each NFT.
Test Steps:

  Login to the NFT marketplace as a registered user.
  Navigate to the My NFTs page.
  Verify that all NFTs in the user's collection are displayed.
  Select an NFT from the list.
  Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```
```
Test case ID: mynft_002
Test case Name: Verify Functionality of My Collected Tab on My NFTs Page
Pre-requisite: User must be logged in and have at least one NFT in their collection.
Expectations:

  The user should be able to access the My NFTs page.
  All NFTs in the user's collection should be displayed.
  The My Collected tab should display only the NFTs the user has collected.
  The user should be able to view detailed information for each NFT.
Test Steps:

  Login to the NFT marketplace as a registered user.
  Navigate to the My NFTs page.
  Select the My Collected tab.
  Verify that only the NFTs the user has collected are displayed.
  Select an NFT from the list.
  Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```

```
Test case ID: mynft_003
Test case Name: Verify Functionality of My Listing Tab on My NFTs Page
Pre-requisite: User must be logged in and have at least one NFT listed for sale.
Expectations:

  The user should be able to access the My NFTs page.
  The My Listing tab should display only the NFTs the user has listed for sale.
  The user should be able to view detailed information for each NFT.
  The user should be able to edit or cancel their listings.
Test Steps:

  Login to the NFT marketplace as a registered user.
  Navigate to the My NFTs page.
  Select the My Listing tab.
  Verify that only the NFTs the user has listed for sale are displayed.
  Select an NFT from the list.
  Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
  Select the Edit or Cancel button for the listing.
  Verify that the user is able to edit or cancel the listing.
```
### My Stakes
```
Test case ID: mystake_001
Test case Name: Verify Functionality of My Stake NFT Page with All Staker NFTs
Pre-requisite: User must be logged in and have at least one staked NFT.
Expectations:

  The user should be able to access the My Stake NFT page.
  All staker NFT collections should be displayed.
  The user should be able to view detailed information for each staker NFT.
  PMP NFT stats should be displayed for the user.
Test Steps:

  Login to the NFT marketplace as a registered user.
  Navigate to the My Stake NFT page.
  Verify that all staker NFT collections are displayed.
  Select a staker NFT from the list.
  Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
  Verify that PMP NFT stats are displayed for the user.
```
```
Test case ID: mystake_002
Test case Name: Verify Functionality of NOT Staked Tab on My Stake NFT Page
Pre-requisite: User must be logged in and have at least one NFT collection with staking available but not staked.
Expectations:

The user should be able to access the My Stake NFT page.
The NOT Staked tab should display only the NFT collections the user has not staked.
The user should be able to view detailed information for each staker NFT.
Test Steps:

Login to the NFT marketplace as a registered user.
Navigate to the My Stake NFT page.
Select the NOT Staked tab.
Verify that only the NFT collections the user has not staked are displayed.
Select a staker NFT from the list.
Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```
```
Test case ID: mystake_003
Test case Name: Verify Functionality of Pending Unstake Tab on My Stake NFT Page
Pre-requisite: User must be logged in and have at least one staked NFT with a pending unstake.
Expectations:

The user should be able to access the My Stake NFT page.
The Pending Unstake tab should display only the NFT collections the user has staked with a pending unstake.
The user should be able to view detailed information for each staker NFT.
Test Steps:

Login to the NFT marketplace as a registered user.
Navigate to the My Stake NFT page.
Select the Pending Unstake tab.
Verify that only the NFT collections the user has staked with a pending unstake are displayed.
Select a staker NFT from the list.
Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation
```
```
Test case ID: mystake_004
Test case Name: Verify refresh data button

Pre-requisite: User is logged in and has staked and unstaked PMP NFTs.

Expectations:

Click on the "Refresh Data" button and verify that the staking details and PMP NFT stats are updated correctly.
Verify that the total number of staked and unstaked PMP NFTs displayed in the corresponding tabs are updated correctly after clicking the "Refresh Data" button.
```
### My Projects
```
Test case ID: myproject_001
Test case Name: Verify display of all created launchpad projects

Pre-requisite: User is logged in and has created at least one launchpad project.

Test steps:

Navigate to the "My Project" page.
Verify that all created launchpad projects are displayed correctly, with the project name, logo, status, and creation date.
Verify that each project has a "Mint NFT" and "Whitelist Address" button.
Expectations:

All created launchpad projects are displayed correctly on the "My Project" page.
Each project has a "Mint NFT" and "Whitelist Address" button.
```
```
Test case ID: myproject_002
Test case Name: Verify "Mint NFT" button functionality

Pre-requisite: User has created a launchpad project and has NFTs to mint.

Test steps:

Navigate to the "My Project" page.
Click on the "Mint NFT" button for a project.
Fill in the required fields in the minting form.
Submit the form.
Verify that the new NFT is created successfully and is visible in the user's wallet.
Expectations:

The minting form is displayed after clicking on the "Mint NFT" button.
The required fields in the minting form are filled correctly.
The new NFT is created successfully and is visible in the user's wallet.
```
```
Test case ID: myproject_003
Test case Name: Verify "Whitelist Address" button functionality

Pre-requisite: User has created a launchpad project and has a list of addresses to whitelist.

Test steps:

Navigate to the "My Project" page.
Click on the "Whitelist Address" button for a project.
Add the required addresses to the whitelist.
Submit the form.
Verify that the addresses are added to the whitelist successfully and are able to participate in the project's launchpad.
Expectations:

The whitelist form is displayed after clicking on the "Whitelist Address" button.
The required addresses are added to the whitelist correctly.
The addresses are added to the whitelist successfully and are able to participate in the project's launchpad.
```

### My Profile
```
Test case ID: myprofile_001
Test case Name: Update user profile information
Pre-requisite: User is logged in and on the update profile modal

Test Steps:

Click on the 'Update Profile' button on the profile page.
Verify that the modal window is displayed with the current user details.
Update the profile image by selecting a new image file from the local system.
Verify that the updated image is displayed in the preview section of the modal.
Update the 'User Name' field with a new valid name.
Verify that the 'User Name' field is updated with the new value.
Update the 'Bio' field with a new valid description.
Verify that the 'Bio' field is updated with the new value.
Update the 'Twitter URL' field with a valid URL.
Verify that the 'Twitter URL' field is updated with the new value.
Update the 'Facebook URL' field with a valid URL.
Verify that the 'Facebook URL' field is updated with the new value.
Update the 'Telegram URL' field with a valid URL.
Verify that the 'Telegram URL' field is updated with the new value.
Update the 'Instagram URL' field with a valid URL.
Verify that the 'Instagram URL' field is updated with the new value.
Click on the 'Save Changes' button.
Verify that the modal is closed and the updated user profile information is displayed on the profile page.
Expectations:

The user should be able to update the profile image with a new image file.
The user should be able to update the 'User Name' field with a new valid name.
The user should be able to update the 'Bio' field with a new valid description.
The user should be able to update the 'Twitter URL' field with a valid URL.
The user should be able to update the 'Facebook URL' field with a valid URL.
The user should be able to update the 'Telegram URL' field with a valid URL.
The user should be able to update the 'Instagram URL' field with a valid URL.
The updated user profile information should be displayed on the profile page after saving the changes.
```
```
Test case ID: myprofile_002
Test case Name: Update user profile with invalid input
Pre-requisite: User is logged in and on the update profile modal

Test Steps:

Click on the 'Update Profile' button on the profile page.
Verify that the modal window is displayed with the current user details.
Try to update the profile image by selecting an invalid file format.
Verify that the 'Invalid File Format' error message is displayed.
Try to update the 'User Name' field with an invalid input (e.g. special characters).
Verify that the 'User Name' field is not updated and an error message is displayed.
Try to update the 'Bio' field with an invalid input (e.g. too long).
Verify that the 'Bio' field is not updated and an error message is displayed.
Try to update the 'Twitter URL' field with an invalid URL.
Verify that the 'Twitter URL' field is not updated and an error message is displayed.
Try to update the 'Facebook URL' field with an invalid URL.
Verify that the 'Facebook URL' field is not updated and an error message is displayed.
Try to update the 'Telegram URL' field with an invalid URL.
Verify that the 'Telegram URL' field is not updated and an error message is displayed.
Try to update the 'Instagram URL' field with an invalid URL.
Verify that the 'Instagram URL' field is not updated and an error message is displayed.
Click on the 'Save Changes' button.
Verify that the modal remains open and no changes are saved.
Expectations:

The user should not be able to update the profile image with an invalid file format.
The user should not be able to update the 'User Name' field with an invalid input.
The user should not be able to update the 'Bio' field with an invalid input.
The user should not be able to update the 'Twitter URL' field with an invalid URL.
The user should not be able to update the 'Facebook URL' field with an invalid URL.
The user should not be able to update the 'Telegram URL' field with an invalid URL.
The user should not be able to update the 'Instagram URL' field with an invalid URL.
The modal should remain open and no changes should be saved if any input is invalid.
```
```
Test case ID: myprofile_003
Test case Name: View user profile
Pre-requisite: User is logged in and on the profile page

Test Steps:

Verify that the user's profile image is displayed on the page.
Verify that the user's User Name is displayed on the page.
Verify that the user's Bio is displayed on the page.
Verify that the 'About' section is displayed on the page.
Verify that the 'Twitter URL' button is displayed and clickable.
Verify that the 'Facebook URL' button is displayed and clickable.
Verify that the 'Telegram URL' button is displayed and clickable.
Verify that the 'Instagram URL' button is displayed and clickable.
Expectations:

The user's profile image should be displayed on the page.
The user's User Name should be displayed on the page.
The user's Bio should be displayed on the page.
The 'About' section should be displayed on the page.
The 'Twitter URL' button should be displayed and clickable.
The 'Facebook URL' button should be displayed and clickable.
The 'Telegram URL' button should be displayed and clickable.
The 'Instagram URL' button should be displayed and clickable.
```
```
Test case ID: myprofile_004
Test case Name: Click 'Twitter URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:

Click on the 'Twitter URL' button.
Verify that the Twitter URL is opened in a new tab.
Expectations:

The Twitter URL should be opened in a new tab.
```
```
Test case ID: myprofile_005
Test case Name: Click 'Facebook URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:

Click on the 'Facebook URL' button.
Verify that the Facebook URL is opened in a new tab.
Expectations:

The Facebook URL should be opened in a new tab.
```
```
Test case ID: myprofile_006
Test case Name: Click 'Telegram URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:

Click on the 'Telegram URL' button.
Verify that the Telegram URL is opened in a new tab.
Expectations:

The Telegram URL should be opened in a new tab.
```
```
Test case ID: myprofile_007
Test case Name: Click 'Instagram URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:

Click on the 'Instagram URL' button.
Verify that the Instagram URL is opened in a new tab.
Expectations:

The Instagram URL should be opened in a new tab.
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

```
Test case ID: Add_a_new_NFT_001
Test case Name: Add a new NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - A collection created in simple mode in MY COLLECTIONS
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTIONS and navigate to the collection to click ADD NFT
  2. Input all information in correct format:
    - NFT Name: within 30 characters
    - Description: within 150 characters
    - Upload an NFT image which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - Add 1 or more properties
      + Add type: within 30 characters
      + Add name: within 30 characters
    - Add 1 or more levels
      + Add type: within 30 characters
      + Add level & max level: in numbers, with level smaller than max level
  3. Click button CREATE AN NFT
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction with an NFT & able to navigate the NFT or edit NFT in MY ACCOUNT \ MY NFTS
  - Balance is deducted gas fee
```

```
Test case ID: Add_a_new_NFT_002
Test case Name: Add a new NFT with 1 or more incorrect data inputs
Pre-requisite: 
  - Connected active account
  - A collection created in simple mode in MY COLLECTIONS
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTIONS and navigate to the collection to click ADD NFT
  2. Input all information which 1 or more inputs in incorrect format:
    - NFT Name: longer than 30 characters
    - Description: longer than 150 characters
    - Upload an NFT image which is of an incorrect format including:
      + bigger than 5MB in size
      + format of file is not: .png, .jpeg., .jpg
    - Add 1 or more properties
      + Add type: longer than 30 characters
      + Add name: longer than 30 characters
    - Add 1 or more levels
      + Add type: longer than 30 characters
      + Add level & max level: not in numbers, or with level bigger than max level
  3. Click button CREATE AN NFT
Expectations: 
  - Receive red note requesting to complete missing step
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

#### Edit an NFT

```
Test case ID: Edit_an_NFT_001
Test case Name: Add a new NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT created in simple mode in MY NFTS
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS and navigate to the NFT to click the icon EDIT NFT
  2. Edit all information in correct format:
    - Edit NFT Name: within 30 characters
    - Edit Description: within 150 characters
    - Re-upload an NFT image which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - Edit 1 or more properties
      + Edit type: within 30 characters
      + Edit name: within 30 characters
    - Edit 1 or more levels
      + Edit type: within 30 characters
      + Edit level & max level: in numbers, with level smaller than max level
  3. Click button UPDATE AN NFT
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction with an edit NFT & able to navigate the NFT or edit NFT in MY ACCOUNT \ MY NFTS
  - Balance is deducted gas fee
```

```
Test case ID: Edit_an_NFT_002
Test case Name: Add a new NFT with 1 or more incorrect data inputs
Pre-requisite: 
  - Connected active account
  - An NFT created in simple mode in MY NFTS
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS and navigate to the NFT to click the icon EDIT NFT
  2. Edit all information which 1 or more inputs in incorrect format:
    - Edit NFT Name: longer than 30 characters
    - Edit Description: longer than 150 characters
    - Re-Upload an NFT image which is of an incorrect format including:
      + bigger than 5MB in size
      + format of file is not: .png, .jpeg., .jpg
    - Edit 1 or more properties
      + Edit type: longer than 30 characters
      + Edit name: longer than 30 characters
    - Edit 1 or more levels
      + Edit type: longer than 30 characters
      + Edit level & max level: not in numbers, or with level bigger than max level
  3. Click button UPDATE AN NFT
Expectations: 
  - Receive red note requesting to complete missing step
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

#### List an NFT

```
Test case ID: List_an_NFT_001
Test case Name: List an NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT created in simple mode or an NFT minted or bought in MY NFTS owned by the wallet but not listed yet
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTED \ MY NFTS and navigate to the NFT
  2. Input the number in number format. Re-check pre-caculated numbers: amount of royal fee, amount of trade fee, amount you will receive after sale
  3. Click button PUSH FOR SALE
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY LISTED
  - Balance is deducted gas fee
```

```
Test case ID: List_an_NFT_002
Test case Name: List an NFT with incorrect data input
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT created in simple mode or an NFT minted or bought in MY NFTS owned by the wallet but not listed yet
Steps: 
  1. Go to MY ACCOUNT \ MY COLLECTED \ MY NFTS and navigate to the NFT
  2. Input the number in other format rather than number format. 
  3. Click button PUSH FOR SALE
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY LISTED
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

#### Cancel listing an NFT

```
Test case ID: Cancel_listing_an_NFT_001
Test case Name: Cancel listing an NFT with all correct data inputs with no bid(s)
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT in MY LISTING
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS \ MY LISTING and navigate to the NFT
  2. Click button CANCEL SALE
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
  - Balance is deducted gas fee
```

```
Test case ID: Cancel_listing_an_NFT_002
Test case Name: Cancel listing an NFT with all correct data inputs with 1 or more bid(s)
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT in MY LISTING
  - Use 1 or more wallets to make bid(s) for the NFT
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS \ MY LISTING and navigate to the NFT
  2. Click button CANCEL SALE
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
  - Balance is deducted gas fee
  - Observe bidders' wallet balance. Bidder(s) can come and claim unsuccessful bid(s) in MY ACCOUNT
```

#### Buy an NFT

```
Test case ID: Buy_an_NFT_001
Test case Name: Buy an NFT with all correct data inputs with no bid(s)
Pre-requisite: 
  - Connected active account with enough balance for NFT list price & gas fee and no bid(s)
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Click button BUY NOW
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
  - Observe the flow of sale: 
    + royalty fee transferred to Creator of the collection
    + trade fee transferred to ArtZero marketplace contract owner
    + (Listed price - royalty fee - trade fee) transferred to the Seller
    + Buyer balance deducted with sale price & gas fee
  - Observe the STATS:
    + Total marketplace volume increases by the listed price
    + The next payout increases by: (Listed price x trade fee x 30%)
```

```
Test case ID: Buy_an_NFT_002
Test case Name: Buy an NFT with all correct data inputs with no bid(s) with low balance for NFT listed price
Pre-requisite: 
  - Connected active account with low balance for NFT listed price
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Click button BUY NOW
Expectations: 
  - Receive pop-up about low balance, thus cannot proceed to sign transaction
```

```
Test case ID: Buy_an_NFT_003
Test case Name: Buy an NFT with all correct data inputs with 1 or more bid(s)
Pre-requisite: 
  - Connected active account with enough balance for NFT listed price & gas fee
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
  - Use 1 or more wallets to make bid(s) for the NFT
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Click button BUY NOW
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
  - Observe the flow of sale: 
    + royalty fee transferred to Creator of the collection
    + trade fee transferred to ArtZero marketplace contract owner
    + (Listed price - royalty fee - trade fee) transferred to the Seller
    + Buyer balance deducted with sale price & gas fee
  - Observe the STATS:
    + Total marketplace volume increases by the listed price
    + The next payout increases by: (Listed price x trade fee x 30%)
  - Observe bidders' wallet balance. Bidder(s) can come and claim unsuccessful bid(s) in MY ACCOUNT
```

#### Make an offer

```
Test case ID: Make_an_offer_to_an_NFT_001
Test case Name: Make an offer to an NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for the offer & gas fee
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Fill the number you want to make and offer & Click button PLACE BID
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the offer in MARKETPLACE \ COLLECTION \ LISTED \ OFFERS or MY ACCOUNT \ MY NFTS \ MY BIDS
  - Balance is deducted with bidded price & gas fee
  - Observe if it is the highest offer, at the card of the NFT in MARKETPLACE \ COLLECTION \ LISTED, the amount of the highest offer is shown under the listed price.
```

```
Test case ID: Make_an_offer_to_an_NFT_002
Test case Name: Make an offer to an NFT with all incorrect data inputs
Pre-requisite: 
  - Connected active account
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Fill the digit in incorrect format:
  - not a number, OR
  - a number less than 0
  & try to lick button PLACE BID
Expectations: 
  - Receive pop-up or red note stating the incorrect format
  - Impossible to process to wallet confirmation page, thus fail to create a collection.
```

```
Test case ID: Make_an_offer_to_an_NFT_003
Test case Name: Make an offer to an NFT with all correct data inputs but low balance for the offer & gas fee
Pre-requisite: 
  - Connected active account with low balance for the offer & gas fee
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Fill the number you want to make and offer & Click button PLACE BID
Expectations: 
  - Receive pop-up about low balance, thus cannot proceed to sign transaction
```

#### Remove an offer

```
Test case ID: Remove_an_offer_to_an_NFT_001
Test case Name: Make an offer to an NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for the offer & gas fee
  - An NFT in a COLLECTION \ LISTED in the MARKETPLACE
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE or MY ACCOUNT \ MY NFTS \ MY BIDS
  2. Click button REMOVE BID
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the offer in MARKETPLACE \ COLLECTION \ LISTED \ OFFERS
  - Balance is increased with bidded price & deducted with gas fee
  - Observe if this bid was the highest offer, at the card of the NFT in MARKETPLACE \ COLLECTION \ LISTED, the amount of the highest offer is either replaced with the next highest offer, or in case there is no other offers, it states "No offers" under the listed price.
```

#### Accept an offer

```
Test case ID: Accept_an_offer_of_an_NFT_001
Test case Name: Accept an offer of an NFT with no bid(s)
Pre-requisite: 
  - Connected active account with enough balance gas fee and no other bid(s)
  - An NFT in MY ACCOUNT \ MY NFTS \ LISTED
Steps: 
  1. Navigate to the NFT in MY ACCOUNT \ MY NFTS \ LISTED \ OFFERS and navigate to the offer you want to accept
  2. Click button ACCEPT OFFER
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the NFT in MY ACCOUNT \ MY NFTS
  - Observe the flow of sale: 
    + royalty fee transferred to Creator of the collection
    + trade fee transferred to ArtZero marketplace contract owner
    + (Accepted offer price - royalty fee - trade fee) transferred to the Seller
    + Buyer balance stays the same since the balance is already deducted with offer price at the time he makes the offer
  - Observe the STATS:
    + Total marketplace volume increases by the accepted offer price
    + The next payout increases by: (Accepted offer price x trade fee x 30%)
```

```
Test case ID: Accept_an_offer_of_an_NFT_003
Test case Name: Accept an offer of an NFT with 1 or more bid(s)
Pre-requisite: 
  - Connected active account with enough balance gas fee and no other bid(s)
  - An NFT in MY ACCOUNT \ MY NFTS \ LISTED
  - Use 1 or more wallets to make bid(s) for the NFT
Steps: 
  1. Navigate to the NFT in MY ACCOUNT \ MY NFTS \ LISTED \ OFFERS and navigate to the offer you want to accept
  2. Click button ACCEPT OFFER
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the NFT in MY ACCOUNT \ MY NFTS
  - Observe the flow of sale: 
    + royalty fee transferred to Creator of the collection
    + trade fee transferred to ArtZero marketplace contract owner
    + (Accepted offer price - royalty fee - trade fee) transferred to the Seller
    + Buyer balance stays the same since the balance is already deducted with offer price at the time he makes the offer
  - Observe the STATS:
    + Total marketplace volume increases by the accepted offer price
    + The next payout increases by: (Accepted offer price x trade fee x 30%)
  - Observe other unsuccessful bidders' wallet balance. Other bidder(s) can come and claim unsuccessful bid(s) in MY ACCOUNT.
```

#### Transfer an NFT

```
Test case ID: Transfer_an_NFT_001
Test case Name: Transfer an NFT with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS \ MY COLLECTED and navigate to the NFT
  2. Insert the right receiver address for Azero (Polkadot js., Subwallet, Nova wallet) & click icon TRANSFER
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the NFT in MY ACCOUNT \ MY NFTS
  - Balance is deducted gas fee
  - Receiver can navidate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
```

```
Test case ID: Transfer_an_NFT_002
Test case Name: Transfer an NFT with incorrect data input
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - An NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS \ MY COLLECTED and navigate to the NFT
  2. Insert the receiver address but not one of Polkadot js., Subwallet, Nova wallet & click icon TRANSFER
Expectations: 
  - Receive pop-up or red note stating the incorrect wallet
  - Impossible to process to wallet confirmation page, thus fail to transfer the NFT
```

#### Lock Metadata of an NFT

```
Test case ID: Lock_metadata_of_an_NFT_001
Test case Name: Lock Metadata of an NFT
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - A collection you created in simple mode and an NFT of that collection in MY ACCOUNT \ MY NFTS \ MY COLLECTED
Steps: 
  1. Go to MY ACCOUNT \ MY NFTS \ MY COLLECTED and navigate to the NFT
  2. Insert the right receiver address for Azero (Polkadot js., Subwallet, Nova wallet) & click icon TRANSFER
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the NFT in MY ACCOUNT \ MY NFTS
  - Balance is deducted gas fee
  - Receiver can navidate the NFT in MY ACCOUNT \ MY NFTS \ MY COLLECTED
```

#### Claim unsuccessful bids

```
Test case ID: Claim_unsuccessful_bids_001
Test case Name: Claim unsuccessful bids
Pre-requisite: 
  - Connected active account with enough balance gas fee
  - Unsuccessful bids (happen when you bid for an NFT but other offer gets accepted, or someone else just buy the listed price)
Steps: 
  1. Navigate to MY ACCOUNT
  2. Click button CLAIM UNSUCCESSFUL BIDS ... AZERO
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the button CLAIM UNSUCCESSFUL BIDS ... AZERO in MY ACCOUNT anymore
  - Balance is increased with the unsuccessful bids and is deducted with gas fee.
```

#### Stake a PMP NFT

```
Test case ID: Stake_an_NFT_001
Test case Name: Stake an NFT
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 20 PMP NFT in MY ACCOUNT \ MY STAKES \ NOT STAKED
  - No PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
Steps: 
  1. Navigate to the NFT in the LISTED tab a COLLECTION in the MARKETPLACE that you want to buy
  2. Click button BUY NOW
Expectations: 
  - Receive pop-up about low balance, thus cannot proceed to sign transaction
```

#### Multi-stake a PMP NFT
#### Unstake a PMP NFT
#### Cancel stake of a PMP NFT
#### Multi-Unstake a PMP NFT
#### Multi-cancel unstake of a PMP NFT
#### Claim earnings from staking

### LaunchPad


> Add more Categories and Test Cases here
      
