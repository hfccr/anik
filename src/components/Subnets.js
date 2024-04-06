import React from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  ROOT_GATEWAY_ADDRESS,
  sortSubnets,
  formatSubnets,
  gatewayAbi,
} from "../util/ipcConstants";
import { Alert, AlertTitle, Skeleton } from "@mui/material";

export const Subnets = ({ operatorDetails }) => {
  const { isFetching, isSuccess, isError, data, error } = useReadContract({
    abi: gatewayAbi,
    address: ROOT_GATEWAY_ADDRESS,
    functionName: "listSubnets",
    args: [],
  });
  if (isSuccess) {
    console.log(sortSubnets(formatSubnets(data)));
  }
  return (
    <>
      {isFetching && !isSuccess && <Skeleton height={400} />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Failed to fetch subnet info</AlertTitle>
        </Alert>
      )}
    </>
  );
};
