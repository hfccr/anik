"use client";
import { delegationManager } from "@/util/delegationManager";
import { getName } from "@/util/operatorTypes";
import {
  Alert,
  Button,
  Container,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { RegisterOperatorButton } from "./RegisterOperatorButton";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const OperatorRegistration = () => {
  const [name, setName] = useState("");
  const [operatorType, setOperatorType] = useState(0);
  const [minerId, setMinerId] = useState(0);
  const [subnetAddress, setSubnetAddress] = useState("");
  const { address } = useAccount();
  const {
    isError,
    isFetching,
    isSuccess,
    data: operatorDetails,
  } = useReadContract({
    abi: delegationManager.abi,
    address: delegationManager.address,
    functionName: "operatorDetails",
    args: [address],
  });
  const isOperator = operatorDetails && operatorDetails.name !== "";
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onTypeChange = (event) => {
    setOperatorType(event.target.value);
  };
  const onMinerIdChange = (event) => {
    setMinerId(event.target.value);
  };
  const onSubnetAddressChange = (event) => {
    setSubnetAddress(event.target.value);
  };
  const useMinerId = operatorType === 1;
  const useSubnetAddress = operatorType === 0;
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
      <Container maxWidth="sm">
        {!isSuccess && isFetching && <Skeleton height={400} />}
        {isError && (
          <Alert severity="error">Failed to check operator status</Alert>
        )}
        {isSuccess && isOperator && (
          <Paper variant="outlined">
            <Stack spacing={6} sx={{ padding: 8, width: "100%" }}>
              <TextField
                label="Operator Name"
                name="currentName"
                value={operatorDetails.name}
                disabled
              />
              <TextField
                label="Operator Type"
                name="currentType"
                value={getName(operatorDetails.operatorType)}
                disabled
              />
              <TextField
                label="Slashes"
                name="currentSlashes"
                value={operatorDetails.slashes.toString()}
                type="number"
                disabled
              />
              {operatorDetails.operatorType === 0 &&
                operatorDetails.subnetAddress && (
                  <TextField
                    label="Subnet ETH Address"
                    name="subnetAddress"
                    value={operatorDetails.subnetAddress.toString()}
                    disabled
                  />
                )}
              {operatorDetails.minerId && (
                <TextField
                  label="Miner ID"
                  name="minerId"
                  value={operatorDetails.minerId.toString()}
                  type="number"
                  disabled
                />
              )}
              <Alert severity="info">
                You are already registered as an{" "}
                {getName(operatorDetails.operatorType)} operator
              </Alert>
            </Stack>
          </Paper>
        )}
        {isSuccess && !isOperator && (
          <Paper variant="outlined">
            <Stack spacing={6} sx={{ padding: 8, width: "100%" }}>
              <TextField
                label="Operator Name"
                name="name"
                value={name}
                onChange={onNameChange}
                required
              />
              <TextField
                select
                label="Operator Type"
                value={operatorType}
                onChange={onTypeChange}
              >
                <MenuItem value={0}>IPC Validator</MenuItem>
                <MenuItem value={1}>Storage Provider</MenuItem>
                <MenuItem value={3}>Retrieval Attestor</MenuItem>
              </TextField>
              {useSubnetAddress && (
                <TextField
                  label="Subnet ETH Address"
                  name="subnetAddress"
                  value={subnetAddress}
                  onChange={onSubnetAddressChange}
                  required
                />
              )}
              {useMinerId && (
                <TextField
                  label="Miner ID"
                  name="minerId"
                  value={minerId}
                  onChange={onMinerIdChange}
                  required
                />
              )}
              <RegisterOperatorButton
                name={name}
                operatorType={operatorType}
                minerId={useMinerId ? minerId : 0}
                subnetAddress={useSubnetAddress ? subnetAddress : ZERO_ADDRESS}
              />
              <Alert severity="info">
                An operator will be registered with your wallet address
              </Alert>
            </Stack>
          </Paper>
        )}
      </Container>
    </Stack>
  );
};
