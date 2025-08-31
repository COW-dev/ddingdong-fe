import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { Club } from '../types/club';

export const clubQueryKeys = {
  all: () => ['clubs'],
  details: (id: string) => ['clubs', id],
};

export const clubQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: clubQueryKeys.all(),
      queryFn: () => fetcher.get<Club[]>('clubs'),
    }),
  details: (id: string) =>
    queryOptions({
      queryKey: clubQueryKeys.details(id),
      queryFn: () => fetcher.get<Club>(`clubs/${id}`),
    }),
};
