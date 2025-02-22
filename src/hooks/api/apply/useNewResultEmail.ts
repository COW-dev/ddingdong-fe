import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createResultEmail, ErrorType } from '@/apis';
import { NewEmail } from '@/types/apply';

export function useNewResultEmail(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  NewEmail
> {
  const queryClient = useQueryClient();

  return useMutation(createResultEmail, {
    onSuccess(_, variables) {
      queryClient.invalidateQueries(['email']);
      toast.success('이메일 전송에 성공했어요.');
      router.push(`/apply/${variables.formId}`);
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`이메일 전송에 실패했어요.${errorMessage}`);
    },
  });
}
