import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { delegationManager } from "@/util/delegationManager";
import { strategies } from "@/util/strategies";
import { isAddress } from "viem";

const URI = "https://calibration.filfox.info/api/v1/deal/list";

const MAX_DEALS = 2;

export const useAllOperatorMinerDeals = () => {
  const client = usePublicClient();
  const [minerDeals, setMinerDeals] = useState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: {},
  });
  useEffect(() => {
    const getMinerDeals = async () => {
      setMinerDeals({
        isFetching: true,
        isSuccess: false,
        isError: false,
        data: {},
      });
      try {
        const data = await client.readContract({
          abi: delegationManager.abi,
          address: delegationManager.address,
          functionName: "getAllOperators",
          args: [],
        });
        const minerOperators = data.filter((data) => data.operatorType === 1);
        let totalDeals = 0;
        const operatorDeals = {};
        for (let i = 0; i < minerOperators.length; i++) {
          const { operatorAddress, operatorType, minerId } = minerOperators[i];
          // is miner type operator
          const URL = `${URI}?address=t0${minerId.toString()}&pageSize=${MAX_DEALS}&page=${1}`;
          const response = await fetch(URL);
          const { totalCount, deals } = await response.json();
          totalDeals += totalCount;
          operatorDeals[operatorAddress] = { totalCount, deals };
        }
        setMinerDeals({
          isFetching: false,
          isSuccess: true,
          isError: false,
          data: { totalDeals, minerOperators, operatorDeals },
        });
      } catch (e) {
        setMinerDeals({
          isFetching: false,
          isSuccess: false,
          isError: true,
          data: {},
        });
      }
    };
    getMinerDeals();
  }, [client]);
  return minerDeals;
};
