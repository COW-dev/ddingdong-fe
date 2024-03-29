import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteReport } from '@/apis';
import { DeleteReport } from '@/types/report';

export function useDeleteReport(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteReport
> {
  const queryClient = useQueryClient();

  return useMutation(deleteReport, {
    onSuccess() {
      queryClient.invalidateQueries(['activity-reports']);
      toast.success('활동보고서를 성공적으로 삭제했어요.');
      router.push('/report');
    },
    onError() {
      toast.error('활동보고서 삭제에 실패했어요.');
    },
  });
}
