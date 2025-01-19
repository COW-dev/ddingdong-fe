import { useInfiniteQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { getMyFeeds } from '@/apis';
import { TotalFeed } from '@/types/feed';

export function useMyFeeds(token: string) {
  return useInfiniteQuery<AxiosResponse<TotalFeed<'clubFeeds'>>>({
    queryKey: ['feed'],
    queryFn: ({ pageParam = -1 }) => getMyFeeds(token, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagingInfo.hasNext) {
        return lastPage.data.pagingInfo.nextCursorId;
      }
      return undefined;
    },
  });
}
