import { useQuery } from '@tanstack/react-query';
import { getAllFaq } from '@/apis/index';

export const useAllFaq = (token: string) => {
  return useQuery(['allFaqs'], () => getAllFaq(token), {
    enabled: !!token,
    onError: (error) => {
      console.error('FAQ 가져오기 실패', error);
    },
  });
};
