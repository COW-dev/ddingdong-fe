import { useRouter } from 'next/router';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createFeed, ErrorType } from '@/apis';
import { NewFeed } from '@/types/feed';

export function useNewFeed(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  NewFeed
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createFeed, {
    onSuccess(_, variables) {
      queryClient.invalidateQueries(['feed']);
      if (!variables.mimeType?.includes('VIDEO')) {
        toast.success('피드가 생성되었어요.');
      }
      router.push('/');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`파드 생성에 실패했어요.${errorMessage}`);
    },
  });
}
