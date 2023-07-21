import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createReport } from '@/apis';
import { Report } from '@/types';

export function useNewReport(): UseMutationResult<unknown, AxiosError, Report> {
  const queryClient = useQueryClient();

  return useMutation(createReport, {
    onSuccess() {
      queryClient.invalidateQueries(['club/my/activity-reports']);
      toast.success('활동 보고서를 성공적으로 생성했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('활동 보고서 작성에 실패했어요.');
    },
  });
}
