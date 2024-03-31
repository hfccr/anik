export const strategyManager = {
  address: "0xE6e5b7383C2be2dc6Cdc449a355f069b10F0e508",
  abi: [
    {
      type: "constructor",
      inputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addShares",
      inputs: [
        {
          name: "staker",
          type: "address",
          internalType: "address",
        },
        {
          name: "token",
          type: "address",
          internalType: "contract IERC20",
        },
        {
          name: "strategy",
          type: "address",
          internalType: "contract IStrategy",
        },
        {
          name: "shares",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addStrategiesToDepositWhitelist",
      inputs: [
        {
          name: "strategiesToWhitelist",
          type: "address[]",
          internalType: "contract IStrategy[]",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "delegation",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract DelegationManager",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "depositIntoStrategy",
      inputs: [
        {
          name: "strategy",
          type: "address",
          internalType: "contract IStrategy",
        },
        {
          name: "token",
          type: "address",
          internalType: "contract IERC20",
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "shares",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getDeposits",
      inputs: [
        {
          name: "staker",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address[]",
          internalType: "contract IStrategy[]",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "removeShares",
      inputs: [
        {
          name: "staker",
          type: "address",
          internalType: "address",
        },
        {
          name: "strategy",
          type: "address",
          internalType: "contract IStrategy",
        },
        {
          name: "shares",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "setDelegationManager",
      inputs: [
        {
          name: "_delegation",
          type: "address",
          internalType: "contract DelegationManager",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "setSlasher",
      inputs: [
        {
          name: "_slasher",
          type: "address",
          internalType: "contract Slasher",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "slasher",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract Slasher",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stakerStrategyList",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IStrategy",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stakerStrategyListLength",
      inputs: [
        {
          name: "staker",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stakerStrategyShares",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "contract IStrategy",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "strategyIsWhitelistedForDeposit",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "contract IStrategy",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "withdrawSharesAsTokens",
      inputs: [
        {
          name: "recepient",
          type: "address",
          internalType: "address",
        },
        {
          name: "strategy",
          type: "address",
          internalType: "contract IStrategy",
        },
        {
          name: "shares",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "token",
          type: "address",
          internalType: "contract IERC20",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AddressEmptyCode",
      inputs: [
        {
          name: "target",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "AddressInsufficientBalance",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "FailedInnerCall",
      inputs: [],
    },
    {
      type: "error",
      name: "OwnableInvalidOwner",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "OwnableUnauthorizedAccount",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: [],
    },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
      ],
    },
  ],
};
