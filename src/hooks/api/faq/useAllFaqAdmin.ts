import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllFaqAdmin } from '@/apis/index';

export const useAllFaq = (token: string) => {
  return useQuery(['faqsAdmin'], () => getAllFaqAdmin(token), {
    enabled: !!token,
    onError: (error) => {
      toast.error('FAQ 정보를 가져오는데 실패했어요');
    },
  });
};
