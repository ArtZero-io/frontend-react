const marketplace = {
  CONTRACT_ADDRESS: "5GdY4WfQZ3kEDo8zSk618bHbfr1jgQJCdMtHMb58WnTt4GTS",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x65a3949437f1e92c7af54870e7fa96e6dd16d821c7732d83654db50f54e472bc",
      "language": "ink! 3.0.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "artzero_marketplace_psp34",
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
                "label": "contract_owner",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "collection_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "staking_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              },
              {
                "label": "platform_fee",
                "type": {
                  "displayName": [
                    "u32"
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
        "events": [
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "trader",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
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
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [],
            "label": "NewListEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "trader",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
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
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [],
            "label": "UnListEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "buyer",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "seller",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
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
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "platform_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [],
            "label": "PurchaseEvent"
          },
          {
            "args": [
              {
                "docs": [],
                "indexed": false,
                "label": "bidder",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "seller",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 17
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
                  "type": 17
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "platform_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "royal_fee",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [],
            "label": "BidWinEvent"
          }
        ],
        "messages": [
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              },
              {
                "label": "price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [
              " List the token on the marketplace - FREE"
            ],
            "label": "list",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x832a283f"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Unlist the token from the marketplace - FREE"
            ],
            "label": "unlist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x5aeeb315"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Buy Token at listed price"
            ],
            "label": "buy",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x15d62801"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Bid Token for sale, transferred_value() is the bidding price"
            ],
            "label": "bid",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x668d28a7"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Remove Bid From Active Sale"
            ],
            "label": "remove_bid",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x412b6e0f"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              },
              {
                "label": "bid_index",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 4
                }
              }
            ],
            "docs": [
              " Accept Bid"
            ],
            "label": "accept_bid",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x1856538b"
          },
          {
            "args": [
              {
                "label": "collection_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              "Set new collection contract address - Only Owner"
            ],
            "label": "set_collection_contract_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0xe84bde5a"
          },
          {
            "args": [
              {
                "label": "staking_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              "Set new staking contract address - Only Owner"
            ],
            "label": "set_staking_contract_address",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0xcf051612"
          },
          {
            "args": [
              {
                "label": "criteria",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 11
                }
              },
              {
                "label": "rates",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 27
                }
              }
            ],
            "docs": [
              "Set criteria and discount rate - Only Owner 2 vectors same size"
            ],
            "label": "set_discount",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0x693e798c"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
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
              "Transfer NFT token - Only Owner"
            ],
            "label": "tranfer_nft",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 28
            },
            "selector": "0xd34ab274"
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
                "label": "token_id",
                "type": {
                  "displayName": [
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Get market list information using NFT Collection and token ID"
            ],
            "label": "get_nft_sale_info",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 31
            },
            "selector": "0xfd066a27"
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
                "label": "user_account",
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
                    "u128"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [
              "Get all token ids currently for sale for a collection (nft_contract_address,user_account)"
            ],
            "label": "get_for_sale_token_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Id"
              ],
              "type": 7
            },
            "selector": "0x6ad3665a"
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
                "label": "user_account",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              "Get all token ids currently for sale by a collection (nft_contract_address,user_account)"
            ],
            "label": "total_tokens_for_sale",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u128"
              ],
              "type": 10
            },
            "selector": "0x153813dc"
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
                "label": "user_account",
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
                    "Id"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              "Get all bids from (NFT Contract Address, User Address, token ID)"
            ],
            "label": "get_all_bids",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 32
            },
            "selector": "0xb36025ae"
          },
          {
            "args": [],
            "docs": [
              "Get collection contract address"
            ],
            "label": "get_collection_contract_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            },
            "selector": "0x792a738a"
          },
          {
            "args": [],
            "docs": [
              "Get staking contract address"
            ],
            "label": "get_staking_contract_address",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            },
            "selector": "0x07c3a15f"
          },
          {
            "args": [],
            "docs": [
              " Get total platform volume"
            ],
            "label": "get_total_volume",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Balance"
              ],
              "type": 10
            },
            "selector": "0xe88330b2"
          },
          {
            "args": [
              {
                "label": "collection_contract_address",
                "type": {
                  "displayName": [
                    "AccountId"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [
              " Get total Collection volume"
            ],
            "label": "get_volume_by_collection",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 33
            },
            "selector": "0xc4fd2cdc"
          },
          {
            "args": [
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
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
              "type": 28
            },
            "selector": "0x07fdb555"
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
              "type": 34
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
              "type": 34
            },
            "selector": "0x11f43efd"
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
                  "ty": 0
                }
              },
              "name": "collection_contract_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "staking_contract_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                  "ty": 4
                }
              },
              "name": "platform_fee"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                  "ty": 5
                }
              },
              "name": "market_list"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                          "ty": 15
                        }
                      },
                      "name": "id_to_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                          "ty": 18
                        }
                      },
                      "name": "index_to_id"
                    }
                  ]
                }
              },
              "name": "sale_tokens_ids"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                  "ty": 20
                }
              },
              "name": "sale_tokens_ids_last_index"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                  "ty": 22
                }
              },
              "name": "bidders"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                  "ty": 10
                }
              },
              "name": "total_volume"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                  "ty": 26
                }
              },
              "name": "volume_by_collection"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 26
                }
              },
              "name": "volume_by_user"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 11
                }
              },
              "name": "staking_discount_criteria"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                  "ty": 27
                }
              },
              "name": "staking_discount_rate"
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
              "primitive": "u32"
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
                    "type": 14,
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
                "type": 12
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
              "tuple": [
                0,
                7
              ]
            }
          }
        },
        {
          "id": 7,
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
                        "type": 8,
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
                        "type": 9,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 10,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 11,
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
              "contracts",
              "traits",
              "psp34",
              "psp34",
              "Id"
            ]
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        },
        {
          "id": 11,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
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
                    "name": "nft_owner",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "listed_date",
                    "type": 9,
                    "typeName": "u64"
                  },
                  {
                    "name": "price",
                    "type": 10,
                    "typeName": "Balance"
                  },
                  {
                    "name": "is_for_sale",
                    "type": 13,
                    "typeName": "bool"
                  }
                ]
              }
            },
            "path": [
              "artzero_marketplace_psp34",
              "artzero_marketplace_psp34",
              "ForSaleItem"
            ]
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "primitive": "bool"
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
          "id": 15,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 14,
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
                "type": 10
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
                17,
                17,
                7
              ]
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
          "id": 18,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 14,
                    "typeName": "Key"
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
          "id": 19,
          "type": {
            "def": {
              "tuple": [
                17,
                17,
                10
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
                    "name": "offset_key",
                    "type": 14,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 21
              },
              {
                "name": "V",
                "type": 10
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
          "id": 21,
          "type": {
            "def": {
              "tuple": [
                17,
                17
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
                    "name": "offset_key",
                    "type": 14,
                    "typeName": "Key"
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
                "type": 24
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
          "id": 23,
          "type": {
            "def": {
              "tuple": [
                0,
                0,
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
              "composite": {
                "fields": [
                  {
                    "name": "bidder",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "bid_date",
                    "type": 9,
                    "typeName": "u64"
                  },
                  {
                    "name": "bid_value",
                    "type": 10,
                    "typeName": "Balance"
                  }
                ]
              }
            },
            "path": [
              "artzero_marketplace_psp34",
              "artzero_marketplace_psp34",
              "BidInformation"
            ]
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
                    "type": 14,
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
                "type": 10
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
              "sequence": {
                "type": 8
              }
            }
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
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 29
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
                "type": 29
              }
            ],
            "path": [
              "Result"
            ]
          }
        },
        {
          "id": 29,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 30,
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
                    "name": "NotListed"
                  },
                  {
                    "index": 5,
                    "name": "BidAlreadyExist"
                  },
                  {
                    "index": 6,
                    "name": "BidNotExist"
                  },
                  {
                    "index": 7,
                    "name": "NotEnoughBalance"
                  }
                ]
              }
            },
            "path": [
              "artzero_marketplace_psp34",
              "artzero_marketplace_psp34",
              "Error"
            ]
          }
        },
        {
          "id": 30,
          "type": {
            "def": {
              "primitive": "str"
            }
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
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 12
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
                "type": 12
              }
            ],
            "path": [
              "Option"
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
                        "type": 24
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
                "type": 24
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
                        "type": 10
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
                "type": 10
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

export default marketplace;