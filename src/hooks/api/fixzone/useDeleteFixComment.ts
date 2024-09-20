import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteFixComment, ErrorType } from '@/apis';
import { DeleteFixComment } from '@/types/fix';

export function useDeleteFixComment(
  fixId: number,
): UseMutationResult<unknown, AxiosError<ErrorType>, DeleteFixComment> {
  const queryClient = useQueryClient();
  return useMutation(deleteFixComment, {
    onSuccess() {
      toast.success('댓글을 성공적으로 삭제했어요.');
      queryClient.invalidateQueries({ queryKey: ['fix', fixId] });
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`댓글 삭제를 실패했어요.${errorMessage}`);
    },
  });
}
