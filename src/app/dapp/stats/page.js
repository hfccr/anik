"use client";
import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function Stats() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3">Stats</Typography>
        <Divider />
        <Typography>Show staking stats across all platforms</Typography>
      </Stack>
    </Container>
  );
}
