import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Stack
        direction={{ md: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "70vh", position: "relative" }}
      >
        <Image
          src="/flow-diagonal.svg"
          alt="flow-diagonal"
          fill="true"
          priority
          quality={100}
        />
        <Typography variant="h1" sx={{ textAlign: "center", zIndex: 1 }}>
          Filecoin Ecosystem Trust Layer
        </Typography>
      </Stack>
      <Typography variant="h2">
        Provide Cryptoeconomic Security To IPC Subnets With Restaking
      </Typography>
      <Typography variant="h2">
        Shared Security For Interplanetary Subnets
      </Typography>
      <Typography>Allows IPC devs to increase trust in their subnet</Typography>
      <Typography>
        Anik Is A FVM Native Trust Layer For Providing Security To IPC Subnets &
        Other PL Native Applications
      </Typography>
    </Stack>
  );
}
