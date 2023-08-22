import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminAllFix } from '@/apis';
import { Fix } from '@/types/fixzone';

export function useAllFix(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<Fix[], unknown>, [string]>(
    {
      queryKey: ['admin/fix'],
      queryFn: () => getAdminAllFix(token),
    },
  );
}
