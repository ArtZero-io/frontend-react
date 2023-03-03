const staking = {
  CONTRACT_ADDRESS: "5HLGHoqtjAsbXCF2u4qKk9hZneqK7sLrxH8Kas8U1JBjMZET",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x7df9f5557f14ac2748cd788b0579b034191f7c6175b31f6abef0a14723cc4f6c",
      "language": "ink! 4.0.0",
      "compiler": "rustc 1.69.0-nightly",
      "build_info": {
        "build_mode": "Debug",
        "cargo_contract_version": "2.0.0-rc",
        "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
        "wasm_opt_settings": {
          "keep_debug_symbols": false,
          "optimization_passes": "Z"
        }
      }
    },
    "contract": {
      "name": "artzero_staking_nft",
      "version": "1.0.0",
      "authors": [
        "ArtZero <admin@artzero.io>"
      ]
    },
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
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "new",
          "payable": false,
          "returnType": {
            "displayName": [
              "ink_primitives",
              "ConstructorResult"
            ],
            "type": 8
          },
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
                "type": 28
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
                "type": 6
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
                "type": 28
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
                "type": 6
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
                "type": 28
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
                "type": 6
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
                "type": 28
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
                "type": 6
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
                "type": 28
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
                "type": 7
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
                "type": 6
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
                "type": 7
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
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "AddReward"
        }
      ],
      "lang_error": {
        "displayName": [
          "ink",
          "LangError"
        ],
        "type": 9
      },
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 5
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 19
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
              "ink",
              "MessageResult"
            ],
            "type": 19
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
              "ink",
              "MessageResult"
            ],
            "type": 20
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
              "ink",
              "MessageResult"
            ],
            "type": 20
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
              "ink",
              "MessageResult"
            ],
            "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 20
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
              "ink",
              "MessageResult"
            ],
            "type": 21
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 22
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 23
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
              "ink",
              "MessageResult"
            ],
            "type": 25
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 27
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
              "ink",
              "MessageResult"
            ],
            "type": 22
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
                "type": 6
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
              "ink",
              "MessageResult"
            ],
            "type": 23
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
              "ink",
              "MessageResult"
            ],
            "type": 22
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
              "ink",
              "MessageResult"
            ],
            "type": 22
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
                "type": 29
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 29
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 29
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 29
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
              "ink",
              "MessageResult"
            ],
            "type": 30
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
              "ink",
              "MessageResult"
            ],
            "type": 20
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
              "ink",
              "MessageResult"
            ],
            "type": 30
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
              "ink",
              "MessageResult"
            ],
            "type": 32
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
              "ink",
              "MessageResult"
            ],
            "type": 30
          },
          "selector": "0x6e4f0991"
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
              "ink",
              "MessageResult"
            ],
            "type": 33
          },
          "selector": "0x5e228753"
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
              "ink",
              "MessageResult"
            ],
            "type": 33
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
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x4fa43c8c"
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
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0xcc24ad6d"
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
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0x5da4d83d"
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
                "type": 7
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
              "ink",
              "MessageResult"
            ],
            "type": 10
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
                "type": 35
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
              "ink",
              "MessageResult"
            ],
            "type": 10
          },
          "selector": "0xed1e1dfa"
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
                "type": 7
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
              "ink",
              "MessageResult"
            ],
            "type": 10
          },
          "selector": "0x07573e99"
        },
        {
          "args": [
            {
              "label": "code_hash",
              "type": {
                "displayName": [
                  "upgradabletrait_external",
                  "SetCodeInput1"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " This function allow contract owner modifies the code which is used to execute calls to this contract address (`AccountId`)."
          ],
          "label": "UpgradableTrait::set_code",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 10
          },
          "selector": "0xa9e46760"
        }
      ]
    },
    "storage": {
      "root": {
        "layout": {
          "struct": {
            "fields": [
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "owner"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Data"
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
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x6a2cd2b4",
                                "ty": 4
                              }
                            },
                            "root_key": "0x6a2cd2b4"
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
                                  "root": {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x5d5db175",
                                        "ty": 3
                                      }
                                    },
                                    "root_key": "0x5d5db175"
                                  }
                                },
                                "name": "members"
                              },
                              {
                                "layout": {
                                  "enum": {
                                    "dispatchKey": "0x00000000",
                                    "name": "Option",
                                    "variants": {
                                      "0": {
                                        "fields": [],
                                        "name": "None"
                                      },
                                      "1": {
                                        "fields": [
                                          {
                                            "layout": {
                                              "leaf": {
                                                "key": "0x00000000",
                                                "ty": 3
                                              }
                                            },
                                            "name": "0"
                                          }
                                        ],
                                        "name": "Some"
                                      }
                                    }
                                  }
                                },
                                "name": "_reserved"
                              }
                            ],
                            "name": "Members"
                          }
                        },
                        "name": "members"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Data"
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
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 5
                          }
                        },
                        "name": "is_locked"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "admin_address"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xf6ead359",
                                "ty": 0
                              }
                            },
                            "root_key": "0xf6ead359"
                          }
                        },
                        "name": "staked_accounts"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xb279bff9",
                                "ty": 6
                              }
                            },
                            "root_key": "0xb279bff9"
                          }
                        },
                        "name": "staking_list"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x420e5556",
                                "ty": 6
                              }
                            },
                            "root_key": "0x420e5556"
                          }
                        },
                        "name": "pending_unstaking_list"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "nft_contract_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "total_staked"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "limit_unstake_time"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xd391cfda",
                                "ty": 6
                              }
                            },
                            "root_key": "0xd391cfda"
                          }
                        },
                        "name": "request_unstaking_time"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 7
                          }
                        },
                        "name": "reward_pool"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 7
                          }
                        },
                        "name": "claimable_reward"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 5
                          }
                        },
                        "name": "reward_started"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xcb857ec0",
                                "ty": 5
                              }
                            },
                            "root_key": "0xcb857ec0"
                          }
                        },
                        "name": "is_claimed"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Manager"
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
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Data"
                  }
                },
                "name": "admin_data"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Data"
                  }
                },
                "name": "upgradable_data"
              }
            ],
            "name": "ArtZeroStakingNFT"
          }
        },
        "root_key": "0x00000000"
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
            "ink_primitives",
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
            "primitive": "u32"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 8,
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
                      "type": 9
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
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 1,
                  "name": "CouldNotReadInput"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "LangError"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 11
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 11,
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
                      "type": 12
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
              "type": 12
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 13,
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
                  "name": "PhaseDeactivate"
                },
                {
                  "index": 29,
                  "name": "WhitelistNotExist"
                },
                {
                  "index": 30,
                  "name": "WithdrawFeeError"
                },
                {
                  "index": 31,
                  "name": "WithdrawNFTError"
                },
                {
                  "index": 32,
                  "name": "WithdrawPSP22Error"
                },
                {
                  "index": 33,
                  "name": "NotListed"
                },
                {
                  "index": 34,
                  "name": "BidAlreadyExist"
                },
                {
                  "index": 35,
                  "name": "BidNotExist"
                },
                {
                  "index": 36,
                  "name": "NotInMarket"
                },
                {
                  "index": 37,
                  "name": "NotForSale"
                },
                {
                  "index": 38,
                  "name": "NotInSaleList"
                },
                {
                  "index": 39,
                  "name": "InvalidBidLength"
                },
                {
                  "index": 40,
                  "name": "InvalidCollectionOwner"
                },
                {
                  "index": 41,
                  "name": "InvalidTime"
                },
                {
                  "index": 42,
                  "name": "RewardStarted"
                },
                {
                  "index": 43,
                  "name": "RewardNotStarted"
                },
                {
                  "index": 44,
                  "name": "ClaimMustBeFalse"
                },
                {
                  "fields": [
                    {
                      "type": 14,
                      "typeName": "OwnableError"
                    }
                  ],
                  "index": 45,
                  "name": "OwnableError"
                },
                {
                  "fields": [
                    {
                      "type": 15,
                      "typeName": "AccessControlError"
                    }
                  ],
                  "index": 46,
                  "name": "AccessControlError"
                },
                {
                  "fields": [
                    {
                      "type": 16,
                      "typeName": "PSP22Error"
                    }
                  ],
                  "index": 47,
                  "name": "PSP22Error"
                },
                {
                  "fields": [
                    {
                      "type": 18,
                      "typeName": "PSP34Error"
                    }
                  ],
                  "index": 48,
                  "name": "PSP34Error"
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
        "id": 13,
        "type": {
          "def": {
            "primitive": "str"
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
        "id": 15,
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
        "id": 16,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 17,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "index": 1,
                  "name": "InsufficientBalance"
                },
                {
                  "index": 2,
                  "name": "InsufficientAllowance"
                },
                {
                  "index": 3,
                  "name": "ZeroRecipientAddress"
                },
                {
                  "index": 4,
                  "name": "ZeroSenderAddress"
                },
                {
                  "fields": [
                    {
                      "type": 17,
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
            "psp22",
            "PSP22Error"
          ]
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 17,
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
                      "type": 17,
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
        "id": 19,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 7
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 7
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 5
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 5
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 0
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 0
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 6
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 6
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 24
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 24
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 24,
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
                      "type": 6
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
              "type": 6
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 26
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 26
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 26,
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
        "id": 27,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 28
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 28
            },
            {
              "name": "E",
              "type": 9
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
        "id": 29,
        "type": {
          "def": {
            "sequence": {
              "type": 6
            }
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
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 31
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
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
                      "type": 15
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
              "type": 15
            }
          ],
          "path": [
            "Result"
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
                  "fields": [
                    {
                      "type": 4
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 4
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
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
                  "fields": [
                    {
                      "type": 34
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 34
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
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
                      "type": 14
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
              "type": 14
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 35,
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
                      "type": 36,
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
                      "type": 6,
                      "typeName": "u64"
                    }
                  ],
                  "index": 3,
                  "name": "U64"
                },
                {
                  "fields": [
                    {
                      "type": 7,
                      "typeName": "u128"
                    }
                  ],
                  "index": 4,
                  "name": "U128"
                },
                {
                  "fields": [
                    {
                      "type": 17,
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
        "id": 36,
        "type": {
          "def": {
            "primitive": "u16"
          }
        }
      }
    ],
    "version": "4"
  }
};

export default staking;
