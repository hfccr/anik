import React from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  ROOT_GATEWAY_ADDRESS,
  sortSubnets,
  formatSubnets,
  gatewayAbi,
} from "../util/ipcConstants";
import {
  Box,
  Alert,
  AlertTitle,
  Skeleton,
  List,
  Paper,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { ViewLST } from "./ViewLST";
import { SubnetCount } from "./SubnetCount";
import { SubnetSecurity } from "./SubnetSecurity";
import { RestakingSecurity } from "./RestakingSecurity";
import { Share } from "./Share";
import { getStrategy } from "@/util/strategies";
import { useOperatorStaking } from "@/hooks/useOperatorStaking";
import { useAllOperatorMinerDeals } from "@/hooks/useAllOperatorMinerDeals";
import { SpOperatorCount } from "./SpOperatorCount";
import { Deals } from "./Deals";
import { TotalDeals } from "./TotalDeals";

export const StorageProviders = ({}) => {
  const {
    isSuccess: isOperatorStakingSuccess,
    isFetching: isOperatorStakingFetching,
    data: operatorStakingData,
  } = useOperatorStaking();
  let minerStaking = 0n;
  let minerOperatorCount = 0;
  let minerDelegation = {};
  if (isOperatorStakingSuccess) {
    ({ minerStaking, minerDelegation, minerOperatorCount } =
      operatorStakingData);
  }
  const { isFetching, isSuccess, isError, data } = useAllOperatorMinerDeals();
  let minerList = <></>;
  let minerOperators = [];
  let totalDeals = 0;
  let operatorDeals = {};
  if (isSuccess) {
    ({ minerOperators, totalDeals, operatorDeals } = data);
    minerList = minerOperators.map((miner) => {
      const { minerId, operatorAddress } = miner;
      const { totalCount, deals } = operatorDeals[operatorAddress];
      const delegation = minerDelegation[operatorAddress];
      let delegationView = <></>;
      if (Array.isArray(delegation)) {
        delegationView = delegation
          .filter(({ delegatedShares }) => {
            return delegatedShares > 0n;
          })
          .map(({ strategy, delegatedShares }) => {
            return (
              <Share
                key={strategy.key}
                strategy={strategy}
                delegatableShares={delegatedShares}
              />
            );
          });
      }

      return (
        <Box key={minerId}>
          <ListItem key={minerId}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <ListItemText primary={`t0${minerId}`} />
                <ListItemText secondary={`ETH Address : ${operatorAddress}`} />
                <ListItemText secondary={`Deals: ${totalCount}`} />
                <ListItemText secondary="Recent Deals" />
                <Deals deals={deals} operatorDetails={miner} slash={false} />
              </Stack>
              <Stack direction="column">{delegationView}</Stack>
            </Stack>
          </ListItem>
          <Divider />
        </Box>
      );
    });
  }
  return (
    <Box sx={{ paddingBottom: 4, paddingTop: 2 }}>
      <Stack spacing={4}>
        {isFetching && !isSuccess && <Skeleton height={400} />}
        {isError && (
          <Alert severity="error">
            <AlertTitle>Failed to fetch miner info</AlertTitle>
          </Alert>
        )}
        {isSuccess && (
          <>
            <Stack
              direction={{ lg: "row", md: "column" }}
              spacing={2}
              justifyContent="center"
            >
              <SpOperatorCount minerOperatorCount={minerOperatorCount} />
              <TotalDeals totalDeals={totalDeals} />
              <RestakingSecurity
                isFetching={isOperatorStakingFetching}
                isSuccess={isOperatorStakingFetching}
                ipcStaking={minerStaking}
              />
            </Stack>
            <Paper variant="outlined">
              <List sx={{ padding: 2 }}>{minerList}</List>
            </Paper>
          </>
        )}
      </Stack>
    </Box>
  );
};
