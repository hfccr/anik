export const strategies = [
  {
    key: "wfil",
    title: "Wrapped FIL",
    ticker: "wFIL",
    logo: "/filecoin.webp",
    about:
      "Wrapped FIL is the canonical wrapper token of the native Filecoin token. Wrapped FIL features a 1-to-1 ratio pegged to FIL.",
    address: "0x2D0ffc1292287e4C1aCfC8B56aA126a44B2BCf3b",
  },
  {
    key: "glif",
    title: "GLIF Infinity Pool",
    ticker: "iFIL",
    logo: "/glif.webp",
    about: "Filecoin's premier DeFi protocol for lending/borrowing FIL.",
    address: "0xb1310985d8D8a42f6667E8d811f332CDC33449F4",
  },
  {
    key: "stfil",
    title: "STFIL",
    ticker: "stFIL",
    logo: "/stfil.webp",
    about:
      "STFIL is a decentralised non-custodial liquidity market protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while SPs are able to borrow in an overcollateralised (perpetually) or undercollateralised (one-block liquidity) fashion.",
    address: "0xBb56DD788f039710D2EC4ca26Dc1d1Fb7Da07D93",
  },
  {
    key: "collectif",
    title: "CollectifDAO",
    ticker: "ciFIL",
    logo: "/collectif-dao.webp",
    about:
      "Collectif DAO is a non-custodial liquid staking protocol built on the Filecoin network. It enables users to stake their FIL and receive clFIL (Collective Filecoin) tokens in return. Staked FIL is allocated to storage providers who use it to expand their mining operations, while clFIL can be utilized in the DeFi ecosystems of Filecoin and Ethereum.",
    address: "0x208E40E914b03EF655c7a6534671272470929EaC",
  },
  {
    key: "repl",
    title: "Repl",
    ticker: "pFIL",
    logo: "/repl.webp",
    about:
      "Repl is the first restaking protocol for DePINs, enabling natively pledged DePIN tokens and DePIN liquid staking tokens to be reused to secure new DePIN initiatives and applications. It also creates a simple way for BTC and ETH staking and restaking projects to access DePIN protocol rewards.",
    address: "0xFC7199237A3e8Ce54e348404d4da65cEE63E255C",
  },
  {
    key: "sft",
    title: "SFT Protocol",
    ticker: "SFT",
    logo: "/sft-protocol.webp",
    about:
      "The SFT protocol solves the staking liquidity of the POS blockchain, and provides cloud node API and equipment services, to be the fastest and the most reliable Web3 infrastructure",
    address: "0x68008f099F6f627647C51544d80b101E189082bd",
  },
  {
    key: "filet",
    title: "Filet Finance",
    ticker: "nFIL",
    logo: "/filet-finance.webp",
    about:
      "Filet is a decentralized Filecoin staking protocol that has been deployed on the Filecoin (FVM), Binance Smart Chain (BSC), and HECO network. Launched in May 2021, Filet is open source and has been audited by Certik. Additionally, Filet is an official member of Filecoin's FVM Early Builder and Mainnet Cohort projects.",
    address: "0xA0f8257D299fEc379DF25c1504E95A1A977039ab",
  },
];

export const getStrategy = (key) => {
  return strategies.find((strategy) => strategy.key === key);
};

export const lstABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
];
