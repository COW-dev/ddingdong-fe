import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { submitApplicationForm } from '@/apis';
import { ApplyData } from '@/types/form';

export function useSubmitApply(id: number) {
  const queryClient = useQueryClient();

  return useMutation(
    (formData: ApplyData) => submitApplicationForm(id, formData),
    {
      onSuccess() {
        toast.success('폼 제출 완료!');
        queryClient.invalidateQueries(['applications', id]);
      },
      onError() {
        toast.error('폼 제출을 실패하였습니다');
      },
    },
  );
}
