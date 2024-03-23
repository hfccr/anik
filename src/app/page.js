import Image from "next/image";
import styles from "./page.module.css";
import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h2">
        Provide Trust To IPC Subnets With Restaking
      </Typography>
    </Stack>
  );
}
