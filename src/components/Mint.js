"use client";
import { lstABI } from "@/util/strategies";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";

export const Mint = ({ address: contractAddress }) => {
  const { writeContract, isPending } = useWriteContract();
  const mint = () => {
    writeContract({
      abi: lstABI,
      address: contractAddress,
      functionName: "mint",
      args: [100],
      onSuccess: () => {
        toast.success("Tokens Minted Successfully!");
      },
      onError: () => {
        toast.error("Failed To Mint Tokens");
      },
    });
  };
  const label = isPending ? "Minting Tokens" : "Mint Tokens";
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={mint}
      disabled={isPending}
    >
      {label}
    </Button>
  );
};
