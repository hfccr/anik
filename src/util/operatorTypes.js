const OPERATOR_TYPES = {
  0: { name: "IPC", logo: "/ipc.png" },
  1: { name: "MINER", logo: "/ipc.png" },
  2: { name: "RETRIEVAL", logo: "/ipc.png" },
};

export const getName = (type) => {
  return OPERATOR_TYPES[type].name;
};

export const getLogo = (type) => {
  return OPERATOR_TYPES[type].logo;
};
