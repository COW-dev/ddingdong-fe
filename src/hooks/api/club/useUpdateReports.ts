import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateReports } from '@/apis';
import { SubmitReport } from '@/types/report';

export function useUpdateReports(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  { reports: [SubmitReport, SubmitReport]; token: string; term: number }
> {
  const queryClient = useQueryClient();

  return useMutation(
    ({ reports, token, term }) => updateReports(reports, token, term),
    {
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
    },
  );
}
