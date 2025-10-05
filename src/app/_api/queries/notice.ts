import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { AllNoticeAPIResponse } from '../types/notice';

export const noticeQueryKeys = {
  all: (page: number) => ['notices', page],
};

export const noticeQueryOptions = {
  all: (page: number) =>
    queryOptions({
      queryKey: noticeQueryKeys.all(page),
      queryFn: () =>
        fetcher.get<AllNoticeAPIResponse>(`notices?page=${page}&limit=10`),
    }),
};
