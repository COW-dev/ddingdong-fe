import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteFixComment } from '@/apis';
import { DeleteFixComment } from '@/types/fix';

export function useDeleteFixComment(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteFixComment
> {
  return useMutation(deleteFixComment, {
    onSuccess() {
      toast.success('댓글을 성공적으로 삭제했어요.');
    },
    onError() {
      toast.error('댓글 삭제를 실패했어요');
    },
  });
}
