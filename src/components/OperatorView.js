"use client";
import { delegationManager } from "@/util/delegationManager";
import {
  getLogo,
  getName,
  getOperatorSpecificView,
  getService,
} from "@/util/operatorTypes";
import {
  Alert,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useAccount, useReadContract } from "wagmi";
import Image from "next/image";
import { ViewLST } from "./ViewLST";
import { DelegateWidget } from "./DelegateWidget";

export const OperatorView = ({ operatorAddress }) => {
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
    args: [operatorAddress],
  });
  const operatorType = operatorDetails?.operatorType;
  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 8 }}>
      {!isSuccess && isFetching && <Skeleton height={400} />}
      {isError && (
        <Alert severity="error">Failed to check operator status</Alert>
      )}
      {isSuccess && (
        <Stack direction={{ md: "column", lg: "row" }} spacing={4}>
          <Stack
            spacing={4}
            direction="column"
            sx={{ width: { md: "100%", lg: "100%" } }}
          >
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Image
                    src={getLogo(operatorType)}
                    alt={getName(operatorType)}
                    width={64}
                    height={64}
                  />
                  <Typography variant="h4">{getName(operatorType)}</Typography>
                </Stack>
                <Divider />
                <Typography>
                  Secure the {getService(operatorType)} by delegating to{" "}
                  <Typography component="span" color="primary">
                    {operatorDetails.name}
                  </Typography>
                  . Delegating will allow your stakes to be reused by this
                  operator for cryptoeconomic security of the{" "}
                  {getService(operatorType)}.
                </Typography>
              </Stack>
            </Paper>
            <DelegateWidget
              operatorAddress={operatorAddress}
              operatorType={operatorType}
            />
            {getOperatorSpecificView(operatorDetails)}
          </Stack>
          <Stack
            direction="column"
            spacing={4}
            sx={{
              width: { md: "100%", lg: "50%" },
              marginTop: { sm: 4, xs: 4 },
            }}
          >
            <ViewLST
              address={operatorAddress}
              sx={{ width: "100%" }}
              node="Operator"
              mint={false}
            />
            <Paper variant="outlined" sx={{ padding: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Slashes</Typography>
                <Divider />
                <Typography>
                  This operator has been slashed{" "}
                  {operatorDetails.slashes.toString()} times
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};
