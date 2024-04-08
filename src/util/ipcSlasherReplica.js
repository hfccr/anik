export const ipcSlasherReplica = {
  address: "0xBD238689f9311eC04Dd0c920ACE4800cE79D8d67",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "gateway",
          type: "address",
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
          name: "linkedSubnet",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "CallerIsNotGateway",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "reason",
          type: "string",
        },
      ],
      name: "InvalidEnvelope",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidOriginContract",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidOriginSubnet",
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
          internalType: "string",
          name: "reason",
          type: "string",
        },
      ],
      name: "TransferRejected",
      type: "error",
    },
    {
      inputs: [],
      name: "UnrecognizedResult",
      type: "error",
    },
    {
      inputs: [],
      name: "UnsupportedMsgKind",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "nonce",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "proof",
          type: "uint256",
        },
      ],
      name: "LinkedSlashSent",
      type: "event",
    },
    {
      anonymous: false,
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
          indexed: true,
          internalType: "struct SubnetID",
          name: "linkedSubnet",
          type: "tuple",
        },
        {
          indexed: true,
          internalType: "address",
          name: "linkedContract",
          type: "address",
        },
      ],
      name: "LinkedSlasherInitialized",
      type: "event",
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
      name: "_linkedContract",
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
      name: "_linkedSubnet",
      outputs: [
        {
          internalType: "uint64",
          name: "root",
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
          name: "",
          type: "bytes32",
        },
      ],
      name: "_unconfirmedTransfers",
      outputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "proof",
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
          name: "envelope",
          type: "tuple",
        },
      ],
      name: "_validateEnvelope",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32[]",
          name: "ids",
          type: "bytes32[]",
        },
      ],
      name: "dropMessages",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "gatewayAddr",
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
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "getUnconfirmedTransfer",
      outputs: [
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
          internalType: "struct IpcEnvelope",
          name: "envelope",
          type: "tuple",
        },
      ],
      name: "handleIpcMessage",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "inflightMsgs",
      outputs: [
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
          internalType: "uint256",
          name: "proof",
          type: "uint256",
        },
      ],
      name: "linkedTransfer",
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
          name: "committed",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
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
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "removeUnconfirmedTransfer",
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
          internalType: "address",
          name: "linkedContract",
          type: "address",
        },
      ],
      name: "setLinkedSubnet",
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
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "proof",
          type: "uint256",
        },
      ],
      name: "transferSlashWithReturn",
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
          name: "envelope",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
