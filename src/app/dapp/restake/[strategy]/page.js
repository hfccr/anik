"use client";

import { getStragegy } from "@/util/strategies";
import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function RestakeStrategy({ params }) {
  const selectedStrategy = params.strategy;
  const { title, ticker, logo, abbout, address } =
    getStragegy(selectedStrategy);
  return (
    <Container>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Avatar sx={{ height: 42, width: 42 }}>
            <Image src={logo} height={42} width={42} alt={title} />
          </Avatar>
          <Typography variant="h2">{title}</Typography>
        </Stack>
        <Divider />
      </Stack>
    </Container>
  );
}
