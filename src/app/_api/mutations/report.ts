import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SubmitReport } from '@/types/report';

import { fetcher } from '../fetcher';
import { reportQueryKeys } from '../queries/report';

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
  });
};

const createReports = (activityReportRequests: [SubmitReport, SubmitReport]) =>
  fetcher.post('central/my/activity-reports', {
    json: { activityReportRequests },
  });

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createReport'],
    mutationFn: (activityReportRequests: [SubmitReport, SubmitReport]) =>
      createReports(activityReportRequests),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...reportQueryKeys.my()] });
    },
  });
};

const updateReports = (
  term: number,
  activityReportRequests: [SubmitReport, SubmitReport],
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
      activityReportRequests: [SubmitReport, SubmitReport];
    }) => updateReports(term, activityReportRequests),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...reportQueryKeys.all()],
      });
    },
  });
};
