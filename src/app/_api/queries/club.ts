import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type { Club, ClubDetail, AdminClub } from '../types/club';

export const clubQueryKeys = {
  all: () => ['clubs'],
  detail: (id: number) => [...clubQueryKeys.all(), id],
  admin: () => ['admin', 'clubs'],
};

export const clubQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: clubQueryKeys.all(),
      queryFn: () => fetcher.get<Club[]>('clubs'),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: clubQueryKeys.detail(id),
      queryFn: () => fetcher.get<ClubDetail>(`clubs/${id}`),
    }),
  admin: () =>
    queryOptions({
      queryKey: clubQueryKeys.admin(),
      queryFn: () => fetcher.get<AdminClub[]>('admin/clubs'),
    }),
};
