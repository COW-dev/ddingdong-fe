import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createFaq } from '@/apis/index';

export const useCreateFaq = () => {
  return useMutation(createFaq, {
    onSuccess: () => {
      toast.success('FAQ 생성성공');
    },
    onError: (error) => {
      toast.error('FAQ 생성실패');
    },
  });
};
