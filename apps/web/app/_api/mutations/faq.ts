import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { faqQueryKeys } from '../queries/faq';
import { FAQAPIRequest } from '../types/faq';

const addFaq = (data: FAQAPIRequest) =>
  fetcher.post('admin/questions', {
    searchParams: {
      question: data.question,
      reply: data.reply,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

const deleteFaq = (id: number) => fetcher.delete(`admin/questions/${id}`);

export const useAddFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FAQAPIRequest) => addFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...faqQueryKeys.all()],
      });
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...faqQueryKeys.all()],
      });
    },
  });
};
