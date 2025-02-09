import { useInfiniteQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { getAllApplication } from '@/apis';
import { Application } from '@/types/apply';

export function useAllApplication(formId: number, token: string) {
  return useInfiniteQuery<AxiosResponse<Application>>({
    queryKey: ['apply', formId],
    queryFn: ({ pageParam = -1 }) =>
      getAllApplication(formId, pageParam, token),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagingInfo?.hasNext) {
        return lastPage.data.pagingInfo.nextCursorId;
      }
      return undefined;
    },
  });
}
