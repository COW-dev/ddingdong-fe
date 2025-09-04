import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { DocumentDetail, DocumentList } from '../types/document';

export const documentQueryKeys = {
  all: () => ['documents'],
  detail: (id: number) => [...documentQueryKeys.all(), id],
};

export const documentQueryOptions = {
  all: (page: number) =>
    queryOptions({
      queryKey: documentQueryKeys.all(),
      queryFn: () =>
        fetcher.get<DocumentList>(`documents?page=${page}&limit=10`),
    }),
  detail: (documentId: number) =>
    queryOptions({
      queryKey: documentQueryKeys.detail(documentId),
      queryFn: () => fetcher.get<DocumentDetail>(`documents/${documentId}`),
      enabled: !!documentId,
    }),
};
