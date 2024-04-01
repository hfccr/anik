"use client";

import { useReadContract } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { Alert, Skeleton } from "@mui/material";
import { OperatorList } from "@/components/OperatorList";

export const Operators = () => {
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
  console.log(operators);
  return (
    <>
      {isFetching && <Skeleton height={400} />}
      {isError && <Alert severity="error">Failed to fetch operators</Alert>}
      {isSuccess && operators.length === 0 && (
        <Alert severity="info">No operators registered yet</Alert>
      )}
      {isSuccess && operators.length > 0 && (
        <OperatorList operators={operators} />
      )}
    </>
  );
};
