import { useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";

import { APICall } from "@api/client";
// import { isEmptyObj } from "@utils";
// import { isValidAddress } from "../utils";

const queryKeys = { project: "project" };

async function fetchProjectList() {
  // if (!isValidAddress(address)) {
  //   toast.error("error: Contract address is not valid!");
  //   return {};
  // }

  const { ret: inactiveProj } = await APICall.getAllProjects({
    isActive: false,
  });

  const { ret: activeProj } = await APICall.getAllProjects({
    isActive: true,
  });

  const projList = inactiveProj.concat(activeProj);

  // const ret = projList.find(
  //   ({ nftContractAddress }) => nftContractAddress === address
  // );

  // if (isEmptyObj(ret)) {
  //   toast.error("error: failed to fetch project info!");
  //   return {};
  // }
  // console.log("ret", ret);
  return projList;
}

export function useProjectList() {
  const { data, isLoading } = useQuery([queryKeys.project], fetchProjectList);

  return { projectList: data, isLoading };
}
