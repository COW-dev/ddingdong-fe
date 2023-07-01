import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllNotices } from '@/apis';
import { Notice } from '@/types';

export function useAllNotices() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Notice[], unknown>,
    [string]
  >({
    queryKey: ['notices'],
    queryFn: getAllNotices,
  });
}
