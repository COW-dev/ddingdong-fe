import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getReportTerms } from '@/apis';
import { ActivityReportTerm } from '@/types/report';

export function useReportTerms(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ActivityReportTerm[], unknown>,
    [string]
  >({
    queryKey: ['report-term'],
    queryFn: () => getReportTerms(token),
  });
}
