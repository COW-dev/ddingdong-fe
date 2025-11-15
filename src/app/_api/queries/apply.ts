import { queryOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import {
  ApplicantDetailAPIResponse,
  ApplicationAPIResponse,
  FormAPIResponse,
} from '../types/apply';

export const applyQueryKeys = {
  all: () => ['apply'],
  application: (formId: number) => [...applyQueryKeys.all(), formId],
  applicantDetail: (formId: number, applicantId: number) => [
    ...applyQueryKeys.all(),
    formId,
    applicantId,
  ],
};

export const applyQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: applyQueryKeys.all(),
      queryFn: () => fetcher.get<FormAPIResponse>('central/my/forms'),
    }),
  application: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.application(formId),
      queryFn: () =>
        fetcher.get<ApplicationAPIResponse>(
          `central/my/forms/${formId}/applications`,
        ),
    }),
  applicantDetail: (formId: number, applicantId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.applicantDetail(formId, applicantId),
      queryFn: () =>
        fetcher.get<ApplicantDetailAPIResponse>(
          `central/my/forms/${formId}/applications/${applicantId}`,
        ),
    }),
};
