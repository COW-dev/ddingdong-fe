/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getNoticeInfo } from '@/apis';
import { NoticeDetailType } from '@/types';

export function useNoticeInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<NoticeDetailType, unknown>,
    [string, number]
  >({
    queryKey: ['notice', id],
    queryFn: () => getNoticeInfo(id),
  });
}
