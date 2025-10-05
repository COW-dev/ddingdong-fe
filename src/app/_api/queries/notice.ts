import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { AllNoticeAPIResponse } from '../types/notice';

export const noticeQueryKeys = {
  all: () => ['notices'],
};

export const noticeQueryOptions = {
  all: (page: number) =>
    queryOptions({
      queryKey: noticeQueryKeys.all(),
      queryFn: () =>
        fetcher.get<AllNoticeAPIResponse>(`notices?page=${page}&limit=10`),
    }),
};
