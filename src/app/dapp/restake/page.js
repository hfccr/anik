"use client";
import React from "react";
import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Strategies } from "@/components/Strategies";
import { Mint } from "@/components/Mint";
import Link from "next/link";

export default function Restake() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/restake">Restake</Link>
        </Breadcrumbs>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Restake</Typography>
          <Mint />
        </Stack>
        <Divider />
        <Strategies />
      </Stack>
    </Container>
  );
}
