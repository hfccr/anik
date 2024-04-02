"use client";
import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Ipc() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/ipc">IPC</Link>
        </Breadcrumbs>
        <Typography variant="h2">IPC</Typography>
        <Divider />
        <Typography>Show IPC operators and allow slashing with GMP</Typography>
      </Stack>
    </Container>
  );
}
