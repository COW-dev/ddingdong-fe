import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getCurrentReports } from '@/apis';
import { CurrentReport } from '@/types/report';

export function useCurrentReports(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<CurrentReport, unknown>,
    [string]
  >({
    queryKey: ['current-term'],
    queryFn: () => getCurrentReports(token),
  });
}
