import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getReportInfo } from '@/apis';
import { ReportResponse } from '@/types/report';

type Prop = { clubId: number; term: number; token: string };

export function useReportInfo({ term, clubId, token }: Prop) {
  return useQuery<AxiosResponse<ReportResponse[], unknown>, AxiosError>({
    queryKey: ['activity-reports', term, clubId],
    queryFn: () => getReportInfo(term, clubId, token),
  });
}
