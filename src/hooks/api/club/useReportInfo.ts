import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getReportInfo } from '@/apis';
import { ReportDetail } from '@/types/report';

const initialData = {
  id: '',
  createdAt: '',
  name: '',
  leader: '',
  leaderDepartment: '',
  content: '',
  place: '',
  startDate: new Date(),
  endDate: new Date(),
  imageUrl: '',
  participants: [],
};

export function useReportInfo(reportId: number, name: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ReportDetail, unknown>,
    [string, number]
  >({
    queryKey: ['activity-reports', reportId],
    queryFn: () => getReportInfo(reportId, name),
    initialData,
  });
}
