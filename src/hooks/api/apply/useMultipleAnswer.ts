import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMultipleAnswer } from '@/apis';
import { ChartItem } from '@/types/apply';

type Props = {
  type: 'RADIO' | 'CHECK_BOX';
  options: ChartItem[];
};

export function useMultipleAnswer(questionId: number, token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Props, unknown>,
    [string, number]
  >({
    queryKey: ['question', questionId],
    queryFn: () => getMultipleAnswer(questionId, token),
  });
}
