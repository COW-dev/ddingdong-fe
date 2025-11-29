import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { DetailFix, Fix } from '../types/fix';
export const fixQueryKeys = {
  all: () => ['fix'],
  my: () => [...fixQueryKeys.all(), 'my'],
  detail: (id: number) => [...fixQueryKeys.all(), id],
};

export const fixQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: fixQueryKeys.all(),
      queryFn: () => fetcher.get<Fix[]>('admin/fix-zones'),
    }),
  my: () =>
    queryOptions({
      queryKey: fixQueryKeys.my(),
      queryFn: () => fetcher.get<Fix[]>('central/fix-zones'),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: fixQueryKeys.detail(id),
      queryFn: () => fetcher.get<DetailFix>(`central/fix-zones/${id}`),
    }),
};
