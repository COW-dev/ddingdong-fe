import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createForm } from '@/apis';
import { CreateFormData } from '@/types/form';

export function useNewForm(token: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: CreateFormData) => createForm(token, formData),
    onSuccess: async () => {
      toast.success('폼 생성을 성공하였습니다!');
      await router.push('/apply');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || '폼 생성을 실패하였습니다';
      toast.error(errorMessage);
    },
  });
}
