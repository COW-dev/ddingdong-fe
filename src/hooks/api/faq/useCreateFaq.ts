import { useMutation } from '@tanstack/react-query';
import { createFaq } from '@/apis/index';

export const useCreateFaq = () => {
  return useMutation(createFaq, {
    onSuccess: () => {
      console.log('FAQ 생성성공');
    },
    onError: (error) => {
      console.error('FAQ 생성실패', error);
    },
  });
};
