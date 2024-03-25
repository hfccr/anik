"use client";

import { getStragegy } from "@/util/strategies";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { StrategyTabs } from "@/components/StrategyTabs";
import { RestakedCard } from "@/components/RestakedCard";

export default function RestakeStrategy({ params }) {
  const selectedStrategy = params.strategy;
  const { title, ticker, logo, about, address } = getStragegy(selectedStrategy);
  return (
    <Container>
      <Stack spacing={4}>
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
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Chip label={ticker} sx={{}} />
          </Box>
        </Stack>
        <Divider />
        <RestakedCard ticker={ticker} />
        <StrategyTabs />
        <Paper variant="outlined" component="div">
          <Stack spacing={2} sx={{ padding: 2 }}>
            <Typography variant="h4">About {title}</Typography>
            <Typography>{about}</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
