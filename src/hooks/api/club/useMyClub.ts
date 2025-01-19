/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMyClub } from '@/apis';
import { ClubDetail } from '@/types/club';

export function useMyClub(token: string) {
  return useQuery<AxiosResponse<ClubDetail>, AxiosError>({
    queryKey: ['my-club'],
    queryFn: () => getMyClub(token),
  });
}
