import { delegationManager } from "@/util/delegationManager";
import { getStrategyByStrategyAddress } from "@/util/strategies";
import { List, Skeleton, Typography } from "@mui/material";
import { useAccount, useReadContract } from "wagmi";
import { Share } from "./Share";

const join = (delegatableShares) => {
  const [strategies, shares] = delegatableShares;
  const delegatable = [];
  for (let i = 0; i < strategies.length; i++) {
    delegatable.push({
      strategy: getStrategyByStrategyAddress(strategies[i]),
      shares: shares[i],
    });
  }
  return delegatable;
};

export const Shares = ({ operatorAddress, operatorType }) => {
  const { address } = useAccount();
  const {
    isFetching,
    isSuccess,
    data: delegatableShares,
  } = useReadContract({
    abi: delegationManager.abi,
    address: delegationManager.address,
    functionName: "getDelegatableShares",
    args: [address],
  });
  return (
    <>
      {isFetching && <Skeleton height={300} />}
      {isSuccess && (
        <List>
          {join(delegatableShares).map((delegatable) => (
            <Share
              key={delegatable.strategy.strategyAddress}
              strategy={delegatable.strategy}
              delegatableShares={delegatable.shares}
            />
          ))}
        </List>
      )}
    </>
  );
};
