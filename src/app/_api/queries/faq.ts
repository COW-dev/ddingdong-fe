import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { FAQ } from '../types/faq';

export const faqQueryKeys = {
  all: () => ['faq'],
};

export const faqQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: faqQueryKeys.all(),
      queryFn: () => fetcher.get<FAQ[]>('questions'),
    }),
};
