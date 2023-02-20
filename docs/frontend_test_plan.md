# Test Plan for ArtZero Frontend

- Table of Contents
  - [Introduction](#introduction)
  - [Test Cases](#test-cases)
    - [Dashboard](#Dashboard)
    - [My Collection](#My-Collection)
    - [My NFT](#My-NFT)
    - [My Collection](#My-Stakes)
    - [My Profile](#My-Profile)
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
      - [Multi-stake PMP NFTs](#Multi-stake-PMP_NFTs)
      - [Unstake a PMP NFT](#Unstake-a-PMP_NFT)
      - [Cancel unstake of a PMP NFT](#Cancel-unstake-of-a-PMP-NFT)
      - [Multi-Unstake PMP NFTs](#Multi-Unstake-PMP_NFTs)
      - [Multi-cancel unstake of PMP NFTs](#Multi-cancel-unstake-of-PMP-NFTs)
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
### My NFT
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
  2. Click on icon Lock Metadata
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the icon Metadata is locked
  - Balance is deducted gas fee
  - When click at the icon locked metadata, a pop-up notices you about metadata is locked and cannot be unlocked.
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
  - 1 PMP NFT in MY ACCOUNT \ MY STAKES \ NOT STAKED
  - No PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
Steps: 
  1. Navigate to a PMP NFT in the MY ACCOUNT \ MY STAKES \ NOT STAKED that you want to stake
  2. Click button STAKE at the PMP NFT
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
  - Observer the Stats in the Staking Dashboard: Trading fee is reduced by 30% compared to the original trading fee.
```

#### Multi-stake PMP NFTs

```
Test case ID: Multi-stake_NFTs_001
Test case Name: Multi-Stake NFTs
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 20 PMP NFT in MY ACCOUNT \ MY STAKES \ NOT STAKED
  - No PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
Steps: 
  1. Navigate to a PMP NFT in the MY ACCOUNT \ MY STAKES \ NOT STAKED that you want to stake
  2. Click to choose 2 or more (max 5) PMP NFTS. A button will appear: STAKE PMP:... (number of PMPs). Click the button.
  3. Fill wallet password & sign transaction.
  4. Repeat the steps 1-2-3 for total number of staked PMP NFTs: 5 - 7 - 9 - 20 PMP NFTs to observe trade fee
Expectations: 
  - Successful transaction & able to navigate PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
  - Observer the Stats in the Staking Dashboard: Trading fee is reduced by 50% - 66% - 80% - 90% compared to the original trading fee when you stake 5 - 7- 9- 20 PMP NFTs in total respectively.
```

#### Unstake a PMP NFT

```
Test case ID: Unstake_an_NFT_001
Test case Name: Unstake an NFT
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 1 PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
Steps: 
  1. Navigate to a PMP NFT in the MY ACCOUNT \ MY STAKES \ STAKED that you want to unstake
  2. Click button REQUEST UNSTAKE at the PMP NFT
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate PMP NFT in MY ACCOUNT \MY STAKES \ PENDING UNSTAKE
  - Observer the Stats in the Staking Dashboard: Trading fee is not reduced by 30% and returned to the original trading fee.
```

#### Cancel unstake of a PMP NFT

```
Test case ID: Cancel Unstake_an_NFT_001
Test case Name: Cancel Unstake an NFT
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 1 PMP NFT in MY ACCOUNT \MY STAKES \ PENDING UNSTAKE
  - No PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
Steps: 
  1. Navigate to a PMP NFT in the MY ACCOUNT \ MY STAKES \ PENDING UNSTAKE that you want to cancel unstake
  2. Click button CANCEL UNSTAKE at the PMP NFT
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate PMP NFT in MY ACCOUNT \MY STAKES \ STAKED
  - Observer the Stats in the Staking Dashboard: Trading fee is reduced by 30% compared to the original trading fee.
```

#### Multi-Unstake PMP NFTs

```
Test case ID: Multi-unstake_NFT_001
Test case Name: Multi-unStake NFTs
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 20 PMP NFT in MY ACCOUNT \ MY STAKES \ STAKED
Steps: 
  1. Navigate to a PMP NFT in the MY ACCOUNT \ MY STAKES \ STAKED that you want to multi-unstake
  2. Click to choose 2 or more (max 5) PMP NFTS. A button will appear: UNSTAKE PMP:... (number of PMPs). Click the button.
  3. Fill wallet password & sign transaction.
  4. Repeat the steps 1-2-3 for total number of staked PMP NFTs: 9 - 7 - 5 - 0 PMP NFTs to observe trade fee
Expectations: 
  - Successful transaction & able to navigate PMP NFT in MY ACCOUNT \MY STAKES \ PENDING UNSTAKE
  - Observer the Stats in the Staking Dashboard: Trading fee is reduced from 90% to 80% - 66% - 50% - 30% - 0% compared to the original trading fee when you unstake from 20 to 9 - 7 - 5 - 0 PMP NFTs in total respectively.
```

#### Multi-cancel unstake of PMP NFT

```
Test case ID: Multi-Cancel Unstake_NFTs_001
Test case Name: Multi-Cancel Unstake an NFT
Pre-requisite: 
  - Connected active account with anough balance for gas fee
  - 2 or more PMP NFT in MY ACCOUNT \MY STAKES \ PENDING UNSTAKE
Steps: 
  1. Navigate to PMP NFTs in the MY ACCOUNT \ MY STAKES \ PENDING UNSTAKE that you want to cancel unstake
  2. Click button CANCEL UNSTAKE at the PMP NFTs
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate PMP NFTs in MY ACCOUNT \MY STAKES \ STAKED
```

#### Claim earnings from staking

```
Test case ID: Claim_earnings_from_staking_001
Test case Name: Claim earnings from staking PMP NFT(s)
Pre-requisite: 
  - Connected active account with enough balance gas fee
  - 1 or more PMP NFT(s) staked
  - Rewards distribution started by Marketplace admin
Steps: 
  1. Navigate to MY ACCOUNT \ GENERAL. Observe the number of total staked PMP NFT(s) and the estimated earnings. 
  2. Click button CLAIM EARNINGS
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction
  - Balance is increased with the earnings and is deducted with gas fee.
  - The reward pool is decreased by the claimed earnings
```

### LaunchPad

#### Create a project

```
Test case ID: Create_a_project_001
Test case Name: Create a project in the launchpad with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for project fee & gas fee
Steps: 
  1. Go to LAUNCHPAD \ CREATE PROJECT
  2. Input all information in correct format
    - Upload 3 images as avatar image, featured image, header image, any of which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - Project Name: within 30 characters
    - Start time - End time: start date, time & end date, time of the project
    - social links in the correct format:
      + Website c
      + Twitter starts with https://twitter.com/ or http://twitter.com/
      + Telegram starts with https://t.me/ or http://t.me/
      + Discord starts with https://discord.com/ or http://discord.com/
    - Project description: within 5000 characters
    - Royalty fee: 
      + turn on if you want to collect royalty fee: insert a number from 0.5% until 5%
      + turn of if you do not want to collect royalty fee
    - Project roadmap: Leave 1 phase or add more milestone(s) including:
      + Milestone name: within 100 characters
      + Milestone description: within 5000 characters
    - Project team member: Leave 1 member or add more member(s) including:
      + Upload avatar image that is not bigger than 5MB in size & format of file is: .png, .jpeg., .jpg
      + Name: within 100 characters
      + Tile: within 100 characters
      + Social link: starts with https://twitter.com/ or http://twitter.com/
    - NFT information: 
      + NFT name: within 100 characters
      + NFT symbol: within 30 characters
      + Total supply: from 1 & must be whole number
    - Sale phase information: Leave 1 phase or add more phase(s) including:
      + Phase name: within 100 characters
      + Start time - End time: start date, time & end date, time of the phase but not overlap other phases' time or project time.
      + Allow public mint:
        > turn off if you only want whitelist for this phase
        > turn on if you want both whitelist mint & public mint
          >> Public minting fee: higher than or equal to 0
          >> Total mint amount: of all phases not higher than total supply and must be a whole number
          >> Max per mint: higher than 0 and must  a whole number
    - Contact information: input your email in an email format
    - Tick 3 boxes: agree to pay Project fee, mint fee, ToS
  3. Click button CREATE PROJECT
  4. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up message from the team
  - Receive email confirming of the success of the project creation
  - Able to navigate the project or edit project in MY ACCOUNT \ MY PROJECTS
  - Balance is deducted with project fee & gas fee
  - Observe the STATS:
    + The next payout increases by: (Project fee x 30%)
```

```
Test case ID: Create_a_project_002
Test case Name: Create a project in the launchpad with 1 or more incorrect data inputs
Pre-requisite: 
  - Connected active account
Steps: 
  1. Go to LAUNCHPAD \ CREATE PROJECT
  2. Input all information that 1 or more are in incorrect format, including:
    - Upload 3 images as avatar image, featured image, header image, any of which is of a incorrect format including:
      + bigger than 5MB in size
      + format of file is not: .png, .jpeg., .jpg
    - Project Name: longer than 30 characters
    - Start time - End time: start date, time & end date, time of the project that end time happens before start time or underlaps any phase
    - social links in the correct format:
      + Website not starts with https:// or http://
      + Twitter nots tarts with https://twitter.com/ or http://twitter.com/
      + Telegram not starts with https://t.me/ or http://t.me/
      + Discord not starts with https://discord.com/ or http://discord.com/
    - Project description: longer than 5000 characters
    - Royalty fee: turn on & insert a number that is less than 0%
    - Project roadmap: Leave 1 phase or add more milestone(s) including:
      + Milestone name: longer than 100 characters
      + Milestone description: longer than 5000 characters
    - Project team member: Leave 1 member or add more member(s) including:
      + Upload avatar image that is bigger than 5MB in size & format of file is not: .png, .jpeg., .jpg
      + Name: longer than 100 characters
      + Tile: longer than 100 characters
      + Social link: not starts with https:// or http://
    - NFT information: 
      + NFT name: longer than 100 characters
      + NFT symbol: longer than 30 characters
      + Total supply: less than 1 or is not a whole number
    - Sale phase information: Leave 1 phase or add more phase(s) including:
      + Phase name: longer than 100 characters
      + Start time - End time: start date, time & end date, time of the phase but overlap other phases' time or project time.
      + Allow public mint: 
        > in case of turn on if you want both whitelist mint & public mint
          >> Public minting fee: less than 0
          >> Total mint amount: of all phases higher than total supply or not a whole number
          >> Max per mint: less than 0 or not a whole number
    - Contact information: not in an email format
    - Tick 3 boxes: not tick any of the boxes to agree to pay Project fee, mint fee, ToS
  3. Click button CREATE PROJECT
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to create a project.
```

#### Update art location

```
Test case ID: Update_art-location_001
Test case Name: Update art location of a project
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - Upload artworks & metadata of the artworks and get their ipfs link
Steps: 
  1. Navigate the project in MY ACCOUNT \ MY PROJECT
  2. Click button UPDATE ART LOCATION
  3. Fill the link starts with ipfs://
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & when NFTs are minted (and already cached), artworks are fetched both in the project in the Launchpad or in the collection
  - Balance is deducted gas fee
```

```
Test case ID: Update_art-location_002
Test case Name: Update art location of a project
Pre-requisite: 
  - Connected active account
Steps: 
  1. Navigate the project in MY ACCOUNT \ MY PROJECT
  2. Click button UPDATE ART LOCATION
  3. Fill the link but not starts with ipfs://
  4. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to update art location.
```

#### Grant admin role

```
Test case ID: Grant_an_admin_role_001
Test case Name: Grant an admin role to a project with all correct data inputs
Pre-requisite: 
  - Connected active account with enough balance for gas fee
  - A project in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Insert the right address for Azero (Polkadot js., Subwallet, Nova wallet) & click icon SUBMIT
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction
  - Balance is deducted with gas fee
  - Granted address can navidate the project in MY ACCOUNT \ MY PROJECT and carry out some actions as edit phases, edit project information, add whitelist
```

```
Test case ID: Grant_an_admin_role_002
Test case Name: Grant an admin role to a project with incorrect data inputs
Pre-requisite: 
  - Connected active account
  - An project in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Insert the wrong format address for Azero (Polkadot js., Subwallet, Nova wallet) & click icon SUBMIT
Expectations: 
  - Receive pop-up or red note stating the incorrect wallet
  - Impossible to process to wallet confirmation page, thus fail to grant the admin role
```

#### Update project info
```
Test case ID: Update_a_project_001
Test case Name: Update a project in the launchpad with all correct data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Input all information in correct format
    - Upload 3 images as avatar image, featured image, header image, any of which is of a correct format including:
      + not bigger than 5MB in size
      + format of file is: .png, .jpeg., .jpg
    - Project Name: within 30 characters
    - Start time - End time: start date, time & end date, time of the project in case project has not started. If project has started, it is impossible to update
    - social links in the correct format:
      + Website starts with https:// or http://
      + Twitter starts with https://twitter.com/ or http://twitter.com/
      + Telegram starts with https://t.me/ or http://t.me/
      + Discord starts with https://discord.com/ or http://discord.com/
    - Project description: within 5000 characters
    - Project roadmap: Update 1 phase or delete or add more milestone(s) including:
      + Milestone name: within 100 characters
      + Milestone description: within 5000 characters
    - Project team member: Leave 1 member or delete or add more member(s) including:
      + Upload avatar image that is not bigger than 5MB in size & format of file is: .png, .jpeg., .jpg
      + Name: within 100 characters
      + Tile: within 100 characters
      + Social link: starts with https://twitter.com/ or http://twitter.com/
  3. Click button UPDATE PROJECT
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction& able to navigate the project update or edit project in MY ACCOUNT \ MY PROJECTS
  - Balance is deducted with gas fee
```

```
Test case ID: Update_a_project_002
Test case Name: Update a project in the launchpad with incorrect data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Input all information, 1 or more of which is in incorrect format
    - Upload 3 images as avatar image, featured image, header image, any of which is of a incorrect format including:
      + bigger than 5MB in size
      + format of file is not: .png, .jpeg., .jpg
    - Project Name: longer than 30 characters
    - Start time - End time: start date, time & end date, time of the project that end date begins before start date or project time underlaps phases time in case project has not started. If project has started, it is impossible to update
    - social links in the correct format:
      + Website not starts with https:// or http://
      + Twitter not starts with https://twitter.com/ or http://twitter.com/
      + Telegram not starts with https://t.me/ or http://t.me/
      + Discord not starts with https://discord.com/ or http://discord.com/
    - Project description: longer than 5000 characters
    - Project roadmap: Update 1 phase or delete or add more milestone(s) including:
      + Milestone name: longer than 100 characters
      + Milestone description: longer than 5000 characters
    - Project team member: Leave 1 member or delete or add more member(s) including:
      + Upload avatar image that is  bigger than 5MB in size & format of file is not: .png, .jpeg., .jpg
      + Name: longer than 100 characters
      + Tile: longer than 100 characters
      + Social link: not starts with https://twitter.com/ or http://twitter.com/
  3. Click button UPDATE PROJECT
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to update a project.
```

#### Update project phases

```
Test case ID: Update_a_project_phases_001
Test case Name: Update a project phases in the launchpad with all correct data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Input all information in correct format
    - Sale phase information: If a phase has started, you cannot edit that phase. Leave 1 phase or add more phase(s) including:
      + Phase name: within 100 characters
      + Start time - End time: start date, time & end date, time of the phase but not overlap other phases' time or project time. 
      + Allow public mint:
        > turn off if you only want whitelist for this phase
        > turn on if you want both whitelist mint & public mint
          >> Public minting fee: higher than or equal to 0
          >> Total mint amount: of all phases not higher than total supply and must be a whole number
          >> Max per mint: higher than 0 and must  a whole number
  3. Click button UPDATE PHASE or ADD PHASE or DELETE PHASE
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the project with updated phases in MY ACCOUNT \ MY PROJECTS
  - Balance is deducted with gas fee
```

```
Test case ID: Update_a_project_phases_002
Test case Name: Update a project phases in the launchpad with 1 or more incorrect data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Input all information in correct format
    - Sale phase information: If a phase has started, you cannot edit that phase. Leave 1 phase or add more phase(s) including:
      + Phase name: within 100 characters
      + Start time - End time: start date, time & end date, with end time begins before start time or time of the phase but overlap other phases' time or project time. 
      + Allow public mint:
        > turn off if you only want whitelist for this phase
        > turn on if you want both whitelist mint & public mint
          >> Public minting fee: less than 0
          >> Total mint amount: of all phases is higher than total supply or is not a whole number
          >> Max per mint: less than 0 or is not a whole number
  3. Click button UPDATE PHASE or ADD PHASE or DELETE PHASE
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to update .
```

#### Add a whitelist

```
Test case ID: Add_a_whitelist_001
Test case Name: Add a whitelist with all correct data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT
  2. Click on button WHITELIST MANAGEMENT
  3. Choose project & Choose phase. If phase has ended, you cannot add whitelist or make any change of the whitelist.
   - In the Add whitelist box, insert the right address for Azero (Polkadot js., Subwallet, Nova wallet)
   - In the price box, insert a number higher than or equal to 0
   - In the amount box, insert a number higher than or equal to 0 and must be a whole number
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & balance is deducted with gas fee
  - Address, price, amount is displayed in the column in the right.
  - If the address added is already added previously, newly added information will overwright the old one.
```

```
Test case ID: Add_a_whitelist_002
Test case Name: Add a whitelist with 1 or more incorrect data inputs
Pre-requisite: 
  - Connected active project owner account or admin account by the owner account
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT
  2. Click on button WHITELIST MANAGEMENT
  3. Choose project & Choose phase. If phase has ended, you cannot add whitelist or make any change of the whitelist. Insert 1 or more incorrect information below:
   - In the Add whitelist box, insert the right address but not for Azero (Polkadot js., Subwallet, Nova wallet); or
   - In the price box, insert a number less than 0; or
   - In the amount box, insert a number less than 0 or is not a whole number
Expectations: 
   - Receive pop-up warning or red note about the wrong format
   - Impossible to process to wallet confirmation page, thus fail to add whitelist.
```

#### Owner mint

```
Test case ID: Owner_mint_001
Test case Name: Owner mint with all correct data inputs
Pre-requisite: 
  - Connected active project owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT. A dashboard will appear to show you the maximum number of NFTs you can Owner mint. 
  2. Insert the number in the box that is higher than 0 and must be a whole number
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & balance is deducted with gas fee
  - Dashboard will adjust number with number the you can owner mint deducted by the amount you have just minted.
```

```
Test case ID: Owner_mint_002
Test case Name: Owner mint with incorrect data inputs
Pre-requisite: 
  - Connected active project owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT. A dashboard will appear to show you the maximum number of NFTs you can Owner mint. 
  2. Insert the number in the box that is less than 0 or is not a whole number
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to owner mint
```

#### Withdraw balance

```
Test case ID: Withdraw_balance_001
Test case Name: Withdraw balance earned from sales of an owner account with all correct inserted information
Pre-requisite: 
  - Connected active project owner account with enough balance for gas fee
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Click on button WITHDRAW BALANCE. A number of revenue will be displayed.
  3. Fill in a number that is higher than 0, and less than or equal to the revenue displayed, or simply click on MAX button.
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & balance is deducted with gas fee and increased with the number you have withdrawn
```

```
Test case ID: Withdraw_balance_002
Test case Name: Withdraw balance earned from sales of an owner account with 1 or more incorrect inserted information
Pre-requisite: 
  - Connected active project owner account
  - A project created in MY ACCOUNT \ MY PROJECT
Steps: 
  1. Go to MY ACCOUNT \ MY PROJECT and navigate to the project
  2. Click on button WITHDRAW BALANCE. A number of revenue will be displayed.
  3. Fill in a number that is less than 0, or hight than the revenue displayed
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to withdraw balance.
```

#### Mint an NFT
```
Test case ID: Mint_an_NFT_001
Test case Name: Mint an NFT with all correct inserted information
Pre-requisite: 
  - Connected active account with enough balance for NFT mint price & gas fee
  - A project with a phase active for minting
Steps: 
  1. Go to LAUNCHPAD and navigate to the project. Look at the number of whitelist NFTs you are allowed to mint. If there is whitelist NFT, you will mint from whitelist first (with 0 mint price or lower mint price than public mint price). Then you will mint from public mint.
  2. Fill in a number that is higher than 0, and must be a whole number, click MINT 
  4. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & balance is deducted with gas fee and total mint price x number of NFTs minted.
  - Observe the STATS:
    + The next payout increases by: (Total mint cost x Launchpad mint  x 30%)
```

```
Test case ID: Mint_an_NFT_002
Test case Name: Mint an NFT with incorrect inserted information
Pre-requisite: 
  - Connected active account
  - A project with a phase active for minting
Steps: 
  1. Go to LAUNCHPAD and navigate to the project. Look at the number of whitelist NFTs you are allowed to mint. If there is whitelist NFT, you will mint from whitelist first (with 0 mint price or lower mint price than public mint price). Then you will mint from public mint.
  2. Fill in a number that is les than 0, or  a whole number, click MINT 
  4. Fill wallet password & sign transaction
Expectations: 
  - Receive pop-up warning or red note about the wrong format
  - Impossible to process to wallet confirmation page, thus fail to mint.
```

### Admin

#### Set doxxed badge

```
Test case ID: Set_doxxed_badge_for_a_collection_001
Test case Name: Set doxxed badge for a collection or a project
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to set Doxxed badge
  2. Click on icon SET DOXXED YES
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the icon DOXXED in the collection featured image
  - Balance is deducted with gas fee
```

#### Remove doxxed badge

```
Test case ID: Remove_doxxed_badge_for_a_collection_001
Test case Name: Remove doxxed badge for a collection or a project
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created and set Doxxed before
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to Remove Doxxed badge
  2. Click on icon REMOVE DOXXED
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the icon DOXXED in the collection featured image
  - Balance is deducted with gas fee
```

#### Set verified badge

```
Test case ID: Set_verified_badge_for_a_collection_001
Test case Name: Set verified badge for a collection or a project
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to set Verified badge
  2. Click on icon SET VERIFIED YES
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & able to navigate the icon VERIFIED in the collection featured image
  - Balance is deducted with gas fee
```

#### Remove verified badge

```
Test case ID: Remove_verified_badge_for_a_collection_001
Test case Name: Remove verified badge for a collection or a project
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created and set verified before
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to Remove verified badge
  2. Click on icon REMOVE VERIFIED
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & unable to navigate the icon VERIFIED in the collection featured image
  - Balance is deducted with gas fee
```

#### Enable a collection

```
Test case ID: Enable_a_collection_001
Test case Name: Enable a collection
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to enable
  2. Click on icon ENABLE
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & the collection is visible in MARKETPLACE
  - Balance is deducted with gas fee
```

#### Disable a collection

```
Test case ID: Disable_a_collection_001
Test case Name: Disable a collection
Pre-requisite: 
  - Connected marketplace owner account with enough balance for gas fee
  - A collection is created and enabled before
Steps: 
  1. Go to ADMIN page and go to tab MANAGE COLLECTION and navigate to the collection you want to disable
  2. Click on icon DISABLE
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction & the collection is not visible anymore in MARKETPLACE
  - Balance is deducted with gas fee
```

#### Grant admin to mange the platform

```
Test case ID: Grant_an_admin_role_of_the_platform_001
Test case Name: Grant an admin role to manage the marketplace with all correct data inputs
Pre-requisite: 
  - Connected marketplace ower active account with enough balance for gas fee
Steps: 
  1. Go to ADMIN page
  2. Insert the right address in the Grant Admin role box for Azero (Polkadot js., Subwallet, Nova wallet) & click icon SUBMIT
  3. Fill wallet password & sign transaction
Expectations: 
  - Successful transaction
  - Balance is deducted with gas fee
  - Granted address can carry out some actions to manage the Admin page but not to claim balance.
```

```
Test case ID: Grant_an_admin_role_of_the_platform_002
Test case Name: Grant an admin role to manage the marketplace with incorrect data inputs
Pre-requisite: 
  - Connected marketplace ower active account with enough balance for gas fee
Steps: 
  1. Go to ADMIN page
  2. Insert the right address in the Grant Admin role box but not for Azero (Polkadot js., Subwallet, Nova wallet) & click icon SUBMIT
Expectations: 
  - Receive pop-up or red note stating the incorrect wallet
  - Impossible to process to wallet confirmation page, thus fail to grant the admin role
```

#### Check advanced mode collection

```
Test case ID: Check_advanced_mode_collection_001
Test case Name: Check advanced mode collection with all correct data inputs
Pre-requisite: 
  - Connected marketplace ower active account with enough balance for gas fee
Steps: 
  1. Go to ADMIN page, navigate to CHECK ADVANCED MODE COLLECTION
  2. Insert the right address of an advanced mode collection in the box. 
  3. Press button SUBMIT.
Expectations: 
  - If it is not the right address of an advanced mode, information of it will be displayed. Otherwise, a warning will be returned saying "There is no collection for this address"
```

#### Enable a project
```
Test Case ID: project_001
Test Case Name: Enable Project in Project List

Pre-requisite:

User has admin access to the NFT marketplace.
User is logged in to the admin page.
There is at least one disabled project in the Project List.
Test Steps:

Navigate to the Project Management tab on the admin page.
Verify that the Project List is displayed with all projects, including any disabled ones.
Locate the disabled project that you want to enable.
Click on the "Enable" button next to the disabled project.
Verify that a confirmation message appears asking if you are sure you want to enable the project.
Click on the "Yes" button to confirm enabling the project.
Verify that the project is now enabled and visible in the Project List.
Verify that the "Enable" button is replaced by a "Disable" button for the enabled project.
Expectations:

The disabled project should be successfully enabled and visible in the Project List.
The "Enable" button should be replaced by a "Disable" button for the enabled project.
```

#### Disable a project
```
Test Case ID: project_002
Test Case Name: Disable Project in Project List

Pre-requisite:

User has admin access to the NFT marketplace.
User is logged in to the admin page.
There is at least one enabled project in the Project List.
Test Steps:

Navigate to the Project Management tab on the admin page.
Verify that the Project List is displayed with all projects, including any enabled ones.
Locate the enabled project that you want to disable.
Click on the "Disable" button next to the enabled project.
Verify that a confirmation message appears asking if you are sure you want to disable the project.
Click on the "Yes" button to confirm disabling the project.
Verify that the project is now disabled and no longer visible in the Project List.
Verify that the "Disable" button is replaced by an "Enable" button for the disabled project.
Expectations:

The enabled project should be successfully disabled and no longer visible in the Project List.
The "Disable" button should be replaced by an "Enable" button for the disabled project.
```
#### Lock staking
```
Test Case ID: staking_reward_001
Test Case Name: Lock Staking 

Pre-requisite:

User has admin access to the NFT marketplace.
User is logged in to the admin page.
The Staking Contract Control tab is accessible.
There is at least one staking contract created in the NFT marketplace.
Test Steps:

Navigate to the Staking Contract Control tab on the admin page.
Verify that the list of staking contracts is displayed.
Locate the staking contract that you want to lock.
Click on the "Lock" button next to the staking contract.
Verify that a confirmation message appears asking if you are sure you want to lock the staking contract.
Click on the "Yes" button to confirm locking the staking contract.
Verify that the staking contract is now locked.
Click on the "Sign Transaction" button next to the locked staking contract.
Verify that a confirmation message appears asking if you are sure you want to sign the transaction.
Click on the "Yes" button to confirm signing the transaction.
Expectations:

The staking contract should be successfully locked.
The "Sign Transaction" button should be available for the locked staking contract.
The confirmation message for locking and signing the transaction should be displayed.
The transaction should be successfully signed and processed.
```
#### Add rewards
```
Test Case ID: staking_reward_002
Test Case Name: Add Rewards

Pre-requisite:

User has admin access to the NFT marketplace.
User is logged in to the admin page.
The Staking Contract Control tab is accessible.
There is at least one staking contract created in the NFT marketplace.
The staking contract is not locked.
Test Steps:

Navigate to the Staking Contract Control tab on the admin page.
Verify that the list of staking contracts is displayed.
Locate the staking contract that you want to add a reward to.
Click on the "Reward Contribution" button next to the staking contract.
Verify that the "Add Reward" modal appears.
Enter the amount of reward to add in the input field.
Click on the "Add Reward" button.
Verify that a confirmation message appears asking if you are sure you want to add the reward to the staking contract.
Click on the "Yes" button to confirm adding the reward.
Verify that the reward has been added to the staking contract.
Click on the "Sign Transaction" button next to the staking contract.
Verify that a confirmation message appears asking if you are sure you want to sign the transaction.
Click on the "Yes" button to confirm signing the transaction.
Expectations:

The "Reward Contribution" button should be available for the staking contract.
The "Add Reward" modal should appear when the button is clicked.
The input field for the reward amount should be available and accepts only numeric input.
The confirmation message for adding the reward and signing the transaction should be displayed.
The reward should be successfully added to the staking contract.
The transaction should be successfully signed and processed.
```
#### Start reward distribution
```
Test case ID: staking_reward_003
Test case Name: Start reward distribution
Pre-requisite: Admin is logged in and has access to the STAKING CONTRACT CONTROL tab in the admin page.

Test Steps:

Navigate to the STAKING CONTRACT CONTROL tab in the admin page.
Look for the Reward Contribution section.
Click on the Start Distribution button.
Verify that a confirmation modal pops up.
Click on the Confirm button.
Verify that a success message appears confirming that the reward distribution has been started.
Verify that the Start Distribution button is disabled.
Expectations:

The reward distribution should start successfully.
A confirmation modal should pop up to confirm the action.
A success message should appear confirming that the reward distribution has been started.
The Start Distribution button should be disabled after starting the reward distribution.
```
#### Stop reward distribution
```
Test case ID: staking_reward_004
Test case Name: Disable reward distribution
Pre-requisite: Admin is logged in and has access to the STAKING CONTRACT CONTROL tab in the admin page.

Test Steps:

Navigate to the STAKING CONTRACT CONTROL tab in the admin page.
Look for the Reward Contribution section.
Click on the Disable Distribution button.
Verify that a confirmation modal pops up.
Click on the Confirm button.
Verify that a success message appears confirming that the reward distribution has been disabled.
Verify that the Disable Distribution button is disabled.
Verify that the Start Distribution button is enabled.
Expectations:

The reward distribution should be disabled successfully.
A confirmation modal should pop up to confirm the action.
A success message should appear confirming that the reward distribution has been disabled.
The Disable Distribution button should be disabled after disabling the reward distribution.
The Start Distribution button should be enabled after disabling the reward distribution.
```
#### Unlock staking
```
Test case ID: staking_reward_005
Test case Name: Unlock staking
Pre-requisite: Admin is logged in and has access to the STAKING CONTRACT CONTROL tab in the admin page.

Test Steps:

Navigate to the STAKING CONTRACT CONTROL tab in the admin page.
Look for the Staking Control section.
Click on the Unlock Staking button.
Verify that a confirmation modal pops up.
Click on the Confirm button.
Verify that a success message appears confirming that the staking has been unlocked.
Verify that the Unlock Staking button is disabled.
Verify that the Lock Staking button is enabled.
Expectations:

The staking should be unlocked successfully.
A confirmation modal should pop up to confirm the action.
A success message should appear confirming that the staking has been unlocked.
The Unlock Staking button should be disabled after unlocking the staking.
The Lock Staking button should be enabled after unlocking the staking.
```
#### Claim balance
```
Test case ID: staking_reward_006
Test case Name: Verify the Claim balance feature in the reward contribution tab
Pre-requisite: User should have a connected wallet to sign the transaction in the blockchain.

Steps to be executed:

Navigate to the Admin page and click on the Reward Contribution tab.
Check if the Claim balance button is available on the screen.
Click on the Claim balance button and confirm the transaction with the connected wallet.
Check if the transaction is successfully completed by verifying the transaction hash or balance updated in the wallet.
Expectations:

The Claim balance button should be available on the screen.
On clicking the Claim balance button, a prompt to sign the transaction should appear.
On signing the transaction, the balance should be claimed successfully and should be reflected in the connected wallet.
On verifying the transaction hash, the transaction should be successful, and the balance should be updated in the connected wallet.
```

> Add more Categories and Test Cases here
      
