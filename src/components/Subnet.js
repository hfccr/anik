import * as React from "react";
import {
  Paper,
  Stack,
  Typography,
  Skeleton,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useReadContracts } from "wagmi";
import {
  SUBNET_CONSENSUS_TYPE,
  SUBNET_PERMISSION_MODE,
  SUBNET_SUPPLY_KIND,
  filAddressEthAddress,
  formatFil,
  subnetActorAbi,
} from "@/util/ipcConstants";
import { IpcSlashButton } from "@/components/IpcSlashButton";

export const Subnet = ({ operatorDetails }) => {
  const { subnetAddress } = operatorDetails;
  const contract = {
    address: subnetAddress,
    abi: subnetActorAbi,
    args: [],
  };
  const {
    isFetching,
    isError,
    isSuccess,
    data: subnetInfo,
  } = useReadContracts({
    contracts: [
      {
        ...contract,
        functionName: "permissionMode",
      },
      {
        ...contract,
        functionName: "minValidators",
      },
      {
        ...contract,
        functionName: "majorityPercentage",
      },
      {
        ...contract,
        functionName: "activeValidatorsLimit",
      },
      {
        ...contract,
        functionName: "bottomUpCheckPeriod",
      },
      {
        ...contract,
        functionName: "consensus",
      },
      {
        ...contract,
        functionName: "killed",
      },
      {
        ...contract,
        functionName: "minActivationCollateral",
      },
      {
        ...contract,
        functionName: "powerScale",
      },
      {
        ...contract,
        functionName: "supplySource",
      },
      {
        ...contract,
        functionName: "genesisValidators",
      },
    ],
  });
  let genesisValidatorString = "";
  let permissionMode,
    minValidators,
    majorityPercentage,
    activeValidatorsLimit,
    bottomUpCheckPeriod,
    consensus,
    killed,
    minActivationCollateral,
    powerScale,
    supplySource,
    genesisValidators;
  if (isSuccess) {
    [
      permissionMode,
      minValidators,
      majorityPercentage,
      activeValidatorsLimit,
      bottomUpCheckPeriod,
      consensus,
      killed,
      minActivationCollateral,
      powerScale,
      supplySource,
      genesisValidators,
    ] = subnetInfo;

    genesisValidatorString = genesisValidators.result
      .map((v) => v.addr)
      .join(", ");
  }
  const subnetFilAddress = filAddressEthAddress(subnetAddress);
  const subnetNestedAddr = `/r314159/${subnetFilAddress}`;
  return (
    <>
      {isFetching && !isSuccess && <Skeleton height={300} />}
      {isError && (
        <Alert severity="error">Failed to fetch miner operator deals</Alert>
      )}
      {isSuccess && (
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Operator Subnet</Typography>
              <IpcSlashButton
                operatorDetails={{ ...operatorDetails, subnetAddress }}
              />
            </Stack>
            <Divider />
            <List>
              <ListItem>
                <ListItemText
                  secondary={subnetNestedAddr}
                  primary="Subnet Address"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={genesisValidatorString}
                  primary="Genesis Validator"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={SUBNET_PERMISSION_MODE.get(permissionMode.result)}
                  primary="Permission Mode"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={formatFil(minActivationCollateral.result)}
                  primary="Minimum Activation Collateral"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={minValidators.result.toString()}
                  primary="Minimum Validators"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={majorityPercentage.result.toString()}
                  primary="Majority Percentage"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={activeValidatorsLimit.result.toString()}
                  primary="Active Validators Limit"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={bottomUpCheckPeriod.result.toString()}
                  primary="Bottom Up Check Period"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={SUBNET_CONSENSUS_TYPE.get(consensus.result)}
                  primary="Consensus"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={killed.result.toString()}
                  primary="Killed"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={powerScale.result.toString()}
                  primary="Power Scale"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={SUBNET_SUPPLY_KIND.get(supplySource.result.kind)}
                  primary="Suppy Source Kind"
                />
              </ListItem>
            </List>
          </Stack>
        </Paper>
      )}
    </>
  );
};
