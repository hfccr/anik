import { Button, Typography } from "@mui/material";
import { strategyManager } from "@/util/strategyManager";
import { lstABI } from "@/util/strategies";
import { useWriteContract } from "wagmi";
import toast from "react-hot-toast";

const MAX_ALLOWANCE = 999999;

export const Allowance = ({ address: contractAddress }) => {
  const { writeContract } = useWriteContract();
  const setAllowance = () => {
    writeContract({
      abi: lstABI,
      address: contractAddress,
      functionName: "approve",
      args: [strategyManager.address, MAX_ALLOWANCE],
    });
    toast((t) => <Typography>Approving Token Transfer</Typography>);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={setAllowance}>
      Approve Allowance
    </Button>
  );
};
