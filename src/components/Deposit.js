"use client";
import {
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import { lstABI } from "@/util/strategies";
import { useAccount, useReadContract } from "wagmi";
import { strategyManager } from "@/util/strategyManager";
import { Allowance } from "@/components/Allowance";
import { DepositButton } from "@/components/DepositButton";

const MIN_ALLOWANCE = 99999;

export const Deposit = ({ address: contractAddress, strategyAddress }) => {
  const { address } = useAccount();
  const { isSuccess: allowanceFetchSuccess, data: allowance } = useReadContract(
    {
      abi: lstABI,
      address: contractAddress,
      functionName: "allowance",
      args: [address, strategyManager.address],
    }
  );
  const { isSuccess: lstBalanceFetchSuccess, data: lstBalance } =
    useReadContract({
      abi: lstABI,
      address: contractAddress,
      functionName: "balanceOf",
      args: [address],
    });
  const [value, setValue] = useState(0);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const setMaxValue = () => {
    setValue(Math.min(lstBalance.toString(), MIN_ALLOWANCE));
  };
  const valid =
    value > 0 &&
    (lstBalanceFetchSuccess ? value <= lstBalance : true) &&
    value <= MIN_ALLOWANCE;
  const hasMinAllowance = allowance > MIN_ALLOWANCE;
  return (
    <Container>
      <Stack spacing={2}>
        {!allowanceFetchSuccess && <Skeleton />}
        {allowanceFetchSuccess && hasMinAllowance && (
          <>
            <Stack spacing={1} direction="row">
              <TextField
                label="Enter Amount"
                type="number"
                sx={{ flexGrow: 1 }}
                value={value}
                onChange={onChange}
              />
              <Button onClick={setMaxValue} disabled={!lstBalanceFetchSuccess}>
                Max
              </Button>
            </Stack>
            <DepositButton
              address={contractAddress}
              strategyAddress={strategyAddress}
              value={value}
              disabled={!valid}
            />
          </>
        )}
        {allowanceFetchSuccess && !hasMinAllowance && (
          <>
            <Alert severity="info">
              <AlertTitle>Allow Token Transfer Approval</AlertTitle>
              Approval is required to allow transfers to strategy
            </Alert>
            <Allowance address={contractAddress} />
          </>
        )}
      </Stack>
    </Container>
  );
};
