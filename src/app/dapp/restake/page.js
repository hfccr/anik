"use client";
import React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Strategies } from "./Strategies";

export default function Layer1() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography variant="h3">Restake</Typography>
        <Divider />
        <Strategies />
      </Stack>
    </Container>
  );
}
