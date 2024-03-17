"use client";
import { http, createConfig } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";

const config = createConfig({
  appName: "Anik",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [filecoinCalibration],
  transports: {
    [filecoinCalibration.id]: http(),
  },
  ssr: true,
});

export { config };
