import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createForm } from '@/apis';
import { CreateFormData } from '@/types/form';

export function useNewForm(token: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: CreateFormData) => {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formDataToSend.append(key, item));
        } else {
          formDataToSend.append(key, value);
        }
      });

      return createForm(token, formDataToSend);
    },
    onSuccess: () => {
      toast.success('폼 생성을 성공하였습니다!');
      router.push('/apply');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || '폼 생성을 실패하였습니다';
      toast.error(errorMessage);
    },
  });
}
