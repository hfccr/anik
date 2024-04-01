"use client";
import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { OperatorRegistration } from "@/components/OperatorRegistration";

export default function Operators() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/operators">Operators</Link>
          <Link href="/dapp/operators/new">Register Operator</Link>
        </Breadcrumbs>
        <Typography variant="h2">Register Operator</Typography>
        <Divider />
        <Box sx={{ marginTop: 2 }}>
          <OperatorRegistration />
        </Box>
      </Stack>
    </Container>
  );
}
