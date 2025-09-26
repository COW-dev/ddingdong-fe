import { queryOptions } from '@tanstack/react-query';

import type { ScoreDetail } from '@/app/_api/types/score';

import { fetcher } from '../fetcher';

export const ScoreQueryKeys = { all: () => ['score'] };

export const ScoreQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: ScoreQueryKeys.all(),
      queryFn: () => fetcher.get<ScoreDetail>('central/my/score'),
    }),
};
