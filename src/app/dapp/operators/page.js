"use client";
import {
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Operators } from "@/components/Operators";

export default function OperatorsPage() {
  const pathname = usePathname();
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/operators">Operators</Link>
        </Breadcrumbs>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2">Operators</Typography>
          <Link href={`${pathname}/new`}>
            <Button variant="outlined" color="secondary">
              Register Operator
            </Button>
          </Link>
        </Stack>
        <Divider />
        <Operators />
      </Stack>
    </Container>
  );
}
