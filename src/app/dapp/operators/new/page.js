"use client";
import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function Operators() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3">Register Operator</Typography>
        <Divider />
        <Typography>Register a new operator</Typography>
      </Stack>
    </Container>
  );
}
