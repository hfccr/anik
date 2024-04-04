import {
  Alert,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useMinerDeals } from "@/hooks/useMinerDeals";
import { Deals } from "./Deals";

export const MinerOperator = ({ operatorDetails }) => {
  const { minerId } = operatorDetails;
  const { isFetching, isError, isSuccess, data } = useMinerDeals(minerId);
  const { totalCount, deals } = data;
  return (
    <>
      {isFetching && <Skeleton height={300} />}
      {isError && (
        <Alert severity="error">Failed to fetch miner operator deals</Alert>
      )}
      {isSuccess && (
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">t0{minerId.toString()}</Typography>
              {isSuccess && <Chip label={`${totalCount} Deals`} />}
            </Stack>
            <Divider />
            <Typography>Recent Deals</Typography>
            <Deals deals={deals} operatorDetails={operatorDetails} />
          </Stack>
        </Paper>
      )}
    </>
  );
};
