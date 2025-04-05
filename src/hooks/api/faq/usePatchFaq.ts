import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateFaq } from '@/apis/index';

export const usePatchFaq = () => {
  return useMutation(updateFaq, {
    onSuccess: () => {
      toast.success('FAQ 수정을 성공하였습니다');
    },
    onError: (error) => {
      toast.error('FAQ 수정을 실패하였습니다');
    },
  });
};
