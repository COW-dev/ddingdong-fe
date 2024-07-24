import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createFixComment } from '@/apis';
import { NewFixComment } from '../../../types/fix';

export function useNewFixComment(): UseMutationResult<
  unknown,
  AxiosError,
  NewFixComment
> {
  return useMutation(createFixComment, {
    onSuccess() {
      toast.success('댓글 작성에 성공했어요.');
    },
    onError() {
      toast.error('댓글 작성에 실패했어요');
    },
  });
}
