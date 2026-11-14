import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { CreateTermRequest, ReportAPIRequest } from '@/_api/types/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';

import { ApiError, fetcher } from '../fetcher';
import { reportQueryKeys } from '../queries/report';

const isTermPeriodError = (error: Error) =>
  error instanceof ApiError && error.status === 400;

const deleteReport = (term: number) =>
  fetcher.delete(`central/my/activity-reports?term=${term}`);

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (term: number) => deleteReport(term),
    onSuccess: () => {
      router.push('/report');
      queryClient.invalidateQueries({
        queryKey: [...reportQueryKeys.all()],
      });
    },
    onError: (error: Error) => {
      if (isTermPeriodError(error)) {
        toast.error(REPORT_MESSAGE.termPeriodError);
      } else {
        toast.error(REPORT_MESSAGE.deleteFail);
      }
    },
  });
};

const createReports = (
  activityReportRequests: [ReportAPIRequest, ReportAPIRequest],
) =>
  fetcher.post('central/my/activity-reports', {
    json: { activityReportRequests },
  });

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createReport'],
    mutationFn: (
      activityReportRequests: [ReportAPIRequest, ReportAPIRequest],
    ) => createReports(activityReportRequests),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...reportQueryKeys.my()] });
    },
    // 400 토스트는 여기서 처리하므로 호출부 onError에서는 400을 토스트하지 않는다
    onError: (error: Error) => {
      if (isTermPeriodError(error)) toast.error(REPORT_MESSAGE.termPeriodError);
    },
  });
};

const updateReports = (
  term: number,
  activityReportRequests: [ReportAPIRequest, ReportAPIRequest],
) =>
  fetcher.patch(`central/my/activity-reports?term=${term}`, {
    json: { activityReportRequests },
  });

export const useUpdateReportsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateReport'],
    mutationFn: ({
      term,
      activityReportRequests,
    }: {
      term: number;
      activityReportRequests: [ReportAPIRequest, ReportAPIRequest];
    }) => updateReports(term, activityReportRequests),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...reportQueryKeys.all()],
      });
    },
    onError: (error: Error) => {
      if (isTermPeriodError(error)) toast.error(REPORT_MESSAGE.termPeriodError);
    },
  });
};

const createTerms = (request: CreateTermRequest) =>
  fetcher.postWithoutResponse('admin/activity-reports/term', {
    json: request,
  });

export const useCreateTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createTerms'],
    mutationFn: (request: CreateTermRequest) => createTerms(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...reportQueryKeys.terms()] });
    },
  });
};

const deleteTerm = (term: number) =>
  fetcher.deleteWithoutResponse(`admin/activity-reports/term?term=${term}`);

export const useDeleteTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteTerm'],
    mutationFn: (term: number) => deleteTerm(term),
    // 404(이미 삭제된 회차)일 때도 목록을 다시 불러와야 해서 onSuccess가 아닌 onSettled
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...reportQueryKeys.terms()] });
    },
  });
};
const adminUpdateReports = (
  clubId: number,
  term: number,
  activityReportRequests: [ReportAPIRequest, ReportAPIRequest],
) =>
  fetcher.patch(`admin/activity-reports/clubs/${clubId}?term=${term}`, {
    json: { activityReportRequests },
  });

export const useAdminUpdateReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['adminUpdateReports'],
    mutationFn: ({
      clubId,
      term,
      activityReportRequests,
    }: {
      clubId: number;
      term: number;
      activityReportRequests: [ReportAPIRequest, ReportAPIRequest];
    }) => adminUpdateReports(clubId, term, activityReportRequests),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...reportQueryKeys.all()] });
    },
  });
};

const adminDeleteReport = (clubId: number, term: number) =>
  fetcher.deleteWithoutResponse(
    `admin/activity-reports/clubs/${clubId}?term=${term}`,
  );

export const useAdminDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['adminDeleteReport'],
    mutationFn: ({ clubId, term }: { clubId: number; term: number }) =>
      adminDeleteReport(clubId, term),
    onSuccess: () => {
      // 화면에 떠 있는 삭제된 보고서를 다시 조회하면 404가 나므로 비활성 쿼리만 즉시 갱신
      queryClient.invalidateQueries({
        queryKey: [...reportQueryKeys.all()],
        refetchType: 'inactive',
      });
    },
  });
};
