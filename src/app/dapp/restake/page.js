"use client";
import React from "react";
import {
  Breadcrumbs,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Strategies } from "@/components/Strategies";
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
          <Typography variant="h2">Restake</Typography>
        </Stack>
        <Divider />
        <Paper elevation={0} variant="outlined">
          <Strategies />
        </Paper>
      </Stack>
    </Container>
  );
}
