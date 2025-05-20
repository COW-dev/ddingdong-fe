import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createFaq } from '@/apis/index';

export const useCreateFaq = (refetch: () => void) => {
  return useMutation(createFaq, {
    onSuccess: () => {
      toast.success('FAQ 성공적으로 생성했어요.');
      refetch();
    },
    onError: (error) => {
      toast.error('FAQ 생성을 실패하였습니다');
    },
  });
};
