import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { DocumentDetail, DocumentList } from '../types/document';

export const documentQueryKeys = {
  all: () => ['document'],
  detail: (id: number) => [...documentQueryKeys.all(), id],
};

export const documentQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: documentQueryKeys.all(),
      queryFn: ({ pageParam = 1 }) =>
        fetcher.get<DocumentList>(`documents?page=${pageParam}&limit=10`),
    }),
  detail: (documentId: number) =>
    queryOptions({
      queryKey: documentQueryKeys.detail(documentId),
      queryFn: () => fetcher.get<DocumentDetail>(`documents/${documentId}`),
    }),
};
