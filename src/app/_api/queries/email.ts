import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import {
  EmailDeliveryStatusAPIResponse,
  EmailProgressAPIResponse,
  EmailStatusOverviewAPIResponse,
} from '../types/email';

export const emailQueryKeys = {
  all: () => ['email'],
  overview: (id: number) => [...emailQueryKeys.all(), id],
  counts: (historyId: number) => [...emailQueryKeys.all(), historyId],
  status: (formId: number, status: string) => [
    ...emailQueryKeys.all(),
    formId,
    status,
  ],
};

export const emailQueryOptions = {
  overview: (id: number) =>
    queryOptions({
      queryKey: emailQueryKeys.overview(id),
      queryFn: () =>
        fetcher.get<EmailStatusOverviewAPIResponse>(
          `central/my/forms/${id}/emails/status/overview`,
        ),
    }),
  counts: (historyId: number) =>
    queryOptions({
      queryKey: emailQueryKeys.counts(historyId),
      queryFn: () =>
        fetcher.get<EmailProgressAPIResponse>(
          `central/my/forms/emails/${historyId}/counts`,
        ),
    }),
  status: (formId: number, status: string) =>
    queryOptions({
      queryKey: emailQueryKeys.status(formId, status),
      queryFn: () =>
        fetcher.get<EmailDeliveryStatusAPIResponse>(
          `central/my/forms/${formId}/emails/status?status=${status.toUpperCase()}`,
        ),
    }),
};
