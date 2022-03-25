const collection_manager = {
  CONTRACT_ADDRESS: "5EqQR1HWSS9rrywsbKNezfCejiF17JDG74S6QrRiuL8Gtjta",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x331270a776c7826dafcf2adcbf899f8b96a5f7f8186095d619e0f34c148db845",
      "language": "ink! 3.0.0",
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
                "label": "nft_name",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
                }
              },
              {
                "label": "nft_symbol",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
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
                "label": "name",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "description",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "avatar_image",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "header_image",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "is_collect_royal_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 10
                }
              },
              {
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 11
                }
              }
            ],
            "docs": [
              "Simple New Collection Creation - Auto create NFT Contract - Collection_Owner is owner of NFT contract and receive royal fee"
            ],
            "label": "auto_new_collection",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
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
                "label": "name",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "description",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "avatar_image",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "header_image",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "is_collect_royal_fee",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 10
                }
              },
              {
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 11
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
              "type": 17
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
              "type": 17
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
              "type": 17
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
                "label": "name",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
                }
              }
            ],
            "docs": [
              " Update Name - admin and collection owner can change"
            ],
            "label": "update_name",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0x63312534"
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
                "label": "description",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
                }
              }
            ],
            "docs": [
              " Update Description - admin and collection owner can change"
            ],
            "label": "update_description",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0x560bf87c"
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
                "label": "avatar_image",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
                }
              }
            ],
            "docs": [
              " Update Avatar Image - admin and collection owner can change"
            ],
            "label": "update_avatar_image",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0x7040bc0a"
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
                "label": "header_image",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 16
                }
              }
            ],
            "docs": [
              " Update header Image - admin and collection owner can change"
            ],
            "label": "update_header_image",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0xa7b9a9d9"
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
              " Update Type Collection - only Admin can change - 0 - PSP34 ERC721 ; 1 - ERC1155 PSP1155"
            ],
            "label": "update_contract_type",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
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
                  "type": 10
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
              "type": 17
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
                  "type": 11
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
              "type": 17
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
                  "type": 10
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
              "type": 17
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
                  "type": 10
                }
              }
            ],
            "docs": [
              " Update Active Status - only Admin can change",
              " When its active, collection will be shown on the UI and will be tradable"
            ],
            "label": "update_is_active",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0x33ad2887"
          },
          {
            "args": [
              {
                "label": "new_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 6
                }
              }
            ],
            "docs": [
              " Update Adding Collection Fee - only Owner"
            ],
            "label": "update_adding_fee",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 17
            },
            "selector": "0x5655700b"
          },
          {
            "args": [
              {
                "label": "max_royal_fee_rate",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 11
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
              "type": 17
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
              "type": 17
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
              "type": 17
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
              "type": 19
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
              "type": 20
            },
            "selector": "0x83091e54"
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
              "type": 21
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
              "Get Adding Fee"
            ],
            "label": "get_adding_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 6
            },
            "selector": "0x546e4dbf"
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
            "docs": [],
            "label": "Ownable::renounce_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "RenounceOwnershipOutput"
              ],
              "type": 22
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
            "docs": [],
            "label": "Ownable::transfer_ownership",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "ownable_external",
                "TransferOwnershipOutput"
              ],
              "type": 22
            },
            "selector": "0x11f43efd"
          },
          {
            "args": [],
            "docs": [],
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
                    "GetRoyalFeeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              "Get royal fee of the Collection"
            ],
            "label": "CrossArtZeroCollection::get_royal_fee",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "GetRoyalFeeOutput"
              ],
              "type": 11
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
              "Check if the Collection is active not"
            ],
            "label": "CrossArtZeroCollection::is_active",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerocollection_external",
                "IsActiveOutput"
              ],
              "type": 10
            },
            "selector": "0x74687faf"
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
              "type": 21
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
                    "GetContractTypeInput1"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              "Get NFT Contract Type 1 or 2 for PSP34"
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
                          "key": "0x8cd6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                          "ty": 0
                        }
                      },
                      "name": "owner"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x8dd6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x8ed6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
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
                "cell": {
                  "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "ty": 4
                }
              },
              "name": "standard_nft_hash"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "admin_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "collection_count"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                  "ty": 6
                }
              },
              "name": "adding_fee"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                  "ty": 7
                }
              },
              "name": "collections"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                  "ty": 13
                }
              },
              "name": "collections_by_id"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                  "ty": 14
                }
              },
              "name": "collections_by_owner"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                  "ty": 11
                }
              },
              "name": "max_royal_fee_rate"
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
                    "type": 12,
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
                    "name": "name",
                    "type": 9,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "description",
                    "type": 9,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "avatar_image",
                    "type": 9,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "header_image",
                    "type": 9,
                    "typeName": "Vec<u8>"
                  },
                  {
                    "name": "contract_type",
                    "type": 2,
                    "typeName": "u8"
                  },
                  {
                    "name": "is_collect_royal_fee",
                    "type": 10,
                    "typeName": "bool"
                  },
                  {
                    "name": "royal_fee",
                    "type": 11,
                    "typeName": "u32"
                  },
                  {
                    "name": "is_active",
                    "type": 10,
                    "typeName": "bool"
                  },
                  {
                    "name": "show_on_chain_metadata",
                    "type": 10,
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
              "sequence": {
                "type": 2
              }
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 11,
          "type": {
            "def": {
              "primitive": "u32"
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
              "ink_primitives",
              "Key"
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
                    "type": 12,
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
          "id": 14,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 12,
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
                "type": 15
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
          "id": 15,
          "type": {
            "def": {
              "sequence": {
                "type": 0
              }
            }
          }
        },
        {
          "id": 16,
          "type": {
            "def": {
              "primitive": "str"
            }
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
                    "fields": [
                      {
                        "type": 16,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  },
                  {
                    "index": 1,
                    "name": "AddressAlreadyExists"
                  },
                  {
                    "index": 2,
                    "name": "CollectionNotExist"
                  },
                  {
                    "index": 3,
                    "name": "OnlyOwner"
                  },
                  {
                    "index": 4,
                    "name": "OnlyAdmin"
                  },
                  {
                    "index": 5,
                    "name": "InvalidCaller"
                  },
                  {
                    "index": 6,
                    "name": "InvalidFee"
                  },
                  {
                    "index": 7,
                    "name": "InvalidRoyalFee"
                  },
                  {
                    "index": 8,
                    "name": "NotEnoughBalance"
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
          "id": 21,
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
              "contracts",
              "traits",
              "errors",
              "ownable",
              "OwnableError"
            ]
          }
        }
      ]
    }
  }
};

export default collection_manager;
