import { queryOptions } from '@tanstack/react-query';

import { Fix } from '@/types/fix';

import { fetcher } from '../fetcher';
export const fixQueryKeys = {
  all: () => ['fix'],
  my: () => [...fixQueryKeys.all(), 'my'],
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
};
