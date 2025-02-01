import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteFaq, ErrorType } from '@/apis/index';
import { DeleteFaq } from '@/types/faq';

export function useDeleteFaq(): UseMutationResult<
  void,
  AxiosError<ErrorType>,
  DeleteFaq
> {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ questionId, token }) => await deleteFaq({ questionId, token }), // ✅ async 함수 전달
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['faqs'] });
      },
      onError: (error) => {
        console.error('FAQ 삭제 실패:', error);
      },
    },
  );
}
