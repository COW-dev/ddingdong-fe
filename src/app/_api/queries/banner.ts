import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { BannerType } from '../types/banner';

export const bannerQueryKeys = {
  all: () => ['banners'],
};

export const bannerQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: bannerQueryKeys.all(),
      queryFn: () => fetcher.get<BannerType[]>('banners'),
    }),
};
