import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { APICall } from "@api/client";
import { checkHasRoleAdmin, isValidAddress } from "../utils";

const queryKeys = { projectAdmin: "project-admin" };

async function fetchMyProjectAdmin(api, contractAbi, address) {
  if (!isValidAddress(address)) {
    toast.error("error: Account address is not valid!");
    return [];
  }
  try {
    const { ret: inactiveProj } = await APICall.getAllProjects({
      isActive: false,
    });

    const { ret: activeProj } = await APICall.getAllProjects({
      isActive: true,
    });

    const projList = inactiveProj.concat(activeProj);

    if (projList?.length === 0) {
      return [];
    }

    const projListAddCheckAdmin = await Promise.all(
      projList.map(async ({ nftContractAddress, ...rest }) => {
        const isAdmin = await checkHasRoleAdmin({
          api,
          contractAbi,
          contractAddress: nftContractAddress,
          address,
        });

        return { ...rest, nftContractAddress, isAdmin };
      })
    );

    const myProjList = projListAddCheckAdmin.filter(
      ({ collectionOwner, isAdmin }) => collectionOwner === address || isAdmin
    );

    return myProjList;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export function useMyProjectAdmin(api, contractAbi, address) {
  const { data, isLoading } = useQuery(
    [queryKeys.projectAdmin, address],
    () => fetchMyProjectAdmin(api, contractAbi, address),
    { enabled: !!contractAbi && !!address }
  );

  return { myProjectAdmin: data, isLoading };
}
