// Constants based on https://github.com/31z4/ipc-explorer/blob/main/src/ipc.js
import { newDelegatedEthAddress } from "@glif/filecoin-address";
import { formatEther } from "viem";

export const ROOT_GATEWAY_ADDRESS =
  "0x6d25fbFac9e6215E03C687E54F7c74f489949EaF";

export const CHILD_GATEWAY_ADDRESS =
  "0x77aa40b105843728088c0132e43fc44348881da8";

export const SUBNET_PERMISSION_MODE = new Map([
  [0, "Collateral"],
  [1, "Federated"],
  [2, "Static"],
  [0n, "Collateral"],
  [1n, "Federated"],
  [2n, "Static"],
]);

export const SUBNET_CONSENSUS_TYPE = new Map([
  [0n, "Fendermint"],
  [0, "Fendermint"],
]);

export const SUBNET_SUPPLY_KIND = new Map([
  [0, "Native"],
  [1, "ERC20"],
  [0n, "Native"],
  [1n, "ERC20"],
]);

export const IPC_MSG_KIND = new Map([
  [0n, "Transfer"],
  [1n, "Call"],
  [2n, "Result"],
]);

export const filAddressEthAddress = (ethAddress) => {
  return newDelegatedEthAddress(ethAddress).toString().replace(/^f/, "t");
};

export const formatFil = (fil) => {
  return formatEther(fil) + " FIL";
};

export const MAX_PROVIDER_BLOCKS = 1500;

export const formatSubnetIdShort = (subnetId) => {
  const children = subnetId.route.map((c) =>
    newDelegatedEthAddress(c).toString().replace(/^f/, "t")
  );
  return children.join("/");
};

export const formatSubnetId = (subnetId) => {
  const root = `/r${subnetId.root.toString()}`;
  const children = formatSubnetIdShort(subnetId);
  if (children) {
    return `${root}/${children}`;
  }
  return root;
};

export const filAddr = (payload) => {
  const filAddr = "0x" + payload.slice(322, 322 + 40);
  return newDelegatedEthAddress(filAddr).toString().replace(/^f/, "t");
};

export const ipcAddr = (subnetId, payload) => {
  return `${formatSubnetId(subnetId)}/${filAddr(payload)}`;
};

export const subnetContractAddr = (subnetId) => {
  return subnetId.route[subnetId.route.length - 1];
};

export const subnetStats = (subnets) => {
  let totalCollateral = 0n;
  let totalSupply = 0n;

  for (const s of subnets) {
    totalCollateral += s.stake;
    totalSupply += s.circSupply;
  }

  return {
    count: subnets.length,
    totalCollateral: formatFil(totalCollateral),
    totalSupply: formatFil(totalSupply),
  };
};

export const compareGenesis = (a, b) => {
  if (a.genesis > b.genesis) {
    return -1;
  } else if (a.genesis < b.genesis) {
    return 1;
  }
  return 0;
};

export const formatSubnets = (subnets) => {
  return subnets.map((s) => {
    return {
      ...s,
      subnetId: formatSubnetId(s.id),
      subnetIdShort: formatSubnetIdShort(s.id),
      subnetAddr: subnetContractAddr(s.id),
      collateral: formatFil(s.stake),
      collateralRaw: s.stake,
      circulatingSupply: formatFil(s.circSupply),
      circulatingSupplyRaw: s.circSupply,
      genesis: s.genesisEpoch,
    };
  });
};

export const sortSubnets = (subnets) => {
  return subnets.sort(compareGenesis);
};

export const gatewayAbi = [
  {
    inputs: [],
    name: "appliedTopDownNonce",
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
    inputs: [],
    name: "bottomUpCheckPeriod",
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
        name: "e",
        type: "uint256",
      },
    ],
    name: "bottomUpCheckpoint",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nextConfigurationNumber",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpCheckpoint",
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
        internalType: "uint256",
        name: "e",
        type: "uint256",
      },
    ],
    name: "bottomUpMsgBatch",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpMsgBatch",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bottomUpNonce",
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
        components: [
          {
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
        name: "subnetId",
        type: "tuple",
      },
    ],
    name: "getAppliedBottomUpNonce",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        internalType: "uint256",
        name: "h",
        type: "uint256",
      },
    ],
    name: "getCheckpointCurrentWeight",
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
        name: "h",
        type: "uint256",
      },
    ],
    name: "getCheckpointInfo",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "rootHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentWeight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "reached",
            type: "bool",
          },
        ],
        internalType: "struct QuorumInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCheckpointRetentionHeight",
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
        name: "h",
        type: "uint256",
      },
    ],
    name: "getCheckpointSignatureBundle",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nextConfigurationNumber",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpCheckpoint",
        name: "ch",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "rootHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentWeight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "reached",
            type: "bool",
          },
        ],
        internalType: "struct QuorumInfo",
        name: "info",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "signatories",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCommitSha",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBottomUpCheckpoint",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nextConfigurationNumber",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpCheckpoint",
        name: "checkpoint",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentConfigurationNumber",
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
    inputs: [],
    name: "getCurrentMembership",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "metadata",
                type: "bytes",
              },
            ],
            internalType: "struct Validator[]",
            name: "validators",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "configurationNumber",
            type: "uint64",
          },
        ],
        internalType: "struct Membership",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIncompleteCheckpointHeights",
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
    inputs: [],
    name: "getIncompleteCheckpoints",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nextConfigurationNumber",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpCheckpoint[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastConfigurationNumber",
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
    inputs: [],
    name: "getLastMembership",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "metadata",
                type: "bytes",
              },
            ],
            internalType: "struct Validator[]",
            name: "validators",
            type: "tuple[]",
          },
          {
            internalType: "uint64",
            name: "configurationNumber",
            type: "uint64",
          },
        ],
        internalType: "struct Membership",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestParentFinality",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
        ],
        internalType: "struct ParentFinality",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNetworkName",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
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
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getParentFinality",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "height",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
        ],
        internalType: "struct ParentFinality",
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
        internalType: "uint256",
        name: "totalWeight",
        type: "uint256",
      },
    ],
    name: "getQuorumThreshold",
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
        components: [
          {
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
        name: "subnetId",
        type: "tuple",
      },
    ],
    name: "getSubnet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "genesisEpoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "circSupply",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "topDownNonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "appliedBottomUpNonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "id",
            type: "tuple",
          },
        ],
        internalType: "struct Subnet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubnetKeys",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
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
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
        name: "subnetId",
        type: "tuple",
      },
    ],
    name: "getSubnetTopDownMsgsLength",
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
        components: [
          {
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
        name: "subnetId",
        type: "tuple",
      },
    ],
    name: "getTopDownNonce",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [],
    name: "listSubnets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "genesisEpoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "circSupply",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "topDownNonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "appliedBottomUpNonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "id",
            type: "tuple",
          },
        ],
        internalType: "struct Subnet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "majorityPercentage",
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
    inputs: [],
    name: "maxMsgsPerBottomUpBatch",
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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "postbox",
    outputs: [
      {
        components: [
          {
            internalType: "enum IpcMsgKind",
            name: "kind",
            type: "uint8",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "root",
                    type: "uint64",
                  },
                  {
                    internalType: "address[]",
                    name: "route",
                    type: "address[]",
                  },
                ],
                internalType: "struct SubnetID",
                name: "subnetId",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint8",
                    name: "addrType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "payload",
                    type: "bytes",
                  },
                ],
                internalType: "struct FvmAddress",
                name: "rawAddress",
                type: "tuple",
              },
            ],
            internalType: "struct IPCAddress",
            name: "to",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "root",
                    type: "uint64",
                  },
                  {
                    internalType: "address[]",
                    name: "route",
                    type: "address[]",
                  },
                ],
                internalType: "struct SubnetID",
                name: "subnetId",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint8",
                    name: "addrType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "payload",
                    type: "bytes",
                  },
                ],
                internalType: "struct FvmAddress",
                name: "rawAddress",
                type: "tuple",
              },
            ],
            internalType: "struct IPCAddress",
            name: "from",
            type: "tuple",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct IpcEnvelope",
        name: "storableMsg",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "h",
        type: "bytes32",
      },
    ],
    name: "subnets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "genesisEpoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "circSupply",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "topDownNonce",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "appliedBottomUpNonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "id",
            type: "tuple",
          },
        ],
        internalType: "struct Subnet",
        name: "subnet",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSubnets",
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
];

export const subnetActorAbi = [
  {
    inputs: [],
    name: "activeValidatorsLimit",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bootstrapped",
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
    inputs: [],
    name: "bottomUpCheckPeriod",
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
        name: "epoch",
        type: "uint256",
      },
    ],
    name: "bottomUpCheckpointAtEpoch",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint64",
                name: "root",
                type: "uint64",
              },
              {
                internalType: "address[]",
                name: "route",
                type: "address[]",
              },
            ],
            internalType: "struct SubnetID",
            name: "subnetID",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockHeight",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nextConfigurationNumber",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "enum IpcMsgKind",
                name: "kind",
                type: "uint8",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "to",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "uint64",
                        name: "root",
                        type: "uint64",
                      },
                      {
                        internalType: "address[]",
                        name: "route",
                        type: "address[]",
                      },
                    ],
                    internalType: "struct SubnetID",
                    name: "subnetId",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "addrType",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes",
                        name: "payload",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct FvmAddress",
                    name: "rawAddress",
                    type: "tuple",
                  },
                ],
                internalType: "struct IPCAddress",
                name: "from",
                type: "tuple",
              },
              {
                internalType: "uint64",
                name: "nonce",
                type: "uint64",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct IpcEnvelope[]",
            name: "msgs",
            type: "tuple[]",
          },
        ],
        internalType: "struct BottomUpCheckpoint",
        name: "checkpoint",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
    ],
    name: "bottomUpCheckpointHashAtEpoch",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "consensus",
    outputs: [
      {
        internalType: "enum ConsensusType",
        name: "",
        type: "uint8",
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
            internalType: "enum IpcMsgKind",
            name: "kind",
            type: "uint8",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "root",
                    type: "uint64",
                  },
                  {
                    internalType: "address[]",
                    name: "route",
                    type: "address[]",
                  },
                ],
                internalType: "struct SubnetID",
                name: "subnetId",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint8",
                    name: "addrType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "payload",
                    type: "bytes",
                  },
                ],
                internalType: "struct FvmAddress",
                name: "rawAddress",
                type: "tuple",
              },
            ],
            internalType: "struct IPCAddress",
            name: "to",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint64",
                    name: "root",
                    type: "uint64",
                  },
                  {
                    internalType: "address[]",
                    name: "route",
                    type: "address[]",
                  },
                ],
                internalType: "struct SubnetID",
                name: "subnetId",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint8",
                    name: "addrType",
                    type: "uint8",
                  },
                  {
                    internalType: "bytes",
                    name: "payload",
                    type: "bytes",
                  },
                ],
                internalType: "struct FvmAddress",
                name: "rawAddress",
                type: "tuple",
              },
            ],
            internalType: "struct IPCAddress",
            name: "from",
            type: "tuple",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct IpcEnvelope[]",
        name: "messages",
        type: "tuple[]",
      },
    ],
    name: "crossMsgsHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "genesisBalances",
    outputs: [
      {
        internalType: "address[]",
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
    name: "genesisCircSupply",
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
    name: "genesisValidators",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct Validator[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveValidatorsNumber",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBootstrapNodes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConfigurationNumbers",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
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
    inputs: [],
    name: "getParent",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "root",
            type: "uint64",
          },
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
        ],
        internalType: "struct SubnetID",
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
        name: "validator",
        type: "address",
      },
    ],
    name: "getPower",
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
    name: "getTotalCollateral",
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
    name: "getTotalConfirmedCollateral",
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
        name: "validator",
        type: "address",
      },
    ],
    name: "getTotalValidatorCollateral",
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
    name: "getTotalValidatorsNumber",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validatorAddress",
        type: "address",
      },
    ],
    name: "getValidator",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "federatedPower",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "confirmedCollateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCollateral",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct ValidatorInfo",
        name: "validator",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ipcGatewayAddr",
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
        name: "validator",
        type: "address",
      },
    ],
    name: "isActiveValidator",
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
        name: "validator",
        type: "address",
      },
    ],
    name: "isWaitingValidator",
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
    inputs: [],
    name: "killed",
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
    inputs: [],
    name: "lastBottomUpCheckpointHeight",
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
    name: "majorityPercentage",
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
    name: "minActivationCollateral",
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
    name: "minValidators",
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
    inputs: [],
    name: "permissionMode",
    outputs: [
      {
        internalType: "enum PermissionMode",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "powerScale",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplySource",
    outputs: [
      {
        components: [
          {
            internalType: "enum SupplyKind",
            name: "kind",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        internalType: "struct SupplySource",
        name: "supply",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
