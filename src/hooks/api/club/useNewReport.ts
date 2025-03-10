import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createReport, ErrorType } from '@/apis';
import { SubmitReport } from '@/types/report';

export type SubmitReportProps = {
  activityReportRequests: [SubmitReport, SubmitReport];
  token: string;
};

export function useNewReport(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  SubmitReportProps
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ activityReportRequests, token }) =>
      createReport(activityReportRequests, token),
    {
      onSuccess() {
        queryClient.invalidateQueries(['my/activity-reports']);
        toast.success('활동 보고서를 성공적으로 생성했어요.');
        router.push('/report');
      },
      onError(error) {
        const errorMessage = error.response?.data?.message
          ? `\n ${error.response?.data?.message}`
          : '';
        toast.error(`활동보고서 생성에 실패했어요.${errorMessage}`);
      },
    },
  );
}
