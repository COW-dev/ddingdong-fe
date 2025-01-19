import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getFeedDetail } from '@/apis';
import { FeedDetail } from '@/types/feed';

export function useFeedDetail(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<FeedDetail, unknown>,
    [string, number]
  >({
    queryKey: ['feed', id],
    queryFn: () => getFeedDetail(id),
  });
}
