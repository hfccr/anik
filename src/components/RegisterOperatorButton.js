import { delegationManager } from "@/util/delegationManager";
import { strategyManager } from "@/util/strategyManager";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";

const EARNINGS_RECEIVER = strategyManager.address;
const DELEGATION_APPROVER = strategyManager.address;
const OPT_OUT_BLOCKS = 5;
const SLASHES = 0;

export const RegisterOperatorButton = ({
  name,
  operatorType,
  minerId,
  subnetAddress,
}) => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const disabled = name.length === 0 || name.length > 32;
  const registerOperator = () => {
    writeContract({
      abi: delegationManager.abi,
      address: delegationManager.address,
      functionName: "registerAsOperator",
      args: [
        [
          address,
          EARNINGS_RECEIVER,
          DELEGATION_APPROVER,
          OPT_OUT_BLOCKS,
          name,
          operatorType,
          0,
          minerId,
          subnetAddress,
        ],
      ],
    });
    toast((t) => <Typography>Registering Operator</Typography>);
  };
  return (
    <Button
      variant="outlined"
      color="secondary"
      disabled={disabled}
      onClick={registerOperator}
    >
      Register Operator
    </Button>
  );
};
