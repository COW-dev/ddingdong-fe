import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createForm } from '@/apis';
import { CreateFormData } from '@/types/form';

export function useNewForm(
  token: string,
  updateFormId: (oldId: string, newId: number) => void,
  saveChanges: (formId: string) => void,
  formId: string,
) {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: CreateFormData) => createForm(token, formData),
    onSuccess: async (response) => {
      const newFormId = response?.data?.id;
      if (!newFormId) {
        toast.success('지원서가 성공적으로 생성되었습니다.');
        await router.push('/apply');
        return;
      }
      updateFormId(formId, newFormId);
      saveChanges(newFormId.toString());

      await router.push('/apply');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || '지원서 생성을 실패하였습니다';
      toast.error(errorMessage);
    },
  });
}
