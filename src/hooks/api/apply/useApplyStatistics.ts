import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getApplyStatistics } from '@/apis';
import { ApplyStatistics } from '@/pages/test/test';

export function useApplyStatistics(applyId: number, token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ApplyStatistics, unknown>,
    [string, number]
  >({
    queryKey: ['statistics', applyId],
    queryFn: () => getApplyStatistics(applyId, token),
  });
}
