import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllFaq } from '@/apis/index';

export const useAllFaq = () => {
  return useQuery(['faqs'], () => getAllFaq(), {
    onError: (error) => {
      toast.error('FAQ 가져오기 실패');
    },
  });
};
