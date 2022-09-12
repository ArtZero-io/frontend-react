const launchpad_psp34_nft_standard = {
  CONTRACT_ABI: {
    "source": {
      "hash": "0x7d0c1ece15d01cab83ce2495f725f8f29fd31a5fe5ad3535775fe77a9f538980",
      "language": "ink! 3.3.1",
      "compiler": "rustc 1.63.0-nightly"
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
                  "type": 38
                }
              },
              {
                "label": "code_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 39
                }
              },
              {
                "label": "is_public_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 40
                }
              },
              {
                "label": "public_minting_fee_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 41
                }
              },
              {
                "label": "public_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "public_max_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "start_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "end_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
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
                  "type": 38
                }
              },
              {
                "label": "is_public",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 34
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
              "Add new phare - Only Admin"
            ],
            "label": "add_new_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
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
              " Update whitelist - Only Admin"
            ],
            "label": "update_whitelist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
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
              " Add new whitelist - Only Admin"
            ],
            "label": "add_whitelist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0xcc9972d4"
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
              "Only Owner can mint new token"
            ],
            "label": "mint",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
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
              "type": 43
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
              "type": 43
            },
            "selector": "0x2e50fe5f"
          },
          {
            "args": [
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Withdraw Fees - only Owner"
            ],
            "label": "withdraw_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0x07fdb555"
          },
          {
            "args": [
              {
                "label": "admin_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 8
                }
              }
            ],
            "docs": [
              " Update limit phase count"
            ],
            "label": "update_admin_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0xb470cada"
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
                "label": "is_public",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 34
                }
              }
            ],
            "docs": [
              " Update public phase"
            ],
            "label": "update_public_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0xb323e2b7"
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
                  "type": 38
                }
              },
              {
                "label": "is_public",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 34
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
              " Update phase schedule"
            ],
            "label": "update_schedule_phase",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
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
                  "type": 39
                }
              },
              {
                "label": "is_public_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 40
                }
              },
              {
                "label": "public_minting_fee_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 41
                }
              },
              {
                "label": "public_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "public_max_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "start_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
                }
              },
              {
                "label": "end_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 42
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
              "type": 43
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
                  "type": 38
                }
              }
            ],
            "docs": [
              " Edit project information"
            ],
            "label": "edit_project_information",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0x05a37bb7"
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
              " Get total public minting amount"
            ],
            "label": "get_total_public_minting_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x1a0d7a59"
          },
          {
            "args": [],
            "docs": [
              " Get admin address"
            ],
            "label": "get_admin_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 8
            },
            "selector": "0x8938ef71"
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
              "type": 45
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
              "type": 46
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
              "type": 47
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
              "type": 47
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
              "Get phase Count "
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
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [
              " Lock nft - Only owner token"
            ],
            "label": "lock",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 43
            },
            "selector": "0xbbaa6540"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 1
                }
              }
            ],
            "docs": [
              " Check token is locked or not"
            ],
            "label": "is_locked_nft",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 34
            },
            "selector": "0x1d244111"
          },
          {
            "args": [],
            "docs": [
              "Get Locked Token Count"
            ],
            "label": "get_locked_token_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 5
            },
            "selector": "0x012797cc"
          },
          {
            "args": [],
            "docs": [
              "Get Locked Token Count"
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
              "type": 48
            },
            "selector": "0x11f43efd"
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
              "type": 48
            },
            "selector": "0x5e228753"
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
              "type": 34
            },
            "selector": "0x4790f55a"
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
                  "type": 34
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
              "type": 50
            },
            "selector": "0x1932a8b0"
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
              "type": 50
            },
            "selector": "0x3128d61b"
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
              "type": 52
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
              " Use along with `balance_of` to enumerate all of ``owner``'s tokens."
            ],
            "label": "PSP34Enumerable::owners_token_by_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34enumerable_external",
                "OwnersTokenByIndexOutput"
              ],
              "type": 53
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
              " Use along with `total_supply` to enumerate all tokens."
            ],
            "label": "PSP34Enumerable::token_by_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34enumerable_external",
                "TokenByIndexOutput"
              ],
              "type": 53
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
                  "type": 38
                }
              }
            ],
            "docs": [
              " Change baseURI"
            ],
            "label": "Psp34Traits::set_base_uri",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "SetBaseUriOutput"
              ],
              "type": 43
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
                  "type": 39
                }
              }
            ],
            "docs": [
              " Get multiple  attributes"
            ],
            "label": "Psp34Traits::get_attributes",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetAttributesOutput"
              ],
              "type": 39
            },
            "selector": "0x18209102"
          },
          {
            "args": [],
            "docs": [
              "Get Attribute Count"
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
                    "SetMultipleAttributesInput1"
                  ],
                  "type": 1
                }
              },
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "SetMultipleAttributesInput2"
                  ],
                  "type": 39
                }
              },
              {
                "label": "values",
                "type": {
                  "displayName": [
                    "psp34traits_external",
                    "SetMultipleAttributesInput3"
                  ],
                  "type": 39
                }
              }
            ],
            "docs": [
              "Only Owner can set multiple attributes to a token"
            ],
            "label": "Psp34Traits::set_multiple_attributes",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "SetMultipleAttributesOutput"
              ],
              "type": 43
            },
            "selector": "0x5bf8416b"
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
              "Get Attribute Name"
            ],
            "label": "Psp34Traits::get_attribute_name",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "GetAttributeNameOutput"
              ],
              "type": 38
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
                    "TokenUriInput1"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Get URI from token ID"
            ],
            "label": "Psp34Traits::token_uri",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "psp34traits_external",
                "TokenUriOutput"
              ],
              "type": 38
            },
            "selector": "0x249dfd4f"
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
                "cell": {
                  "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "ty": 8
                }
              },
              "name": "admin_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "last_token_id"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                  "ty": 4
                }
              },
              "name": "attribute_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                  "ty": 26
                }
              },
              "name": "attribute_names"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                  "ty": 28
                }
              },
              "name": "locked_tokens"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "locked_token_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "total_supply"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                  "ty": 2
                }
              },
              "name": "last_phase_id"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "whitelist_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                  "ty": 29
                }
              },
              "name": "phase_whitelists_link"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 32
                }
              },
              "name": "phases"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 35
                }
              },
              "name": "phase_account_link"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 2
                }
              },
              "name": "limit_phase_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0d00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 8
                }
              },
              "name": "launchpad_contract_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0e00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 7
                }
              },
              "name": "project_info"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0f00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "public_minted_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x1000000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "total_public_minting_amount"
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
                    "name": "offset_key",
                    "type": 27,
                    "typeName": "Key"
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
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 27,
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
              "ink_primitives",
              "Key"
            ]
          }
        },
        {
          "id": 28,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 27,
                    "typeName": "Key"
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
                "type": 2
              }
            ],
            "path": [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 29,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 27,
                    "typeName": "Key"
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
                "type": 31
              }
            ],
            "path": [
              "ink_storage",
              "lazy",
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
                8,
                2
              ]
            }
          }
        },
        {
          "id": 31,
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
          "id": 32,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 27,
                    "typeName": "Key"
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
                "type": 33
              }
            ],
            "path": [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          "id": 33,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "title",
                    "type": 7,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "is_public",
                    "type": 34,
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
          "id": 34,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 35,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 36
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
          "id": 36,
          "type": {
            "def": {
              "sequence": {
                "type": 37
              }
            }
          }
        },
        {
          "id": 37,
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
          "id": 38,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 39,
          "type": {
            "def": {
              "sequence": {
                "type": 38
              }
            }
          }
        },
        {
          "id": 40,
          "type": {
            "def": {
              "sequence": {
                "type": 34
              }
            }
          }
        },
        {
          "id": 41,
          "type": {
            "def": {
              "sequence": {
                "type": 6
              }
            }
          }
        },
        {
          "id": 42,
          "type": {
            "def": {
              "sequence": {
                "type": 5
              }
            }
          }
        },
        {
          "id": 43,
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
                        "type": 44
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
                "type": 44
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 44,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 38,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "NotApproved"
                  },
                  {
                    "index": 2,
                    "name": "TokenExists"
                  },
                  {
                    "index": 3,
                    "name": "TokenNotFound"
                  },
                  {
                    "index": 4,
                    "name": "CannotInsert"
                  },
                  {
                    "index": 5,
                    "name": "CannotFetchValue"
                  },
                  {
                    "index": 6,
                    "name": "NotAllowed"
                  },
                  {
                    "index": 7,
                    "name": "InvalidInput"
                  },
                  {
                    "index": 8,
                    "name": "OnlyAdmin"
                  },
                  {
                    "index": 9,
                    "name": "ClaimedAll"
                  },
                  {
                    "index": 10,
                    "name": "TokenLimitReached"
                  },
                  {
                    "index": 11,
                    "name": "TokenLimitReachedMode1"
                  },
                  {
                    "index": 12,
                    "name": "InvalidFee"
                  },
                  {
                    "index": 13,
                    "name": "NotMintTime"
                  },
                  {
                    "index": 14,
                    "name": "NotEnoughBalance"
                  },
                  {
                    "index": 15,
                    "name": "InvalidMintAmount"
                  },
                  {
                    "index": 16,
                    "name": "PhaseNotExist"
                  },
                  {
                    "index": 17,
                    "name": "PhaseExpired"
                  },
                  {
                    "index": 18,
                    "name": "PhaseNotPublicSale"
                  },
                  {
                    "index": 19,
                    "name": "PhaseCodeNotExist"
                  },
                  {
                    "index": 20,
                    "name": "PhaseExisted"
                  },
                  {
                    "index": 21,
                    "name": "PhaseLimitReached"
                  },
                  {
                    "index": 22,
                    "name": "WhitelistNotExist"
                  },
                  {
                    "index": 23,
                    "name": "PhasePublicSale"
                  },
                  {
                    "index": 24,
                    "name": "PhaseWhiteList"
                  }
                ]
              }
            },
            "path": [
              "launchpad_psp34_nft_standard",
              "launchpad_psp34_nft_standard",
              "Error"
            ]
          }
        },
        {
          "id": 45,
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
                        "type": 33
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
                "type": 33
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 46,
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
                        "type": 31
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
                "type": 31
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 47,
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
          "id": 48,
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
                        "type": 49
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
                "type": 49
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 49,
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
          "id": 50,
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
                        "type": 51
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
                "type": 51
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 51,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 38,
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
                        "type": 38,
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
          "id": 52,
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
          "id": 53,
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
                        "type": 51
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
                "type": 51
              }
            ],
            "path": [
              "Result"
            ]
          }
        }
      ]
    }
  }
};
  
export default launchpad_psp34_nft_standard;
  