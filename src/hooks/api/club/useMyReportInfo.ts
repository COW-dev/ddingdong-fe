import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyReportInfo } from '@/apis';
import { ReportResponse } from '@/types/report';

type Prop = {
  term: number;
  token: string;
};

export function useMyReportInfo({ term, token }: Prop) {
  return useQuery<AxiosResponse<ReportResponse[], unknown>, AxiosError>({
    queryKey: ['activity-reports', term],
    queryFn: () => getMyReportInfo(term, token),
  });
}
