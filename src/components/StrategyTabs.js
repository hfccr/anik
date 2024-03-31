import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Deposit } from "./Deposit";
import { Divider, Paper, Stack } from "@mui/material";

export const StrategyTabs = ({ address, strategyAddress, ticker }) => {
  return (
    <Box>
      <Paper variant="outlined" sx={{ overflow: "hidden" }} component="div">
        <Stack spacing={4} sx={{ padding: 2, paddingBottom: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              Deposit {ticker}
            </Typography>
            <Divider />
          </Box>
          <Deposit address={address} strategyAddress={strategyAddress} />
        </Stack>
      </Paper>
    </Box>
  );
};
