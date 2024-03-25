"use client";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Operators() {
  const pathname = usePathname();
  return (
    <Container>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3">Operators</Typography>
          <Link href={`${pathname}/new`}>
            <Button variant="outlined" color="secondary">
              Register Operator
            </Button>
          </Link>
        </Stack>
        <Divider />
        <Typography>View and register operators</Typography>
      </Stack>
    </Container>
  );
}
