const staking = {
  CONTRACT_ADDRESS: "5HpZrr8hwKjhiSW1RQGFRKMakV3Tz7F8nfbxPMM2w47H3J9W",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x855d50632a64b14b5ac9bf310c12d3333185dfa56b650d962268fd0ff383116f",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_staking_nft",
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
                "label": "admin_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "artzero_nft_contract",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "limit_unstake_time",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
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
        "events": [
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "staker",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 34
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "NewStakeEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "staker",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 34
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "UnstakeEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "staker",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 34
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "RequestUnstakeEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "staker",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 34
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "CancelRequestUnstakeEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "staker",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 34
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "reward_amount",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 23
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "staked_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "ClaimReward"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "reward_amount",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 23
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "total_staked_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [],
            "label": "AddReward"
          }
        ],
        "messages": [
          {
            "args": [
              {
                "label": "artzero_nft_contract",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "limit_unstake_time",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              },
              {
                "label": "admin_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "initialize",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xf2f6dba3"
          },
          {
            "args": [
              {
                "label": "artzero_nft_contract",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Set new NFT contract address - Only Owner"
            ],
            "label": "set_artzero_nft_contract",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x1bb3d394"
          },
          {
            "args": [
              {
                "label": "limit_unstake_time",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Set new Limit Unstake Time (Minutes) - Only Owner"
            ],
            "label": "set_limit_unstake_time",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x675e7b6f"
          },
          {
            "args": [
              {
                "label": "admin_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Update Admin Address - only Owner"
            ],
            "label": "update_admin_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xb470cada"
          },
          {
            "args": [
              {
                "label": "is_locked",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 12
                }
              }
            ],
            "docs": [
              " Update is locked - Only Admin Role can change"
            ],
            "label": "update_is_locked",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x04230988"
          },
          {
            "args": [],
            "docs": [],
            "label": "start_reward_distribution",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x95f19c6c"
          },
          {
            "args": [],
            "docs": [],
            "label": "stop_reward_distribution",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xcdcd1ca5"
          },
          {
            "args": [],
            "docs": [
              " Add reward to reward_pool"
            ],
            "label": "add_reward",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x1b146ead"
          },
          {
            "args": [
              {
                "label": "staker",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Set Account so it can claim the reward. Must run by backend every month before add_reward"
            ],
            "label": "set_claimed_status",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xa625d829"
          },
          {
            "args": [],
            "docs": [
              " Claim Reward"
            ],
            "label": "claim_reward",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x9a8353a7"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_reward_pool",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 23
            },
            "selector": "0x443c6a4a"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_claimable_reward",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 23
            },
            "selector": "0x411901a1"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "is_claimed",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 12
            },
            "selector": "0xc58eed46"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_reward_started",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 12
            },
            "selector": "0xca663a02"
          },
          {
            "args": [],
            "docs": [
              " Get NFT contract address"
            ],
            "label": "get_artzero_nft_contract",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            },
            "selector": "0xd25bb869"
          },
          {
            "args": [],
            "docs": [
              " Get Is Locked Status"
            ],
            "label": "get_is_locked",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 12
            },
            "selector": "0x72d8d756"
          },
          {
            "args": [],
            "docs": [
              " Get Admin Account"
            ],
            "label": "get_admin_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            },
            "selector": "0x8938ef71"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Get request unstake Time"
            ],
            "label": "get_request_unstake_time",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 17
            },
            "selector": "0x5d08378a"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Get staked token ids by AccountId"
            ],
            "label": "get_staked_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 32
            },
            "selector": "0xd5ee8ef6"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get staked accounts: index by AccountId"
            ],
            "label": "get_staked_accounts_index_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 33
            },
            "selector": "0xdeaeabe3"
          },
          {
            "args": [
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Get staked accounts: account by Index"
            ],
            "label": "get_staked_accounts_account_by_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 34
            },
            "selector": "0x9698ca4b"
          },
          {
            "args": [],
            "docs": [
              " Get staked accounts last index"
            ],
            "label": "get_staked_accounts_last_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 17
            },
            "selector": "0xf7c0188d"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Get pending unstaked token ids by AccountId"
            ],
            "label": "get_pending_unstaked_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 32
            },
            "selector": "0xf154c3c5"
          },
          {
            "args": [],
            "docs": [
              " Get total NFT staked in the contract"
            ],
            "label": "get_total_staked",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 17
            },
            "selector": "0x02c779a5"
          },
          {
            "args": [],
            "docs": [
              " Get limit unstake time"
            ],
            "label": "get_limit_unstake_time",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 17
            },
            "selector": "0x50d71ce0"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              }
            ],
            "docs": [
              " Stake multiple NFTs - Make sure approve this contract can send token on owner behalf"
            ],
            "label": "stake",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x5adb38de"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              }
            ],
            "docs": [
              " Request Unstake multiple NFTs"
            ],
            "label": "request_unstake",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xfd83c46b"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              }
            ],
            "docs": [
              " Cancel Request"
            ],
            "label": "cancel_request_unstake",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xc5bd017e"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              }
            ],
            "docs": [
              " unStake multiple NFTs"
            ],
            "label": "unstake",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x82364901"
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
                  "type": 5
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
              "type": 5
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
                    "RenounceRoleInput1"
                  ],
                  "type": 5
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RenounceRoleInput2"
                  ],
                  "type": 0
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
              "type": 36
            },
            "selector": "0xeaf1248a"
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
                  "type": 5
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "GrantRoleInput2"
                  ],
                  "type": 0
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
              "type": 36
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
                    "RevokeRoleInput1"
                  ],
                  "type": 5
                }
              },
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "RevokeRoleInput2"
                  ],
                  "type": 0
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
              "type": 36
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
                    "HasRoleInput1"
                  ],
                  "type": 5
                }
              },
              {
                "label": "address",
                "type": {
                  "displayName": [
                    "accesscontrol_external",
                    "HasRoleInput2"
                  ],
                  "type": 0
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
              "type": 12
            },
            "selector": "0xc1d9ac18"
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
              "type": 37
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
              "type": 0
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
                  "type": 0
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
              "type": 37
            },
            "selector": "0x11f43efd"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "artzerostakingtrait_external",
                    "GetTotalStakedByAccountInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function returns the total PMP NFT Staked by an account"
            ],
            "label": "ArtZeroStakingTrait::get_total_staked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerostakingtrait_external",
                "GetTotalStakedByAccountOutput"
              ],
              "type": 17
            },
            "selector": "0x5da4d83d"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "artzerostakingtrait_external",
                    "GetTotalPendingUnstakedByAccountInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function returns the total PMP NFT that is pending to be unstaked by an account"
            ],
            "label": "ArtZeroStakingTrait::get_total_pending_unstaked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerostakingtrait_external",
                "GetTotalPendingUnstakedByAccountOutput"
              ],
              "type": 17
            },
            "selector": "0xcc24ad6d"
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
                  "type": 23
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "WithdrawFeeInput2"
                  ],
                  "type": 0
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
              "type": 27
            },
            "selector": "0x07573e99"
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
                  "type": 0
                }
              },
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferNftInput2"
                  ],
                  "type": 38
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferNftInput3"
                  ],
                  "type": 0
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
              "type": 27
            },
            "selector": "0xed1e1dfa"
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
                  "type": 0
                }
              },
              {
                "label": "amount",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferPsp22Input2"
                  ],
                  "type": 23
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "admintrait_external",
                    "TranferPsp22Input3"
                  ],
                  "type": 0
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
              "type": 27
            },
            "selector": "0xd9aad284"
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
                          "key": "0xb36ee29c00000000000000000000000000000000000000000000000000000000",
                          "ty": 0
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
                                      "ty": 3
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
                          "ty": 4
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
                                  "ty": 8
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
                                              "ty": 3
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
                                      "ty": 3
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
                          "key": "0xa037626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "is_locked"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa137626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "admin_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa237626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "staked_accounts"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa337626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 16
                        }
                      },
                      "name": "staking_list"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa437626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 16
                        }
                      },
                      "name": "pending_unstaking_list"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa537626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "nft_contract_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa637626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 17
                        }
                      },
                      "name": "total_staked"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa737626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 17
                        }
                      },
                      "name": "limit_unstake_time"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa837626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 20
                        }
                      },
                      "name": "request_unstaking_time"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa937626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 23
                        }
                      },
                      "name": "reward_pool"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xaa37626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 23
                        }
                      },
                      "name": "claimable_reward"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xab37626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "reward_started"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xac37626f00000000000000000000000000000000000000000000000000000000",
                          "ty": 24
                        }
                      },
                      "name": "is_claimed"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xad37626f00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xae37626f00000000000000000000000000000000000000000000000000000000",
                                      "ty": 3
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
                        "enum": {
                          "dispatchKey": "0x7cce04ff00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x7dce04ff00000000000000000000000000000000000000000000000000000000",
                                      "ty": 3
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
                    "type": 1,
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
          "id": 1,
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
              "tuple": []
            }
          }
        },
        {
          "id": 4,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 6
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 5
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
          "id": 5,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 6,
          "type": {
            "def": {
              "sequence": {
                "type": 7
              }
            }
          }
        },
        {
          "id": 7,
          "type": {
            "def": {
              "tuple": [
                5,
                5
              ]
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
                    "type": 10
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 9
              },
              {
                "name": "V",
                "type": 3
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
          "id": 9,
          "type": {
            "def": {
              "tuple": [
                5,
                0
              ]
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
                9,
                3
              ]
            }
          }
        },
        {
          "id": 12,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 14
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
                "type": 0
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
          "id": 14,
          "type": {
            "def": {
              "sequence": {
                "type": 15
              }
            }
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "tuple": [
                2,
                0
              ]
            }
          }
        },
        {
          "id": 16,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 18
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 0
              },
              {
                "name": "V",
                "type": 17
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
          "id": 17,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 18,
          "type": {
            "def": {
              "sequence": {
                "type": 19
              }
            }
          }
        },
        {
          "id": 19,
          "type": {
            "def": {
              "tuple": [
                0,
                17
              ]
            }
          }
        },
        {
          "id": 20,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 21
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
                "type": 17
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
          "id": 21,
          "type": {
            "def": {
              "sequence": {
                "type": 22
              }
            }
          }
        },
        {
          "id": 22,
          "type": {
            "def": {
              "tuple": [
                19,
                17
              ]
            }
          }
        },
        {
          "id": 23,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        },
        {
          "id": 24,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 25
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 0
              },
              {
                "name": "V",
                "type": 12
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
          "id": 25,
          "type": {
            "def": {
              "sequence": {
                "type": 26
              }
            }
          }
        },
        {
          "id": 26,
          "type": {
            "def": {
              "tuple": [
                0,
                12
              ]
            }
          }
        },
        {
          "id": 27,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 28
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
                "type": 3
              },
              {
                "name": "E",
                "type": 28
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 28,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 29,
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
                        "type": 30,
                        "typeName": "OwnableError"
                      }
                    ],
                    "index": 44,
                    "name": "OwnableError"
                  },
                  {
                    "fields": [
                      {
                        "type": 31,
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
          "id": 29,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 30,
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
          "id": 31,
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
          "id": 32,
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
                        "type": 17
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
                "type": 17
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 33,
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
                        "type": 23
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
                "type": 23
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 34,
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
                        "type": 0
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
                "type": 0
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 35,
          "type": {
            "def": {
              "sequence": {
                "type": 17
              }
            }
          }
        },
        {
          "id": 36,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 31
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
                "type": 3
              },
              {
                "name": "E",
                "type": 31
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 37,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 30
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
                "type": 3
              },
              {
                "name": "E",
                "type": 30
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 38,
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
                        "type": 39,
                        "typeName": "u16"
                      }
                    ],
                    "index": 1,
                    "name": "U16"
                  },
                  {
                    "fields": [
                      {
                        "type": 5,
                        "typeName": "u32"
                      }
                    ],
                    "index": 2,
                    "name": "U32"
                  },
                  {
                    "fields": [
                      {
                        "type": 17,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 23,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 40,
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
          "id": 39,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 40,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
          }
        }
      ]
    }
  }
};

export default staking;
