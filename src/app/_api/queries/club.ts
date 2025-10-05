import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { Club, ClubDetail } from '../types/club';

export const clubQueryKeys = {
  all: () => ['clubs'],
  my: () => [...clubQueryKeys.all(), 'my'],
  detail: (id: number) => [...clubQueryKeys.all(), id],
};

export const clubQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: clubQueryKeys.all(),
      queryFn: () => fetcher.get<Club[]>('clubs'),
    }),
  my: () =>
    queryOptions({
      queryKey: clubQueryKeys.my(),
      queryFn: () => fetcher.get<ClubDetail>('central/my'),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: clubQueryKeys.detail(id),
      queryFn: () => fetcher.get<ClubDetail>(`clubs/${id}`),
    }),
};
