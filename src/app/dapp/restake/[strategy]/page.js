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
import { ViewLST } from "@/components/ViewLST";

export default function RestakeStrategy({ params }) {
  const selectedStrategy = params.strategy;
  const { title, ticker, logo, about, address } = getStragegy(selectedStrategy);
  return (
    <Container maxWidth="lg">
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
        <Stack direction={{ md: "column", lg: "row" }} spacing={4}>
          <Stack direction="column" spacing={4} sx={{ minWidth: 600 }}>
            <RestakedCard ticker={ticker} />
            <StrategyTabs sx={{ width: "100%" }} />
          </Stack>
          <Stack direction="column" spacing={4}>
            <ViewLST address={address} sx={{ width: "100%" }} />
            <Paper variant="outlined" component="div">
              <Stack spacing={2} sx={{ padding: 2 }}>
                <Typography variant="h6">About {title}</Typography>
                <Typography>{about}</Typography>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}