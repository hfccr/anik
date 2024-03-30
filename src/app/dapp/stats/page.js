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

export default function Stats() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/stats">Stats</Link>
        </Breadcrumbs>
        <Typography variant="h2">Stats</Typography>
        <Divider />
        <Typography>Show staking stats across all platforms</Typography>
      </Stack>
    </Container>
  );
}
