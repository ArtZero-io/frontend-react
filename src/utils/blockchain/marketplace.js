const marketplace = {
  CONTRACT_ADDRESS: "5GpE91q3a7qYoRdQuBcUBpJ1aEJpEkJ4yfWo2iCLE51ghsJ3",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x0fd6ab341e7f67702a8f44c11ca9e46b1816a449aef918ca4680c2b5d7077923",
      "language": "ink! 3.4.0",
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                "label": "royalty_fee",
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                "label": "royalty_fee",
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                "label": "bid_value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
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
                  "type": 18
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
                  "type": 18
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
                  "type": 18
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
                "label": "bid_value",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 10
                }
              }
            ],
            "docs": [],
            "label": "RemoveBidEvent"
          }
        ],
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
                "Result"
              ],
              "type": 40
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
              " List the NFT onto the marketplace - FREE of charge"
            ],
            "label": "list",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 40
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
              " Unlist the NFT from the marketplace - FREE of charge"
            ],
            "label": "unlist",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 40
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
              "type": 40
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
              "type": 40
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
              "type": 40
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
              "type": 40
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
                "Result"
              ],
              "type": 40
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
                "Result"
              ],
              "type": 40
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
                "Result"
              ],
              "type": 40
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
                  "type": 39
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
                "Result"
              ],
              "type": 40
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
                "Result"
              ],
              "type": 40
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
              "type": 45
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
                "u32"
              ],
              "type": 4
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
                "Vec"
              ],
              "type": 11
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
                "Vec"
              ],
              "type": 39
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
                "u64"
              ],
              "type": 9
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
                  "type": 10
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
                "Option"
              ],
              "type": 46
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
                "u128"
              ],
              "type": 10
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
              " Get all bids from (NFT Contract Address, User Address, token ID)"
            ],
            "label": "get_all_bids",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 47
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
                "AccountId"
              ],
              "type": 0
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
                "Balance"
              ],
              "type": 10
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
                "Balance"
              ],
              "type": 10
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
                "Balance"
              ],
              "type": 10
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
                "Option"
              ],
              "type": 48
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
                  "type": 9
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
                "Option"
              ],
              "type": 18
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
                "u64"
              ],
              "type": 9
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
                  "type": 10
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
                "Result"
              ],
              "type": 40
            },
            "selector": "0x8bb87aca"
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
              "type": 49
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
              "type": 49
            },
            "selector": "0x11f43efd"
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
                  "type": 10
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
              "type": 40
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
                  "type": 7
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
              "type": 40
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
                  "type": 10
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
              "type": 40
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
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x15e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "collection_contract_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x16e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "staking_contract_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x17e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "platform_fee"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x18e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 5
                        }
                      },
                      "name": "market_list"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x19e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 16
                        }
                      },
                      "name": "sale_tokens_ids"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1ae7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 21
                        }
                      },
                      "name": "sale_tokens_ids_last_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1be7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 24
                        }
                      },
                      "name": "hold_amount_bidders"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1ce7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 27
                        }
                      },
                      "name": "hold_bidders"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1de7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 30
                        }
                      },
                      "name": "bidders"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1ee7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 36
                        }
                      },
                      "name": "listed_token_number_by_collection_address"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x1fe7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 10
                        }
                      },
                      "name": "total_volume"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x20e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 24
                        }
                      },
                      "name": "volume_by_collection"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x21e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 24
                        }
                      },
                      "name": "volume_by_user"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x22e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 10
                        }
                      },
                      "name": "total_profit"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x23e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 10
                        }
                      },
                      "name": "current_profit"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x24e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 11
                        }
                      },
                      "name": "staking_discount_criteria"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x25e7a32800000000000000000000000000000000000000000000000000000000",
                          "ty": 39
                        }
                      },
                      "name": "staking_discount_rate"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x26e7a32800000000000000000000000000000000000000000000000000000000",
                          "variants": {
                            "0": {
                              "fields": [
                                {
                                  "layout": {
                                    "cell": {
                                      "key": "0x27e7a32800000000000000000000000000000000000000000000000000000000",
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
                    "type": 14
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
              "openbrush_lang",
              "storage",
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
              "openbrush_contracts",
              "traits",
              "types",
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
                6,
                12
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
                    "type": 19
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 17
              },
              {
                "name": "V",
                "type": 7
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
              "tuple": [
                18,
                18
              ]
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
                17,
                7
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
                "type": 17
              },
              {
                "name": "V",
                "type": 10
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
                17,
                10
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
                "type": 10
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
                10
              ]
            }
          }
        },
        {
          "id": 27,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 28
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
          "id": 28,
          "type": {
            "def": {
              "sequence": {
                "type": 29
              }
            }
          }
        },
        {
          "id": 29,
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
          "id": 30,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 34
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 31
              },
              {
                "name": "V",
                "type": 32
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
          "id": 31,
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
          "id": 34,
          "type": {
            "def": {
              "sequence": {
                "type": 35
              }
            }
          }
        },
        {
          "id": 35,
          "type": {
            "def": {
              "tuple": [
                31,
                32
              ]
            }
          }
        },
        {
          "id": 36,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 37
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
                "type": 9
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
          "id": 37,
          "type": {
            "def": {
              "sequence": {
                "type": 38
              }
            }
          }
        },
        {
          "id": 38,
          "type": {
            "def": {
              "tuple": [
                0,
                9
              ]
            }
          }
        },
        {
          "id": 39,
          "type": {
            "def": {
              "sequence": {
                "type": 8
              }
            }
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
                        "type": 41
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
                "type": 41
              }
            ],
            "path": [
              "Result"
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
                    "fields": [
                      {
                        "type": 42,
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
                        "type": 43,
                        "typeName": "OwnableError"
                      }
                    ],
                    "index": 44,
                    "name": "OwnableError"
                  },
                  {
                    "fields": [
                      {
                        "type": 44,
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
          "id": 42,
          "type": {
            "def": {
              "primitive": "str"
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
          "id": 44,
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
                        "type": 32
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
                "type": 32
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
          "id": 49,
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
                        "type": 43
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
                "type": 43
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

export default marketplace;
