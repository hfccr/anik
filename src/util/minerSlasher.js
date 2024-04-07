export const minerSlasher = {
  address: "0x3f87989d9FAcEe469Bb4D51cf1c6A9cc844Fd15e",
  abi: [
    {
      inputs: [
        {
          internalType: "contract DelegationManager",
          name: "_delegation",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "ActorNotFound",
      type: "error",
    },
    {
      inputs: [],
      name: "FailToCallActor",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "InvalidCodec",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidResponseLength",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "NotEnoughBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "delegation",
      outputs: [
        {
          internalType: "contract DelegationManager",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealActivation",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          components: [
            {
              internalType: "CommonTypes.ChainEpoch",
              name: "activated",
              type: "int64",
            },
            {
              internalType: "CommonTypes.ChainEpoch",
              name: "terminated",
              type: "int64",
            },
          ],
          internalType: "struct MarketTypes.GetDealActivationReturn",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealClient",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealDataCommitment",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          components: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "uint64",
              name: "size",
              type: "uint64",
            },
          ],
          internalType: "struct MarketTypes.GetDealDataCommitmentReturn",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealLabel",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          components: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "isString",
              type: "bool",
            },
          ],
          internalType: "struct CommonTypes.DealLabel",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealProvider",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealProviderCollateral",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          components: [
            {
              internalType: "bytes",
              name: "val",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "neg",
              type: "bool",
            },
          ],
          internalType: "struct CommonTypes.BigInt",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "getDealTerm",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
        {
          components: [
            {
              internalType: "CommonTypes.ChainEpoch",
              name: "start",
              type: "int64",
            },
            {
              internalType: "CommonTypes.ChainEpoch",
              name: "duration",
              type: "int64",
            },
          ],
          internalType: "struct MarketTypes.GetDealTermReturn",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract DelegationManager",
          name: "_delegation",
          type: "address",
        },
      ],
      name: "setDelegationManager",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "slash",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "slashedDeals",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
