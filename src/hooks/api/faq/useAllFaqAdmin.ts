import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllFaqAdmin } from '@/apis/index';

export const useAllFaq = (token: string) => {
  return useQuery(['allFaqs'], () => getAllFaqAdmin(token), {
    enabled: !!token,
    onError: (error) => {
      toast.error('FAQ 가져오기 실패');
    },
  });
};
