import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteApplication, ErrorType } from '@/apis';
import { DeleteApplication } from '@/types/apply';

export function useDeleteApplication(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  DeleteApplication
> {
  const queryClient = useQueryClient();
  return useMutation(deleteApplication, {
    onSuccess() {
      toast.success('지원서를 성공적으로 삭제했어요.');
      queryClient.invalidateQueries(['apply']);
      router.push('/apply');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`지원서 삭제에 실패했어요.${errorMessage}`);
    },
  });
}
