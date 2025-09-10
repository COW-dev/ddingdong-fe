import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { Club, ClubDetail } from '../types/club';

export const clubQueryKeys = {
  all: () => ['clubs'],
  details: (id: number) => ['clubs', id],
};

export const clubQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: clubQueryKeys.all(),
      queryFn: () => fetcher.get<Club[]>('clubs'),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: clubQueryKeys.details(id),
      queryFn: () => fetcher.get<ClubDetail>(`clubs/${id}`),
    }),
};
