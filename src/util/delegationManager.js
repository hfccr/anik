export const delegationManager = {
  address: "0x3aBA6030358288b8C893F51348684ADC36DeC768",
  abi: [
    {
      inputs: [
        {
          internalType: "contract StrategyManager",
          name: "_strategyManager",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
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
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
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
      name: "MAX_WITHDRAWAL_DELAY_BLOCKS",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "staker",
          type: "address",
        },
        {
          internalType: "contract IStrategy",
          name: "strategy",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "shares",
          type: "uint256",
        },
      ],
      name: "decreaseDelegatedShares",
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
      ],
      name: "delegateTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "delegatedTo",
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
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "delegationApprover",
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
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "earningsReceiver",
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
      name: "getAllOperators",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "operatorAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "earningsReceiver",
              type: "address",
            },
            {
              internalType: "address",
              name: "delegationApprover",
              type: "address",
            },
            {
              internalType: "uint32",
              name: "stakerOptOutDelayBlocks",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "enum DelegationManager.OperatorType",
              name: "operatorType",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "slashes",
              type: "uint256",
            },
            {
              internalType: "uint64",
              name: "minerId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "subnetAddress",
              type: "address",
            },
          ],
          internalType: "struct DelegationManager.OperatorDetails[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "staker",
          type: "address",
        },
      ],
      name: "getDelegatableShares",
      outputs: [
        {
          internalType: "contract IStrategy[]",
          name: "",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "getMinerId",
      outputs: [
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
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "contract IStrategy[]",
          name: "strategies",
          type: "address[]",
        },
      ],
      name: "getOperatorShares",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "getSubnetAddress",
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
      inputs: [
        {
          internalType: "address",
          name: "staker",
          type: "address",
        },
        {
          internalType: "contract IStrategy",
          name: "strategy",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "shares",
          type: "uint256",
        },
      ],
      name: "increaseDelegatedShares",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "staker",
          type: "address",
        },
      ],
      name: "isDelegated",
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
          name: "operator",
          type: "address",
        },
      ],
      name: "isOperator",
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
          components: [
            {
              internalType: "address",
              name: "operatorAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "earningsReceiver",
              type: "address",
            },
            {
              internalType: "address",
              name: "delegationApprover",
              type: "address",
            },
            {
              internalType: "uint32",
              name: "stakerOptOutDelayBlocks",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "enum DelegationManager.OperatorType",
              name: "operatorType",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "slashes",
              type: "uint256",
            },
            {
              internalType: "uint64",
              name: "minerId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "subnetAddress",
              type: "address",
            },
          ],
          internalType: "struct DelegationManager.OperatorDetails",
          name: "newOperatorDetails",
          type: "tuple",
        },
      ],
      name: "modifyOperatorDetails",
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
      ],
      name: "operatorDetails",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "operatorAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "earningsReceiver",
              type: "address",
            },
            {
              internalType: "address",
              name: "delegationApprover",
              type: "address",
            },
            {
              internalType: "uint32",
              name: "stakerOptOutDelayBlocks",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "enum DelegationManager.OperatorType",
              name: "operatorType",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "slashes",
              type: "uint256",
            },
            {
              internalType: "uint64",
              name: "minerId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "subnetAddress",
              type: "address",
            },
          ],
          internalType: "struct DelegationManager.OperatorDetails",
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
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "contract IStrategy",
          name: "",
          type: "address",
        },
      ],
      name: "operatorShares",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "operators",
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
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "operatorAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "earningsReceiver",
              type: "address",
            },
            {
              internalType: "address",
              name: "delegationApprover",
              type: "address",
            },
            {
              internalType: "uint32",
              name: "stakerOptOutDelayBlocks",
              type: "uint32",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "enum DelegationManager.OperatorType",
              name: "operatorType",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "slashes",
              type: "uint256",
            },
            {
              internalType: "uint64",
              name: "minerId",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "subnetAddress",
              type: "address",
            },
          ],
          internalType: "struct DelegationManager.OperatorDetails",
          name: "registeringOperatorDetails",
          type: "tuple",
        },
      ],
      name: "registerAsOperator",
      outputs: [],
      stateMutability: "nonpayable",
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
          internalType: "enum DelegationManager.OperatorType",
          name: "operatorType",
          type: "uint8",
        },
        {
          internalType: "address",
          name: "_slasher",
          type: "address",
        },
      ],
      name: "setSlasher",
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
      ],
      name: "slashOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum DelegationManager.OperatorType",
          name: "",
          type: "uint8",
        },
      ],
      name: "slashers",
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
      name: "strategyManager",
      outputs: [
        {
          internalType: "contract StrategyManager",
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
