import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { formatFil } from "../util/ipcConstants";

export const SubnetSecurity = ({ subnets }) => {
  const title = "Security";
  let total = 0n;
  subnets.forEach((subnet) => {
    total += subnet.collateralRaw;
  });
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
            {formatFil(total).replace(" FIL", "")}
          </Typography>
          <Typography>FIL</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
