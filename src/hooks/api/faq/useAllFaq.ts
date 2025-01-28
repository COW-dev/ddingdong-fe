import { useQuery } from '@tanstack/react-query';
import { getAllFaq } from '@/apis/index';

export const useAllFaq = (token: string) => {
  return useQuery(['allFaqs'], () => getAllFaq(token), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!token,
    onError: (error) => {
      console.error('FAQ 가져오기 실패', error);
    },
  });
};
