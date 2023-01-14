const launchpad_manager = {
  CONTRACT_ADDRESS: "5E7cDggyg5YeyyG3GXPq7iTu3J9A5HiEXoC24EJC1rzFjvg8",
  CONTRACT_ABI: {
    "source": {
      "hash": "0xc7b31c720a0e8290f9fcc511fe09725f56f5dc76f7c0a9dfe438e2dc03d9c3c3",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_launchpad_psp34",
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
                "label": "max_phases_per_project",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
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
                "label": "standard_nft_hash",
                "type": {
                  "displayName": [
                    "Hash"
                  ],
                  "type": 12
                }
              },
              {
                "label": "project_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 26
                }
              },
              {
                "label": "project_mint_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
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
                  "type": 13
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
                "label": "project_id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 13
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 37
                }
              }
            ],
            "docs": [],
            "label": "AddNewProjectEvent"
          }
        ],
        "messages": [
          {
            "args": [
              {
                "label": "max_phases_per_project",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "standard_nft_hash",
                "type": {
                  "displayName": [
                    "Hash"
                  ],
                  "type": 12
                }
              },
              {
                "label": "project_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 26
                }
              },
              {
                "label": "project_mint_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
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
                  "type": 13
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
                "label": "total_supply",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 13
                }
              },
              {
                "label": "start_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 13
                }
              },
              {
                "label": "end_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 13
                }
              },
              {
                "label": "project_info",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 29
                }
              },
              {
                "label": "code_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 32
                }
              },
              {
                "label": "is_public_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 33
                }
              },
              {
                "label": "public_minting_fee_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 34
                }
              },
              {
                "label": "public_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              },
              {
                "label": "public_max_minting_amount_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              },
              {
                "label": "start_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              },
              {
                "label": "end_time_phases",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 35
                }
              }
            ],
            "docs": [
              " Add new project"
            ],
            "label": "add_new_project",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x4b0a448e"
          },
          {
            "args": [
              {
                "label": "contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "start_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 13
                }
              },
              {
                "label": "end_time",
                "type": {
                  "displayName": [
                    "Timestamp"
                  ],
                  "type": 13
                }
              }
            ],
            "docs": [
              " Edit a project Start Time and End Time - Only Admin Role can change"
            ],
            "label": "edit_project",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x2cafbf63"
          },
          {
            "args": [
              {
                "label": "project_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 26
                }
              }
            ],
            "docs": [
              " Update project adding fee - Only Admin Role can change"
            ],
            "label": "update_project_adding_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x0c3b5043"
          },
          {
            "args": [
              {
                "label": "public_max_minting_amount",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 13
                }
              }
            ],
            "docs": [
              " Update public max minting amount - Only Admin Role can change"
            ],
            "label": "update_public_max_minting_amount",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 36
            },
            "selector": "0x15b7463b"
          },
          {
            "args": [
              {
                "label": "project_mint_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Update project mint fee rate - Only Admin Role can change"
            ],
            "label": "update_project_mint_fee_rate",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 36
            },
            "selector": "0xa81f0494"
          },
          {
            "args": [
              {
                "label": "standard_nft_hash",
                "type": {
                  "displayName": [
                    "Hash"
                  ],
                  "type": 12
                }
              }
            ],
            "docs": [
              " Update standard nft hash - Only Owner"
            ],
            "label": "update_standard_nft_hash",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0xad51a976"
          },
          {
            "args": [
              {
                "label": "is_active",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 16
                }
              },
              {
                "label": "contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Update is active project - Only Admin Role can change"
            ],
            "label": "update_is_active_project",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 27
            },
            "selector": "0x88efeaf2"
          },
          {
            "args": [],
            "docs": [
              " Get Project Adding Fee"
            ],
            "label": "get_project_adding_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 26
            },
            "selector": "0x57fe17e8"
          },
          {
            "args": [],
            "docs": [
              " Get active project count"
            ],
            "label": "get_active_project_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 13
            },
            "selector": "0xd86a7732"
          },
          {
            "args": [],
            "docs": [
              " Get project count"
            ],
            "label": "get_project_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 13
            },
            "selector": "0x5e97f98d"
          },
          {
            "args": [],
            "docs": [
              " Get standard nft hash"
            ],
            "label": "get_standard_nft_hash",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Hash"
              ],
              "type": 12
            },
            "selector": "0xbeb47f47"
          },
          {
            "args": [
              {
                "label": "id",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 13
                }
              }
            ],
            "docs": [],
            "label": "get_project_by_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 37
            },
            "selector": "0xbe4185f5"
          },
          {
            "args": [
              {
                "label": "owner_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get projects by owner address"
            ],
            "label": "get_projects_by_owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Vec"
              ],
              "type": 23
            },
            "selector": "0xf25b0961"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get project by NFT address"
            ],
            "label": "get_project_by_nft_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 38
            },
            "selector": "0x908e3150"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_max_phases_per_project",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u8"
              ],
              "type": 2
            },
            "selector": "0xc14ff7e1"
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
              "type": 16
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
              "type": 39
            },
            "selector": "0x11f43efd"
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
              "type": 39
            },
            "selector": "0x5e228753"
          },
          {
            "args": [],
            "docs": [
              " This function returns the rate in % that the launchpad will collect for each NFT minting"
            ],
            "label": "ArtZeroLaunchPadTrait::get_project_mint_fee_rate",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "GetProjectMintFeeRateOutput"
              ],
              "type": 5
            },
            "selector": "0x87b065fe"
          },
          {
            "args": [],
            "docs": [
              " This function returns the maximal amount of NFT that one can mint each time"
            ],
            "label": "ArtZeroLaunchPadTrait::get_public_max_minting_amount",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerolaunchpadtrait_external",
                "GetPublicMaxMintingAmountOutput"
              ],
              "type": 13
            },
            "selector": "0x5cae8061"
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
                  "type": 40
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
                  "type": 26
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
                  "type": 26
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
                          "key": "0xed3c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "standard_nft_hash"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xee3c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "project_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xef3c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 14
                        }
                      },
                      "name": "projects"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf03c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 19
                        }
                      },
                      "name": "projects_by_id"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf13c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 22
                        }
                      },
                      "name": "projects_by_owner"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf23c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "active_project_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf33c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 2
                        }
                      },
                      "name": "max_phases_per_project"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf43c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 26
                        }
                      },
                      "name": "project_adding_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf53c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "project_mint_fee_rate"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xf63c1fb700000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "public_max_minting_amount"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xf73c1fb700000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xf83c1fb700000000000000000000000000000000000000000000000000000000",
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
              "Hash"
            ]
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 14,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 17
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
          "id": 15,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "is_active",
                    "type": 16,
                    "typeName": "bool"
                  },
                  {
                    "name": "project_owner",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "total_supply",
                    "type": 13,
                    "typeName": "u64"
                  },
                  {
                    "name": "start_time",
                    "type": 13,
                    "typeName": "Timestamp"
                  },
                  {
                    "name": "end_time",
                    "type": 13,
                    "typeName": "Timestamp"
                  }
                ]
              }
            },
            "path": [
              "artzero_project",
              "impls",
              "launchpad_manager",
              "data",
              "Project"
            ]
          }
        },
        {
          "id": 16,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 17,
          "type": {
            "def": {
              "sequence": {
                "type": 18
              }
            }
          }
        },
        {
          "id": 18,
          "type": {
            "def": {
              "tuple": [
                0,
                15
              ]
            }
          }
        },
        {
          "id": 19,
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
                "type": 13
              },
              {
                "name": "V",
                "type": 0
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
                13,
                0
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
                "type": 0
              },
              {
                "name": "V",
                "type": 23
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
              "sequence": {
                "type": 0
              }
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
                0,
                23
              ]
            }
          }
        },
        {
          "id": 26,
          "type": {
            "def": {
              "primitive": "u128"
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
              "sequence": {
                "type": 29
              }
            }
          }
        },
        {
          "id": 33,
          "type": {
            "def": {
              "sequence": {
                "type": 16
              }
            }
          }
        },
        {
          "id": 34,
          "type": {
            "def": {
              "sequence": {
                "type": 26
              }
            }
          }
        },
        {
          "id": 35,
          "type": {
            "def": {
              "sequence": {
                "type": 13
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
          "id": 38,
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
                        "type": 15
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
                "type": 15
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 39,
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
          "id": 40,
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
                        "type": 41,
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
                        "type": 13,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 26,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 42,
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
          "id": 41,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 42,
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

export default launchpad_manager;
