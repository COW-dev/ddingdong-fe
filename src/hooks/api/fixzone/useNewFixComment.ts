import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createFixComment } from '@/apis';
import { NewFixComment } from '../../../types/fix';

export function useNewFixComment(
  fixId: number,
): UseMutationResult<unknown, AxiosError, NewFixComment> {
  const queryClient = useQueryClient();
  return useMutation(createFixComment, {
    onSuccess() {
      toast.success('댓글 작성에 성공했어요.');
      queryClient.invalidateQueries({ queryKey: ['fix', fixId] });
    },
    onError() {
      toast.error('댓글 작성에 실패했어요');
    },
  });
}
