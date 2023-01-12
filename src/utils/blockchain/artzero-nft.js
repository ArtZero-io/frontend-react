const artzero_nft = {
  CONTRACT_ADDRESS: "5DsTndtehokTZt2sP3EVRdEAGuKUD9rreGC483EXpyHkQNAL",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x66c5352ad353e258009186352e9b35a91b1e1e8d006a6711a87f2ebcd4c54248",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "launchpad_psp34_nft_standard",
      "version": "1.0.0",
      "authors": [
        "ArtZero <admin@artzero.io>"
      ]
    },
    "V3": {
      "spec": {
        "constructors": [
          {
            "args": [
              {
                "label": "launchpad_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "limit_phase_count",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "contract_owner",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "total_supply",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "project_info",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 55
                }
              },
              {
                "label": "code_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 56
                }
              },
              {
                "label": "is_public_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 57
                }
              },
              {
                "label": "public_minting_fee_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 58
                }
              },
              {
                "label": "public_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "public_max_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "start_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "end_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              }
            ],
            "docs": [],
            "label": "new",
            "payable": false,
            "selector": "0x9bae9d5e"
          }
        ],
        "docs": [],
        "events": [],
        "messages": [
          {
            "args": [
              {
                "label": "phase_code",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 55
                }
              },
              {
                "label": "is_public",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 43
                }
              },
              {
                "label": "public_minting_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "public_minting_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "public_max_minting_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "start_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 5
                }
              },
              {
                "label": "end_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              "Add new phare"
            ],
            "label": "add_new_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0x72bcb3cf"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "whitelist_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "whitelist_price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Update whitelist - Only Admin Role can change"
            ],
            "label": "update_whitelist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xe32d5d92"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "whitelist_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "whitelist_price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Add new whitelist - Only Admin Role can change"
            ],
            "label": "add_whitelist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xcc9972d4"
          },
          {
            "args": [
              {
                "label": "mint_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              "Only Owner can mint new token"
            ],
            "label": "mint",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xcfdd9aa2"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "mint_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [],
            "label": "public_mint",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xf5331a91"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "mint_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Whitelisted User eates multiple"
            ],
            "label": "whitelist_mint",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0x2e50fe5f"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              " Deactive Phase - Only Admin Role can change"
            ],
            "label": "deactive_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xc8066cce"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "phase_code",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 55
                }
              },
              {
                "label": "is_public",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 43
                }
              },
              {
                "label": "public_minting_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "public_minting_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "public_max_minting_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              },
              {
                "label": "start_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 5
                }
              },
              {
                "label": "end_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Update phase schedule - Only Admin Role can change"
            ],
            "label": "update_schedule_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0xe7c56b96"
          },
          {
            "args": [
              {
                "label": "id_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 7
                }
              },
              {
                "label": "code_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 56
                }
              },
              {
                "label": "is_public_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 57
                }
              },
              {
                "label": "public_minting_fee_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 58
                }
              },
              {
                "label": "public_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "public_max_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "start_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              },
              {
                "label": "end_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 59
                }
              }
            ],
            "docs": [],
            "label": "update_schedule_phases",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 60
            },
            "selector": "0x7b2a806c"
          },
          {
            "args": [
              {
                "label": "project_info",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 55
                }
              }
            ],
            "docs": [
              " Edit project information  - Only Admin Role can change"
            ],
            "label": "edit_project_information",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 64
            },
            "selector": "0x05a37bb7"
          },
          {
            "args": [],
            "docs": [
              " Get owner claimed amount"
            ],
            "label": "get_owner_claimed_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0xe56ba18e"
          },
          {
            "args": [],
            "docs": [
              " Get owner available amount"
            ],
            "label": "get_owner_available_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x6aaafa92"
          },
          {
            "args": [],
            "docs": [
              " Get limit phase count"
            ],
            "label": "get_limit_phase_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u8"
              ],
              "type": 2
            },
            "selector": "0xa7a30065"
          },
          {
            "args": [],
            "docs": [
              " Get public minted count"
            ],
            "label": "get_public_minted_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x71b62650"
          },
          {
            "args": [],
            "docs": [
              " Get limit phase count"
            ],
            "label": "get_project_info",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Vec"
              ],
              "type": 7
            },
            "selector": "0x9439195c"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              " Get Phase Schedule by Phase Id"
            ],
            "label": "get_phase_schedule_by_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 65
            },
            "selector": "0x0015cfc2"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              " Get whitelist information by phase code"
            ],
            "label": "get_whitelist_by_account_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 66
            },
            "selector": "0xfcaa85cb"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "account_index",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Get phase Account Link"
            ],
            "label": "get_phase_account_link",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 8
            },
            "selector": "0xbd348340"
          },
          {
            "args": [],
            "docs": [
              " Get current phase"
            ],
            "label": "get_current_phase",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 67
            },
            "selector": "0x645c00bb"
          },
          {
            "args": [
              {
                "label": "time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Check time in a phase"
            ],
            "label": "is_in_schedule_phase",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 67
            },
            "selector": "0x0852eb48"
          },
          {
            "args": [],
            "docs": [
              " Get Whitelist Count"
            ],
            "label": "get_whitelist_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x881eeb32"
          },
          {
            "args": [],
            "docs": [
              "Get phase Count"
            ],
            "label": "get_last_phase_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u8"
              ],
              "type": 2
            },
            "selector": "0xb077d60d"
          },
          {
            "args": [],
            "docs": [
              "Get active phase count"
            ],
            "label": "get_active_phase_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u8"
              ],
              "type": 2
            },
            "selector": "0x8f485a88"
          },
          {
            "args": [],
            "docs": [
              "Get Token Count"
            ],
            "label": "get_last_token_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x41e2a4d7"
          },
          {
            "args": [
              {
                "label": "account_id",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              },
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              "Get Phase Account Public Claimed Amount"
            ],
            "label": "get_phase_account_public_claimed_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 68
            },
            "selector": "0x4b348bab"
          },
          {
            "args": [
              {
                "label": "phase_id",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              "Get Phase Account Last Index by Phase Id"
            ],
            "label": "get_phase_account_last_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0xae98a70a"
          },
          {
            "args": [],
            "docs": [
              "Get Total Supply"
            ],
            "label": "get_total_supply",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0xb079adab"
          },
          {
            "args": [],
            "docs": [
              "Get Available Token Amount"
            ],
            "label": "get_available_token_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x95a79e40"
          },
          {
            "args": [],
            "docs": [
              " Leaves the contract without owner. It will not be possible to call",
              " owner's functions anymore. Can only be called by the current owner.",
              "",
              " NOTE: Renouncing ownership will leave the contract without an owner,",
              " thereby removing any functionality that is only available to the owner.",
              "",
              " On success a `OwnershipTransferred` event is emitted.",
              "",
              " # Errors",
              "",
              " Panics with `CallerIsNotOwner` error if caller is not owner"
            ],
            "label": "Ownable::renounce_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "RenounceOwnershipOutput"
              ],
              "type": 69
            },
            "selector": "0x5e228753"
          },
          {
            "args": [],
            "docs": [
              " Returns the address of the current owner."
            ],
            "label": "Ownable::owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "OwnerOutput"
              ],
              "type": 8
            },
            "selector": "0x4fa43c8c"
          },
          {
            "args": [
              {
                "label": "new_owner",
                "type": {
                  "displayName": [
                    "ownable_external",
                    "TransferOwnershipInput1"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Transfers ownership of the contract to a `new_owner`.",
              " Can only be called by the current owner.",
              "",
              " On success a `OwnershipTransferred` event is emitted.",
              "",
              " # Errors",
              "",
              " Panics with `CallerIsNotOwner` error if caller is not owner.",
              "",
              " Panics with `NewOwnerIsZero` error if new owner's address is zero."
            ],
            "label": "Ownable::transfer_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "TransferOwnershipOutput"
              ],
              "type": 69
            },
            "selector": "0x11f43efd"
          },
          {
            "args": [],
            "docs": [
              " Returns the collection `Id` of the NFT token.",
              "",
              " This can represents the relationship between tokens/contracts/pallets."
            ],
            "label": "PSP34::collection_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "CollectionIdOutput"
              ],
              "type": 1
            },
            "selector": "0xffa27a5f"
          },
          {
            "args": [
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "OwnerOfInput1"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [
              " Returns the owner of the token if any."
            ],
            "label": "PSP34::owner_of",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "OwnerOfOutput"
              ],
              "type": 19
            },
            "selector": "0x1168624d"
          },
          {
            "args": [
              {
                "label": "owner",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "BalanceOfInput1"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Returns the balance of the owner.",
              "",
              " This represents the amount of unique tokens the owner has."
            ],
            "label": "PSP34::balance_of",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "BalanceOfOutput"
              ],
              "type": 4
            },
            "selector": "0xcde7e55f"
          },
          {
            "args": [
              {
                "label": "to",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "TransferInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "TransferInput2"
                  ],
                  "type": 1
                }
              },
              {
                "label": "data",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "TransferInput3"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Transfer approved or owned token from caller.",
              "",
              " On success a `Transfer` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `TokenNotExists` error if `id` does not exist.",
              "",
              " Returns `NotApproved` error if `from` doesn't have allowance for transferring.",
              "",
              " Returns `SafeTransferCheckFailed` error if `to` doesn't accept transfer."
            ],
            "label": "PSP34::transfer",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "TransferOutput"
              ],
              "type": 70
            },
            "selector": "0x3128d61b"
          },
          {
            "args": [
              {
                "label": "owner",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "AllowanceInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "operator",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "AllowanceInput2"
                  ],
                  "type": 8
                }
              },
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "AllowanceInput3"
                  ],
                  "type": 14
                }
              }
            ],
            "docs": [
              " Returns `true` if the operator is approved by the owner to withdraw `id` token.",
              " If `id` is `None`, returns `true` if the operator is approved to withdraw all owner's tokens."
            ],
            "label": "PSP34::allowance",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "AllowanceOutput"
              ],
              "type": 43
            },
            "selector": "0x4790f55a"
          },
          {
            "args": [],
            "docs": [
              " Returns current NFT total supply."
            ],
            "label": "PSP34::total_supply",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "TotalSupplyOutput"
              ],
              "type": 6
            },
            "selector": "0x628413fe"
          },
          {
            "args": [
              {
                "label": "operator",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "ApproveInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "ApproveInput2"
                  ],
                  "type": 14
                }
              },
              {
                "label": "approved",
                "type": {
                  "displayName": [
                    "psp34_external",
                    "ApproveInput3"
                  ],
                  "type": 43
                }
              }
            ],
            "docs": [
              " Approves `operator` to withdraw the `id` token from the caller's account.",
              " If `id` is `None` approves or disapproves the operator for all tokens of the caller.",
              "",
              " On success a `Approval` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns `SelfApprove` error if it is self approve.",
              "",
              " Returns `NotApproved` error if caller is not owner of `id`."
            ],
            "label": "PSP34::approve",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34_external",
                "ApproveOutput"
              ],
              "type": 70
            },
            "selector": "0x1932a8b0"
          },
          {
            "args": [
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34metadata_external",
                    "GetAttributeInput1"
                  ],
                  "type": 1
                }
              },
              {
                "label": "key",
                "type": {
                  "displayName": [
                    "psp34metadata_external",
                    "GetAttributeInput2"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Returns the attribute of `id` for the given `key`.",
              "",
              " If `id` is a collection id of the token, it returns attributes for collection."
            ],
            "label": "PSP34Metadata::get_attribute",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34metadata_external",
                "GetAttributeOutput"
              ],
              "type": 72
            },
            "selector": "0xf19d48d1"
          },
          {
            "args": [
              {
                "label": "owner",
                "type": {
                  "displayName": [
                    "psp34enumerable_external",
                    "OwnersTokenByIndexInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "psp34enumerable_external",
                    "OwnersTokenByIndexInput2"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Returns a token `Id` owned by `owner` at a given `index` of its token list.",
              " Use along with `balance_of` to enumerate all of ``owner``'s tokens.",
              "",
              " The start index is zero."
            ],
            "label": "PSP34Enumerable::owners_token_by_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34enumerable_external",
                "OwnersTokenByIndexOutput"
              ],
              "type": 73
            },
            "selector": "0x3bcfb511"
          },
          {
            "args": [
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "psp34enumerable_external",
                    "TokenByIndexInput1"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Returns a token `Id` at a given `index` of all the tokens stored by the contract.",
              " Use along with `total_supply` to enumerate all tokens.",
              "",
              " The start index is zero."
            ],
            "label": "PSP34Enumerable::token_by_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34enumerable_external",
                "TokenByIndexOutput"
              ],
              "type": 73
            },
            "selector": "0xcd0340d0"
          },
          {
            "args": [
              {
                "label": "uri",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "SetBaseUriInput1"
                  ],
                  "type": 55
                }
              }
            ],
            "docs": [
              " This function sets the baseURI for the NFT contract. Only Contract Owner can perform this function. baseURI is the location of the metadata files if the NFT collection use external source to keep their NFT artwork. ArtZero uses IPFS by default, the baseURI can have format like this: ipfs://<hash_ID>/"
            ],
            "label": "Psp34Traits::set_base_uri",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "SetBaseUriOutput"
              ],
              "type": 60
            },
            "selector": "0x4de6850b"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "GetAttributesInput1"
                  ],
                  "type": 1
                }
              },
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "GetAttributesInput2"
                  ],
                  "type": 56
                }
              }
            ],
            "docs": [
              " This function returns all available attributes of each NFT"
            ],
            "label": "Psp34Traits::get_attributes",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetAttributesOutput"
              ],
              "type": 56
            },
            "selector": "0x18209102"
          },
          {
            "args": [],
            "docs": [
              " This function return the owner of the NFT Contract"
            ],
            "label": "Psp34Traits::get_owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetOwnerOutput"
              ],
              "type": 8
            },
            "selector": "0x8e1d8d71"
          },
          {
            "args": [],
            "docs": [
              " This function returns how many NFTs have been locked by its owners"
            ],
            "label": "Psp34Traits::get_locked_token_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetLockedTokenCountOutput"
              ],
              "type": 5
            },
            "selector": "0x8fe2ce73"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "SetMultipleAttributesInput1"
                  ],
                  "type": 1
                }
              },
              {
                "label": "metadata",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "SetMultipleAttributesInput2"
                  ],
                  "type": 74
                }
              }
            ],
            "docs": [
              " This function set the attributes to each NFT. Only Contract Owner can perform this function. The metadata input is an array of [(attribute, value)]. The attributes in ArtZero platform are the NFT traits."
            ],
            "label": "Psp34Traits::set_multiple_attributes",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "SetMultipleAttributesOutput"
              ],
              "type": 60
            },
            "selector": "0x5bf8416b"
          },
          {
            "args": [],
            "docs": [
              " This function return the latest token ID, everytime new NFT is mint, last_token_id is increased by 1 in mint function. Note: This is not the same as the total supply return by the psp34 function as NFT can be burnt."
            ],
            "label": "Psp34Traits::get_last_token_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetLastTokenIdOutput"
              ],
              "type": 5
            },
            "selector": "0x6f315836"
          },
          {
            "args": [
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "GetAttributeNameInput1"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " This function return the attribute name using attribute index. Beacause attributes of an NFT can be set to anything by Contract Owner, AztZero uses this function to get all attributes of an NFT"
            ],
            "label": "Psp34Traits::get_attribute_name",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetAttributeNameOutput"
              ],
              "type": 55
            },
            "selector": "0xfcfe34de"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "LockInput1"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [
              " This function lets NFT owner to lock their NFT. Once locked, the NFT traits (attributes) can not be changed"
            ],
            "label": "Psp34Traits::lock",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "LockOutput"
              ],
              "type": 60
            },
            "selector": "0xa7245b9b"
          },
          {
            "args": [],
            "docs": [
              " This function return how many unique attributes in the contract"
            ],
            "label": "Psp34Traits::get_attribute_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetAttributeCountOutput"
              ],
              "type": 4
            },
            "selector": "0x61c50d69"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "IsLockedNftInput1"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [
              " This function check if an NFT is locked or not"
            ],
            "label": "Psp34Traits::is_locked_nft",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "IsLockedNftOutput"
              ],
              "type": 43
            },
            "selector": "0x59271420"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "TokenUriInput1"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " This function return the metadata location of an NFT. The format is baseURI/<token_id>.json"
            ],
            "label": "Psp34Traits::token_uri",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "TokenUriOutput"
              ],
              "type": 55
            },
            "selector": "0x249dfd4f"
          },
          {
            "args": [
              {
                "label": "role",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RevokeRoleInput1"
                  ],
                  "type": 4
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RevokeRoleInput2"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Revokes `role` from `account`.",
              "",
              " On success a `RoleRevoked` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`."
            ],
            "label": "AccessControl::revoke_role",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleOutput"
              ],
              "type": 64
            },
            "selector": "0x6e4f0991"
          },
          {
            "args": [
              {
                "label": "role",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "GetRoleAdminInput1"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Returns the admin role that controls `role`. See `grant_role` and `revoke_role`."
            ],
            "label": "AccessControl::get_role_admin",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "accesscontrol_external",
                "GetRoleAdminOutput"
              ],
              "type": 4
            },
            "selector": "0x83da3bb2"
          },
          {
            "args": [
              {
                "label": "role",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "HasRoleInput1"
                  ],
                  "type": 4
                }
              },
              {
                "label": "address",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "HasRoleInput2"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Returns `true` if `account` has been granted `role`."
            ],
            "label": "AccessControl::has_role",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleOutput"
              ],
              "type": 43
            },
            "selector": "0xc1d9ac18"
          },
          {
            "args": [
              {
                "label": "role",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "GrantRoleInput1"
                  ],
                  "type": 4
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "GrantRoleInput2"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Grants `role` to `account`.",
              "",
              " On success a `RoleGranted` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns with `MissingRole` error if caller can't grant the role.",
              " Returns with `RoleRedundant` error `account` has `role`."
            ],
            "label": "AccessControl::grant_role",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleOutput"
              ],
              "type": 64
            },
            "selector": "0x4ac062fd"
          },
          {
            "args": [
              {
                "label": "role",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RenounceRoleInput1"
                  ],
                  "type": 4
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RenounceRoleInput2"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Revokes `role` from the calling account.",
              " Roles are often managed via `grant_role` and `revoke_role`: this function's",
              " purpose is to provide a mechanism for accounts to lose their privileges",
              " if they are compromised (such as when a trusted device is misplaced).",
              "",
              " On success a `RoleRevoked` event is emitted.",
              "",
              " # Errors",
              "",
              " Returns with `InvalidCaller` error if caller is not `account`.",
              " Returns with `MissingRole` error if `account` doesn't have `role`."
            ],
            "label": "AccessControl::renounce_role",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleOutput"
              ],
              "type": 64
            },
            "selector": "0xeaf1248a"
          },
          {
            "args": [
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "WithdrawFeeInput1"
                  ],
                  "type": 6
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "WithdrawFeeInput2"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " This function allows contract owner to withdraw contract balance to his account."
            ],
            "label": "AdminTrait::withdraw_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "admintrait_external",
                "WithdrawFeeOutput"
              ],
              "type": 60
            },
            "selector": "0x07573e99"
          },
          {
            "args": [
              {
                "label": "psp22_contract_address",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferPsp22Input1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "amount",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferPsp22Input2"
                  ],
                  "type": 6
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferPsp22Input3"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake"
            ],
            "label": "AdminTrait::tranfer_psp22",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "admintrait_external",
                "TranferPsp22Output"
              ],
              "type": 60
            },
            "selector": "0xd9aad284"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferNftInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferNftInput2"
                  ],
                  "type": 1
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferNftInput3"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " This function allow contract owner withdraw NFT to an account in case there is any NFT sent to contract by mistake"
            ],
            "label": "AdminTrait::tranfer_nft",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "admintrait_external",
                "TranferNftOutput"
              ],
              "type": 60
            },
            "selector": "0xed1e1dfa"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "psp34burnable_external",
                    "BurnInput1"
                  ],
                  "type": 8
                }
              },
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "psp34burnable_external",
                    "BurnInput2"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [],
            "label": "PSP34Burnable::burn",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34burnable_external",
                "BurnOutput"
              ],
              "type": 70
            },
            "selector": "0x63c9877a"
          }
        ]
      },
      "storage": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0dbe693b00000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "token_owner"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0ebe693b00000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "operator_approvals"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x4cefab1200000000000000000000000000000000000000000000000000000000",
                                  "ty": 18
                                }
                              },
                              "name": "enumerable"
                            },
                            {
                              "layout": {
                                "enum": {
                                  "dispatchKey": "0x4defab1200000000000000000000000000000000000000000000000000000000",
                                  "variants": {
                                    "0": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "cell": {
                                              "key": "0x4eefab1200000000000000000000000000000000000000000000000000000000",
                                              "ty": 15
                                            }
                                          },
                                          "name": null
                                        }
                                      ]
                                    },
                                    "1": {
                                      "fields": []
                                    }
                                  }
                                }
                              },
                              "name": "_reserved"
                            }
                          ]
                        }
                      },
                      "name": "balances"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x0fbe693b00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x10be693b00000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "psp34"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc4c906f100000000000000000000000000000000000000000000000000000000",
                          "ty": 22
                        }
                      },
                      "name": "attributes"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xc5c906f100000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xc6c906f100000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "metadata"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0xb36ee29c00000000000000000000000000000000000000000000000000000000",
                          "ty": 8
                        }
                      },
                      "name": "owner"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xb46ee29c00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xb56ee29c00000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "ownable"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x75b08c5a00000000000000000000000000000000000000000000000000000000",
                          "ty": 26
                        }
                      },
                      "name": "admin_roles"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x2779f6fc00000000000000000000000000000000000000000000000000000000",
                                  "ty": 29
                                }
                              },
                              "name": "members"
                            },
                            {
                              "layout": {
                                "enum": {
                                  "dispatchKey": "0x2879f6fc00000000000000000000000000000000000000000000000000000000",
                                  "variants": {
                                    "0": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "cell": {
                                              "key": "0x2979f6fc00000000000000000000000000000000000000000000000000000000",
                                              "ty": 15
                                            }
                                          },
                                          "name": null
                                        }
                                      ]
                                    },
                                    "1": {
                                      "fields": []
                                    }
                                  }
                                }
                              },
                              "name": "_reserved"
                            }
                          ]
                        }
                      },
                      "name": "members"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x76b08c5a00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x77b08c5a00000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "access"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa141e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "total_supply"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa241e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 2
                        }
                      },
                      "name": "last_phase_id"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa341e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "whitelist_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa441e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 33
                        }
                      },
                      "name": "phase_account_public_claimed_amount"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa541e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 37
                        }
                      },
                      "name": "phase_whitelists_link"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa641e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 41
                        }
                      },
                      "name": "phases"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa741e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 46
                        }
                      },
                      "name": "phase_account_link"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa841e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 2
                        }
                      },
                      "name": "limit_phase_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa941e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 8
                        }
                      },
                      "name": "launchpad_contract_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xaa41e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 7
                        }
                      },
                      "name": "project_info"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xab41e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "public_minted_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xac41e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 2
                        }
                      },
                      "name": "active_phase_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xad41e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "available_token_amount"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xae41e81e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "owner_claimed_amount"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xaf41e81e00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xb041e81e00000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "manager"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7e59d09900000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "last_token_id"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7f59d09900000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "attribute_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x8059d09900000000000000000000000000000000000000000000000000000000",
                          "ty": 49
                        }
                      },
                      "name": "attribute_names"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x8159d09900000000000000000000000000000000000000000000000000000000",
                          "ty": 52
                        }
                      },
                      "name": "locked_tokens"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x8259d09900000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "locked_token_count"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x8359d09900000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x8459d09900000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "manager_psp34_standard"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x7cce04ff00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x7dce04ff00000000000000000000000000000000000000000000000000000000",
                                      "ty": 15
                                    }
                                  },
                                  "name": null
                                }
                              ]
                            },
                            "1": {
                              "fields": []
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ]
                }
              },
              "name": "admin_data"
            }
          ]
        }
      },
      "types": [
        {
          "id": 0,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 10
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 1
              },
              {
                "name": "V",
                "type": 8
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 1,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 2,
                        "typeName": "u8"
                      }
                    ],
                    "index": 0,
                    "name": "U8"
                  },
                  {
                    "fields": [
                      {
                        "type": 3,
                        "typeName": "u16"
                      }
                    ],
                    "index": 1,
                    "name": "U16"
                  },
                  {
                    "fields": [
                      {
                        "type": 4,
                        "typeName": "u32"
                      }
                    ],
                    "index": 2,
                    "name": "U32"
                  },
                  {
                    "fields": [
                      {
                        "type": 5,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 6,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 7,
                        "typeName": "Vec<u8>"
                      }
                    ],
                    "index": 5,
                    "name": "Bytes"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "types",
              "Id"
            ]
          }
        },
        {
          "id": 2,
          "type": {
            "def": {
              "primitive": "u8"
            }
          }
        },
        {
          "id": 3,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 4,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 5,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 6,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        },
        {
          "id": 7,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 9,
                    "typeName": "[u8; 32]"
                  }
                ]
              }
            },
            "path": [
              "ink_env",
              "types",
              "AccountId"
            ]
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "array": {
                "len": 32,
                "type": 2
              }
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "sequence": {
                "type": 11
              }
            }
          }
        },
        {
          "id": 11,
          "type": {
            "def": {
              "tuple": [
                1,
                8
              ]
            }
          }
        },
        {
          "id": 12,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 16
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 13
              },
              {
                "name": "V",
                "type": 15
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "tuple": [
                8,
                8,
                14
              ]
            }
          }
        },
        {
          "id": 14,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 1
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 1
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "tuple": []
            }
          }
        },
        {
          "id": 16,
          "type": {
            "def": {
              "sequence": {
                "type": 17
              }
            }
          }
        },
        {
          "id": 17,
          "type": {
            "def": {
              "tuple": [
                13,
                15
              ]
            }
          }
        },
        {
          "id": 18,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 20
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 19
              },
              {
                "name": "V",
                "type": 1
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "multi_mapping",
              "MultiMapping"
            ]
          }
        },
        {
          "id": 19,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 8
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 8
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 20,
          "type": {
            "def": {
              "sequence": {
                "type": 21
              }
            }
          }
        },
        {
          "id": 21,
          "type": {
            "def": {
              "tuple": [
                19,
                1
              ]
            }
          }
        },
        {
          "id": 22,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 24
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 23
              },
              {
                "name": "V",
                "type": 7
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 23,
          "type": {
            "def": {
              "tuple": [
                1,
                7
              ]
            }
          }
        },
        {
          "id": 24,
          "type": {
            "def": {
              "sequence": {
                "type": 25
              }
            }
          }
        },
        {
          "id": 25,
          "type": {
            "def": {
              "tuple": [
                23,
                7
              ]
            }
          }
        },
        {
          "id": 26,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 27
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 4
              },
              {
                "name": "V",
                "type": 4
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 27,
          "type": {
            "def": {
              "sequence": {
                "type": 28
              }
            }
          }
        },
        {
          "id": 28,
          "type": {
            "def": {
              "tuple": [
                4,
                4
              ]
            }
          }
        },
        {
          "id": 29,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 31
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 30
              },
              {
                "name": "V",
                "type": 15
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 30,
          "type": {
            "def": {
              "tuple": [
                4,
                8
              ]
            }
          }
        },
        {
          "id": 31,
          "type": {
            "def": {
              "sequence": {
                "type": 32
              }
            }
          }
        },
        {
          "id": 32,
          "type": {
            "def": {
              "tuple": [
                30,
                15
              ]
            }
          }
        },
        {
          "id": 33,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 35
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 34
              },
              {
                "name": "V",
                "type": 5
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 34,
          "type": {
            "def": {
              "tuple": [
                8,
                2
              ]
            }
          }
        },
        {
          "id": 35,
          "type": {
            "def": {
              "sequence": {
                "type": 36
              }
            }
          }
        },
        {
          "id": 36,
          "type": {
            "def": {
              "tuple": [
                34,
                5
              ]
            }
          }
        },
        {
          "id": 37,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 39
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 34
              },
              {
                "name": "V",
                "type": 38
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 38,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "whitelist_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "claimed_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "minting_fee",
                    "type": 6,
                    "typeName": "Balance"
                  }
                ]
              }
            },
            "path": [
              "launchpad_psp34_nft_standard",
              "launchpad_psp34_nft_standard",
              "Whitelist"
            ]
          }
        },
        {
          "id": 39,
          "type": {
            "def": {
              "sequence": {
                "type": 40
              }
            }
          }
        },
        {
          "id": 40,
          "type": {
            "def": {
              "tuple": [
                34,
                38
              ]
            }
          }
        },
        {
          "id": 41,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 44
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 2
              },
              {
                "name": "V",
                "type": 42
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 42,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "is_active",
                    "type": 43,
                    "typeName": "bool"
                  },
                  {
                    "name": "title",
                    "type": 7,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "is_public",
                    "type": 43,
                    "typeName": "bool"
                  },
                  {
                    "name": "public_minting_fee",
                    "type": 6,
                    "typeName": "Balance"
                  },
                  {
                    "name": "public_minting_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "public_max_minting_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "public_claimed_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "whitelist_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "claimed_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "total_amount",
                    "type": 5,
                    "typeName": "u64"
                  },
                  {
                    "name": "start_time",
                    "type": 5,
                    "typeName": "Timestamp"
                  },
                  {
                    "name": "end_time",
                    "type": 5,
                    "typeName": "Timestamp"
                  }
                ]
              }
            },
            "path": [
              "launchpad_psp34_nft_standard",
              "launchpad_psp34_nft_standard",
              "Phase"
            ]
          }
        },
        {
          "id": 43,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 44,
          "type": {
            "def": {
              "sequence": {
                "type": 45
              }
            }
          }
        },
        {
          "id": 45,
          "type": {
            "def": {
              "tuple": [
                2,
                42
              ]
            }
          }
        },
        {
          "id": 46,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 47
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 2
              },
              {
                "name": "V",
                "type": 8
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "multi_mapping",
              "MultiMapping"
            ]
          }
        },
        {
          "id": 47,
          "type": {
            "def": {
              "sequence": {
                "type": 48
              }
            }
          }
        },
        {
          "id": 48,
          "type": {
            "def": {
              "tuple": [
                2,
                8
              ]
            }
          }
        },
        {
          "id": 49,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 50
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 4
              },
              {
                "name": "V",
                "type": 7
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 50,
          "type": {
            "def": {
              "sequence": {
                "type": 51
              }
            }
          }
        },
        {
          "id": 51,
          "type": {
            "def": {
              "tuple": [
                4,
                7
              ]
            }
          }
        },
        {
          "id": 52,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 53
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 1
              },
              {
                "name": "V",
                "type": 43
              }
            ],
            "path": [
              "openbrush_lang",
              "storage",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 53,
          "type": {
            "def": {
              "sequence": {
                "type": 54
              }
            }
          }
        },
        {
          "id": 54,
          "type": {
            "def": {
              "tuple": [
                1,
                43
              ]
            }
          }
        },
        {
          "id": 55,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 56,
          "type": {
            "def": {
              "sequence": {
                "type": 55
              }
            }
          }
        },
        {
          "id": 57,
          "type": {
            "def": {
              "sequence": {
                "type": 43
              }
            }
          }
        },
        {
          "id": 58,
          "type": {
            "def": {
              "sequence": {
                "type": 6
              }
            }
          }
        },
        {
          "id": 59,
          "type": {
            "def": {
              "sequence": {
                "type": 5
              }
            }
          }
        },
        {
          "id": 60,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 15
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 61
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 15
              },
              {
                "name": "E",
                "type": 61
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 61,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 55,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "OnlyOwner"
                  },
                  {
                    "index": 2,
                    "name": "OnlyAdmin"
                  },
                  {
                    "index": 3,
                    "name": "InvalidCaller"
                  },
                  {
                    "index": 4,
                    "name": "InvalidFee"
                  },
                  {
                    "index": 5,
                    "name": "TokenOwnerNotMatch"
                  },
                  {
                    "index": 6,
                    "name": "NotApproved"
                  },
                  {
                    "index": 7,
                    "name": "CannotTransfer"
                  },
                  {
                    "index": 8,
                    "name": "CannotMint"
                  },
                  {
                    "index": 9,
                    "name": "NotPublicMint"
                  },
                  {
                    "index": 10,
                    "name": "NotEnoughBalance"
                  },
                  {
                    "index": 11,
                    "name": "MaxSupply"
                  },
                  {
                    "index": 12,
                    "name": "AlreadyInit"
                  },
                  {
                    "index": 13,
                    "name": "NotOwner"
                  },
                  {
                    "index": 14,
                    "name": "NotTokenOwner"
                  },
                  {
                    "index": 15,
                    "name": "ProjectNotExist"
                  },
                  {
                    "index": 16,
                    "name": "ProjectOwnerAndAdmin"
                  },
                  {
                    "index": 17,
                    "name": "InvalidStartTimeAndEndTime"
                  },
                  {
                    "index": 18,
                    "name": "InvalidPhaseCount"
                  },
                  {
                    "index": 19,
                    "name": "CollectionOwnerAndAdmin"
                  },
                  {
                    "index": 20,
                    "name": "CollectionNotActive"
                  },
                  {
                    "index": 21,
                    "name": "InvalidInput"
                  },
                  {
                    "index": 22,
                    "name": "InvalidType"
                  },
                  {
                    "index": 23,
                    "name": "ClaimedAll"
                  },
                  {
                    "index": 24,
                    "name": "TokenLimitReached"
                  },
                  {
                    "index": 25,
                    "name": "UpdatePhase"
                  },
                  {
                    "index": 26,
                    "name": "PhaseNotExist"
                  },
                  {
                    "index": 27,
                    "name": "PhaseExpired"
                  },
                  {
                    "index": 28,
                    "name": "WhitelistNotExist"
                  },
                  {
                    "index": 29,
                    "name": "WithdrawFeeError"
                  },
                  {
                    "index": 30,
                    "name": "WithdrawNFTError"
                  },
                  {
                    "index": 31,
                    "name": "WithdrawPSP22Error"
                  },
                  {
                    "index": 32,
                    "name": "NotListed"
                  },
                  {
                    "index": 33,
                    "name": "BidAlreadyExist"
                  },
                  {
                    "index": 34,
                    "name": "BidNotExist"
                  },
                  {
                    "index": 35,
                    "name": "NotInMarket"
                  },
                  {
                    "index": 36,
                    "name": "NotForSale"
                  },
                  {
                    "index": 37,
                    "name": "NotInSaleList"
                  },
                  {
                    "index": 38,
                    "name": "InvalidBidLength"
                  },
                  {
                    "index": 39,
                    "name": "InvalidCollectionOwner"
                  },
                  {
                    "index": 40,
                    "name": "InvalidTime"
                  },
                  {
                    "index": 41,
                    "name": "RewardStarted"
                  },
                  {
                    "index": 42,
                    "name": "RewardNotStarted"
                  },
                  {
                    "index": 43,
                    "name": "ClaimMustBeFalse"
                  },
                  {
                    "fields": [
                      {
                        "type": 62,
                        "typeName": "OwnableError"
                      }
                    ],
                    "index": 44,
                    "name": "OwnableError"
                  },
                  {
                    "fields": [
                      {
                        "type": 63,
                        "typeName": "AccessControlError"
                      }
                    ],
                    "index": 45,
                    "name": "AccessControlError"
                  }
                ]
              }
            },
            "path": [
              "artzero_project",
              "traits",
              "error",
              "Error"
            ]
          }
        },
        {
          "id": 62,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "CallerIsNotOwner"
                  },
                  {
                    "index": 1,
                    "name": "NewOwnerIsZero"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "errors",
              "ownable",
              "OwnableError"
            ]
          }
        },
        {
          "id": 63,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "InvalidCaller"
                  },
                  {
                    "index": 1,
                    "name": "MissingRole"
                  },
                  {
                    "index": 2,
                    "name": "RoleRedundant"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "errors",
              "access_control",
              "AccessControlError"
            ]
          }
        },
        {
          "id": 64,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 15
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 63
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 15
              },
              {
                "name": "E",
                "type": 63
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 65,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 42
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 42
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 66,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 38
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 38
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 67,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 2
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 2
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 68,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 5
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 5
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 69,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 15
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 62
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 15
              },
              {
                "name": "E",
                "type": 62
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 70,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 15
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 71
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 15
              },
              {
                "name": "E",
                "type": 71
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 71,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 7,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "SelfApprove"
                  },
                  {
                    "index": 2,
                    "name": "NotApproved"
                  },
                  {
                    "index": 3,
                    "name": "TokenExists"
                  },
                  {
                    "index": 4,
                    "name": "TokenNotExists"
                  },
                  {
                    "fields": [
                      {
                        "type": 7,
                        "typeName": "String"
                      }
                    ],
                    "index": 5,
                    "name": "SafeTransferCheckFailed"
                  }
                ]
              }
            },
            "path": [
              "openbrush_contracts",
              "traits",
              "errors",
              "psp34",
              "PSP34Error"
            ]
          }
        },
        {
          "id": 72,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 7
                      }
                    ],
                    "index": 1,
                    "name": "Some"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 7
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 73,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 1
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 71
                      }
                    ],
                    "index": 1,
                    "name": "Err"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "T",
                "type": 1
              },
              {
                "name": "E",
                "type": 71
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 74,
          "type": {
            "def": {
              "sequence": {
                "type": 75
              }
            }
          }
        },
        {
          "id": 75,
          "type": {
            "def": {
              "tuple": [
                55,
                55
              ]
            }
          }
        }
      ]
    }
  }
};

export default artzero_nft;
