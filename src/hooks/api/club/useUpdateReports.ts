import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateReports } from '@/apis';

export function useUpdateReports(
  term: number,
): UseMutationResult<unknown, AxiosError<ErrorType>, FormData, [number]> {
  const queryClient = useQueryClient();

  return useMutation((formData: FormData) => updateReports(term, formData), {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['activity-reports'],
      });
      toast.success('활동보고서를 수정했어요.');
      router.push('/report');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`활동보고서 수정에 실패했어요.${errorMessage}`);
    },
  });
}
