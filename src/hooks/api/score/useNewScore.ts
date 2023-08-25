import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { createScore } from '@/apis';
import { Score } from '@/types/score';

const initialData = {
  clubId: 0,
  scoreCategory: '',
  reason: '',
  amount: 0,
  token: '',
};
export function useNewScore(): UseMutationResult<unknown, AxiosError, Score> {
  const queryClient = useQueryClient();

  return useMutation(createScore, {
    onSuccess() {
      queryClient.invalidateQueries(['score']);
      toast.success('동아리 점수를 입력했어요.');
    },
    onError() {
      toast.error('동아리 점수를 입력에 실패했어요');
    },
  });
}
