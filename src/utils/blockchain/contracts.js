const contracts = {
  VENDOR_MANAGEMENT_ADDRESS: "5CC9j4b25jGoRiCJMkB6knVK3bkg86b31dq2pSnnwRoL9GvZ",
  VENDOR_ABI: {
    "source": {
      "hash": "0x8cad794f147308e4c0854a82ba0b4a539159ed1aef4975e1b2aceba18ca0244a",
      "language": "ink! 3.0.0-rc9",
      "compiler": "rustc 1.60.0-nightly"
    },
    "contract": {
      "name": "artzero_profile_manager",
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
                "label": "attribute",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 7
                }
              },
              {
                "label": "value",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 7
                }
              }
            ],
            "docs": [
              " Set single profile attribute, username, description, title, profile_image, twitter, facebook, telegram, instagram"
            ],
            "label": "set_profile_attribute",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 8
            },
            "selector": "0x231feccc"
          },
          {
            "args": [
              {
                "label": "attributes",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 11
                }
              },
              {
                "label": "values",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 11
                }
              }
            ],
            "docs": [
              " Set multiple profile attribute, username, description, title, profile_image, twitter, facebook, telegram, instagram"
            ],
            "label": "set_multiple_attributes",
            "mutates": true,
            "payable": false,
            "returnType": {
              "displayName": [
                "Result"
              ],
              "type": 8
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
                "label": "attribute",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 7
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
              "type": 7
            },
            "selector": "0x97f86da4"
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
                  "type": 11
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
              "type": 11
            },
            "selector": "0x8d76b3fe"
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
              "type": 12
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
              "type": 12
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
                          "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                          "ty": 0
                        }
                      },
                      "name": "owner"
                    }
                  ]
                }
              },
              "name": "ownable"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 3
                }
              },
              "name": "attributes"
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
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 6,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 4
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
          "id": 4,
          "type": {
            "def": {
              "tuple": [
                0,
                5
              ]
            }
          }
        },
        {
          "id": 5,
          "type": {
            "def": {
              "sequence": {
                "type": 2
              }
            }
          }
        },
        {
          "id": 6,
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
          "id": 7,
          "type": {
            "def": {
              "primitive": "str"
            }
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
                        "type": 9
                      }
                    ],
                    "index": 0,
                    "name": "Ok"
                  },
                  {
                    "fields": [
                      {
                        "type": 10
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
                "type": 10
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
              "tuple": []
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "variant": {
                "variants": [
                  {
                    "fields": [
                      {
                        "type": 7,
                        "typeName": "String"
                      }
                    ],
                    "index": 0,
                    "name": "Custom"
                  }
                ]
              }
            },
            "path": [
              "artzero_profile_manager",
              "artzero_profile_manager",
              "Error"
            ]
          }
        },
        {
          "id": 11,
          "type": {
            "def": {
              "sequence": {
                "type": 7
              }
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
                        "type": 9
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
                "type": 9
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
        }
      ]
    }
  }
};

export default contracts;
