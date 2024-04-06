// Based on https://github.com/31z4/ipc-explorer/blob/main/src/ipc.js

import { ethers, toNumber, toQuantity } from "ethers";
import humanizeDuration from "humanize-duration";
import { formatFil } from "./utils";
import {
  gatewayAbi,
  subnetActorAbi,
  SUBNET_PERMISSION_MODE,
  SUBNET_CONSENSUS_TYPE,
  SUBNET_SUPPLY_KIND,
  IPC_MSG_KIND,
  ROOT_GATEWAY_ADDRESS,
  CHILD_GATEWAY_ADDRESS,
  MAX_PROVIDER_BLOCKS,
} from "./ipcConstants";

// 1500 blocks should work across majority of the public providers.
// const provider = new ethers.JsonRpcProvider('https://api.calibration.node.glif.io/rpc/v1')
// const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/filecoin_testnet')
const rootProvider = new ethers.JsonRpcProvider(
  "https://calibration.filfox.info/rpc/v1"
);

export const SUBNET_RPC_PROVIDERS = new Map([
  // Here can be a map of subnets to their RPC provider URLs.
  // ['SUBNET_CONTRACT_ETH_ADDR', 'RPC_PROVIDER_URL']
]);

const rootGatewayContract = new ethers.Contract(
  ROOT_GATEWAY_ADDRESS,
  gatewayAbi,
  rootProvider
);

function filAddr(payload) {
  // I could not find any JS library to deal with FvmAddress payload encoding described here:
  // https://github.com/filecoin-project/ref-fvm/blob/db8c0b12c801f364e87bda6f52d00c6bd0e1b878/shared/src/address/payload.rs#L87
  // So I simply guessed start and end incdices of the ETH address.
  const filAddr = "0x" + payload.slice(322, 322 + 40);
  return newDelegatedEthAddress(filAddr).toString();
}

function ipcAddr(subnetId, payload) {
  return `${formatSubnetId(subnetId)}/${filAddr(payload)}`;
}

function formatSubnetIdShort(subnetId) {
  const children = subnetId.route.map((c) =>
    newDelegatedEthAddress(c).toString()
  );
  return children.join("/");
}

function formatSubnetId(subnetId) {
  const root = `/r${subnetId.root.toString()}`;
  const children = formatSubnetIdShort(subnetId);
  if (children) {
    return `${root}/${children}`;
  }
  return root;
}

function subnetContractAddr(subnetId) {
  return subnetId.route[subnetId.route.length - 1];
}

export async function subnetWithdrawals(providerUrl) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const gatewayContract = new ethers.Contract(
    CHILD_GATEWAY_ADDRESS,
    gatewayAbi,
    provider
  );
  const filter = gatewayContract.filters.NewBottomUpMsgBatch;
  const events = await gatewayContract.queryFilter(filter);

  const batches = [];
  const bottomUpMsgBatch = async (epoch) => {
    const b = await gatewayContract.bottomUpMsgBatch(epoch);
    batches.push(b);
  };

  const batchPromices = events.map((e) => bottomUpMsgBatch(e.args.epoch));
  await Promise.all(batchPromices);

  const withdrawals = [];
  batches.forEach((b) => {
    const transfers = b.msgs.filter((m) => m.kind === 0n); // `0n` means `Transfer`.
    transfers.forEach((t) => {
      withdrawals.push({
        from: ipcAddr(t.from.subnetId, t.from.rawAddress.payload),
        to: ipcAddr(t.to.subnetId, t.to.rawAddress.payload),
        value: formatFil(t.value),
      });
    });
  });

  return withdrawals;
}

export async function subnetDeposits(subnetAddr) {
  const filter = rootGatewayContract.filters.NewTopDownMessage(subnetAddr);
  const events = await rootGatewayContract.queryFilter(
    filter,
    -MAX_PROVIDER_BLOCKS
  );
  const deposits = events.filter((e) => e.args.message.kind === 0n); // `0n` means `Transfer`.
  return deposits.map((e) => {
    return {
      transactionHash: e.transactionHash,
      rootFrom: filAddr(e.args.message.from.rawAddress.payload),
      from: ipcAddr(
        e.args.message.from.subnetId,
        e.args.message.from.rawAddress.payload
      ),
      to: ipcAddr(
        e.args.message.to.subnetId,
        e.args.message.to.rawAddress.payload
      ),
      value: formatFil(e.args.message.value),
    };
  });
}

function subnetStats(subnets) {
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
}

export async function listSubnets() {
  const subnets = await rootGatewayContract.listSubnets();
  const stats = subnetStats(subnets);

  // Reliable function to compare bigints.
  // You cannot simply substract b from a because the function must return a Number.
  // But converting a bigint to a Number can throw an exception.
  function compareGenesis(a, b) {
    if (a.genesis > b.genesis) {
      return -1;
    } else if (a.genesis < b.genesis) {
      return 1;
    }
    return 0;
  }

  const list = subnets
    .map((s) => {
      return {
        subnetId: formatSubnetId(s.subnetID),
        subnetIdShort: formatSubnetIdShort(s.subnetID),
        subnetAddr: subnetContractAddr(s.subnetID),
        collateral: formatFil(s.stake),
        circulatingSupply: formatFil(s.circSupply),
        genesis: s.genesisEpoch,
      };
    })
    .sort(compareGenesis);

  const now = Date.now();
  const subnetAge = async (subnet) => {
    const block = await rootProvider.send("eth_getBlockByNumber", [
      toQuantity(subnet.genesis),
      false,
    ]);
    const blockTimestamp = block.timestamp * 1000;
    const age = now - toNumber(blockTimestamp);

    subnet.age = humanizeDuration(age, { round: true, largest: 1 });
    subnet.created_at = new Date(blockTimestamp).toUTCString();
    subnet.genesis = subnet.genesis.toString();
  };
  const age = list.map((s) => subnetAge(s));

  const lastCheckpoint = async (subnet) => {
    const subnetActorContract = new ethers.Contract(
      subnet.subnetAddr,
      subnetActorAbi,
      rootProvider
    );
    const lastBottomUpCheckpointHeight =
      await subnetActorContract.lastBottomUpCheckpointHeight();
    subnet.lastCheckpoint = lastBottomUpCheckpointHeight.toString();
  };
  const checkpoint = list.map((s) => lastCheckpoint(s));

  await Promise.all(age.concat(checkpoint));

  return { list, stats };
}

export async function lastCheckpoint(subnetAddr) {
  const subnetActorContract = new ethers.Contract(
    subnetAddr,
    subnetActorAbi,
    rootProvider
  );

  const lastBottomUpCheckpointHeight =
    await subnetActorContract.lastBottomUpCheckpointHeight();
  if (lastBottomUpCheckpointHeight === 0n) {
    return {
      exists: false,
      msgs: [],
    };
  }

  const checkpoint = await subnetActorContract.bottomUpCheckpointAtEpoch(
    lastBottomUpCheckpointHeight
  );
  const msgs = checkpoint.checkpoint.msgs.map((m) => {
    return {
      kind: IPC_MSG_KIND.get(m.kind),
      from: ipcAddr(m.from.subnetId, m.from.rawAddress.payload),
      to: ipcAddr(m.to.subnetId, m.to.rawAddress.payload),
      value: formatFil(m.value),
    };
  });

  return {
    exists: checkpoint.exists,
    blockHeight: checkpoint.checkpoint.blockHeight.toString(),
    blockHash: checkpoint.checkpoint.blockHash,
    nextConfigurationNumber:
      checkpoint.checkpoint.nextConfigurationNumber.toString(),
    msgs,
  };
}

export async function subnetInfo(subnetAddr) {
  const subnetActorContract = new ethers.Contract(
    subnetAddr,
    subnetActorAbi,
    rootProvider
  );
  const info = {};

  await Promise.all([
    (async () => {
      info.permissionMode = await subnetActorContract.permissionMode();
    })(),
    (async () => {
      info.minValidators = await subnetActorContract.minValidators();
    })(),
    (async () => {
      info.majorityPercentage = await subnetActorContract.majorityPercentage();
    })(),
    (async () => {
      info.activeValidatorsLimit =
        await subnetActorContract.activeValidatorsLimit();
    })(),
    (async () => {
      info.bottomUpCheckPeriod =
        await subnetActorContract.bottomUpCheckPeriod();
    })(),
    (async () => {
      info.consensus = await subnetActorContract.consensus();
    })(),
    (async () => {
      info.killed = await subnetActorContract.killed();
    })(),
    (async () => {
      info.minActivationCollateral =
        await subnetActorContract.minActivationCollateral();
    })(),
    (async () => {
      info.powerScale = await subnetActorContract.powerScale();
    })(),
    (async () => {
      info.supplySource = await subnetActorContract.supplySource();
    })(),
  ]);

  return {
    permissionMode: SUBNET_PERMISSION_MODE.get(info.permissionMode),
    minValidators: info.minValidators.toString(),
    majorityPercentage: info.majorityPercentage.toString(),
    activeValidatorsLimit: info.activeValidatorsLimit.toString(),
    bottomUpCheckPeriod: humanizeDuration(
      toNumber(info.bottomUpCheckPeriod) * 1000
    ),
    consensus: SUBNET_CONSENSUS_TYPE.get(info.consensus),
    state: info.killed ? "Killed" : "Active",
    minActivationCollateral: formatFil(info.minActivationCollateral),
    powerScale: info.powerScale.toString(),
    supplySourceKind: SUBNET_SUPPLY_KIND.get(info.supplySource[0]),
    supplySourceAddr:
      info.supplySource[1] === "0x0000000000000000000000000000000000000000"
        ? ""
        : info.supplySource[1],
  };
}

async function validatorInfo(subnetActorContract, addr) {
  const info = await subnetActorContract.getValidator(addr);
  const active = await subnetActorContract.isActiveValidator(addr);
  const waiting = await subnetActorContract.isWaitingValidator(addr);

  let state = "Unknown";
  if (active) {
    state = "Active";
  } else if (waiting) {
    state = "Waiting";
  }

  return {
    addr,
    state,
    confirmedCollateral: formatFil(info[1]),
    totalCollateral: formatFil(info[2]),
  };
}

export async function genesisValidators(subnetAddr) {
  const subnetActorContract = new ethers.Contract(
    subnetAddr,
    subnetActorAbi,
    rootProvider
  );

  const validators = await subnetActorContract.genesisValidators();
  const augmentedValidators = [];

  const validatorInfoFn = async (v) => {
    const info = await validatorInfo(subnetActorContract, v.addr);
    augmentedValidators.push(info);
  };

  const infoPromices = validators.map((v) => validatorInfoFn(v));
  await Promise.all(infoPromices);

  return augmentedValidators;
}
