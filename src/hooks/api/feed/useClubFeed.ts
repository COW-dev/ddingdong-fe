import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubFeed } from '@/apis';
import { Feed } from '@/types/feed';

export function useClubFeed(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Feed[], unknown>,
    [string, number]
  >({
    queryKey: ['feeds', id],
    queryFn: () => getClubFeed(id),
  });
}
