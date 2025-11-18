import { queryOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import {
  ApplicantDetailAPIResponse,
  ApplicationAPIResponse,
  ApplyStatistics,
  FormAPIResponse,
} from '../types/apply';

export const applyQueryKeys = {
  all: () => ['apply'],
  applications: {
    all: () => [...applyQueryKeys.all(), 'applications'],
    detail: (formId: number) => [...applyQueryKeys.applications.all(), formId],
    statistics: (formId: number) => [
      ...applyQueryKeys.applications.detail(formId),
      'statistics',
    ],
  },
  applicants: {
    all: () => [...applyQueryKeys.all(), 'applicants'],
    detail: (formId: number, applicantId: number) => [
      ...applyQueryKeys.applicants.all(),
      formId,
      applicantId,
    ],
  },
};

export const applyQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: applyQueryKeys.all(),
      queryFn: () => fetcher.get<FormAPIResponse>('central/my/forms'),
    }),
  application: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.applications.detail(formId),
      queryFn: () =>
        fetcher.get<ApplicationAPIResponse>(
          `central/my/forms/${formId}/applications`,
        ),
    }),

  applicantDetail: (formId: number, applicantId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.applicants.detail(formId, applicantId),
      queryFn: () =>
        fetcher.get<ApplicantDetailAPIResponse>(
          `central/my/forms/${formId}/applications/${applicantId}`,
        ),
    }),
  statistics: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.applications.statistics(formId),
      queryFn: () =>
        fetcher.get<ApplyStatistics>(`central/my/forms/${formId}/statistics`),
    }),
};
