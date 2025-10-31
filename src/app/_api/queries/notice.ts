import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { AllNoticeAPIResponse, NoticeDetailAPIResponse } from '../types/notice';

export const noticeQueryKeys = {
  all: (page: number) => ['notices', page],
  detail: (id: number) => [noticeQueryKeys.all(1), id],
};

export const noticeQueryOptions = {
  all: (page: number) =>
    queryOptions({
      queryKey: noticeQueryKeys.all(page),
      queryFn: () =>
        fetcher.get<AllNoticeAPIResponse>(`notices?page=${page}&limit=10`),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: noticeQueryKeys.detail(id),
      queryFn: () => fetcher.get<NoticeDetailAPIResponse>(`notices/${id}`),
    }),
};
