const staking = {
  CONTRACT_ADDRESS: "5CtswbWCSpb3Qh2vz7Y3oEMpiHqNi8JidMLVaVAt7sz3ex3d",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x0181febd4e00ac38a98e750b6be9baadaf643f45deca9581df4c828bc2dc2cff",
      "language": "ink! 3.3.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_staking_nft",
      "version": "1.1.0",
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
                "label": "contract_owner",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
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
                  "type": 11
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
                  "type": 11
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
                  "type": 11
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
                  "type": 11
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
                  "type": 11
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
                  "type": 15
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
                  "type": 15
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
                "Result"
              ],
              "type": 17
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
              "type": 19
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
                "Result"
              ],
              "type": 19
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
              "type": 19
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
                  "type": 4
                }
              }
            ],
            "docs": [
              " Update is locked - only Admin"
            ],
            "label": "update_is_locked",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 19
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
              "type": 19
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
              "type": 19
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
              "type": 19
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
              "type": 19
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
              "type": 19
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
              "type": 15
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
              "type": 15
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
              "type": 4
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
              "type": 4
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
              "type": 4
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
                "u64"
              ],
              "type": 6
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
                "u64"
              ],
              "type": 6
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
                "u64"
              ],
              "type": 6
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
                "Option"
              ],
              "type": 11
            },
            "selector": "0x9698ca4b"
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
                "u64"
              ],
              "type": 6
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
              "type": 6
            },
            "selector": "0x02c779a5"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_limit_unstake_time",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 6
            },
            "selector": "0x50d71ce0"
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
              "type": 6
            },
            "selector": "0xf7c0188d"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 22
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
              "type": 19
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
                  "type": 22
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
              "type": 19
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
                  "type": 22
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
              "type": 19
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
                  "type": 22
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
              "type": 19
            },
            "selector": "0x82364901"
          },
          {
            "args": [
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 15
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
              "type": 19
            },
            "selector": "0x07fdb555"
          },
          {
            "args": [
              {
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 23
                }
              },
              {
                "label": "receiver",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Transfer NFT token"
            ],
            "label": "tranfer_nft",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 19
            },
            "selector": "0xd34ab274"
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
              "type": 17
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
                "ownable_external",
                "TransferOwnershipOutput"
              ],
              "type": 17
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
              "type": 0
            },
            "selector": "0x4fa43c8c"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "crossartzerostaking_external",
                    "GetTotalStakedByAccountInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get User NFT staked in the contract"
            ],
            "label": "CrossArtZeroStaking::get_total_staked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerostaking_external",
                "GetTotalStakedByAccountOutput"
              ],
              "type": 6
            },
            "selector": "0x487f1cac"
          },
          {
            "args": [
              {
                "label": "account",
                "type": {
                  "displayName": [
                    "crossartzerostaking_external",
                    "GetTotalPendingUnstakedByAccountInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get User NFT staked in the contract"
            ],
            "label": "CrossArtZeroStaking::get_total_pending_unstaked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerostaking_external",
                "GetTotalPendingUnstakedByAccountOutput"
              ],
              "type": 6
            },
            "selector": "0x3d9ff06d"
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
                          "key": "0x238cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                          "ty": 0
                        }
                      },
                      "name": "owner"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x248cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x258cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
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
                          "key": "0x75a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 4
                        }
                      },
                      "name": "is_locked"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x76a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 0
                        }
                      },
                      "name": "admin_address"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x77a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 5
                                }
                              },
                              "name": "account_to_index"
                            },
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x78a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 8
                                }
                              },
                              "name": "index_to_account"
                            }
                          ]
                        }
                      },
                      "name": "staked_accounts"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x79a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 6
                        }
                      },
                      "name": "staked_accounts_last_index"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x7aa8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 9
                                }
                              },
                              "name": "id_to_index"
                            },
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x7ba8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 9
                                }
                              },
                              "name": "index_to_id"
                            }
                          ]
                        }
                      },
                      "name": "staking_list"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7ca8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 12
                        }
                      },
                      "name": "staking_list_last_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7da8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 0
                        }
                      },
                      "name": "nft_contract_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7ea8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 6
                        }
                      },
                      "name": "total_staked"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x7fa8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 6
                        }
                      },
                      "name": "limit_unstake_time"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x80a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 13
                        }
                      },
                      "name": "pending_unstaking_list"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x81a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 9
                                }
                              },
                              "name": "id_to_index"
                            },
                            {
                              "layout": {
                                "cell": {
                                  "key": "0x82a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                                  "ty": 9
                                }
                              },
                              "name": "index_to_id"
                            }
                          ]
                        }
                      },
                      "name": "pending_unstaking_list_token_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x83a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 12
                        }
                      },
                      "name": "pending_unstaking_list_token_last_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x84a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 15
                        }
                      },
                      "name": "reward_pool"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x85a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 15
                        }
                      },
                      "name": "claimable_reward"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x86a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 4
                        }
                      },
                      "name": "reward_started"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x87a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "ty": 16
                        }
                      },
                      "name": "is_claimed"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x88a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x89a8af34f792d9122e22d4ecbeb5d9eecdad8988d17cc21e7f01474d6d3300b2",
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
              "primitive": "bool"
            }
          }
        },
        {
          "id": 5,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
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
                "type": 6
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
              "Key"
            ]
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 6
              },
              {
                "name": "V",
                "type": 0
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
          "id": 9,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 10
              },
              {
                "name": "V",
                "type": 6
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
          "id": 10,
          "type": {
            "def": {
              "tuple": [
                11,
                6
              ]
            }
          }
        },
        {
          "id": 11,
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
          "id": 12,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 11
              },
              {
                "name": "V",
                "type": 6
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
          "id": 13,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 14
              },
              {
                "name": "V",
                "type": 6
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
          "id": 14,
          "type": {
            "def": {
              "tuple": [
                0,
                6
              ]
            }
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "primitive": "u128"
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
                    "name": "offset_key",
                    "type": 7,
                    "typeName": "Key"
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
                "type": 4
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
          "id": 17,
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
                        "type": 18
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
                "type": 18
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 18,
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
          "id": 19,
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
                        "type": 20
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
                "type": 20
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
                        "type": 21,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "TokenOwnerNotMatch"
                  },
                  {
                    "index": 2,
                    "name": "NotApproved"
                  },
                  {
                    "index": 3,
                    "name": "CannotTransfer"
                  },
                  {
                    "index": 4,
                    "name": "OnlyOwner"
                  },
                  {
                    "index": 5,
                    "name": "OnlyAdmin"
                  }
                ]
              }
            },
            "path": [
              "artzero_staking_nft",
              "artzero_staking_nft",
              "Error"
            ]
          }
        },
        {
          "id": 21,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 22,
          "type": {
            "def": {
              "sequence": {
                "type": 6
              }
            }
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
                        "type": 24,
                        "typeName": "u16"
                      }
                    ],
                    "index": 1,
                    "name": "U16"
                  },
                  {
                    "fields": [
                      {
                        "type": 25,
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
                        "type": 15,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 26,
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
          "id": 24,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 25,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 26,
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
