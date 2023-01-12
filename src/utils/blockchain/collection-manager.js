const collection_manager = {
  CONTRACT_ADDRESS: "5CrRtY6u5QhRXuTUeYmEcnny8ZojXB7eyqQWoqVcQBN1RKf5",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x74684aaee538f3bb6fd7460270eea2b72a43213207d6966729afc2b0b00f3952",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_collection_manager",
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
                "label": "standard_nft_hash",
                "type": {
                  "displayName": [
                    "Hash"
                  ],
                  "type": 12
                }
              },
              {
                "label": "simple_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              },
              {
                "label": "advance_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              },
              {
                "label": "max_royalty_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              "Collection Contract Manager manages all collections on ArtZero platform. User can create in simple mode or in advanced mode",
              "In Simple mode, the contract will automatically create the standard NFT contract for the User",
              "In Advanced mode, user creates their own customized NFT Contract and add the contract address to the Collection Manager"
            ],
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
                "label": "collection_owner",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 42
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
                  "type": 42
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "contract_type",
                "type": {
                  "displayName": [
                    "CollectionType"
                  ],
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "is_active",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "show_on_chain_metadata",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              }
            ],
            "docs": [],
            "label": "AddNewCollectionEvent"
          }
        ],
        "messages": [
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
              },
              {
                "label": "simple_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              },
              {
                "label": "advance_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              },
              {
                "label": "max_royalty_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
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
              "type": 34
            },
            "selector": "0xf2f6dba3"
          },
          {
            "args": [
              {
                "label": "nft_name",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 31
                }
              },
              {
                "label": "nft_symbol",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 31
                }
              },
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              },
              {
                "label": "attribute_vals",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              },
              {
                "label": "is_collect_royalty_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              },
              {
                "label": "royalty_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Simple New Collection Creation - Auto create NFT Contract - Collection_Owner is owner of NFT contract and receive royalty fee"
            ],
            "label": "auto_new_collection",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x05c561cd"
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
              },
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              },
              {
                "label": "attribute_vals",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              },
              {
                "label": "is_collect_royalty_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              },
              {
                "label": "royalty_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Advanced Add new collection - with fee in AZERO 1% = 100 - anyone can add Existing contract - Collection_Owner is owner of NFT contract and receive royal fee"
            ],
            "label": "add_new_collection",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x36193f5f"
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
                "label": "new_owner",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Update Owner of Collecion - who receive royalty fee - Only Admin can change"
            ],
            "label": "update_collection_owner",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x5c7d9082"
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
              " Update NFT Contract Address of a collection - Only Admin Role can change"
            ],
            "label": "update_nft_contract_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x6500109f"
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
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              },
              {
                "label": "values",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              }
            ],
            "docs": [
              " Set attributes for the collections"
            ],
            "label": "set_multiple_attributes",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x8119d25e"
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
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 38
                }
              }
            ],
            "docs": [],
            "label": "get_attributes",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Vec"
              ],
              "type": 38
            },
            "selector": "0x8d76b3fe"
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
                "label": "attribute_key",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 31
                }
              }
            ],
            "docs": [],
            "label": "get_attribute",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "String"
              ],
              "type": 31
            },
            "selector": "0x97f86da4"
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
                "label": "attribute_key",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 31
                }
              }
            ],
            "docs": [
              " Check collection has an attribute"
            ],
            "label": "has_attribute",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 18
            },
            "selector": "0xad107a1c"
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
                "label": "attribute_key",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 31
                }
              }
            ],
            "docs": [
              " Get attribute index of collection"
            ],
            "label": "get_collection_attribute_index",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 39
            },
            "selector": "0x3e3fd068"
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
              }
            ],
            "docs": [
              " Count attributes of collection"
            ],
            "label": "get_collection_attribute_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 39
            },
            "selector": "0xc1763e9b"
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
                "label": "contract_type",
                "type": {
                  "displayName": [
                    "CollectionType"
                  ],
                  "type": 17
                }
              }
            ],
            "docs": [
              " Update Type Collection - Only Admin Role can change - 1: Manual 2: Auto"
            ],
            "label": "update_contract_type",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0xeb59ea76"
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
                "label": "is_collect_royalty_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              }
            ],
            "docs": [
              " Update Is Royalty Fee - Only Admin Role can change"
            ],
            "label": "update_is_collect_royalty_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0xb92832e7"
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
                "label": "new_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Update royalty fee of an NFT Collection - Only Admin Role can change"
            ],
            "label": "update_royalty_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0xa347ca95"
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
                "label": "show_on_chain_metadata",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              }
            ],
            "docs": [
              " Update show_on_chain_metadata - admin and collection owner can change"
            ],
            "label": "update_show_on_chain_metadata",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x0fb1f1cf"
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
                "label": "is_active",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 18
                }
              }
            ],
            "docs": [
              " Update Active Status When its active, collection will be shown on the UI and will be tradable - only Admin can change"
            ],
            "label": "update_is_active",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x33ad2887"
          },
          {
            "args": [
              {
                "label": "simple_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              }
            ],
            "docs": [
              " Update Simple Mode Adding Collection Fee - only Owner"
            ],
            "label": "update_simple_mode_adding_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0xb3bb96b4"
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
              " Update Standard NFT Hash - only Owner"
            ],
            "label": "update_standard_nft_hash",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0xad51a976"
          },
          {
            "args": [
              {
                "label": "advance_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 14
                }
              }
            ],
            "docs": [
              " Update Advance Mode Adding Collection Fee - only Owner"
            ],
            "label": "update_advance_mode_adding_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x4b11f798"
          },
          {
            "args": [
              {
                "label": "max_royalty_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 5
                }
              }
            ],
            "docs": [
              " Update Max Royalty Fee Rate - only Owner"
            ],
            "label": "update_max_royalty_fee_rate",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 34
            },
            "selector": "0x8d0b94ef"
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
              " Get Collection Information by Collection Address (NFT address)"
            ],
            "label": "get_collection_by_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 40
            },
            "selector": "0x786d1a79"
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
              " Get All Collection Addresses by Owner Address"
            ],
            "label": "get_collections_by_owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 41
            },
            "selector": "0x83091e54"
          },
          {
            "args": [],
            "docs": [
              " Get Standard Nft Hash"
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
            "docs": [
              " Get Collection Contract by ID"
            ],
            "label": "get_contract_by_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 42
            },
            "selector": "0x672b1346"
          },
          {
            "args": [],
            "docs": [
              " Get Collection Count"
            ],
            "label": "get_collection_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 13
            },
            "selector": "0x95c014c7"
          },
          {
            "args": [],
            "docs": [
              " Get Collection Count"
            ],
            "label": "get_active_collection_count",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 13
            },
            "selector": "0xe149966a"
          },
          {
            "args": [],
            "docs": [
              " Get Simple Mode Adding Fee"
            ],
            "label": "get_simple_mode_adding_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 14
            },
            "selector": "0x97db002d"
          },
          {
            "args": [],
            "docs": [
              " Get Advance Mode Adding Fee"
            ],
            "label": "get_advance_mode_adding_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 14
            },
            "selector": "0xa333e69e"
          },
          {
            "args": [],
            "docs": [
              " Get Royalty Max Fee"
            ],
            "label": "get_max_royalty_fee_rate",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u32"
              ],
              "type": 5
            },
            "selector": "0x8c734238"
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
              "type": 18
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
              "type": 43
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
              "type": 43
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
              "type": 43
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
              "type": 44
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
              "type": 44
            },
            "selector": "0x11f43efd"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "artzerocollectiontrait_external",
                    "GetRoyaltyFeeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function returns royalty fee of a Collection"
            ],
            "label": "ArtZeroCollectionTrait::get_royalty_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerocollectiontrait_external",
                "GetRoyaltyFeeOutput"
              ],
              "type": 5
            },
            "selector": "0xfd0ba95a"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "artzerocollectiontrait_external",
                    "IsActiveInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function checks if the Collection is active or not. Only Active Collections can be seen on the Marketplace"
            ],
            "label": "ArtZeroCollectionTrait::is_active",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerocollectiontrait_external",
                "IsActiveOutput"
              ],
              "type": 18
            },
            "selector": "0x08c3a1b4"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "artzerocollectiontrait_external",
                    "GetContractTypeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function returns NFT Contract Type. When the collection is created using auto_new_collection, this set to 2 and when using add_new_collection, this set to 1. Contract Type is to identify if the contract is standard or customized one."
            ],
            "label": "ArtZeroCollectionTrait::get_contract_type",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerocollectiontrait_external",
                "GetContractTypeOutput"
              ],
              "type": 17
            },
            "selector": "0xdcd3b8f4"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "artzerocollectiontrait_external",
                    "GetCollectionOwnerInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " This function returns the Owner of a Collection"
            ],
            "label": "ArtZeroCollectionTrait::get_collection_owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "artzerocollectiontrait_external",
                "GetCollectionOwnerOutput"
              ],
              "type": 42
            },
            "selector": "0xeb3b33fd"
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
                  "type": 14
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
              "type": 34
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
                  "type": 45
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
              "type": 34
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
                  "type": 14
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
              "type": 34
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
                          "key": "0xa15a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "standard_nft_hash"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa25a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "collection_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa35a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 14
                        }
                      },
                      "name": "simple_mode_adding_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa45a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 14
                        }
                      },
                      "name": "advance_mode_adding_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa55a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 15
                        }
                      },
                      "name": "collections"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa65a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 21
                        }
                      },
                      "name": "collections_by_id"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa75a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 24
                        }
                      },
                      "name": "collections_by_owner"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa85a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "max_royalty_fee_rate"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xa95a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "active_collection_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xaa5a5f6200000000000000000000000000000000000000000000000000000000",
                          "ty": 28
                        }
                      },
                      "name": "attributes"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xab5a5f6200000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xac5a5f6200000000000000000000000000000000000000000000000000000000",
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
              "primitive": "u128"
            }
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 19
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
                "type": 16
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
          "id": 16,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "collection_owner",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "nft_contract_address",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "contract_type",
                    "type": 17,
                    "typeName": "CollectionType"
                  },
                  {
                    "name": "is_collect_royalty_fee",
                    "type": 18,
                    "typeName": "bool"
                  },
                  {
                    "name": "royalty_fee",
                    "type": 5,
                    "typeName": "u32"
                  },
                  {
                    "name": "is_active",
                    "type": 18,
                    "typeName": "bool"
                  },
                  {
                    "name": "show_on_chain_metadata",
                    "type": 18,
                    "typeName": "bool"
                  }
                ]
              }
            },
            "path": [
              "artzero_project",
              "impls",
              "collection_manager",
              "data",
              "Collection"
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
                    "index": 0,
                    "name": "Unknown"
                  },
                  {
                    "index": 1,
                    "name": "Psp34Manual"
                  },
                  {
                    "index": 2,
                    "name": "Psp34Auto"
                  },
                  {
                    "index": 3,
                    "name": "Psp1155Manual"
                  },
                  {
                    "index": 4,
                    "name": "Psp1155Auto"
                  },
                  {
                    "index": 5,
                    "name": "Reserved1"
                  },
                  {
                    "index": 6,
                    "name": "Reserved2"
                  }
                ]
              }
            },
            "path": [
              "artzero_project",
              "traits",
              "collection_manager",
              "CollectionType"
            ]
          }
        },
        {
          "id": 18,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 19,
          "type": {
            "def": {
              "sequence": {
                "type": 20
              }
            }
          }
        },
        {
          "id": 20,
          "type": {
            "def": {
              "tuple": [
                0,
                16
              ]
            }
          }
        },
        {
          "id": 21,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 22
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
          "id": 22,
          "type": {
            "def": {
              "sequence": {
                "type": 23
              }
            }
          }
        },
        {
          "id": 23,
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
          "id": 24,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 26
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
                "type": 25
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
                "type": 0
              }
            }
          }
        },
        {
          "id": 26,
          "type": {
            "def": {
              "sequence": {
                "type": 27
              }
            }
          }
        },
        {
          "id": 27,
          "type": {
            "def": {
              "tuple": [
                0,
                25
              ]
            }
          }
        },
        {
          "id": 28,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 32
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
                "type": 29
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
          "id": 29,
          "type": {
            "def": {
              "sequence": {
                "type": 30
              }
            }
          }
        },
        {
          "id": 30,
          "type": {
            "def": {
              "tuple": [
                31,
                31
              ]
            }
          }
        },
        {
          "id": 31,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 32,
          "type": {
            "def": {
              "sequence": {
                "type": 33
              }
            }
          }
        },
        {
          "id": 33,
          "type": {
            "def": {
              "tuple": [
                0,
                29
              ]
            }
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
                        "type": 35
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
                "type": 35
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
                        "type": 31,
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
                        "type": 36,
                        "typeName": "OwnableError"
                      }
                    ],
                    "index": 44,
                    "name": "OwnableError"
                  },
                  {
                    "fields": [
                      {
                        "type": 37,
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
          "id": 36,
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
          "id": 37,
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
          "id": 38,
          "type": {
            "def": {
              "sequence": {
                "type": 31
              }
            }
          }
        },
        {
          "id": 39,
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
                        "type": 13
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
                "type": 13
              }
            ],
            "path": [
              "Option"
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
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 16
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
                "type": 16
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 41,
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
                        "type": 25
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
                "type": 25
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 42,
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
          "id": 43,
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
                        "type": 37
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
                "type": 37
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
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 36
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
                "type": 36
              }
            ],
            "path": [
              "Result"
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
                        "type": 46,
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
                        "type": 14,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 47,
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
          "id": 46,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 47,
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

export default collection_manager;
