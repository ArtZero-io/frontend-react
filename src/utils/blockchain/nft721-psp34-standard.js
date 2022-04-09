const nft721_psp34_standard = {
    CONTRACT_ABI: {
      "source": {
        "hash": "0x5201933d97f782df1ae85782aee1f9c5dc09520ab19866824636c28e118fc4de",
        "language": "ink! 3.0.0",
        "compiler": "rustc 1.61.0-nightly"
      },
      "contract": {
        "name": "psp34_nft",
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
                    "type": 8
                  }
                },
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 24
                  }
                },
                {
                  "label": "symbol",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 24
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
              "args": [],
              "docs": [
                "Only Owner can mint new token"
              ],
              "label": "mint",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "Result"
                ],
                "type": 25
              },
              "selector": "0xcfdd9aa2"
            },
            {
              "args": [],
              "docs": [
                "Get Token Count"
              ],
              "label": "get_token_count",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              },
              "selector": "0x744362af"
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
                    "type": 8
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
                "type": 27
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
                "type": 8
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
                "type": 27
              },
              "selector": "0x5e228753"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "AllowanceInput1"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "operator",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "AllowanceInput2"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "AllowanceInput3"
                    ],
                    "type": 14
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::allowance",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "AllowanceOutput"
                ],
                "type": 29
              },
              "selector": "0x4790f55a"
            },
            {
              "args": [
                {
                  "label": "operator",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "ApproveInput1"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "ApproveInput2"
                    ],
                    "type": 14
                  }
                },
                {
                  "label": "approved",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "ApproveInput3"
                    ],
                    "type": 29
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::approve",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "ApproveOutput"
                ],
                "type": 30
              },
              "selector": "0x1932a8b0"
            },
            {
              "args": [
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "OwnerOfInput1"
                    ],
                    "type": 1
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::owner_of",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "OwnerOfOutput"
                ],
                "type": 21
              },
              "selector": "0x1168624d"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "BalanceOfInput1"
                    ],
                    "type": 8
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::balance_of",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "BalanceOfOutput"
                ],
                "type": 4
              },
              "selector": "0xcde7e55f"
            },
            {
              "args": [],
              "docs": [],
              "label": "PSP34::collection_id",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "CollectionIdOutput"
                ],
                "type": 1
              },
              "selector": "0xffa27a5f"
            },
            {
              "args": [
                {
                  "label": "to",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "TransferInput1"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "TransferInput2"
                    ],
                    "type": 1
                  }
                },
                {
                  "label": "data",
                  "type": {
                    "displayName": [
                      "psp34_external",
                      "TransferInput3"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::transfer",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "TransferOutput"
                ],
                "type": 30
              },
              "selector": "0x3128d61b"
            },
            {
              "args": [],
              "docs": [],
              "label": "PSP34::total_supply",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34_external",
                  "TotalSupplyOutput"
                ],
                "type": 6
              },
              "selector": "0x628413fe"
            },
            {
              "args": [
                {
                  "label": "account",
                  "type": {
                    "displayName": [
                      "psp34burnable_external",
                      "BurnInput1"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34burnable_external",
                      "BurnInput2"
                    ],
                    "type": 1
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Burnable::burn",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34burnable_external",
                  "BurnOutput"
                ],
                "type": 30
              },
              "selector": "0x63c9877a"
            },
            {
              "args": [
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "psp34metadata_external",
                      "GetAttributeInput1"
                    ],
                    "type": 1
                  }
                },
                {
                  "label": "key",
                  "type": {
                    "displayName": [
                      "psp34metadata_external",
                      "GetAttributeInput2"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Metadata::get_attribute",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34metadata_external",
                  "GetAttributeOutput"
                ],
                "type": 32
              },
              "selector": "0xf19d48d1"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "psp34enumerable_external",
                      "OwnersTokenByIndexInput1"
                    ],
                    "type": 8
                  }
                },
                {
                  "label": "index",
                  "type": {
                    "displayName": [
                      "psp34enumerable_external",
                      "OwnersTokenByIndexInput2"
                    ],
                    "type": 6
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Enumerable::owners_token_by_index",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34enumerable_external",
                  "OwnersTokenByIndexOutput"
                ],
                "type": 33
              },
              "selector": "0x3bcfb511"
            },
            {
              "args": [
                {
                  "label": "index",
                  "type": {
                    "displayName": [
                      "psp34enumerable_external",
                      "TokenByIndexInput1"
                    ],
                    "type": 6
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Enumerable::token_by_index",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34enumerable_external",
                  "TokenByIndexOutput"
                ],
                "type": 33
              },
              "selector": "0xcd0340d0"
            },
            {
              "args": [
                {
                  "label": "uri",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "SetBaseUriInput1"
                    ],
                    "type": 24
                  }
                }
              ],
              "docs": [
                " Change baseURI"
              ],
              "label": "Psp34Traits::set_base_uri",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "SetBaseUriOutput"
                ],
                "type": 25
              },
              "selector": "0x4de6850b"
            },
            {
              "args": [
                {
                  "label": "token_id",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "GetAttributesInput1"
                    ],
                    "type": 1
                  }
                },
                {
                  "label": "attributes",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "GetAttributesInput2"
                    ],
                    "type": 34
                  }
                }
              ],
              "docs": [
                " Get multiple  attributes"
              ],
              "label": "Psp34Traits::get_attributes",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "GetAttributesOutput"
                ],
                "type": 34
              },
              "selector": "0x18209102"
            },
            {
              "args": [
                {
                  "label": "index",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "GetAttributeNameInput1"
                    ],
                    "type": 4
                  }
                }
              ],
              "docs": [
                "Get Attribute Name"
              ],
              "label": "Psp34Traits::get_attribute_name",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "GetAttributeNameOutput"
                ],
                "type": 24
              },
              "selector": "0xfcfe34de"
            },
            {
              "args": [],
              "docs": [
                "Get Attribute Count"
              ],
              "label": "Psp34Traits::get_attribute_count",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "GetAttributeCountOutput"
                ],
                "type": 4
              },
              "selector": "0x61c50d69"
            },
            {
              "args": [
                {
                  "label": "token_id",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "TokenUriInput1"
                    ],
                    "type": 5
                  }
                }
              ],
              "docs": [
                " Get URI from token ID"
              ],
              "label": "Psp34Traits::token_uri",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "TokenUriOutput"
                ],
                "type": 24
              },
              "selector": "0x249dfd4f"
            },
            {
              "args": [
                {
                  "label": "token_id",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "SetMultipleAttributesInput1"
                    ],
                    "type": 1
                  }
                },
                {
                  "label": "attributes",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "SetMultipleAttributesInput2"
                    ],
                    "type": 34
                  }
                },
                {
                  "label": "values",
                  "type": {
                    "displayName": [
                      "psp34traits_external",
                      "SetMultipleAttributesInput3"
                    ],
                    "type": 34
                  }
                }
              ],
              "docs": [
                "Only Owner can set multiple attributes to a token"
              ],
              "label": "Psp34Traits::set_multiple_attributes",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "psp34traits_external",
                  "SetMultipleAttributesOutput"
                ],
                "type": 25
              },
              "selector": "0x5bf8416b"
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
                            "key": "0xca887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                            "ty": 0
                          }
                        },
                        "name": "token_owner"
                      },
                      {
                        "layout": {
                          "cell": {
                            "key": "0xcb887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                            "ty": 11
                          }
                        },
                        "name": "owned_tokens_count"
                      },
                      {
                        "layout": {
                          "cell": {
                            "key": "0xcc887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                            "ty": 12
                          }
                        },
                        "name": "operator_approvals"
                      },
                      {
                        "layout": {
                          "cell": {
                            "key": "0xcd887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                            "ty": 6
                          }
                        },
                        "name": "total_supply"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0xce887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                            "variants": {
                              "0": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0xcf887b42fe11b9165176009de2f405a7b125d635c1cce6b1c20dbec072c3df76",
                                        "ty": 15
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
                "name": "psp34"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "cell": {
                            "key": "0x2378c55a0f00e79375687565b21164fce62724c7b4567f680eb360fbb4f90f50",
                            "ty": 16
                          }
                        },
                        "name": "attributes"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x2478c55a0f00e79375687565b21164fce62724c7b4567f680eb360fbb4f90f50",
                            "variants": {
                              "0": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x2578c55a0f00e79375687565b21164fce62724c7b4567f680eb360fbb4f90f50",
                                        "ty": 15
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
                "name": "metadata"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "cell": {
                            "key": "0x8cd6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                            "ty": 8
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
                                        "ty": 15
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
                    "ty": 5
                  }
                },
                "name": "token_count"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                    "ty": 4
                  }
                },
                "name": "attribute_count"
              },
              {
                "layout": {
                  "cell": {
                    "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                    "ty": 18
                  }
                },
                "name": "attribute_names"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "struct": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x0391b8a2812992ad5b7f27efbc1900a7844ca2e0c7d339f1fb06830ec558f750",
                                    "ty": 19
                                  }
                                },
                                "name": "id_to_index"
                              },
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x0491b8a2812992ad5b7f27efbc1900a7844ca2e0c7d339f1fb06830ec558f750",
                                    "ty": 22
                                  }
                                },
                                "name": "index_to_id"
                              }
                            ]
                          }
                        },
                        "name": "enumerable"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x0591b8a2812992ad5b7f27efbc1900a7844ca2e0c7d339f1fb06830ec558f750",
                            "variants": {
                              "0": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0691b8a2812992ad5b7f27efbc1900a7844ca2e0c7d339f1fb06830ec558f750",
                                        "ty": 15
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
                "name": "enumdata"
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
                  "type": 1
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
            "id": 1,
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
                          "type": 3,
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
                          "type": 7,
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
                "primitive": "u16"
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
                "sequence": {
                  "type": 2
                }
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
                      "type": 9,
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
            "id": 9,
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
            "id": 10,
            "type": {
              "def": {
                "composite": {
                  "fields": [
                    {
                      "type": 9,
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
                  "type": 8
                },
                {
                  "name": "V",
                  "type": 4
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
                  "type": 13
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
            "id": 13,
            "type": {
              "def": {
                "tuple": [
                  8,
                  8,
                  14
                ]
              }
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
                          "type": 1
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
                  "type": 1
                }
              ],
              "path": [
                "Option"
              ]
            }
          },
          {
            "id": 15,
            "type": {
              "def": {
                "tuple": []
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
                  "type": 17
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
            "id": 17,
            "type": {
              "def": {
                "tuple": [
                  1,
                  7
                ]
              }
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
                      "type": 10,
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
                  "type": 20
                },
                {
                  "name": "V",
                  "type": 6
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
            "id": 20,
            "type": {
              "def": {
                "tuple": [
                  21,
                  1
                ]
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
            "id": 22,
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
                  "type": 23
                },
                {
                  "name": "V",
                  "type": 1
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
                  21,
                  6
                ]
              }
            }
          },
          {
            "id": 24,
            "type": {
              "def": {
                "primitive": "str"
              }
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
                          "type": 15
                        }
                      ],
                      "index": 0,
                      "name": "Ok"
                    },
                    {
                      "fields": [
                        {
                          "type": 26
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
                  "type": 15
                },
                {
                  "name": "E",
                  "type": 26
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
                          "type": 24,
                          "typeName": "String"
                        }
                      ],
                      "index": 0,
                      "name": "Custom"
                    },
                    {
                      "index": 1,
                      "name": "NotOwner"
                    }
                  ]
                }
              },
              "path": [
                "psp34_nft",
                "psp34_nft",
                "Error"
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
                          "type": 15
                        }
                      ],
                      "index": 0,
                      "name": "Ok"
                    },
                    {
                      "fields": [
                        {
                          "type": 28
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
                  "type": 15
                },
                {
                  "name": "E",
                  "type": 28
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
            "id": 29,
            "type": {
              "def": {
                "primitive": "bool"
              }
            }
          },
          {
            "id": 30,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 15
                        }
                      ],
                      "index": 0,
                      "name": "Ok"
                    },
                    {
                      "fields": [
                        {
                          "type": 31
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
                  "type": 15
                },
                {
                  "name": "E",
                  "type": 31
                }
              ],
              "path": [
                "Result"
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
                          "type": 24,
                          "typeName": "String"
                        }
                      ],
                      "index": 0,
                      "name": "Custom"
                    },
                    {
                      "index": 1,
                      "name": "SelfApprove"
                    },
                    {
                      "index": 2,
                      "name": "NotApproved"
                    },
                    {
                      "index": 3,
                      "name": "TokenExists"
                    },
                    {
                      "index": 4,
                      "name": "TokenNotExists"
                    },
                    {
                      "fields": [
                        {
                          "type": 24,
                          "typeName": "String"
                        }
                      ],
                      "index": 5,
                      "name": "SafeTransferCheckFailed"
                    }
                  ]
                }
              },
              "path": [
                "contracts",
                "traits",
                "errors",
                "psp34",
                "PSP34Error"
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
            "id": 33,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 1
                        }
                      ],
                      "index": 0,
                      "name": "Ok"
                    },
                    {
                      "fields": [
                        {
                          "type": 31
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
                  "type": 1
                },
                {
                  "name": "E",
                  "type": 31
                }
              ],
              "path": [
                "Result"
              ]
            }
          },
          {
            "id": 34,
            "type": {
              "def": {
                "sequence": {
                  "type": 24
                }
              }
            }
          }
        ]
      }
    }
};
  
export default nft721_psp34_standard;
  