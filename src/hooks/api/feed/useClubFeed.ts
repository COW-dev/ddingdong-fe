import { useInfiniteQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { getClubFeed } from '@/apis';
import { TotalFeed } from '@/types/feed';

export function useClubFeed(clubId: number) {
  return useInfiniteQuery<AxiosResponse<TotalFeed<'clubFeeds'>>>({
    queryKey: ['feeds', clubId],
    queryFn: ({ pageParam = -1 }) => getClubFeed(clubId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagingInfo.hasNext) {
        return lastPage.data.pagingInfo.nextCursorId;
      }
      return undefined;
    },
  });
}
