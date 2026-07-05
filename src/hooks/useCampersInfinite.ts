import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers, PER_PAGE } from "@/lib/api";
import { CamperFilters } from "@/lib/types";

export function useCampersInfinite(filters: CamperFilters) {
  return useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => fetchCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (sum, page) => sum + (page.campers?.length ?? 0),
        0
      );
      const total = lastPage?.total ?? loadedCount;
      return loadedCount < total ? allPages.length + 1 : undefined;
    },
  });
}

export { PER_PAGE };
