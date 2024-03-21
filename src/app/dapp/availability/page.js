"use client";
import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function Availability() {
  return (
    <Container>
      <Stack>
        <Typography variant="h3">Data Availability</Typography>
        <Divider />
        <Typography variant="h4">All rollups are welcome</Typography>
        <Typography variant="h6">
          anik provides DA services for all rollups
        </Typography>
        <Typography>Competing Subnets Algo + Reputation</Typography>
        <Typography>Slashing & Staking</Typography>
        <Typography>Restaking</Typography>
        <Typography>Real time stats from subnets</Typography>
        <Typography>Validium & Optimium Services</Typography>
      </Stack>
    </Container>
  );
}
