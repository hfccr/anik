"use client";
import { http, createConfig } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";

const ipc1 = {
  id: 1521432628168185,
  name: "IPC1",
  nativeCurrency: {
    name: "subnet filecoin",
    symbol: "tFIL",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  blockExplorers: {},
};

const config = createConfig({
  appName: "Anik",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [filecoinCalibration, ipc1],
  transports: {
    [filecoinCalibration.id]: http(),
    [ipc1.id]: http(),
  },
  ssr: true,
});

export { config };
