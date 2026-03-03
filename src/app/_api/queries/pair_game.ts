import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { PairGameAppliersAmount } from '../types/pair_game';

export const pairGameQueryKeys = {
  all: () => ['pair-game'],
  appliersAmount: () => [...pairGameQueryKeys.all(), 'appliers', 'amount'],
};

export const pairGameQueryOptions = {
  appliersAmount: () =>
    queryOptions({
      queryKey: pairGameQueryKeys.appliersAmount(),
      queryFn: () =>
        fetcher.get<PairGameAppliersAmount>('pair-game/appliers/amount'),
    }),
};
