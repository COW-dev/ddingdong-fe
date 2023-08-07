import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminAllReports } from '@/apis';

export function useAdminAllReports(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<any[], unknown>, [string]>(
    {
      queryKey: ['admin/activity-reports'],
      queryFn: () => getAdminAllReports(token),
    },
  );
}
