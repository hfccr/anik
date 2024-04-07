export const strategyManager = {
  address: "0x884C79f4e4419728B394251B9b6Ab2dcA3292B21",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
      ],
      name: "AddressEmptyCode",
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
      name: "AddressInsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "staker",
          type: "address",
        },
        {
          internalType: "contract IERC20",
          name: "token",
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
      name: "addShares",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IStrategy[]",
          name: "strategiesToWhitelist",
          type: "address[]",
        },
      ],
      name: "addStrategiesToDepositWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IStrategy",
          name: "strategy",
          type: "address",
        },
        {
          internalType: "contract IERC20",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "depositIntoStrategy",
      outputs: [
        {
          internalType: "uint256",
          name: "shares",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "FailedInnerCall",
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
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "SafeERC20FailedOperation",
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
      name: "removeShares",
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
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recepient",
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
        {
          internalType: "contract IERC20",
          name: "token",
          type: "address",
        },
      ],
      name: "withdrawSharesAsTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
          internalType: "address",
          name: "staker",
          type: "address",
        },
      ],
      name: "getDeposits",
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
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "stakerStrategyList",
      outputs: [
        {
          internalType: "contract IStrategy",
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
      ],
      name: "stakerStrategyListLength",
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
          name: "",
          type: "address",
        },
        {
          internalType: "contract IStrategy",
          name: "",
          type: "address",
        },
      ],
      name: "stakerStrategyShares",
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
          internalType: "contract IStrategy",
          name: "",
          type: "address",
        },
      ],
      name: "strategyIsWhitelistedForDeposit",
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
  ],
};
