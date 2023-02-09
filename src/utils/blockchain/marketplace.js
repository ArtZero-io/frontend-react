const marketplace = {
  CONTRACT_ADDRESS: "ZcGHrygjCDPHt1M5yrNxED6vsnH9JrQ5sUzZbGoQ8EeN7d8",
  CONTRACT_ABI: {
    "source": {
      "hash": "0xeefdf4ee2b22e6e32895115a912015f5afc91bca34845d292f03fed0dd08c968",
      "language": "ink! 4.0.0-beta",
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
      "name": "artzero_marketplace_psp34",
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
          "returnType": {
            "displayName": [
              "ink_primitives",
              "ConstructorResult"
            ],
            "type": 13
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
              "label": "trader",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 38
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
                "type": 38
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
                "type": 21
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
                "type": 6
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
                "type": 38
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
                "type": 38
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
                "type": 21
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
                "type": 38
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
                "type": 38
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
                "type": 38
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
                "type": 21
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
                "type": 6
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
                "type": 6
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "royalty_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
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
                "type": 38
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
                "type": 38
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
                "type": 38
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
                "type": 21
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
                "type": 6
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
                "type": 6
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "royalty_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "BidWinEvent"
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
                "type": 38
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
                "type": 38
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
                "type": 38
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
                "type": 21
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
                "type": 6
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "bid_value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "BidEvent"
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
                "type": 38
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
                "type": 38
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
                "type": 38
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
                "type": 21
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "bid_value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "RemoveBidEvent"
        }
      ],
      "lang_error": {
        "displayName": [
          "ink",
          "LangError"
        ],
        "type": 14
      },
      "messages": [
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
          "label": "initialize",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0xf2f6dba3"
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
                "type": 21
              }
            },
            {
              "label": "price",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [
            " List the NFT onto the marketplace - FREE of charge"
          ],
          "label": "list",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 21
              }
            }
          ],
          "docs": [
            " Unlist the NFT from the marketplace - FREE of charge"
          ],
          "label": "unlist",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 15
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
            " Set new collection contract address - Only Owner"
          ],
          "label": "set_collection_contract_address",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0xe84bde5a"
        },
        {
          "args": [
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
          "docs": [
            " Set Platform fee - only owner"
          ],
          "label": "set_platform_fee",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0x2c5b83f1"
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
            " Set new staking contract address - Only Owner"
          ],
          "label": "set_staking_contract_address",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
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
                "type": 9
              }
            },
            {
              "label": "rates",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Set criteria and discount rate - Only Owner 2 vectors same size"
          ],
          "label": "set_discount",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0x693e798c"
        },
        {
          "args": [
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
            " Receive hold amount"
          ],
          "label": "receive_hold_amount",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0x0ce0eacb"
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
                "type": 21
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
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0xfd066a27"
        },
        {
          "args": [],
          "docs": [
            " Get platform fee"
          ],
          "label": "get_platform_fee",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 25
          },
          "selector": "0xd11d7ceb"
        },
        {
          "args": [],
          "docs": [
            " Get Staking Discount Criteria"
          ],
          "label": "get_staking_discount_criteria",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 26
          },
          "selector": "0xac3b80e4"
        },
        {
          "args": [],
          "docs": [
            " Get Staking Discount Rates"
          ],
          "label": "get_staking_discount_rate",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 27
          },
          "selector": "0xc32f36d7"
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
            " Get listed token count by collection address"
          ],
          "label": "get_listed_token_count_by_collection_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 28
          },
          "selector": "0x7eecb2bb"
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
                "type": 6
              }
            }
          ],
          "docs": [
            " Get all token ids currently for sale for a collection (nft_contract_address,user_account)"
          ],
          "label": "get_for_sale_token_id",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 29
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
            " Get get total sale token ids of user account in a contract"
          ],
          "label": "get_sale_tokens_ids_count",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 31
          },
          "selector": "0x80e40497"
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
            " Get all token ids currently for sale by a collection (nft_contract_address,user_account)"
          ],
          "label": "total_tokens_for_sale",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 31
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
                "type": 21
              }
            }
          ],
          "docs": [
            " Get all bids from (NFT Contract Address, User Address, token ID)"
          ],
          "label": "get_all_bids",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 32
          },
          "selector": "0xb36025ae"
        },
        {
          "args": [],
          "docs": [
            " Get collection contract address"
          ],
          "label": "get_collection_contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 34
          },
          "selector": "0x792a738a"
        },
        {
          "args": [],
          "docs": [
            " Get staking contract address"
          ],
          "label": "get_staking_contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 34
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
              "ink",
              "MessageResult"
            ],
            "type": 31
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
              "ink",
              "MessageResult"
            ],
            "type": 31
          },
          "selector": "0xc4fd2cdc"
        },
        {
          "args": [],
          "docs": [
            " Get platform total Profit"
          ],
          "label": "get_total_profit",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 31
          },
          "selector": "0xc7198ed4"
        },
        {
          "args": [],
          "docs": [
            " Get platform current available profit"
          ],
          "label": "get_current_profit",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 31
          },
          "selector": "0xe741ad59"
        },
        {
          "args": [
            {
              "label": "bidder",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Get hold amount of bidder"
          ],
          "label": "get_hold_amount_of_bidder",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 35
          },
          "selector": "0xa5f3c458"
        },
        {
          "args": [
            {
              "label": "index",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              }
            }
          ],
          "docs": [
            " Get Hold Bidders by Index"
          ],
          "label": "get_hold_bidders_by_index",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 37
          },
          "selector": "0x67fb786c"
        },
        {
          "args": [],
          "docs": [
            " Get Hold Bidder Count"
          ],
          "label": "get_hold_bidder_count",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 28
          },
          "selector": "0xd89d9ef2"
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
            },
            {
              "label": "reciever",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Withdraw Profit - only Contract Owner."
          ],
          "label": "withdraw_profit",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 15
          },
          "selector": "0x8bb87aca"
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
              "ink",
              "MessageResult"
            ],
            "type": 39
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
              "ink",
              "MessageResult"
            ],
            "type": 34
          },
          "selector": "0x4fa43c8c"
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
            "type": 15
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
                "type": 21
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
            "type": 15
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
            "type": 15
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
            "type": 15
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
              },
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
                        "name": "collection_contract_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "staking_contract_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 4
                          }
                        },
                        "name": "platform_fee"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0xe085e048",
                                        "ty": 0
                                      }
                                    },
                                    "name": "nft_owner"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0xe085e048",
                                        "ty": 5
                                      }
                                    },
                                    "name": "listed_date"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0xe085e048",
                                        "ty": 6
                                      }
                                    },
                                    "name": "price"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0xe085e048",
                                        "ty": 7
                                      }
                                    },
                                    "name": "is_for_sale"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0xe085e048",
                                        "ty": 4
                                      }
                                    },
                                    "name": "royalty_fee_at_listing"
                                  }
                                ],
                                "name": "ForSaleItem"
                              }
                            },
                            "root_key": "0xe085e048"
                          }
                        },
                        "name": "market_list"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "enum": {
                                "dispatchKey": "0x6425801d",
                                "name": "Id",
                                "variants": {
                                  "0": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 2
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "U8"
                                  },
                                  "1": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 8
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "U16"
                                  },
                                  "2": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 4
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "U32"
                                  },
                                  "3": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 5
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "U64"
                                  },
                                  "4": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 6
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "U128"
                                  },
                                  "5": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6425801d",
                                            "ty": 9
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "Bytes"
                                  }
                                }
                              }
                            },
                            "root_key": "0x6425801d"
                          }
                        },
                        "name": "sale_tokens_ids"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x29db47dd",
                                "ty": 6
                              }
                            },
                            "root_key": "0x29db47dd"
                          }
                        },
                        "name": "sale_tokens_ids_last_index"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x95cccd4a",
                                "ty": 6
                              }
                            },
                            "root_key": "0x95cccd4a"
                          }
                        },
                        "name": "hold_amount_bidders"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xdef3dadf",
                                "ty": 0
                              }
                            },
                            "root_key": "0xdef3dadf"
                          }
                        },
                        "name": "hold_bidders"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xcae85473",
                                "ty": 10
                              }
                            },
                            "root_key": "0xcae85473"
                          }
                        },
                        "name": "bidders"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xcc2c42ce",
                                "ty": 5
                              }
                            },
                            "root_key": "0xcc2c42ce"
                          }
                        },
                        "name": "listed_token_number_by_collection_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "total_volume"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xf60a4864",
                                "ty": 6
                              }
                            },
                            "root_key": "0xf60a4864"
                          }
                        },
                        "name": "volume_by_collection"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x1956473f",
                                "ty": 6
                              }
                            },
                            "root_key": "0x1956473f"
                          }
                        },
                        "name": "volume_by_user"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "total_profit"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "current_profit"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 9
                          }
                        },
                        "name": "staking_discount_criteria"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 12
                          }
                        },
                        "name": "staking_discount_rate"
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
              }
            ],
            "name": "ArtZeroMarketplacePSP34"
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
            "primitive": "bool"
          }
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
            "composite": {
              "fields": [
                {
                  "name": "bidder",
                  "type": 0,
                  "typeName": "AccountId"
                },
                {
                  "name": "bid_date",
                  "type": 5,
                  "typeName": "u64"
                },
                {
                  "name": "bid_value",
                  "type": 6,
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
        "id": 12,
        "type": {
          "def": {
            "sequence": {
              "type": 8
            }
          }
        }
      },
      {
        "id": 13,
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
        "id": 14,
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
        "id": 15,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 16
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
              "type": 16
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
        "id": 16,
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
                      "type": 17
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
              "type": 17
            }
          ],
          "path": [
            "Result"
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
                      "type": 18,
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
                      "type": 19,
                      "typeName": "OwnableError"
                    }
                  ],
                  "index": 44,
                  "name": "OwnableError"
                },
                {
                  "fields": [
                    {
                      "type": 20,
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
        "id": 18,
        "type": {
          "def": {
            "primitive": "str"
          }
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
        "id": 21,
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
                      "type": 9,
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
        "id": 22,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 23
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
              "type": 23
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
        "id": 23,
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
        "id": 24,
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
                  "type": 5,
                  "typeName": "u64"
                },
                {
                  "name": "price",
                  "type": 6,
                  "typeName": "Balance"
                },
                {
                  "name": "is_for_sale",
                  "type": 7,
                  "typeName": "bool"
                },
                {
                  "name": "royalty_fee_at_listing",
                  "type": 4,
                  "typeName": "u32"
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
        "id": 25,
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
              "type": 4
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
        "id": 26,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 9
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
              "type": 9
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
        "id": 27,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 12
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
              "type": 12
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
        "id": 28,
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
              "type": 5
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
        "id": 29,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 30
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
              "type": 30
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
        "id": 30,
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
                      "type": 21
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
              "type": 21
            }
          ],
          "path": [
            "Option"
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
                      "type": 6
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
              "type": 6
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
        "id": 32,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 33
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
              "type": 33
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
                      "type": 0
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
              "type": 0
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
                      "type": 36
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
              "type": 36
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
        "id": 36,
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
        "id": 37,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 38
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
              "type": 38
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
        "id": 39,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 40
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
              "type": 40
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
        "id": 40,
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
      }
    ],
    "version": "4"
  }
};

export default marketplace;
