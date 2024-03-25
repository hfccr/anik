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

export default function Operators() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/operators">Operators</Link>
          <Link href="/dapp/operators/new">Register Operator</Link>
        </Breadcrumbs>
        <Typography variant="h3">Register Operator</Typography>
        <Divider />
        <Typography>Register a new operator</Typography>
      </Stack>
    </Container>
  );
}
