import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

const SCANNER = "https://beryx.zondax.ch/v1/search/fil/calibration/address/";

export const ViewLST = ({ address }) => {
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Token Address</Typography>
        <TextField disabled value={address} />
        <Button href={`${SCANNER}${address}`} target="_blank">
          View On Beryx
        </Button>
      </Stack>
    </Paper>
  );
};
