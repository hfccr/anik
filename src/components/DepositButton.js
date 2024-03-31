import { Button, Typography } from "@mui/material";
import { strategyManager } from "@/util/strategyManager";
import { useWriteContract } from "wagmi";
import toast from "react-hot-toast";

export const DepositButton = ({
  address: contractAddress,
  strategyAddress,
  value,
  disabled,
}) => {
  const { writeContract } = useWriteContract();
  const setAllowance = () => {
    writeContract({
      abi: strategyManager.abi,
      address: strategyManager.address,
      functionName: "depositIntoStrategy",
      args: [strategyAddress, contractAddress, value],
    });
    toast((t) => <Typography>Depositing </Typography>);
  };
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={setAllowance}
      disabled={disabled}
    >
      Deposit
    </Button>
  );
};
