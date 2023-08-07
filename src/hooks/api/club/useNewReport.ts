import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createReport } from '@/apis';

export function useNewReport(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createReport, {
    onSuccess() {
      queryClient.invalidateQueries(['my/activity-reports']);
      toast.success('활동 보고서를 성공적으로 생성했어요.');
      router.push('/report');
    },
    onError() {
      toast.error('활동 보고서 작성에 실패했어요.');
    },
  });
}
