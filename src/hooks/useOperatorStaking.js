import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { strategies } from "@/util/strategies";

const strategyAddresses = strategies
  .filter((strategy) => strategy.strategyAddress !== undefined)
  .map((strategies) => strategies.strategyAddress);

export const useOperatorStaking = () => {
  const client = usePublicClient();
  const [operatorStaking, setOperatorStaking] = useState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: [],
  });
  useEffect(() => {
    const getOperatorStaking = async () => {
      try {
        const data = await client.readContract({
          abi: delegationManager.abi,
          address: delegationManager.address,
          functionName: "getAllOperators",
          args: [],
        });
        let totalStaking = 0n;
        let ipcStaking = 0n;
        let minerStaking = 0n;
        for (let i = 0; i < data.length; i++) {
          const { operatorAddress, operatorType } = data[i];
          const staking = await client.readContract({
            abi: delegationManager.abi,
            address: delegationManager.address,
            functionName: "getOperatorShares",
            args: [operatorAddress, strategyAddresses],
          });
          if (operatorType === 0) {
            staking.forEach((staking) => (ipcStaking += staking));
          } else if (operatorType === 1) {
            staking.forEach((staking) => (minerStaking += staking));
          }
          staking.forEach((staking) => (totalStaking += staking));
          data[i].staking = staking;
        }
        setOperatorStaking({
          isFetching: false,
          isSuccess: true,
          isError: false,
          data: { operators: data, totalStaking, ipcStaking, minerStaking },
        });
      } catch (e) {
        setOperatorStaking({
          isFetching: false,
          isSuccess: false,
          isError: true,
          data: [],
        });
      }
    };
    getOperatorStaking();
  }, [client]);
  return operatorStaking;
};
