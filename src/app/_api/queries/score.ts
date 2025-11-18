import { queryOptions } from '@tanstack/react-query';

import type { ScoreDetail } from '@/app/_api/types/score';

import { fetcher } from '../fetcher';

export const ScoreQueryKeys = {
  score: (id: number) => ['score', String(id)],
  my: () => ['score', 'my'],
};

export const ScoreQueryOptions = {
  score: (id: number) =>
    queryOptions({
      queryKey: ScoreQueryKeys.score(id),
      queryFn: () => fetcher.get<ScoreDetail>(`admin/${id}/score`),
    }),
  my: () =>
    queryOptions({
      queryKey: ScoreQueryKeys.my(),
      queryFn: () => fetcher.get<ScoreDetail>('central/my/score'),
    }),
};
