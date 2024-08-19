import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getReportInfo } from '@/apis';
import { ReportResponse } from '@/types/report';

type Prop = {
  term: number;
  name: string;
  token: string;
};
export function useReportInfo({ term, name, token }: Prop) {
  return useQuery<AxiosResponse<ReportResponse[], unknown>, AxiosError>({
    queryKey: ['activity-reports', term, name],
    queryFn: () => getReportInfo(term, name, token),
  });
}
