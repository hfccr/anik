import { delegationManager } from "@/util/delegationManager";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";

export const DelegateButton = ({ operatorAddress }) => {
  const { writeContract } = useWriteContract();
  const delegate = () => {
    writeContract({
      abi: delegationManager.abi,
      address: delegationManager.address,
      functionName: "delegateTo",
      args: [operatorAddress],
    });
    toast((t) => <Typography>Delegating to Operator</Typography>);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={delegate}>
      Delegate
    </Button>
  );
};
