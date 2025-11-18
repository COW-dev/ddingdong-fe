import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import {
  ApplicantDetailAPIResponse,
  ApplicationAPIResponse,
  ApplyStatistics,
  FormAPIResponse,
  FormFieldAPIResponse,
  SectionAPIResponse,
} from '../types/apply';

export const applyQueryKeys = {
  all: () => ['apply'],
  forms: {
    all: () => [...applyQueryKeys.all(), 'forms'],
    sections: (formId: number) => [
      ...applyQueryKeys.forms.all(),
      'sections',
      formId,
    ],
    detail: (formId: number) => [...applyQueryKeys.forms.all(), formId],
    questions: (formId: number, section: string) => [
      ...applyQueryKeys.forms.all(),
      'questions',
      formId,
      section,
    ],
  },
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
  sections: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.forms.sections(formId),
      queryFn: () =>
        fetcher.get<SectionAPIResponse>(`forms/${formId}/sections`),
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
  questions: (formId: number, section: string) =>
    queryOptions({
      queryKey: applyQueryKeys.forms.questions(formId, section),
      queryFn: () =>
        fetcher.get<FormFieldAPIResponse>(`forms/${formId}?section=${section}`),
    }),
  statistics: (formId: number) =>
    queryOptions({
      queryKey: applyQueryKeys.applications.statistics(formId),
      queryFn: () =>
        fetcher.get<ApplyStatistics>(`central/my/forms/${formId}/statistics`),
    }),
};
