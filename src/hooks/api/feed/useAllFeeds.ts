import { useInfiniteQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { getAllFeeds } from '@/apis';
import { TotalFeed } from '@/types/feed';

export function useAllFeeds() {
  return useInfiniteQuery<AxiosResponse<TotalFeed>>({
    queryKey: ['feeds'],
    queryFn: ({ pageParam = -1 }) => getAllFeeds(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagingInfo?.hasNext) {
        return lastPage.data.pagingInfo.nextCursorId;
      }
      return undefined;
    },
  });
}
