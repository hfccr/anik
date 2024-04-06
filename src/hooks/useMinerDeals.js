const { useState, useEffect } = require("react");

const URI = "https://calibration.filfox.info/api/v1/deal/list";

const MAX_DEALS = 5;

export const useMinerDeals = (minerId) => {
  const [minerDeals, setMinerDeals] = useState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: {},
  });
  useEffect(() => {
    const getMinerDeals = async (minerId) => {
      setMinerDeals({
        isFetching: true,
        isSuccess: false,
        isError: false,
        data: {},
      });
      try {
        const response = await fetch(
          `${URI}?address=t0${minerId}&pageSize=${MAX_DEALS}&page=${1}`
        );
        const { totalCount, deals } = await response.json();
        setMinerDeals({
          isFetching: false,
          isSuccess: true,
          isError: false,
          data: { totalCount, deals },
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
    if (minerId) {
      getMinerDeals(minerId);
    }
  }, [minerId]);
  return minerDeals;
};
