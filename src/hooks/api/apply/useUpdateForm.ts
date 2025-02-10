import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateForm } from '@/apis';
import { FormData } from '@/types/form';

interface UpdateFormParams {
  token: string;
  formId: number;
  formData: FormData;
}

export function useUpdateForm() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ token, formId, formData }: UpdateFormParams) => {
      return await updateForm(token, formId, formData);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['admin/apply']);
        toast.success('폼 정보를 수정했어요.');
      },
      onError(error: any) {
        console.error('폼 정보 수정 중 오류 발생:', error);

        const errorMessage =
          error?.response?.data?.message || '폼 정보 수정에 실패했습니다.';

        toast.error(errorMessage);
      },
    },
  );
}
