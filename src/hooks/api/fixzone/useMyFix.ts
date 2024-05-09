import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubAllFix } from '@/apis';
import { Fix } from '@/types/fix';

export function useMyFix(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<Fix[], unknown>, [string]>(
    {
      queryKey: ['club/fix'],
      queryFn: () => getClubAllFix(token),
    },
  );
}
