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
  Stack,
} from "@mui/material";
import { ViewLST } from "./ViewLST";
import { SubnetCount } from "./SubnetCount";
import { SubnetSecurity } from "./SubnetSecurity";
import { RestakingSecurity } from "./RestakingSecurity";

export const Subnets = ({}) => {
  const { isFetching, isSuccess, isError, data, error } = useReadContract({
    abi: gatewayAbi,
    address: ROOT_GATEWAY_ADDRESS,
    functionName: "listSubnets",
    args: [],
  });
  let formattedSubnets = [];
  let subnetList = [];
  if (isSuccess) {
    formattedSubnets = sortSubnets(formatSubnets(data));
    subnetList = formattedSubnets.map((subnet) => {
      const { subnetId, genesis, collateral, circulatingSupply } = subnet;
      return (
        <ListItem key={subnetId}>
          <ListItemText
            primary={subnetId}
            secondary={`Collateral : ${collateral}`}
          />
        </ListItem>
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
              <RestakingSecurity subnets={formattedSubnets} />
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
