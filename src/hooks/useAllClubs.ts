/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getAllClubs } from '@/apis';
import { ClubType } from '@/types';

export function useAllClubs() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ClubType[], unknown>,
    [string]
  >({
    queryKey: ['clubs'],
    queryFn: getAllClubs,
  });
}
