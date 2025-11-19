import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { Banner } from '../types/banner';

export const bannerQueryKeys = {
  all: () => ['banners'],
};

export const bannerQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: bannerQueryKeys.all(),
      queryFn: () => fetcher.get<Banner[]>('banners'),
    }),
};
