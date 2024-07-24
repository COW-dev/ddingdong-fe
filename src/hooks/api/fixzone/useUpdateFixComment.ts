import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateFixComment } from '@/apis';
import { UpdateFixComment } from '@/types/fix';

export function useUpdateFixComment(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateFixComment
> {
  return useMutation(updateFixComment, {
    onSuccess() {
      toast.success('댓글을 수정했어요.');
    },
    onError() {
      toast.error('댓글 수정을 실패했어요');
    },
  });
}
