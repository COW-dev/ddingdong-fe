import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllClubs } from '@/apis';
import { Club } from '@/types';

export function useAllClubs() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Club[], unknown>,
    [string]
  >({
    queryKey: ['clubs'],
    queryFn: getAllClubs,
  });
}
