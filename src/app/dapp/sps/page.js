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
import { StorageProviders } from "@/components/StorageProviders";

export default function Ipc() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/sps">SPs</Link>
        </Breadcrumbs>
        <Typography variant="h2">Storage Providers</Typography>
        <Divider />
        <StorageProviders />
      </Stack>
    </Container>
  );
}
