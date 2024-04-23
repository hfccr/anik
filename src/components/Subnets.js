import React from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  ROOT_GATEWAY_ADDRESS,
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

export const Subnets = ({}) => {
  const {
    isSuccess: isOperatorStakingSuccess,
    isFetching: isOperatorStakingFetching,
    data: operatorStakingData,
  } = useOperatorStaking();
  let ipcStaking = 0n;
  let subnetDelegation = {};
  if (isOperatorStakingSuccess) {
    ({ ipcStaking, subnetDelegation } = operatorStakingData);
  }
  const { isFetching, isSuccess, isError, data, error } = useReadContract({
    abi: gatewayAbi,
    address: ROOT_GATEWAY_ADDRESS,
    functionName: "listSubnets",
    args: [],
  });
  let formattedSubnets = [];
  let subnetList = [];
  const sortIpcSubnets = (a, b) => {
    const { subnetAddr: aAddr, genesis: aGenesis } = a;
    const { subnetAddr: bAddr, genesis: bGenesis } = b;
    const aDelegated = subnetDelegation[aAddr] || [];
    const bDelegated = subnetDelegation[bAddr] || [];
    const aDelegatedShares = aDelegated.reduce(
      (acc, { delegatedShares }) => acc + delegatedShares,
      0n
    );
    const bDelegatedShares = bDelegated.reduce(
      (acc, { delegatedShares }) => acc + delegatedShares,
      0n
    );
    if (aDelegatedShares > 0n && bDelegatedShares > 0n) {
      return aDelegatedShares > bDelegatedShares ? -1 : 1;
    } else if (aDelegatedShares > 0n && bDelegatedShares <= 0n) {
      return -1;
    } else if (aDelegatedShares <= 0n && bDelegatedShares > 0n) {
      return 1;
    } else {
      if (aGenesis > bGenesis) {
        return -1;
      } else if (aGenesis < bGenesis) {
        return 1;
      }
      return 0;
    }
  };
  if (isSuccess) {
    formattedSubnets = formatSubnets(data);
    subnetList = formattedSubnets.sort(sortIpcSubnets).map((subnet) => {
      const { subnetId, genesis, collateral, circulatingSupply, subnetAddr } =
        subnet;
      const delegation = subnetDelegation[subnetAddr];
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
        <Box key={subnetId}>
          <ListItem key={subnetId}>
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
                <ListItemText primary={subnetId} />
                <ListItemText secondary={`ETH Address : ${subnetAddr}`} />
                <ListItemText secondary={`Collateral : ${collateral}`} />
                <ListItemText
                  secondary={`Circulating Supply: ${circulatingSupply}`}
                />
                <ListItemText
                  secondary={`Genesis Epoch: ${genesis.toString()}`}
                />
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
            <AlertTitle>Failed to fetch subnet info</AlertTitle>
          </Alert>
        )}
        {isSuccess && (
          <>
            <Stack
              direction={{ lg: "row", md: "column" }}
              spacing={2}
              justifyContent="center"
            >
              <ViewLST
                address={ROOT_GATEWAY_ADDRESS}
                node="Gateway"
                mint={false}
              />
              <SubnetCount subnets={formattedSubnets} />
              <SubnetSecurity subnets={formattedSubnets} />
              <RestakingSecurity
                isFetching={isOperatorStakingFetching}
                isSuccess={isOperatorStakingFetching}
                ipcStaking={ipcStaking}
              />
            </Stack>
            <Paper variant="outlined">
              <List sx={{ padding: 2 }}>{subnetList}</List>
            </Paper>
          </>
        )}
      </Stack>
    </Box>
  );
};
