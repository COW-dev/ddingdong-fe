import { useMutation } from '@tanstack/react-query';
import { updateFaq } from '@/apis/index';

export const usePatchFaq = () => {
  return useMutation(updateFaq, {
    onSuccess: () => {
      console.log('FAQ 수정 성공');
    },
    onError: (error) => {
      console.error('FAQ 수정 실패', error);
    },
  });
};
