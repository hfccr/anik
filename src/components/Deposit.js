"use client";
import { Button, Container, Stack, TextField } from "@mui/material";

export const Deposit = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <TextField label="Enter Amount" type="number" sx={{ flexGrow: 1 }} />
          <Button>Max</Button>
        </Stack>
        <Button variant="outlined">Deposit</Button>
      </Stack>
    </Container>
  );
};
