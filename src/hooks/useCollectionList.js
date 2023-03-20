import { useQuery } from "@tanstack/react-query";
import { APICall } from "@api/client";

const queryKeys = { collectionList: "collectionList" };

async function fetchCollectionList() {
  try {
    const collectionList = await APICall.getCollectionList();
    console.log('collectionList', collectionList)
    return collectionList;
  } catch (error) {
    console.log("error", error);

    return [];
  }
}

export function useCollectionList() {
  const { data = [], isLoading } = useQuery(
    [queryKeys.project],
    fetchCollectionList
  );

  return { collectionList: data, isLoading };
}
