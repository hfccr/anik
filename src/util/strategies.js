export const strategies = [
  {
    key: "glif",
    title: "GLIF Infinity Pool",
    ticker: "iFIL",
    logo: "/glif.webp",
    about: "Filecoin's premier DeFi protocol for lending/borrowing FIL.",
    address: "",
  },
  {
    key: "stfil",
    title: "STFIL",
    ticker: "stFIL",
    logo: "/stfil.webp",
    about:
      "STFIL is a decentralised non-custodial liquidity market protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while SPs are able to borrow in an overcollateralised (perpetually) or undercollateralised (one-block liquidity) fashion.",
    address: "",
  },
  {
    key: "collectif",
    title: "CollectifDAO",
    ticker: "cIFIL",
    logo: "/collectif-dao.webp",
    about:
      "Collectif DAO is a non-custodial liquid staking protocol built on the Filecoin network. It enables users to stake their FIL and receive clFIL (Collective Filecoin) tokens in return. Staked FIL is allocated to storage providers who use it to expand their mining operations, while clFIL can be utilized in the DeFi ecosystems of Filecoin and Ethereum.",
    address: "0x19AAB7dD96E9EedF9E232fE56d1736f53205834a",
  },
  {
    key: "repl",
    title: "Repl",
    ticker: "pFIL",
    logo: "/repl.webp",
    about:
      "Repl is the first restaking protocol for DePINs, enabling natively pledged DePIN tokens and DePIN liquid staking tokens to be reused to secure new DePIN initiatives and applications. It also creates a simple way for BTC and ETH staking and restaking projects to access DePIN protocol rewards.",
    address: "",
  },
  {
    key: "sft",
    title: "SFT Protocol",
    ticker: "SFT",
    logo: "/sft-protocol.webp",
    about:
      "The SFT protocol solves the staking liquidity of the POS blockchain, and provides cloud node API and equipment services, to be the fastest and the most reliable Web3 infrastructure",
    address: "",
  },
  {
    key: "filet",
    title: "Filet Finance",
    ticker: "nFIL",
    logo: "/filet-finance.webp",
    about:
      "Filet is a decentralized Filecoin staking protocol that has been deployed on the Filecoin (FVM), Binance Smart Chain (BSC), and HECO network. Launched in May 2021, Filet is open source and has been audited by Certik. Additionally, Filet is an official member of Filecoin's FVM Early Builder and Mainnet Cohort projects.",
    address: "",
  },
];

export const getStrategy = (key) => {
  return strategies.find((strategy) => strategy.key === key);
};
