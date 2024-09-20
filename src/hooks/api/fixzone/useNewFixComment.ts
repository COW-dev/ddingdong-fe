import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createFixComment, ErrorType } from '@/apis';
import { NewFixComment } from '../../../types/fix';

export function useNewFixComment(
  fixId: number,
): UseMutationResult<unknown, AxiosError<ErrorType>, NewFixComment> {
  const queryClient = useQueryClient();
  return useMutation(createFixComment, {
    onSuccess() {
      toast.success('댓글 작성에 성공했어요.');
      queryClient.invalidateQueries({ queryKey: ['fix', fixId] });
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`댓글 작성에 실패했어요.${errorMessage}`);
    },
  });
}
