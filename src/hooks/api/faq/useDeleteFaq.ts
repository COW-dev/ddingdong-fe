import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFaq } from '@/apis/index';
import { DeleteFaq } from '@/types/faq';

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, token }: DeleteFaq) => {
      return await deleteFaq({ questionId, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      console.error('FAQ 삭제 성공');
    },
    onError: (error) => {
      console.error('FAQ 삭제 실패', error);
    },
  });
}
