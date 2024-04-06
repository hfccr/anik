import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { formatFil } from "../util/ipcConstants";
import { useOperatorStaking } from "@/hooks/useOperatorStaking";

export const RestakingSecurity = ({ subnets }) => {
  const title = "Restaked";
  let total = 0n;
  subnets.forEach((subnet) => {
    total += subnet.collateralRaw;
  });
  const { isSuccess, isFetching, data } = useOperatorStaking();
  let ipcStaking = 0n;
  if (isSuccess) {
    ({ ipcStaking } = data);
  }
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
          {isFetching && <Skeleton height={20} />}
          <Typography
            variant="h6"
            sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 2 }}
          >
            {ipcStaking.toString()} Tokens
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
