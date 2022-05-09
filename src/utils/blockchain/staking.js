const staking = {
  CONTRACT_ADDRESS: "5GhVBpJ4vqYTjkV96S5Q6KxudHhifAXAU75ph43zidJ8WEki",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x79c396ab862d794d2a3339ca6c94bb5386a815436e5c7170d7fe8e5c4f92c58d",
      "language": "ink! 3.0.0",
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
                "label": "contract_owner",
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
                  "type": 7
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
                  "type": 6
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
                  "type": 7
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
                  "type": 6
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
                  "type": 7
                }
              }
            ],
            "docs": [],
            "label": "UnstakeEvent"
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
              }
            ],
            "docs": [
              "Set new NFT contract address - Only Owner"
            ],
            "label": "set_artzero_nft_contract",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 12
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
                  "type": 7
                }
              }
            ],
            "docs": [
              "Set new Limit Unstake Time (Minutes) - Only Owner"
            ],
            "label": "set_limit_unstake_time",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 12
            },
            "selector": "0x675e7b6f"
          },
          {
            "args": [],
            "docs": [
              "Get NFT contract address"
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
                  "type": 7
                }
              }
            ],
            "docs": [
              "Get request unstake Time"
            ],
            "label": "get_request_unstake_time",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 7
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
                  "type": 7
                }
              }
            ],
            "docs": [
              "Get staked token ids by AccountId"
            ],
            "label": "get_staked_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 7
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
              },
              {
                "label": "index",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              "Get pending unstaked token ids by AccountId"
            ],
            "label": "get_pending_unstaked_id",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 7
            },
            "selector": "0xf154c3c5"
          },
          {
            "args": [],
            "docs": [
              "Get total NFT staked in the contract"
            ],
            "label": "get_total_staked",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "u64"
              ],
              "type": 7
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
              "type": 7
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
                  "type": 15
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
              "type": 12
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
                  "type": 15
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
              "type": 12
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
                  "type": 15
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
              "type": 12
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
                  "type": 15
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
              "type": 12
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
                  "type": 16
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
              "type": 12
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
                  "type": 17
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
              "Transfer NFT token"
            ],
            "label": "tranfer_nft",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 12
            },
            "selector": "0xd34ab274"
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
              "type": 21
            },
            "selector": "0x11f43efd"
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
              "type": 21
            },
            "selector": "0x5e228753"
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
              "Get User NFT staked in the contract"
            ],
            "label": "CrossArtZeroStaking::get_total_staked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerostaking_external",
                "GetTotalStakedByAccountOutput"
              ],
              "type": 7
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
              "Get User NFT staked in the contract"
            ],
            "label": "CrossArtZeroStaking::get_total_pending_unstaked_by_account",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "crossartzerostaking_external",
                "GetTotalPendingUnstakedByAccountOutput"
              ],
              "type": 7
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
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "id_to_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                          "ty": 4
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
                  "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                  "ty": 9
                }
              },
              "name": "staking_list_last_index"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "nft_contract_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                  "ty": 7
                }
              },
              "name": "total_staked"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                  "ty": 7
                }
              },
              "name": "limit_unstake_time"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                  "ty": 10
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
                          "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "id_to_index"
                    },
                    {
                      "layout": {
                        "cell": {
                          "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                          "ty": 4
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
                  "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                  "ty": 9
                }
              },
              "name": "pending_unstaking_list_token_last_index"
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
                    "name": "offset_key",
                    "type": 8,
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
          "id": 5,
          "type": {
            "def": {
              "tuple": [
                6,
                7
              ]
            }
          }
        },
        {
          "id": 6,
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
          "id": 7,
          "type": {
            "def": {
              "primitive": "u64"
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
          "id": 9,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 8,
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
          "id": 10,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 8,
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
          "id": 11,
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
          "id": 12,
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
                        "type": 13
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
                "type": 13
              }
            ],
            "path": [
              "Result"
            ]
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
                        "type": 14,
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
          "id": 14,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "sequence": {
                "type": 7
              }
            }
          }
        },
        {
          "id": 16,
          "type": {
            "def": {
              "primitive": "u128"
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
                        "type": 18,
                        "typeName": "u16"
                      }
                    ],
                    "index": 1,
                    "name": "U16"
                  },
                  {
                    "fields": [
                      {
                        "type": 19,
                        "typeName": "u32"
                      }
                    ],
                    "index": 2,
                    "name": "U32"
                  },
                  {
                    "fields": [
                      {
                        "type": 7,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 16,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 20,
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
          "id": 18,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 19,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 20,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
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
                        "type": 3
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 22
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
                "type": 22
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

export default staking;
