import { queryOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import {
  ApplicantDetailAPIResponse,
  ApplicationAPIResponse,
  FormAPIResponse,
} from '../types/apply';

export const applyQueryKeys = {
  all: () => ['apply'],
  applications: {
    all: () => [...applyQueryKeys.all(), 'applications'],
    detail: (formId: number) => [...applyQueryKeys.applications.all(), formId],
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
};
