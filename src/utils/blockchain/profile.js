const profile = {
  CONTRACT_ADDRESS: "5FZZBpLTMEUwakh3ouERrK6Y9zvNTjrmWHzQGBrx7NpDaW6U",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x443be41163188d9619be0f70ee55d38bb31b83fb49ec46bf103cee1e3adbb7ae",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.61.0-nightly"
    },
    "contract": {
      "name": "profile_manager",
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
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
                }
              },
              {
                "label": "values",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 9
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
              "type": 11
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
                  "type": 9
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
              "type": 9
            },
            "selector": "0x8d76b3fe"
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
              "type": 15
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
              "type": 15
            },
            "selector": "0x5e228753"
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
                  "type": 16
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
              "type": 11
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
                  "type": 20
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
              "type": 11
            },
            "selector": "0x07573e99"
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
                  "type": 20
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
              "type": 11
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
                          "key": "0x6d1c93dd00000000000000000000000000000000000000000000000000000000",
                          "ty": 4
                        }
                      },
                      "name": "attributes"
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
                    "type": 7
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
                "type": 6
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
              "tuple": [
                0,
                6
              ]
            }
          }
        },
        {
          "id": 6,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
          }
        },
        {
          "id": 7,
          "type": {
            "def": {
              "sequence": {
                "type": 8
              }
            }
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "tuple": [
                5,
                6
              ]
            }
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "sequence": {
                "type": 10
              }
            }
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
                        "type": 12
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
                "type": 12
              }
            ],
            "path": [
              "Result"
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
                        "type": 10,
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
                        "type": 13,
                        "typeName": "OwnableError"
                      }
                    ],
                    "index": 44,
                    "name": "OwnableError"
                  },
                  {
                    "fields": [
                      {
                        "type": 14,
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
              "openbrush_contracts",
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
          "id": 15,
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
          "id": 16,
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
                        "type": 17,
                        "typeName": "u16"
                      }
                    ],
                    "index": 1,
                    "name": "U16"
                  },
                  {
                    "fields": [
                      {
                        "type": 18,
                        "typeName": "u32"
                      }
                    ],
                    "index": 2,
                    "name": "U32"
                  },
                  {
                    "fields": [
                      {
                        "type": 19,
                        "typeName": "u64"
                      }
                    ],
                    "index": 3,
                    "name": "U64"
                  },
                  {
                    "fields": [
                      {
                        "type": 20,
                        "typeName": "u128"
                      }
                    ],
                    "index": 4,
                    "name": "U128"
                  },
                  {
                    "fields": [
                      {
                        "type": 6,
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
          "id": 17,
          "type": {
            "def": {
              "primitive": "u16"
            }
          }
        },
        {
          "id": 18,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 19,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 20,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        }
      ]
    }
  }
};

export default profile;
