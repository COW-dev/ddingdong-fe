/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getClubInfo } from '@/apis';
import { ClubDetailType } from '@/types';

export function useClubInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ClubDetailType, unknown>,
    [string]
  >({
    queryKey: [`club/${id}`],
    queryFn: () => getClubInfo(id),
  });
}
