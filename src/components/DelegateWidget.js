import {
  Stack,
  Typography,
  Divider,
  Alert,
  Box,
  Paper,
  Skeleton,
} from "@mui/material";
import { DelegateButton } from "./DelegateButton";
import { getRisk } from "@/util/operatorTypes";
import { useAccount, useReadContract } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { Shares } from "./Shares";

export const DelegateWidget = ({ operatorAddress, operatorType }) => {
  const { address } = useAccount();
  const {
    isFetching: isDelegatedFetching,
    isSuccess: isDelegatedSuccess,
    data: isDelegated,
  } = useReadContract({
    abi: delegationManager.abi,
    address: delegationManager.address,
    functionName: "isDelegated",
    args: [address],
  });
  const { data: delegatedTo } = useReadContract({
    abi: delegationManager.abi,
    address: delegationManager.address,
    functionName: "delegatedTo",
    args: [address],
  });
  const isSame = delegatedTo === operatorAddress;
  let delegatedToLabel = "You are already delegated to other operator";
  if (isSame) {
    delegatedToLabel = "You are already delegated to this operator";
  }
  return (
    <>
      {!isDelegatedSuccess && isDelegatedFetching && <Skeleton height={200} />}
      {isDelegatedSuccess && isDelegated && (
        <Paper variant="outlined">
          <Stack direction="column" spacing={2} sx={{ padding: 4 }}>
            <Typography variant="h4">Delegated</Typography>
            <Divider />
            <Alert severity="success">{delegatedToLabel}</Alert>
            {isSame && (
              <Shares
                operatorAddress={operatorAddress}
                operatorType={operatorType}
              />
            )}
          </Stack>
        </Paper>
      )}
      {isDelegatedSuccess && !isDelegated && (
        <Paper variant="outlined">
          <Stack direction="column" spacing={2} sx={{ padding: 4 }}>
            <Typography variant="h4">Delegate</Typography>
            <Divider />
            <Alert severity="info">
              Delegating to this operator may result in slashing if it{" "}
              {getRisk(operatorType)}
            </Alert>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <DelegateButton operatorAddress={operatorAddress} />
            </Box>
          </Stack>
        </Paper>
      )}
    </>
  );
};
