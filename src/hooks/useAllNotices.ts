/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getAllNotices } from '@/apis';
import { NoticeType } from '@/types';

export function useAllNotices() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<NoticeType[], unknown>,
    [string]
  >({
    queryKey: ['notices'],
    queryFn: getAllNotices,
  });
}
