import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { APICall } from "@api/client";

const queryKeys = { phase: "phase" };

async function fetchPhaseInfo(nftContractAddress, phaseId) {
  const { status, ret } = await APICall.getPhaseInfo({
    nftContractAddress,
    phaseId,
  });

  if (status !== "OK") {
    toast.error("error: failed to fetch Phase Info!");
    return {};
  }

  return ret;
}

export function usePhaseInfo(contractAddress, phaseId) {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [queryKeys.phase, contractAddress, phaseId],
    queryFn: async () => await fetchPhaseInfo(contractAddress, phaseId),
    cacheTime: 3000,
    enabled: !!contractAddress && !!phaseId && phaseId !== "0",
  });

  return { phaseInfo: data, isLoading, isRefetching, refetch };
}
