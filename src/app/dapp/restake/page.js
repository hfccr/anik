"use client";
import React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Strategies } from "@/components/Strategies";
import { Mint } from "@/components/Mint";

export default function Restake() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
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
