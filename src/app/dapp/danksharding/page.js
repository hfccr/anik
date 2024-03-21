"use client";
import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function Danksharding() {
  return (
    <Container>
      <Stack>
        <Typography variant="h3">Danksharding</Typography>
        <Divider />
        <Typography variant="h4">All rollups are welcome</Typography>
        <Typography variant="h6">
          anik archives all proto-danksharding blobs
        </Typography>
        <Typography>A diagram of the flow</Typography>
        <Typography>
          Use case for ZK and Optimistic rollups with fluence/Coophive based
          compute
        </Typography>
        <Typography>Can turn into validium or optimium</Typography>
        <Typography>Real time stats including DA and DAR</Typography>
        <Typography>For all subnets</Typography>
      </Stack>
    </Container>
  );
}
