const launchpad_manager = {
    CONTRACT_ADDRESS: "5CGGx7ja9j9xLYD2cmKTT3TgZQ84nNSXUnr4sAmZzc9aPrMW",
    CONTRACT_ABI: {
      "source": {
        "hash": "0x12a7436753ce62b02286818d970103b728e6270ebbb0950504addfd93efa6a0f",
        "language": "ink! 3.2.0",
        "compiler": "rustc 1.63.0-nightly"
      },
      "contract": {
        "name": "artzero_launchpad_psp34",
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
                "type": 16
              },
              "selector": "0xf2f6dba3"
            },
            {
              "args": [
                {
                  "label": "project_owner",
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
                    "type": 18
                  }
                },
                {
                  "label": "description",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "total_supply",
                  "type": {
                    "displayName": [
                      "u64"
                    ],
                    "type": 5
                  }
                },
                {
                  "label": "roadmaps",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "team_members",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "start_time",
                  "type": {
                    "displayName": [
                      "Timestamp"
                    ],
                    "type": 5
                  }
                },
                {
                  "label": "end_time",
                  "type": {
                    "displayName": [
                      "Timestamp"
                    ],
                    "type": 5
                  }
                },
                {
                  "label": "attributes",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 19
                  }
                },
                {
                  "label": "attribute_vals",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 19
                  }
                }
              ],
              "docs": [
                " Add new project"
              ],
              "label": "add_new_project",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0x4b0a448e"
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
                    "type": 18
                  }
                },
                {
                  "label": "description",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "roadmaps",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "team_members",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "start_time",
                  "type": {
                    "displayName": [
                      "Timestamp"
                    ],
                    "type": 5
                  }
                },
                {
                  "label": "end_time",
                  "type": {
                    "displayName": [
                      "Timestamp"
                    ],
                    "type": 5
                  }
                },
                {
                  "label": "attributes",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 19
                  }
                },
                {
                  "label": "attribute_vals",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 19
                  }
                }
              ],
              "docs": [
                " Edit a project - Only project owner and admin"
              ],
              "label": "edit_project",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0x2cafbf63"
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
                " Update admin address - Only Owner"
              ],
              "label": "update_admin_address",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0xb470cada"
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
                " Update standard nft hash - Only Owner"
              ],
              "label": "update_standard_nft_hash",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0xad51a976"
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
                    "type": 19
                  }
                },
                {
                  "label": "values",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 19
                  }
                }
              ],
              "docs": [
                " Set multiple attributes type string - Only admin and project owner"
              ],
              "label": "set_multiple_attributes",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0x8119d25e"
            },
            {
              "args": [
                {
                  "label": "is_active",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 8
                  }
                },
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
                " Update is active project - Only Admin"
              ],
              "label": "update_is_active_project",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 20
              },
              "selector": "0x88efeaf2"
            },
            {
              "args": [],
              "docs": [
                " Get active project count"
              ],
              "label": "get_active_project_count",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              },
              "selector": "0xd86a7732"
            },
            {
              "args": [],
              "docs": [
                " Get admin address"
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
                " Get project count"
              ],
              "label": "get_project_count",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              },
              "selector": "0x5e97f98d"
            },
            {
              "args": [],
              "docs": [
                " Get standard nft hash"
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
                    "type": 19
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
                "type": 19
              },
              "selector": "0x8d76b3fe"
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
              "docs": [],
              "label": "get_project_by_id",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Option"
                ],
                "type": 22
              },
              "selector": "0xbe4185f5"
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
                " Get projects by owner address"
              ],
              "label": "get_projects_by_owner",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Vec"
                ],
                "type": 13
              },
              "selector": "0xf25b0961"
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
                " Get project by NFT address"
              ],
              "label": "get_project_by_nft_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Option"
                ],
                "type": 23
              },
              "selector": "0x908e3150"
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
                "type": 16
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
                "type": 16
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
                            "key": "0x238cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                            "ty": 0
                          }
                        },
                        "name": "owner"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x248cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
                            "variants": {
                              "0": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x258cb4a8e1768578ab199af6c3822baceafe928fad843580aa9862286e062059",
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
                "name": "admin_address"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                    "ty": 4
                  }
                },
                "name": "standard_nft_hash"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                    "ty": 5
                  }
                },
                "name": "project_count"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                    "ty": 6
                  }
                },
                "name": "projects"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                    "ty": 11
                  }
                },
                "name": "projects_by_id"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                    "ty": 12
                  }
                },
                "name": "projects_by_owner"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                    "ty": 14
                  }
                },
                "name": "attributes"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                    "ty": 5
                  }
                },
                "name": "active_project_count"
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
                "composite": {
                  "fields": [
                    {
                      "name": "offset_key",
                      "type": 10,
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
            "id": 7,
            "type": {
              "def": {
                "composite": {
                  "fields": [
                    {
                      "name": "is_active",
                      "type": 8,
                      "typeName": "bool"
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
                      "name": "project_type",
                      "type": 2,
                      "typeName": "u8"
                    },
                    {
                      "name": "project_owner",
                      "type": 0,
                      "typeName": "AccountId"
                    },
                    {
                      "name": "nft_contract_address",
                      "type": 0,
                      "typeName": "AccountId"
                    },
                    {
                      "name": "total_supply",
                      "type": 5,
                      "typeName": "u64"
                    },
                    {
                      "name": "roadmaps",
                      "type": 9,
                      "typeName": "Vec<u8>"
                    },
                    {
                      "name": "team_members",
                      "type": 9,
                      "typeName": "Vec<u8>"
                    },
                    {
                      "name": "start_time",
                      "type": 5,
                      "typeName": "Timestamp"
                    },
                    {
                      "name": "end_time",
                      "type": 5,
                      "typeName": "Timestamp"
                    }
                  ]
                }
              },
              "path": [
                "artzero_launchpad_psp34",
                "artzero_launchpad_psp34",
                "Project"
              ]
            }
          },
          {
            "id": 8,
            "type": {
              "def": {
                "primitive": "bool"
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
            "id": 11,
            "type": {
              "def": {
                "composite": {
                  "fields": [
                    {
                      "name": "offset_key",
                      "type": 10,
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
            "id": 12,
            "type": {
              "def": {
                "composite": {
                  "fields": [
                    {
                      "name": "offset_key",
                      "type": 10,
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
                  "type": 13
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
                "sequence": {
                  "type": 0
                }
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
                      "name": "offset_key",
                      "type": 10,
                      "typeName": "Key"
                    }
                  ]
                }
              },
              "params": [
                {
                  "name": "K",
                  "type": 15
                },
                {
                  "name": "V",
                  "type": 9
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
                "tuple": [
                  0,
                  9
                ]
              }
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
                "sequence": {
                  "type": 18
                }
              }
            }
          },
          {
            "id": 20,
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
                          "type": 21
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
                  "type": 21
                }
              ],
              "path": [
                "Result"
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
                      "name": "NotEnoughBalance"
                    },
                    {
                      "index": 5,
                      "name": "ProjectNotExist"
                    },
                    {
                      "index": 6,
                      "name": "ProjectOwnerAndAdmin"
                    },
                    {
                      "index": 7,
                      "name": "InvalidStartTimeAndEndTime"
                    }
                  ]
                }
              },
              "path": [
                "artzero_launchpad_psp34",
                "artzero_launchpad_psp34",
                "Error"
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
          }
        ]
      }
    }
};
  
export default launchpad_manager;
  