import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { strategies } from "@/util/strategies";
import { isAddress } from "viem";

const applicableStrategies = strategies.filter(
  (strategy) => strategy.strategyAddress !== undefined
);
const strategyAddresses = applicableStrategies.map(
  (strategies) => strategies.strategyAddress
);

export const useOperatorStaking = () => {
  const client = usePublicClient();
  const [operatorStaking, setOperatorStaking] = useState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: {},
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
        let subnetDelegation = {};
        for (let i = 0; i < data.length; i++) {
          const { operatorAddress, operatorType } = data[i];
          // TODO: Remove Subnet Mapping
          if (
            operatorAddress === "0x9f9b24Aa5b2c641845475249596d7f8712bD4263"
          ) {
            data[i].subnetAddress =
              "0x124d199c8E11c11Da8b5D3DF05E24Cd473bF0802";
          }
          const { subnetAddress } = data[i];
          const staking = await client.readContract({
            abi: delegationManager.abi,
            address: delegationManager.address,
            functionName: "getOperatorShares",
            args: [operatorAddress, strategyAddresses],
          });
          if (isAddress(subnetAddress)) {
            if (!Array.isArray(subnetDelegation[subnetAddress])) {
              subnetDelegation[subnetAddress] = applicableStrategies.map(
                (strategy) => ({ strategy, delegatedShares: 0n })
              );
            }
            staking.forEach((staking, index) => {
              subnetDelegation[subnetAddress][index].delegatedShares += staking;
            });
          }
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
          data: {
            operators: data,
            totalStaking,
            ipcStaking,
            minerStaking,
            applicableStrategies,
            subnetDelegation,
          },
        });
      } catch (e) {
        setOperatorStaking({
          isFetching: false,
          isSuccess: false,
          isError: true,
          data: {},
        });
      }
    };
    getOperatorStaking();
  }, [client]);
  return operatorStaking;
};
