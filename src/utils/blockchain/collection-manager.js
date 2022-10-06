const collection_manager = {
  CONTRACT_ADDRESS: "5EF6G8JWP5H4pR6mHH3GvTHZJ5JbRR8eYHuHr1GbxTeFN2bZ",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x8db1ef367d8005dd754bc7c53da9977408fa395520e8e8b72147e56d9fc5d2b5",
      "language": "ink! 3.3.1",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_collection_manager",
      "version": "1.2.0",
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
                "label": "owner_address",
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
                  "type": 4
                }
              },
              {
                "label": "simple_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "advance_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "max_royal_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 10
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
                "label": "collection_owner",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 26
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
                  "type": 26
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "contract_type",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
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
                  "type": 9
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
                  "type": 9
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
                  "type": 4
                }
              },
              {
                "label": "simple_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "advance_mode_adding_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              },
              {
                "label": "max_royal_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 10
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
              "type": 18
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
                  "type": 20
                }
              },
              {
                "label": "nft_symbol",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 20
                }
              },
              {
                "label": "collection_owner",
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
                  "type": 21
                }
              },
              {
                "label": "attribute_vals",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 21
                }
              },
              {
                "label": "is_collect_royal_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 9
                }
              },
              {
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [
              " Simple New Collection Creation - Auto create NFT Contract - Collection_Owner is owner of NFT contract and receive royal fee"
            ],
            "label": "auto_new_collection",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
            },
            "selector": "0x05c561cd"
          },
          {
            "args": [
              {
                "label": "collection_owner",
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
              },
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 21
                }
              },
              {
                "label": "attribute_vals",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 21
                }
              },
              {
                "label": "is_collect_royal_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 9
                }
              },
              {
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 10
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
              "type": 22
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
              " Update Owner of Collecion - who receive royal fee - Only Admin can change"
            ],
            "label": "update_collection_owner",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
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
              " Update nft_contract_address - Only Admin can change"
            ],
            "label": "update_nft_contract_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
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
                  "type": 21
                }
              },
              {
                "label": "values",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 21
                }
              }
            ],
            "docs": [
              " Set multiple profile attributes"
            ],
            "label": "set_multiple_attributes",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
            },
            "selector": "0x8119d25e"
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
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 21
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
              "type": 21
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
                "label": "contract_type",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [
              " Update Type Collection - only Admin can change - 1: Manual 2: Auto"
            ],
            "label": "update_contract_type",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
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
                "label": "is_collect_royal_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 9
                }
              }
            ],
            "docs": [
              " Update Is Royal Fee - Only Admin can change"
            ],
            "label": "update_is_collect_royal_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
            },
            "selector": "0x96c46720"
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
                  "type": 10
                }
              }
            ],
            "docs": [
              " Update royal_fee - Only Admin can change"
            ],
            "label": "update_royal_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
            },
            "selector": "0x482ff6b1"
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
                  "type": 9
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
              "type": 22
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
                  "type": 9
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
              "type": 22
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
                  "type": 6
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
              "type": 22
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
                  "type": 4
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
              "type": 22
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
                  "type": 6
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
              "type": 22
            },
            "selector": "0x4b11f798"
          },
          {
            "args": [
              {
                "label": "max_royal_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [
              " Update Max Royal Fee Rate - only Owner"
            ],
            "label": "update_max_royal_fee_rate",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 22
            },
            "selector": "0xa4dfde0d"
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
              "type": 22
            },
            "selector": "0xb470cada"
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
              "type": 22
            },
            "selector": "0x07fdb555"
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
              "type": 24
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
              "type": 25
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
              "type": 4
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
                  "type": 5
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
              "type": 26
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
              "type": 5
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
              "type": 5
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
              "type": 6
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
              "type": 6
            },
            "selector": "0xa333e69e"
          },
          {
            "args": [],
            "docs": [
              " Get Admin Address"
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
            "args": [],
            "docs": [
              " Get Royal Max Fee"
            ],
            "label": "get_max_royal_fee_rate",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u32"
              ],
              "type": 10
            },
            "selector": "0x389a10e6"
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
              "type": 18
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
              "type": 18
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
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "crossartzerocollection_external",
                    "GetContractTypeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get NFT Contract Type 1 or 2 for PSP34"
            ],
            "label": "CrossArtZeroCollection::get_contract_type",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "GetContractTypeOutput"
              ],
              "type": 2
            },
            "selector": "0x81fa82e9"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "crossartzerocollection_external",
                    "GetCollectionOwnerInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get Collection Owner by Collection Address (NFT address)"
            ],
            "label": "CrossArtZeroCollection::get_collection_owner",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "GetCollectionOwnerOutput"
              ],
              "type": 26
            },
            "selector": "0xb1f1e401"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "crossartzerocollection_external",
                    "GetRoyalFeeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get royal fee of the Collection"
            ],
            "label": "CrossArtZeroCollection::get_royal_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "GetRoyalFeeOutput"
              ],
              "type": 10
            },
            "selector": "0xfa0f936e"
          },
          {
            "args": [
              {
                "label": "nft_contract_address",
                "type": {
                  "displayName": [
                    "crossartzerocollection_external",
                    "IsActiveInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Check if the Collection is active not"
            ],
            "label": "CrossArtZeroCollection::is_active",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "IsActiveOutput"
              ],
              "type": 9
            },
            "selector": "0x74687faf"
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
                          "key": "0xc495634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "standard_nft_hash"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc595634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "admin_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc695634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "collection_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc795634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 6
                        }
                      },
                      "name": "simple_mode_adding_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc895634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 6
                        }
                      },
                      "name": "advance_mode_adding_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xc995634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 7
                        }
                      },
                      "name": "collections"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xca95634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 12
                        }
                      },
                      "name": "collections_by_id"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xcb95634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 13
                        }
                      },
                      "name": "collections_by_owner"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xcc95634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 10
                        }
                      },
                      "name": "max_royal_fee_rate"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xcd95634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "active_collection_count"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0xce95634e00000000000000000000000000000000000000000000000000000000",
                          "ty": 15
                        }
                      },
                      "name": "attributes"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0xcf95634e00000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0xd095634e00000000000000000000000000000000000000000000000000000000",
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
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 11,
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
                "type": 8
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
          "id": 8,
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
                    "type": 2,
                    "typeName": "u8"
                  },
                  {
                    "name": "is_collect_royal_fee",
                    "type": 9,
                    "typeName": "bool"
                  },
                  {
                    "name": "royal_fee",
                    "type": 10,
                    "typeName": "u32"
                  },
                  {
                    "name": "is_active",
                    "type": 9,
                    "typeName": "bool"
                  },
                  {
                    "name": "show_on_chain_metadata",
                    "type": 9,
                    "typeName": "bool"
                  }
                ]
              }
            },
            "path": [
              "artzero_collection_manager",
              "artzero_collection_manager",
              "Collection"
            ]
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 11,
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
          "id": 12,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 11,
                    "typeName": "Key"
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
          "id": 13,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 11,
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
                "type": 14
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
              "sequence": {
                "type": 0
              }
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
                    "name": "offset_key",
                    "type": 11,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 16
              },
              {
                "name": "V",
                "type": 17
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
          "id": 16,
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
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 19
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
                "type": 19
              }
            ],
            "path": [
              "Result"
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
          "id": 20,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 21,
          "type": {
            "def": {
              "sequence": {
                "type": 20
              }
            }
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
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 23
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
                "type": 23
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
                        "type": 20,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "CollectionOwnerAndAdmin"
                  },
                  {
                    "index": 2,
                    "name": "OnlyOwner"
                  },
                  {
                    "index": 3,
                    "name": "OnlyAdmin"
                  },
                  {
                    "index": 4,
                    "name": "InvalidCaller"
                  }
                ]
              }
            },
            "path": [
              "artzero_collection_manager",
              "artzero_collection_manager",
              "Error"
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
          "id": 25,
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
                        "type": 14
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
                "type": 14
              }
            ],
            "path": [
              "Option"
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
        }
      ]
    }
  }
};

export default collection_manager;
