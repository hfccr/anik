import {
  Alert,
  AlertTitle,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { lstABI, strategyABI } from "@/util/strategies";
import { useAccount, useReadContract } from "wagmi";

export const RestakedCard = ({
  ticker,
  address: contractAddress,
  strategyAddress,
}) => {
  const { address } = useAccount();
  const {
    isError,
    isLoading,
    isSuccess,
    data: lstBalance,
  } = useReadContract({
    abi: lstABI,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address],
  });
  const { isSuccess: isStrategySuccess, data: shares } = useReadContract({
    abi: strategyABI,
    address: strategyAddress,
    functionName: "shares",
    args: [address],
  });
  return (
    <>
      {isLoading && <Skeleton height={120} />}
      {isSuccess && (
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              {!isStrategySuccess && <Skeleton width={80} />}
              {isStrategySuccess && (
                <Typography variant="h2">{shares.toString()}</Typography>
              )}
              <Typography variant="h6">Restaked</Typography>
            </Stack>
            <Chip label={`${lstBalance} ${ticker}`} />
          </Stack>
        </Paper>
      )}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Failed to fetch {ticker} balance</AlertTitle>
          Try again later
        </Alert>
      )}
    </>
  );
};
