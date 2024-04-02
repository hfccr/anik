"use client";

import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { OperatorView } from "@/components/OperatorView";

export default function ViewOperatorPage({ params }) {
  const operatorAddress = params.operator;
  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/operators">Operators</Link>
          <Link href={`dapp/operators/view/${operatorAddress}`}>Operator</Link>
        </Breadcrumbs>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h2">Operator</Typography>
        </Stack>
        <Divider />
        <OperatorView operatorAddress={operatorAddress} />
      </Stack>
    </Container>
  );
}
