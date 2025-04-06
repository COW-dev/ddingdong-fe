import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import toast from 'react-hot-toast';
import { deleteFaq, ErrorType } from '@/apis/index';
import { DeleteFaq } from '@/types/faq';

export function useDeleteFaq(
  refetch: () => void,
): UseMutationResult<void, AxiosError<ErrorType>, DeleteFaq> {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ questionId, token }) => await deleteFaq({ questionId, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['faqs'] });
        refetch();
        toast.success('삭제되었습니다');
      },
      onError: (error) => {
        toast.error('FAQ 삭제를 실패하였습니다');
      },
    },
  );
}
