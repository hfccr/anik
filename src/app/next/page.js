"use client";
import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Next() {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "dark" ? "/anik-next.svg" : "/anik-next-light.svg";
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/next">Next</Link>
        </Breadcrumbs>
        <Typography variant="h2">Next</Typography>
        <Divider />
        <Typography>
          The end goal is to connect Filecoin actors to native and ethereum
          restaking. Native restaking will enable fast paced development of
          Filecoin native use cases which will then be bridged to Ethereum
          restaking ecosystem via AVS development.
        </Typography>
        <Stack justifyContent="center" alignItems="center">
          <Image src={imageSrc} height={700} width={800} alt="next" />
        </Stack>
      </Stack>
    </Container>
  );
}
