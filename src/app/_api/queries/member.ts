import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { MemberAPIResponse } from '../types/member';

export const memberQueryKeys = {
  all: () => ['members'],
  excel: () => [...memberQueryKeys.all(), 'excel'],
};

export const memberQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: memberQueryKeys.all(),
      queryFn: () => fetcher.get<MemberAPIResponse>('central/my/club-members'),
    }),
  excel: () =>
    queryOptions({
      queryKey: memberQueryKeys.excel(),
      queryFn: () => fetcher.getBlob<Blob>('central/my/club-members/excel'),
    }),
};
