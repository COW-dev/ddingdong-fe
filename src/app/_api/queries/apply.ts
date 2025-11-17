import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import {
  AllFormAPIResponse,
  ApplicantDetailAPIResponse,
  ApplicationAPIResponse,
  FormAPIResponse,
} from '../types/apply';

export const applyQueryKeys = {
  all: () => ['apply'],
  forms: {
    all: () => [...applyQueryKeys.all(), 'forms'],
    detail: (formId: number) => [...applyQueryKeys.forms.all(), formId],
  },
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
      queryFn: () => fetcher.get<AllFormAPIResponse>('central/my/forms'),
    }),
  form: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.forms.detail(formId),
      queryFn: () => fetcher.get<FormAPIResponse>(`central/my/forms/${formId}`),
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
