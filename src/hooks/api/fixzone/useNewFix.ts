import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createFix, ErrorType } from '@/apis';
import { NewFix } from '../../../types/fix';

export function useNewFix(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  NewFix
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createFix, {
    onSuccess() {
      queryClient.invalidateQueries(['fix-zones']);
      toast.success('요청을 성공적으로 보냈어요.');
      router.push('/fix');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`요청을 전송하는데 실패했어요.${errorMessage}`);
    },
  });
}
