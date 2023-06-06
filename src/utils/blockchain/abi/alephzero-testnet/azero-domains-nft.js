const azero_domains_nft = {
    CONTRACT_ADDRESS: "5EKDyn7uy1jVQnAhsCz2ySrR5g89nvTYreoMHCMAKb9C5rQn",
    CONTRACT_ABI: {
        "source": {
          "hash": "0x893e955c2405089bef26b5904ed2b3f400b2c27b54a9b6c8230ec10e0e0410a6",
          "language": "ink! 4.0.1",
          "compiler": "rustc 1.68.0",
          "build_info": {
            "build_mode": "Release",
            "cargo_contract_version": "2.1.0",
            "rust_toolchain": "stable-aarch64-apple-darwin",
            "wasm_opt_settings": {
              "keep_debug_symbols": false,
              "optimization_passes": "Z"
            }
          }
        },
        "contract": {
          "name": "azns_registry",
          "version": "0.0.2",
          "authors": [
            "AZERO Domains <hello@azero.domains>"
          ]
        },
        "spec": {
          "constructors": [
            {
              "args": [
                {
                  "label": "admin",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "name_checker_addr",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "label": "fee_calculator_addr",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "label": "merkle_verifier_addr",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "label": "reserved_names",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 12
                  }
                },
                {
                  "label": "tld",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "base_uri",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "metadata_size_limit",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 15
                  }
                }
              ],
              "docs": [
                "Creates a new AZNS contract."
              ],
              "label": "new",
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink_primitives",
                  "ConstructorResult"
                ],
                "type": 16
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
                  "indexed": true,
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "from",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [
                " Emitted whenever a new name is registered."
              ],
              "label": "Register"
            },
            {
              "args": [
                {
                  "docs": [],
                  "indexed": true,
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "from",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [
                " Emitted whenever a name is released"
              ],
              "label": "Release"
            },
            {
              "args": [
                {
                  "docs": [],
                  "indexed": true,
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "docs": [],
                  "indexed": false,
                  "label": "from",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "old_address",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "new_address",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [
                " Emitted whenever an address changes."
              ],
              "label": "SetAddress"
            },
            {
              "args": [
                {
                  "docs": [],
                  "indexed": true,
                  "label": "from",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "to",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                }
              ],
              "docs": [
                " Event emitted when a token transfer occurs."
              ],
              "label": "Transfer"
            },
            {
              "args": [
                {
                  "docs": [],
                  "indexed": true,
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "operator",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 64
                  }
                },
                {
                  "docs": [],
                  "indexed": false,
                  "label": "approved",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                }
              ],
              "docs": [
                " Event emitted when a token approve occurs."
              ],
              "label": "Approval"
            },
            {
              "args": [],
              "docs": [
                " Emitted when switching from whitelist-phase to public-phase"
              ],
              "label": "PublicPhaseActivated"
            },
            {
              "args": [
                {
                  "docs": [],
                  "indexed": true,
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "docs": [],
                  "indexed": true,
                  "label": "account_id",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "docs": [],
                  "indexed": false,
                  "label": "action",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                }
              ],
              "docs": [
                " Emitted when a name is reserved or removed from the reservation list"
              ],
              "label": "Reserve"
            }
          ],
          "lang_error": {
            "displayName": [
              "ink",
              "LangError"
            ],
            "type": 17
          },
          "messages": [
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "recipient",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "years_to_register",
                  "type": {
                    "displayName": [
                      "u8"
                    ],
                    "type": 2
                  }
                },
                {
                  "label": "referrer",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "merkle_proof",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 19
                  }
                }
              ],
              "docs": [
                " Register specific name on behalf of some other address.",
                " Pay the fee, but forward the ownership of the name to the provided recipient",
                "",
                " NOTE: During the whitelist phase, use `register()` method instead."
              ],
              "label": "register_on_behalf_of",
              "mutates": true,
              "payable": true,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x7aa26a96"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "years_to_register",
                  "type": {
                    "displayName": [
                      "u8"
                    ],
                    "type": 2
                  }
                },
                {
                  "label": "referrer",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 18
                  }
                },
                {
                  "label": "merkle_proof",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 19
                  }
                },
                {
                  "label": "set_as_primary_name",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                }
              ],
              "docs": [
                " Register specific name with caller as owner.",
                "",
                " NOTE: Whitelisted addresses can buy one name during the whitelist phase by submitting its proof"
              ],
              "label": "register",
              "mutates": true,
              "payable": true,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x229b553f"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Allows users to claim their reserved name at zero cost"
              ],
              "label": "claim_reserved_name",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x2251f2bc"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Release name from registration."
              ],
              "label": "release",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x3f2be152"
            },
            {
              "args": [
                {
                  "label": "to",
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
                    "type": 7
                  }
                },
                {
                  "label": "keep_metadata",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                },
                {
                  "label": "keep_controller",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                },
                {
                  "label": "keep_resolving",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                },
                {
                  "label": "data",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 26
                  }
                }
              ],
              "docs": [
                " Transfer owner to another address."
              ],
              "label": "transfer",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 27
              },
              "selector": "0x84a15da1"
            },
            {
              "args": [
                {
                  "label": "names",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 9
                  }
                }
              ],
              "docs": [
                " Removes the associated state of expired-names from storage"
              ],
              "label": "clear_expired_names",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 30
              },
              "selector": "0xd00a53e5"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Set primary name of an address (reverse record)"
              ],
              "label": "set_primary_name",
              "mutates": true,
              "payable": true,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0xad11843c"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "new_address",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [
                " Set resolved address for specific name."
              ],
              "label": "set_address",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0xb8a4d3d9"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "new_controller",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "set_controller",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0xc5e161ea"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "records",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 32
                  }
                },
                {
                  "label": "remove_rest",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                }
              ],
              "docs": [],
              "label": "update_records",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0xde84a1ba"
            },
            {
              "args": [
                {
                  "label": "names",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 9
                  }
                }
              ],
              "docs": [
                " Returns the current status of the name"
              ],
              "label": "get_name_status",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 34
              },
              "selector": "0x964d7612"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Get the addresses related to specific name"
              ],
              "label": "get_address_dict",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 38
              },
              "selector": "0xf069dff3"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Get owner of specific name."
              ],
              "label": "get_owner",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 40
              },
              "selector": "0x07fcd0b1"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Get controller of specific name."
              ],
              "label": "get_controller",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 40
              },
              "selector": "0x0abf0e97"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Get address for specific name."
              ],
              "label": "get_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 40
              },
              "selector": "0xd259f7ba"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [],
              "label": "get_registration_period",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 42
              },
              "selector": "0x61437185"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Gets all records"
              ],
              "label": "get_all_records",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 45
              },
              "selector": "0x528be9f1"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "key",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [
                " Gets an arbitrary record by key"
              ],
              "label": "get_record",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 46
              },
              "selector": "0x7e6cb4ce"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [
                " Returns all names the address owns"
              ],
              "label": "get_owned_names_of_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 48
              },
              "selector": "0xe413b13a"
            },
            {
              "args": [
                {
                  "label": "controller",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "get_controlled_names_of_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 48
              },
              "selector": "0x9f25301e"
            },
            {
              "args": [
                {
                  "label": "address",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "get_resolving_names_of_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 48
              },
              "selector": "0xadd2f457"
            },
            {
              "args": [
                {
                  "label": "address",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "get_primary_name",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 46
              },
              "selector": "0x404f1d73"
            },
            {
              "args": [
                {
                  "label": "address",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "get_names_of_address",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 50
              },
              "selector": "0xf82caf60"
            },
            {
              "args": [],
              "docs": [],
              "label": "get_metadata_size_limit",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 51
              },
              "selector": "0x41b0a92e"
            },
            {
              "args": [],
              "docs": [],
              "label": "get_admin",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 52
              },
              "selector": "0x57b8a8a7"
            },
            {
              "args": [],
              "docs": [],
              "label": "get_tld",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 53
              },
              "selector": "0xd61daed4"
            },
            {
              "args": [],
              "docs": [],
              "label": "get_base_uri",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 53
              },
              "selector": "0x6e06617c"
            },
            {
              "args": [],
              "docs": [
                " Returns `true` when contract is in whitelist-phase",
                " and `false` when it is in public-phase"
              ],
              "label": "is_whitelist_phase",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 54
              },
              "selector": "0x59d8255b"
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
                  "label": "merkle_proof",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 19
                  }
                }
              ],
              "docs": [],
              "label": "verify_proof",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 54
              },
              "selector": "0x71c9d9ba"
            },
            {
              "args": [
                {
                  "label": "beneficiary",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 11
                  }
                },
                {
                  "label": "value",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 55
                  }
                }
              ],
              "docs": [
                " (ADMIN-OPERATION)",
                " Transfers `value` amount of tokens to the caller."
              ],
              "label": "withdraw",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x410fcc9d"
            },
            {
              "args": [],
              "docs": [
                " (ADMIN-OPERATION)",
                " Switch from whitelist-phase to public-phase"
              ],
              "label": "switch_to_public_phase",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x17257477"
            },
            {
              "args": [
                {
                  "label": "set",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 13
                  }
                }
              ],
              "docs": [
                " (ADMIN-OPERATION)",
                " Reserve name name for specific addresses"
              ],
              "label": "add_reserved_names",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x6e0d3fa8"
            },
            {
              "args": [
                {
                  "label": "set",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 9
                  }
                }
              ],
              "docs": [
                " (ADMIN-OPERATION)",
                " Remove given names from the list of reserved names"
              ],
              "label": "remove_reserved_name",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x9ccff6c5"
            },
            {
              "args": [
                {
                  "label": "limit",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 15
                  }
                }
              ],
              "docs": [
                " (ADMIN-OPERATION)",
                " Update the limit of metadata allowed to store per name"
              ],
              "label": "set_metadata_size_limit",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x787dbdec"
            },
            {
              "args": [
                {
                  "label": "code_hash",
                  "type": {
                    "displayName": [],
                    "type": 1
                  }
                }
              ],
              "docs": [
                " (ADMIN-OPERATION)",
                " Upgrade contract code"
              ],
              "label": "upgrade_contract",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x1345543d"
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
              "docs": [],
              "label": "set_admin",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 21
              },
              "selector": "0x798dcad5"
            },
            {
              "args": [
                {
                  "label": "name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                },
                {
                  "label": "recipient",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "years_to_register",
                  "type": {
                    "displayName": [
                      "u8"
                    ],
                    "type": 2
                  }
                },
                {
                  "label": "referrer",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 18
                  }
                }
              ],
              "docs": [],
              "label": "get_name_price",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 56
              },
              "selector": "0xb565be46"
            },
            {
              "args": [
                {
                  "label": "recipient",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "referrer_name",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [],
              "label": "validate_referrer",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 54
              },
              "selector": "0x30fc989d"
            },
            {
              "args": [],
              "docs": [],
              "label": "PSP34::collection_id",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 59
              },
              "selector": "0xffa27a5f"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::balance_of",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 62
              },
              "selector": "0xcde7e55f"
            },
            {
              "args": [
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::owner_of",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 63
              },
              "selector": "0x1168624d"
            },
            {
              "args": [
                {
                  "label": "owner",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "operator",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 64
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::allowance",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 54
              },
              "selector": "0x4790f55a"
            },
            {
              "args": [
                {
                  "label": "operator",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Option"
                    ],
                    "type": 64
                  }
                },
                {
                  "label": "approved",
                  "type": {
                    "displayName": [
                      "bool"
                    ],
                    "type": 25
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::approve",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 27
              },
              "selector": "0x1932a8b0"
            },
            {
              "args": [
                {
                  "label": "to",
                  "type": {
                    "displayName": [
                      "AccountId"
                    ],
                    "type": 0
                  }
                },
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                },
                {
                  "label": "data",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 26
                  }
                }
              ],
              "docs": [],
              "label": "PSP34::transfer",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 27
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
                  "ink",
                  "MessageResult"
                ],
                "type": 65
              },
              "selector": "0x628413fe"
            },
            {
              "args": [
                {
                  "label": "owner",
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
              "docs": [],
              "label": "PSP34Enumerable::owners_token_by_index",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 66
              },
              "selector": "0x3bcfb511"
            },
            {
              "args": [
                {
                  "label": "_index",
                  "type": {
                    "displayName": [
                      "u128"
                    ],
                    "type": 10
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Enumerable::token_by_index",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 66
              },
              "selector": "0xcd0340d0"
            },
            {
              "args": [
                {
                  "label": "id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                },
                {
                  "label": "key",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 26
                  }
                }
              ],
              "docs": [],
              "label": "PSP34Metadata::get_attribute",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 68
              },
              "selector": "0xf19d48d1"
            },
            {
              "args": [],
              "docs": [],
              "label": "Psp34Traits::get_owner",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 52
              },
              "selector": "0x8e1d8d71"
            },
            {
              "args": [
                {
                  "label": "token_id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                }
              ],
              "docs": [],
              "label": "Psp34Traits::token_uri",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 53
              },
              "selector": "0x249dfd4f"
            },
            {
              "args": [
                {
                  "label": "uri",
                  "type": {
                    "displayName": [
                      "String"
                    ],
                    "type": 7
                  }
                }
              ],
              "docs": [],
              "label": "Psp34Traits::set_base_uri",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 70
              },
              "selector": "0x4de6850b"
            },
            {
              "args": [],
              "docs": [],
              "label": "Psp34Traits::get_attribute_count",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 62
              },
              "selector": "0x61c50d69"
            },
            {
              "args": [
                {
                  "label": "index",
                  "type": {
                    "displayName": [
                      "u32"
                    ],
                    "type": 8
                  }
                }
              ],
              "docs": [],
              "label": "Psp34Traits::get_attribute_name",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 53
              },
              "selector": "0xfcfe34de"
            },
            {
              "args": [
                {
                  "label": "token_id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
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
              "label": "Psp34Traits::get_attributes",
              "mutates": false,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 50
              },
              "selector": "0x18209102"
            },
            {
              "args": [
                {
                  "label": "_token_id",
                  "type": {
                    "displayName": [
                      "Id"
                    ],
                    "type": 60
                  }
                },
                {
                  "label": "_metadata",
                  "type": {
                    "displayName": [
                      "Vec"
                    ],
                    "type": 5
                  }
                }
              ],
              "docs": [],
              "label": "Psp34Traits::set_multiple_attributes",
              "mutates": true,
              "payable": false,
              "returnType": {
                "displayName": [
                  "ink",
                  "MessageResult"
                ],
                "type": 70
              },
              "selector": "0x5bf8416b"
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
                      "leaf": {
                        "key": "0x00000000",
                        "ty": 0
                      }
                    },
                    "name": "admin"
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
                                                "name": "account_id"
                                              }
                                            ],
                                            "name": "CallBuilder"
                                          }
                                        },
                                        "name": "inner"
                                      }
                                    ],
                                    "name": "NameCheckerRef"
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
                    "name": "name_checker"
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
                                                "name": "account_id"
                                              }
                                            ],
                                            "name": "CallBuilder"
                                          }
                                        },
                                        "name": "inner"
                                      }
                                    ],
                                    "name": "FeeCalculatorRef"
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
                    "name": "fee_calculator"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000064",
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
                                        "key": "0x00000064",
                                        "ty": 0
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
                        "root_key": "0x00000064"
                      }
                    },
                    "name": "reserved_names"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x00000065",
                            "ty": 3
                          }
                        },
                        "root_key": "0x00000065"
                      }
                    },
                    "name": "operator_approvals"
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
                                    "key": "0x000000c8",
                                    "ty": 0
                                  }
                                },
                                "name": "owner"
                              },
                              {
                                "layout": {
                                  "leaf": {
                                    "key": "0x000000c8",
                                    "ty": 0
                                  }
                                },
                                "name": "controller"
                              },
                              {
                                "layout": {
                                  "leaf": {
                                    "key": "0x000000c8",
                                    "ty": 0
                                  }
                                },
                                "name": "resolved"
                              }
                            ],
                            "name": "AddressDict"
                          }
                        },
                        "root_key": "0x000000c8"
                      }
                    },
                    "name": "name_to_address_dict"
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
                                    "key": "0x36388b88",
                                    "ty": 4
                                  }
                                },
                                "name": "0"
                              },
                              {
                                "layout": {
                                  "leaf": {
                                    "key": "0x36388b88",
                                    "ty": 4
                                  }
                                },
                                "name": "1"
                              }
                            ],
                            "name": "(A, B)"
                          }
                        },
                        "root_key": "0x36388b88"
                      }
                    },
                    "name": "name_to_period"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x000000c9",
                            "ty": 5
                          }
                        },
                        "root_key": "0x000000c9"
                      }
                    },
                    "name": "metadata"
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
                                    "ty": 8
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
                    "name": "metadata_size_limit"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x0000012c",
                            "ty": 9
                          }
                        },
                        "root_key": "0x0000012c"
                      }
                    },
                    "name": "owner_to_names"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x0000012d",
                            "ty": 9
                          }
                        },
                        "root_key": "0x0000012d"
                      }
                    },
                    "name": "controller_to_names"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x0000012e",
                            "ty": 9
                          }
                        },
                        "root_key": "0x0000012e"
                      }
                    },
                    "name": "resolving_to_address"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "leaf": {
                            "key": "0x0000012f",
                            "ty": 7
                          }
                        },
                        "root_key": "0x0000012f"
                      }
                    },
                    "name": "address_to_primary_name"
                  },
                  {
                    "layout": {
                      "root": {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x000003e7",
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
                                      "struct": {
                                        "fields": [
                                          {
                                            "layout": {
                                              "struct": {
                                                "fields": [
                                                  {
                                                    "layout": {
                                                      "leaf": {
                                                        "key": "0x000003e7",
                                                        "ty": 0
                                                      }
                                                    },
                                                    "name": "account_id"
                                                  }
                                                ],
                                                "name": "CallBuilder"
                                              }
                                            },
                                            "name": "inner"
                                          }
                                        ],
                                        "name": "MerkleVerifierRef"
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
                        "root_key": "0x000003e7"
                      }
                    },
                    "name": "whitelisted_address_verifier"
                  },
                  {
                    "layout": {
                      "leaf": {
                        "key": "0x00000000",
                        "ty": 7
                      }
                    },
                    "name": "tld"
                  },
                  {
                    "layout": {
                      "leaf": {
                        "key": "0x00000000",
                        "ty": 7
                      }
                    },
                    "name": "base_uri"
                  },
                  {
                    "layout": {
                      "leaf": {
                        "key": "0x00000000",
                        "ty": 10
                      }
                    },
                    "name": "total_supply"
                  }
                ],
                "name": "Registry"
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
                "primitive": "u64"
              }
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
                "tuple": [
                  7,
                  7
                ]
              }
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
                "primitive": "u32"
              }
            }
          },
          {
            "id": 9,
            "type": {
              "def": {
                "sequence": {
                  "type": 7
                }
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
            "id": 12,
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
                          "type": 13
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
                  "type": 13
                }
              ],
              "path": [
                "Option"
              ]
            }
          },
          {
            "id": 13,
            "type": {
              "def": {
                "sequence": {
                  "type": 14
                }
              }
            }
          },
          {
            "id": 14,
            "type": {
              "def": {
                "tuple": [
                  7,
                  11
                ]
              }
            }
          },
          {
            "id": 15,
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
                          "type": 20
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
                  "type": 20
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
                "sequence": {
                  "type": 1
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
                          "type": 22
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
                  "type": 22
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
                      "name": "NotAdmin"
                    },
                    {
                      "index": 1,
                      "name": "NameAlreadyExists"
                    },
                    {
                      "index": 2,
                      "name": "NameDoesntExist"
                    },
                    {
                      "index": 3,
                      "name": "NameNotAllowed"
                    },
                    {
                      "index": 4,
                      "name": "CallerIsNotOwner"
                    },
                    {
                      "index": 5,
                      "name": "CallerIsNotController"
                    },
                    {
                      "index": 6,
                      "name": "FeeNotPaid"
                    },
                    {
                      "index": 7,
                      "name": "NameEmpty"
                    },
                    {
                      "index": 8,
                      "name": "RecordNotFound"
                    },
                    {
                      "index": 9,
                      "name": "WithdrawFailed"
                    },
                    {
                      "index": 10,
                      "name": "InsufficientBalance"
                    },
                    {
                      "index": 11,
                      "name": "NoResolvedAddress"
                    },
                    {
                      "index": 12,
                      "name": "AlreadyClaimed"
                    },
                    {
                      "index": 13,
                      "name": "InvalidMerkleProof"
                    },
                    {
                      "index": 14,
                      "name": "OnlyDuringWhitelistPhase"
                    },
                    {
                      "index": 15,
                      "name": "RestrictedDuringWhitelistPhase"
                    },
                    {
                      "index": 16,
                      "name": "CannotBuyReservedName"
                    },
                    {
                      "index": 17,
                      "name": "NotReservedName"
                    },
                    {
                      "index": 18,
                      "name": "NotAuthorised"
                    },
                    {
                      "index": 19,
                      "name": "MetadataOverflow"
                    },
                    {
                      "fields": [
                        {
                          "type": 24,
                          "typeName": "azns_fee_calculator::Error"
                        }
                      ],
                      "index": 20,
                      "name": "FeeError"
                    }
                  ]
                }
              },
              "path": [
                "azns_registry",
                "azns_registry",
                "Error"
              ]
            }
          },
          {
            "id": 24,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "index": 0,
                      "name": "NotAdmin"
                    },
                    {
                      "index": 1,
                      "name": "InvalidDuration"
                    },
                    {
                      "index": 2,
                      "name": "ZeroLength"
                    }
                  ]
                }
              },
              "path": [
                "azns_fee_calculator",
                "Error"
              ]
            }
          },
          {
            "id": 25,
            "type": {
              "def": {
                "primitive": "bool"
              }
            }
          },
          {
            "id": 26,
            "type": {
              "def": {
                "sequence": {
                  "type": 2
                }
              }
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
                          "type": 28
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
                  "type": 28
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
                          "type": 7,
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
                          "type": 7,
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
                "interfaces",
                "psp34_standard",
                "PSP34Error"
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
                      "fields": [
                        {
                          "type": 31
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
                  "type": 31
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
            "id": 31,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 10
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
                  "type": 10
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
                "tuple": [
                  7,
                  18
                ]
              }
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
                          "type": 35
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
                  "type": 35
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
            "id": 35,
            "type": {
              "def": {
                "sequence": {
                  "type": 36
                }
              }
            }
          },
          {
            "id": 36,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 37,
                          "typeName": "AddressDict"
                        }
                      ],
                      "index": 0,
                      "name": "Registered"
                    },
                    {
                      "fields": [
                        {
                          "type": 11,
                          "typeName": "Option<AccountId>"
                        }
                      ],
                      "index": 1,
                      "name": "Reserved"
                    },
                    {
                      "index": 2,
                      "name": "Available"
                    },
                    {
                      "index": 3,
                      "name": "Unavailable"
                    }
                  ]
                }
              },
              "path": [
                "azns_registry",
                "azns_registry",
                "NameStatus"
              ]
            }
          },
          {
            "id": 37,
            "type": {
              "def": {
                "composite": {
                  "fields": [
                    {
                      "name": "owner",
                      "type": 0,
                      "typeName": "AccountId"
                    },
                    {
                      "name": "controller",
                      "type": 0,
                      "typeName": "AccountId"
                    },
                    {
                      "name": "resolved",
                      "type": 0,
                      "typeName": "AccountId"
                    }
                  ]
                }
              },
              "path": [
                "azns_registry",
                "address_dict",
                "AddressDict"
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
                      "fields": [
                        {
                          "type": 39
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
                  "type": 39
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
            "id": 39,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 37
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
                  "type": 37
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
            "id": 40,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 41
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
                  "type": 41
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
            "id": 41,
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
                  "type": 0
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
            "id": 42,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 43
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
                  "type": 43
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
            "id": 43,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 44
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
                  "type": 44
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
            "id": 44,
            "type": {
              "def": {
                "tuple": [
                  4,
                  4
                ]
              }
            }
          },
          {
            "id": 45,
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
                  "type": 5
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
            "id": 46,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 47
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
                  "type": 47
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
            "id": 47,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 7
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
                  "type": 7
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
            "id": 48,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 49
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
                  "type": 49
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
            "id": 49,
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
                          "type": 9
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
                  "type": 9
                }
              ],
              "path": [
                "Option"
              ]
            }
          },
          {
            "id": 50,
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
                  "type": 9
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
            "id": 51,
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
                  "type": 15
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
            "id": 52,
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
                  "type": 0
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
            "id": 53,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 7
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
                  "type": 7
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
            "id": 54,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 25
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
                  "type": 25
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
            "id": 55,
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
            "id": 56,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 57
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
                  "type": 57
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
            "id": 57,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 58
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
                  "type": 58
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
            "id": 58,
            "type": {
              "def": {
                "tuple": [
                  10,
                  10,
                  10,
                  11
                ]
              }
            }
          },
          {
            "id": 59,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 60
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
                  "type": 60
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
            "id": 60,
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
                          "type": 61,
                          "typeName": "u16"
                        }
                      ],
                      "index": 1,
                      "name": "U16"
                    },
                    {
                      "fields": [
                        {
                          "type": 8,
                          "typeName": "u32"
                        }
                      ],
                      "index": 2,
                      "name": "U32"
                    },
                    {
                      "fields": [
                        {
                          "type": 4,
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
                          "type": 26,
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
                "interfaces",
                "psp34_standard",
                "Id"
              ]
            }
          },
          {
            "id": 61,
            "type": {
              "def": {
                "primitive": "u16"
              }
            }
          },
          {
            "id": 62,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 8
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
                  "type": 8
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
            "id": 63,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 11
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
                  "type": 11
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
            "id": 64,
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
                          "type": 60
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
                  "type": 60
                }
              ],
              "path": [
                "Option"
              ]
            }
          },
          {
            "id": 65,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 10
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
                  "type": 10
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
            "id": 66,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 67
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
                  "type": 67
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
            "id": 67,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 60
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
                  "type": 60
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
            "id": 68,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 69
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
                  "type": 69
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
            "id": 69,
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
                          "type": 26
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
                  "type": 26
                }
              ],
              "path": [
                "Option"
              ]
            }
          },
          {
            "id": 70,
            "type": {
              "def": {
                "variant": {
                  "variants": [
                    {
                      "fields": [
                        {
                          "type": 71
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
                  "type": 71
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
            "id": 71,
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
                          "type": 72
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
                  "type": 72
                }
              ],
              "path": [
                "Result"
              ]
            }
          },
          {
            "id": 72,
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
                "interfaces",
                "art_zero_traits",
                "ArtZeroError"
              ]
            }
          }
        ],
        "version": "4"
      }
  };
  
  export default azero_domains_nft;