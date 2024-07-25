import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyReportLists } from '@/apis';
import { MyReportList } from '@/types/report';

export function useMyAllReports(token: string) {
  return useQuery<unknown, AxiosError, MyReportList[], [string]>({
    queryKey: ['my/activity-reports'],
    queryFn: () => getMyReportLists(token),
  });
}
