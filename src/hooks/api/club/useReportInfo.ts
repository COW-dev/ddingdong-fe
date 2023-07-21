import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getReportInfo } from '@/apis';
import { ReportDetail } from '@/types';

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

export function useReportInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ReportDetail, unknown>,
    [string, number]
  >({
    queryKey: ['activity-reports', id],
    queryFn: () => getReportInfo(id),
    initialData,
  });
}
