import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getTermReports } from '@/apis';
import { TermReport } from '@/types/report';

export function useTermReports(term: number, token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<TermReport[], unknown>,
    [string, number]
  >({
    queryKey: ['admin/activity-reports', term],
    queryFn: () => getTermReports(term, token),
  });
}
