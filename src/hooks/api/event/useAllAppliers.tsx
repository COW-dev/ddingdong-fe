import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllAppliers } from '@/apis';
import { Applicant } from '@/types/event';

export function useAllAppliers(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Applicant[], unknown>,
    [string]
  >({
    queryKey: ['admin/events/applied-users'],
    queryFn: () => getAllAppliers(token),
  });
}
