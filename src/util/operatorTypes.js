import { MinerOperator } from "@/components/MinerOperator";
import { IpcOperator } from "@/components/IpcOperator";

const OPERATOR_TYPES = {
  0: {
    name: "IPC",
    logo: "/ipc.png",
    risk: "does not follow Subnet Consensus rules as an IPC validator",
    service: "IPC Network",
  },
  1: {
    name: "MINER",
    logo: "/disk.svg",
    risk: "it fails to provide PoST as a Storage Provider",
    service: "Filecoin Storage Network",
  },
  2: {
    name: "RETRIEVAL",
    logo: "/fetch.svg",
    risk: "consistently fails to correctly validate Retrievals",
    service: "Filecoin Retrievals",
  },
};

export const getName = (type) => {
  return OPERATOR_TYPES[type].name;
};

export const getLogo = (type) => {
  return OPERATOR_TYPES[type].logo;
};

export const getRisk = (type) => {
  return OPERATOR_TYPES[type].risk;
};

export const getService = (type) => {
  return OPERATOR_TYPES[type].service;
};

export const getOperatorSpecificView = (operatorDetails) => {
  const { operatorType } = operatorDetails;
  if (operatorType === 0) {
    return <IpcOperator operatorDetails={operatorDetails} />;
  } else if (operatorType === 1) {
    return <MinerOperator operatorDetails={operatorDetails} />;
  } else if (operatorType === 2) {
    return <></>;
  } else {
    return <></>;
  }
};
