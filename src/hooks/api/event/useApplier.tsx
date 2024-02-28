import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getApplier } from '@/apis';
import { ApplicantDetail } from '@/types/event';

export function useApplier(token: string, id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ApplicantDetail, unknown>,
    [string]
  >({
    queryKey: ['admin/events/applied-users'],
    queryFn: () => getApplier(token, id),
  });
}
