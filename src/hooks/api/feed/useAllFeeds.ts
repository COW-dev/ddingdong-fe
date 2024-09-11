import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllFeeds } from '@/apis';
import { Feed } from '@/types/feed';

export function useAllFeeds() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Feed[], unknown>,
    [string]
  >({
    queryKey: ['feeds'],
    queryFn: getAllFeeds,
  });
}
