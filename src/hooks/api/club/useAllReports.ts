import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllReports } from '@/apis';
import { AllReport } from '@/types';

export function useAllReports(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<AllReport[], unknown>,
    [string]
  >({
    queryKey: ['my/activity-reports'],
    queryFn: () => getAllReports(token),
  });
}
