import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllScores } from '@/apis';
import { ScoreDetail } from '@/types/score';

export function useAllScore(token: string, clubId: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ScoreDetail, unknown>,
    [string]
  >({
    queryKey: ['score'],
    queryFn: () => getAllScores(token, clubId),
  });
}
