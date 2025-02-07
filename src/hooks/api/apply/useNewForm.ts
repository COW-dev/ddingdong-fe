import { useMutation } from '@tanstack/react-query';
import { CreateForm } from '@/apis';
import { FormData } from '@/types/form';
import toast from 'react-hot-toast';

export function useNewForm(token: string) {
  return useMutation({
    mutationFn: (formData: FormData) => CreateForm(token, formData),
    onSuccess: (response) => {
      toast.success('폼 생성을 성공하였습니다 !', response);
    },
    onError: (error) => {
      toast.error('폼 생성을 실패하였습니다', error);
    },
  });
}
