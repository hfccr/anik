import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Mint } from "./Mint";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const SCANNER = "https://beryx.zondax.ch/v1/search/fil/calibration/address/";

export const ViewLST = ({ address }) => {
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Token Address</Typography>
        <TextField disabled value={address} />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            startIcon={<OpenInNewIcon />}
            variant="outlined"
            color="secondary"
            href={`${SCANNER}${address}`}
            target="_blank"
          >
            Explorer
          </Button>
          <Mint address={address} />
        </Stack>
      </Stack>
    </Paper>
  );
};
