const OPERATOR_TYPES = {
  0: { name: "IPC", logo: "/ipc.png" },
  1: { name: "MINER", logo: "/disk.svg" },
  2: { name: "RETRIEVAL", logo: "/fetch.svg" },
};

export const getName = (type) => {
  return OPERATOR_TYPES[type].name;
};

export const getLogo = (type) => {
  return OPERATOR_TYPES[type].logo;
};
