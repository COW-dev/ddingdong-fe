import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateForm } from '@/apis';
import { ModeType, FormData } from '@/types/form';

interface UpdateFormParams {
  token: string;
  formId: number;
  formData: FormData;
}

export function useUpdateForm(
  setMode: (value: ModeType) => void,
): UseMutationResult<unknown, AxiosError, UpdateFormParams> {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ token, formId, formData }: UpdateFormParams) => {
      return await updateForm(token, formId, formData);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['admin/apply']);
        toast.success('폼 정보를 수정했어요.');
        setMode('view');
      },
      onError(error: AxiosError<{ message?: string }>) {
        const errorMessage =
          error.response?.data?.message || '폼 정보 수정에 실패했습니다.';
        toast.error(errorMessage);

        onReset?.();
      },
    },
  );
}
