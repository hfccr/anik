import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

export const SpOperatorCount = ({ minerOperatorCount }) => {
  const title = "Storage Providers";
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <Typography variant="h4" sx={{ paddingLeft: 2, paddingRight: 2 }}>
            {minerOperatorCount}
          </Typography>
          <Typography>Total SP Operators</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
