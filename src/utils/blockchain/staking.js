const collection_manager = {
  CONTRACT_ADDRESS: "5CAmTgzZj9rDjqqisBzPcGB2uG7DgBmGje2NsWYuwsZNSXxR",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x20b0bb14e9ae828801a21889efa80cc917ef96051ee60fa4a9b549d422f25bb7",
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
                  "type": 14
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u32"
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
                  "type": 14
                }
              },
              {
                "docs": [],
                "indexed": false,
                "label": "token_id",
                "type": {
                  "displayName": [
                    "u32"
                  ],
                  "type": 6
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
              "type": 8
            },
            "selector": "0x1bb3d394"
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
              }
            ],
            "docs": [
              "Get staked token ids by AccountId"
            ],
            "label": "get_staked_ids",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 11
            },
            "selector": "0x2815abda"
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
                "u32"
              ],
              "type": 6
            },
            "selector": "0x02c779a5"
          },
          {
            "args": [
              {
                "label": "token_ids",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 5
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
              "type": 8
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
                  "type": 5
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
              "type": 8
            },
            "selector": "0x82364901"
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
              "type": 12
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
              "type": 12
            },
            "selector": "0x5e228753"
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
              "type": 6
            },
            "selector": "0x487f1cac"
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
              "name": "staking_list"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "nft_contract_address"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                  "ty": 6
                }
              },
              "name": "total_staked"
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
                "type": 5
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
              "sequence": {
                "type": 6
              }
            }
          }
        },
        {
          "id": 6,
          "type": {
            "def": {
              "primitive": "u32"
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
                    "fields": [
                      {
                        "type": 10,
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
          "id": 10,
          "type": {
            "def": {
              "primitive": "str"
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
                        "type": 5
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
                "type": 5
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
        },
        {
          "id": 14,
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
