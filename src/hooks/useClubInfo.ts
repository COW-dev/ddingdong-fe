import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubInfo } from '@/apis';
import { ClubDetail } from '@/types';

export function useClubInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ClubDetail, unknown>,
    [string, number]
  >({
    queryKey: ['club', id],
    queryFn: () => getClubInfo(id),
  });
}
