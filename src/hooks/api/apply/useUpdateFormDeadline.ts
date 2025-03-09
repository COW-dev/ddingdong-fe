import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateFormDeadline } from '@/apis';
import { UpdateFormDeadlineParams } from '@/types/form';

export const useUpdateFormDeadline = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, UpdateFormDeadlineParams>({
    mutationFn: async ({
      token,
      formId,
      endDate,
    }: UpdateFormDeadlineParams): Promise<void> => {
      await updateFormDeadline(token, formId, endDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('폼 마감일을 수정했어요.');
    },
    onError: (error: AxiosError) => {
      toast.error((error.response?.data as any)?.message || error.message);
    },
  });
};
