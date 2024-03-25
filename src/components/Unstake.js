"use client";
import { Button, Container, Stack, TextField } from "@mui/material";

export const Unstake = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <TextField label="Enter Amount" type="number" sx={{ flexGrow: 1 }} />
          <Button>Max</Button>
        </Stack>
        <Button variant="outlined">Unstake</Button>
      </Stack>
    </Container>
  );
};
