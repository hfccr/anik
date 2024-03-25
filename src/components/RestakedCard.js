import { Chip, Paper, Stack, Typography } from "@mui/material";

export const RestakedCard = ({ ticker }) => {
  const restakedDollarValue = "$0";
  const restakedTokenValue = "0";
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography variant="h2">{restakedDollarValue}</Typography>
          <Typography variant="h6">Restaked</Typography>
        </Stack>
        <Chip label={`${restakedTokenValue} ${ticker}`} />
      </Stack>
    </Paper>
  );
};
