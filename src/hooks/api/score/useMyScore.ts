import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyScore } from '@/apis';
import { ScoreDetail } from '@/types/score';

const initialData = {
  scoreCategory: '',
  reason: '',
  createdAt: '',
  amount: 0,
  remainingScore: '',
};

export function useMyScore(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ScoreDetail[], unknown>,
    [string]
  >({
    queryKey: ['score'],
    queryFn: () => getMyScore(token),
    initialData,
  });
}
