"use client";

import { useAccount, useReadContract } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { Alert, Container, LinearProgress, Skeleton } from "@mui/material";
import { OperatorList } from "@/components/OperatorList";

export const Operators = () => {
  const { address } = useAccount();
  const {
    isSuccess,
    isError,
    isFetching,
    data: operators,
  } = useReadContract({
    abi: delegationManager.abi,
    address: delegationManager.address,
    functionName: "getAllOperators",
    args: [],
  });
  const { data: isDelegated } = useReadContract({
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
  return (
    <>
      {!isSuccess && isFetching && <Skeleton height={400} />}
      {isSuccess && isFetching && <LinearProgress />}
      {isError && <Alert severity="error">Failed to fetch operators</Alert>}
      {isSuccess && operators.length === 0 && (
        <Alert severity="info">No operators registered yet</Alert>
      )}
      {isSuccess && operators.length > 0 && (
        <OperatorList
          operators={operators}
          isDelegated={isDelegated}
          delegatedTo={delegatedTo}
        />
      )}
    </>
  );
};
