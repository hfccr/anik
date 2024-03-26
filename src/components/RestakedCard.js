import {
  Alert,
  AlertTitle,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { lstABI } from "@/util/strategies";
import { useAccount, useReadContract } from "wagmi";

export const RestakedCard = ({ ticker, address: contractAddress }) => {
  const { address } = useAccount();
  const restakedDollarValue = "$0";
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
              <Typography variant="h2">{restakedDollarValue}</Typography>
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
