import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyReportLists } from '@/apis';
import { MyReportList } from '@/types/report';

export function useAllReports(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<MyReportList[], unknown>,
    [string]
  >({
    queryKey: ['my/activity-reports'],
    queryFn: () => getMyReportLists(token),
  });
}
