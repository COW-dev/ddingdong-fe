import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteReport, ErrorType } from '@/apis';
import { DeleteReport } from '@/types/report';

export function useDeleteReport(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  DeleteReport
> {
  const queryClient = useQueryClient();

  return useMutation(deleteReport, {
    onSuccess() {
      router.push('/report');
      toast.success('활동보고서를 성공적으로 삭제했어요.');
      queryClient.invalidateQueries(['activity-reports']);
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`활동보고서 삭제에 실패했어요.${errorMessage}`);
    },
  });
}
