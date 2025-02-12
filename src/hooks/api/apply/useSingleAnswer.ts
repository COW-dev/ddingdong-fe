import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getSingleAnswer } from '@/apis';
export type AnswerItem = {
  applicationId: number;
  name: string;
  answer: string;
  fileName?: string;
};
type Props = {
  type: 'TEXT' | 'LONG_TEXT' | 'FILE';
  answers: AnswerItem[];
};
export function useSingleAnswer(questionId: number, token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Props, unknown>,
    [string, number]
  >({
    queryKey: ['question', questionId],
    queryFn: () => getSingleAnswer(questionId, token),
  });
}
