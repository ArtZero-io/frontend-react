const profile = {
  CONTRACT_ADDRESS: "5HkBnxrsZ1RfguKC669KCzZoJmhnUocW3N6vtpgxzJHWWHcU",
  CONTRACT_ABI: {
    source: {
      hash: "0x641ad3f5aca5dde856e540fd5432e9185fc2a09af516f6e96f6bf7a930f8377b",
      language: "ink! 3.0.0",
      compiler: "rustc 1.61.0-nightly",
    },
    contract: {
      name: "artzero_profile_manager",
      version: "1.0.0",
      authors: ["ArtZero <admin@artzero.io>"],
    },
    V3: {
      spec: {
        constructors: [
          {
            args: [
              {
                label: "contract_owner",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
            ],
            docs: [],
            label: "new",
            payable: false,
            selector: "0x9bae9d5e",
          },
        ],
        docs: [],
        events: [],
        messages: [
          {
            args: [
              {
                label: "attributes",
                type: {
                  displayName: ["Vec"],
                  type: 8,
                },
              },
              {
                label: "values",
                type: {
                  displayName: ["Vec"],
                  type: 8,
                },
              },
            ],
            docs: [
              " Set multiple profile attribute, username, description, title, profile_image, twitter, facebook, telegram, instagram",
            ],
            label: "set_multiple_attributes",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["Result"],
              type: 10,
            },
            selector: "0x8119d25e",
          },
          {
            args: [
              {
                label: "account",
                type: {
                  displayName: ["AccountId"],
                  type: 0,
                },
              },
              {
                label: "attributes",
                type: {
                  displayName: ["Vec"],
                  type: 8,
                },
              },
            ],
            docs: [],
            label: "get_attributes",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["Vec"],
              type: 8,
            },
            selector: "0x8d76b3fe",
          },
          {
            args: [],
            docs: [],
            label: "Ownable::renounce_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ownable_external", "RenounceOwnershipOutput"],
              type: 12,
            },
            selector: "0x5e228753",
          },
          {
            args: [
              {
                label: "new_owner",
                type: {
                  displayName: ["ownable_external", "TransferOwnershipInput1"],
                  type: 0,
                },
              },
            ],
            docs: [],
            label: "Ownable::transfer_ownership",
            mutates: true,
            payable: false,
            returnType: {
              displayName: ["ownable_external", "TransferOwnershipOutput"],
              type: 12,
            },
            selector: "0x11f43efd",
          },
          {
            args: [],
            docs: [],
            label: "Ownable::owner",
            mutates: false,
            payable: false,
            returnType: {
              displayName: ["ownable_external", "OwnerOutput"],
              type: 0,
            },
            selector: "0x4fa43c8c",
          },
        ],
      },
      storage: {
        struct: {
          fields: [
            {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        cell: {
                          key: "0x8cd6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                          ty: 0,
                        },
                      },
                      name: "owner",
                    },
                    {
                      layout: {
                        enum: {
                          dispatchKey:
                            "0x8dd6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                          variants: {
                            0: {
                              fields: [
                                {
                                  layout: {
                                    cell: {
                                      key: "0x8ed6e4a382bfd8c05974e694dac962833b58a5d56cc64ad5d8451dcbda63b387",
                                      ty: 3,
                                    },
                                  },
                                  name: null,
                                },
                              ],
                            },
                            1: {
                              fields: [],
                            },
                          },
                        },
                      },
                      name: "_reserved",
                    },
                  ],
                },
              },
              name: "ownable",
            },
            {
              layout: {
                cell: {
                  key: "0x0000000000000000000000000000000000000000000000000000000000000000",
                  ty: 4,
                },
              },
              name: "attributes",
            },
          ],
        },
      },
      types: [
        {
          id: 0,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_env", "types", "AccountId"],
          },
        },
        {
          id: 1,
          type: {
            def: {
              array: {
                len: 32,
                type: 2,
              },
            },
          },
        },
        {
          id: 2,
          type: {
            def: {
              primitive: "u8",
            },
          },
        },
        {
          id: 3,
          type: {
            def: {
              tuple: [],
            },
          },
        },
        {
          id: 4,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "offset_key",
                    type: 7,
                    typeName: "Key",
                  },
                ],
              },
            },
            params: [
              {
                name: "K",
                type: 5,
              },
              {
                name: "V",
                type: 6,
              },
            ],
            path: ["ink_storage", "lazy", "mapping", "Mapping"],
          },
        },
        {
          id: 5,
          type: {
            def: {
              tuple: [0, 6],
            },
          },
        },
        {
          id: 6,
          type: {
            def: {
              sequence: {
                type: 2,
              },
            },
          },
        },
        {
          id: 7,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 1,
                    typeName: "[u8; 32]",
                  },
                ],
              },
            },
            path: ["ink_primitives", "Key"],
          },
        },
        {
          id: 8,
          type: {
            def: {
              sequence: {
                type: 9,
              },
            },
          },
        },
        {
          id: 9,
          type: {
            def: {
              primitive: "str",
            },
          },
        },
        {
          id: 10,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 3,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 11,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 3,
              },
              {
                name: "E",
                type: 11,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 11,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 9,
                        typeName: "String",
                      },
                    ],
                    index: 0,
                    name: "Custom",
                  },
                ],
              },
            },
            path: [
              "artzero_profile_manager",
              "artzero_profile_manager",
              "Error",
            ],
          },
        },
        {
          id: 12,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 3,
                      },
                    ],
                    index: 0,
                    name: "Ok",
                  },
                  {
                    fields: [
                      {
                        type: 13,
                      },
                    ],
                    index: 1,
                    name: "Err",
                  },
                ],
              },
            },
            params: [
              {
                name: "T",
                type: 3,
              },
              {
                name: "E",
                type: 13,
              },
            ],
            path: ["Result"],
          },
        },
        {
          id: 13,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    index: 0,
                    name: "CallerIsNotOwner",
                  },
                  {
                    index: 1,
                    name: "NewOwnerIsZero",
                  },
                ],
              },
            },
            path: ["contracts", "traits", "errors", "ownable", "OwnableError"],
          },
        },
      ],
    },
  },
};

export default profile;